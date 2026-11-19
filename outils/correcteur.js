/* ============================================================
   Correcteur S.I — outil du professeur (aucune donnée ne quitte le navigateur)
   - lit les PDF rendus (pdf.js) et le bloc « Données de contrôle » de la page d'attestation ;
   - compare case par case au corrigé machine (cle_<activite>.json, chargé depuis le PC) ;
   - propose J / ½ / F / NT (acceptés d'office) ou « à trancher » (décision du professeur) ;
   - ressemblances entre copies, alertes, export .xlsx, session sauvegardée.
   ============================================================ */
import * as pdfjsLib from "./lib/pdf.min.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = "./lib/pdf.worker.min.mjs";

const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const AUTH = window.SI_AUTH;
const CLE_SESSION = "si-correcteur-session-v1";

/* ---------- état ---------- */
const S = { copies: [], cles: {}, decisions: {}, copieActive: null };
/* decisions[cleCopie][q] = { pts: nombre, auto: bool, comm: "" } */

/* ---------- outils texte / nombres ---------- */
const sansAcc = s => String(s ?? "").normalize("NFD").replace(/[̀-ͯ]/g, "");
const norm = s => sansAcc(s).toLowerCase().replace(/\s+/g, " ").trim();
const esc = s => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const cleNom = (n, p) => sansAcc((n || "") + " " + (p || "")).toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
const joliNom = (n, p) => (String(n || "").toUpperCase() + " " + String(p || "")).trim();
function frNb(x) { return (Math.round(x * 1000) / 1000).toString().replace(".", ","); }

function lireNombre(s) {
  let t = String(s ?? "").trim(); if (!t) return null;
  t = t.replace(/[−–]/g, "-").replace(/[   ]/g, "").replace(/,/g, ".");
  t = t.replace(/[×x*]10\^?\(?(-?\d+)\)?/i, "e$1").replace(/·10\^?(-?\d+)/, "e$1");
  const f = /^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)/.exec(t);
  if (f && +f[2] !== 0) return +f[1] / +f[2];
  const m = /^-?\d*\.?\d+(?:e-?\d+)?/i.exec(t);
  return m ? parseFloat(m[0]) : null;
}
function procheDe(v, a, tol) { if (a === 0) return Math.abs(v) <= (tol || 1e-9); return Math.abs(v - a) <= Math.abs(a) * tol + 1e-12; }
function normUnite(u) {
  return sansAcc(String(u || "")).toLowerCase().replace(/\s|·|\*|\.(?=[a-z])/g, "").replace(/⁻¹|\^-1|-1/g, "-1").replace(/²|\^2/g, "2").replace(/³|\^3/g, "3")
    .replace(/^(.+)\/(.+)$/, "$1$2-1").replace(/ω|ohm/g, "ω").replace(/\.$/, "");
}
function motsPresents(rep, groupes) {
  /* mot court (≤ 2 caractères : U, I, ω, Pa…) : doit être un « mot » entier ; sinon simple présence */
  const n = norm(rep), toks = new Set(n.split(/[^a-z0-9ωθηπµ²³%]+/).filter(Boolean));
  let ok = 0;
  (groupes || []).forEach(g => { if (g.some(m => { const x = norm(m); if (!x) return false; return x.length <= 2 ? [...toks].some(k => k === x || k.startsWith(x) && k.length - x.length <= 3 && !/^[a-z]{3,}$/.test(k)) : n.includes(x); })) ok++; });
  return { ok, tot: (groupes || []).length };
}

/* ---------- évaluation d'une case ---------- */
function evalCase(c, rep) {
  const v = (rep ?? "").toString(), vide = !v.trim() || v === "[image]" && false;
  if (c.type === "ignore") return { v: "ignore" };
  if (!v.trim()) return { v: "vide" };
  if (v === "[image]") return { v: "doute", msg: "image fournie : à regarder dans le PDF" };
  if (c.type === "nombre" || c.type === "fraction") {
    const x = lireNombre(v), att = c.type === "fraction" ? lireNombre(c.attendu) : c.attendu, tol = c.tol ?? 0.02;
    if (x === null) return { v: "doute", msg: "pas un nombre lisible" };
    if ([att].concat(c.alternatives || []).some(a => a != null && procheDe(x, +a, Math.max(tol, 0.0005)))) return { v: "ok" };
    for (const e of c.erreurs || []) if (procheDe(x, +e.valeur, 0.02)) return { v: "ko", msg: e.message };
    if (att) {
      const r = x / att, l = Math.log10(Math.abs(r));
      if (Math.abs(r + 1) < 0.02) return { v: "ko", msg: "signe opposé" };
      if (Math.abs(x * att - 1) < 0.03 * Math.abs(x * att) && Math.abs(att) !== 1) return { v: "ko", msg: "valeur inversée (1/x)" };
      if (Math.abs(l - Math.round(l)) < 0.009 && Math.round(l) !== 0) return { v: "ko", msg: "erreur de puissance de 10 (× 10^" + Math.round(l) + ")" };
      if (procheDe(r, 60, 0.02) || procheDe(r, 1 / 60, 0.02)) return { v: "ko", msg: "conversion minutes ↔ secondes" };
      if (procheDe(r, 2 * Math.PI, 0.02) || procheDe(r, 1 / (2 * Math.PI), 0.02)) return { v: "ko", msg: "facteur 2π (tr/s ↔ rad/s)" };
      if (procheDe(r, 9.549, 0.02) || procheDe(r, 1 / 9.549, 0.02)) return { v: "ko", msg: "conversion tr/min ↔ rad/s" };
      if (procheDe(r, 1000, 0.02) || procheDe(r, 0.001, 0.02)) return { v: "ko", msg: "unité (k / m) oubliée" };
      if (Math.abs(r - 1) < 0.1) return { v: "ko", msg: "écart de " + Math.round(Math.abs(r - 1) * 100) + " % (arrondi trop tôt ?)" };
    }
    return { v: "ko", msg: "écart " + (att ? Math.round(Math.abs(x / att - 1) * 100) + " %" : "") };
  }
  if (c.type === "unite") {
    const n = normUnite(v);
    if ((c.attendu || []).some(a => normUnite(a) === n)) return { v: "ok" };
    return { v: "ko", msg: "unité attendue : " + (c.attendu || [])[0] };
  }
  if (c.type === "choix") return norm(v) === norm(c.attendu) ? { v: "ok" } : { v: "ko" };
  if (c.type === "relation" || c.type === "texte") {
    const m = motsPresents(v, c.mots);
    return { v: "mots", ok: m.ok, tot: m.tot };
  }
  return { v: "doute", msg: "type inconnu" };
}

/* ---------- proposition pour une question ---------- */
function evalQuestion(q, rep) {
  const cases = q.champs.map(c => ({ c, r: rep ? rep[c.champ] : undefined, e: rep ? evalCase(c, rep[c.champ]) : { v: "doute", msg: "copie sans données : lire le PDF" } }));
  const notees = cases.filter(x => x.e.v !== "ignore");
  let etat, f, motif = "";
  if (!rep) { etat = "doute"; f = null; motif = "PDF sans données de contrôle"; }
  else if (!notees.length) { etat = "ignore"; f = 0; }
  else if (notees.every(x => x.e.v === "vide")) { etat = "nt"; f = 0; }
  else {
    const nb = x => notees.filter(y => y.e.v === x).length;
    const rel = notees.filter(x => x.c.type === "relation"), txt = notees.filter(x => x.c.type === "texte");
    notees.forEach(x => { if (x.c.type === "texte" && x.e.v === "mots" && x.e.tot > 0 && x.e.ok === x.e.tot) { x.e.complet = true; } });
    const calc = notees.filter(x => ["nombre", "fraction", "unite", "choix"].includes(x.c.type) || x.c.type === "texte" && x.e.complet);
    const calcOk = calc.filter(x => x.e.v === "ok" || x.e.complet).length, calcKo = calc.filter(x => x.e.v === "ko" || x.e.v === "vide").length;
    const relComplet = rel.length && rel.every(x => x.e.v === "mots" && x.e.ok === x.e.tot && x.e.tot > 0);
    const relRien = rel.every(x => x.e.v === "vide");
    const txtDoute = txt.filter(x => x.e.v === "mots" && !(x.e.tot > 0 && x.e.ok === x.e.tot));
    txt.forEach(x => { if (x.e.v === "mots" && x.e.tot > 0 && x.e.ok === x.e.tot) x.e.complet = true; });
    if (nb("doute") || txtDoute.length) {
      etat = "doute"; motif = txtDoute.length ? "réponse rédigée à lire (mots-clés incomplets)" : "lecture impossible";
      const s = notees.reduce((a, x) => a + (x.e.v === "ok" ? 1 : x.e.v === "mots" ? (x.e.tot ? x.e.ok / x.e.tot : 0.5) : 0), 0) / notees.length;
      f = s >= 0.85 ? 1 : s >= 0.4 ? 0.5 : 0;
    } else if (rel.length && !relComplet && !relRien) {
      etat = "doute"; motif = "relation à vérifier";
      f = calc.length && calcOk === calc.length ? 1 : 0.5;
    } else if (calc.length && calcKo === 0 && (relComplet || !rel.length || relRien && false)) { etat = "ok"; f = 1; }
    else if (calc.length && calcKo === 0 && relRien) { etat = "demi"; f = 0.5; motif = "résultat juste sans relation"; }
    else if (!calc.length && relComplet) { etat = "ok"; f = 1; }
    else if (relComplet && calcKo) { etat = "demi"; f = 0.5; motif = "relation juste, calcul faux"; }
    else if (calcOk > 0) { etat = "demi"; f = 0.5; motif = "en partie juste"; }
    else { etat = "ko"; f = 0; }
  }
  return { etat, f, motif, cases };
}

/* ---------- lecture des PDF ---------- */
async function lirePdf(file) {
  const buf = await file.arrayBuffer();
  const doc = await pdfjsLib.getDocument({ data: buf.slice(0), isEvalSupported: false, standardFontDataUrl: "./lib/standard_fonts/", cMapUrl: "./lib/cmaps/", cMapPacked: true }).promise;
  let texte = "";
  for (let i = 1; i <= doc.numPages; i++) {
    const p = await doc.getPage(i), tc = await p.getTextContent();
    let y = null;
    tc.items.forEach(it => { const ny = it.transform ? Math.round(it.transform[5]) : y; texte += (y !== null && ny !== y ? "\n" : " ") + it.str; y = ny; if (it.hasEOL) { texte += "\n"; y = null; } });
    texte += "\n\f\n";
  }
  return { doc, buf, texte, pages: doc.numPages };
}
function lireBloc(texte) {
  const m = /SICTRL1\s+(\d+)\s+([0-9a-f]{8})([\s\S]*?)SICTRL-FIN/.exec(texte);
  if (!m) return { etat: "absent" };
  const L = [...m[3].matchAll(/(\d{3})\s*\|\s*([A-Za-z0-9+/=]+)/g)].map(x => [+x[1], x[2]]).sort((a, b) => a[0] - b[0]);
  const b = L.map(x => x[1]).join("");
  if (L.length !== +m[1]) return { etat: "abime", msg: "lignes manquantes (" + L.length + "/" + m[1] + ")" };
  if (AUTH.sha256(b).slice(0, 8) !== m[2]) return { etat: "abime", msg: "contrôle de somme faux" };
  try { const d = JSON.parse(decodeURIComponent(escape(atob(b)))); return { etat: "ok", d }; }
  catch (e) { return { etat: "abime", msg: "décodage impossible" }; }
}
function empreinteDe(d) { return AUTH.sha256(AUTH.stable({ id: d.id, auteur: d.au, reponses: d.r })).slice(0, 12).toUpperCase().replace(/(.{4})(?!$)/g, "$1-"); }
function devinerNom(texte, nomFichier) {
  const t = texte.slice(0, 3000);
  let n = (/\bNOM\s+([A-ZÀ-Ý][A-ZÀ-Ý' -]{1,40}?)(?:\s{2,}|\n|Prénom)/.exec(t) || [])[1], p = (/Prénom\s+([A-Za-zÀ-ÿ' -]{2,30}?)(?:\s{2,}|\n|Classe|\d)/.exec(t) || [])[1];
  if (!n) { const f = /^([A-Z][A-Z' -]+)_([A-Za-zÀ-ÿ-]+)_/.exec(nomFichier.normalize("NFC")); if (f) { n = f[1]; p = f[2]; } }
  return { nom: (n || "").trim(), prenom: (p || "").trim() };
}
function devinerActivite(texte, nomFichier) {
  const nf = norm(nomFichier).replace(/[^a-z0-9]+/g, "_"), tt = norm(texte.slice(0, 2500));
  let best = null;
  Object.values(S.cles).forEach(k => {
    const f = norm(k.fichier).replace(/[^a-z0-9]+/g, "_");
    let sc = nf.includes(f) ? 3 : 0; if (k.titre && tt.includes(norm(k.titre).slice(0, 30))) sc += 2;
    if (sc && (!best || sc > best.sc || sc === best.sc && f.length > best.l)) best = { app: k.app, sc, l: f.length };
  });
  return best ? best.app : null;
}

async function ajouterFichiers(files) {
  const pdfs = [], cles = [];
  Array.from(files).forEach(f => { if (/\.pdf$/i.test(f.name)) pdfs.push(f); else if (/\.json$/i.test(f.name)) cles.push(f); });
  for (const f of cles) await chargerCle(f);
  let n = 0;
  for (const f of pdfs) {
    n++; $("#charge").textContent = "Lecture " + n + " / " + pdfs.length + " : " + f.name;
    if (S.copies.some(c => c.fichier === f.name && c.taille === f.size)) continue;
    const c = { fichier: f.name, chemin: f.webkitRelativePath || f.name, taille: f.size, file: f, etat: "", alertes: [] };
    try {
      const r = await lirePdf(f); c.pages = r.pages; c.texte = r.texte; c._doc = r.doc;
      const b = lireBloc(r.texte); c.bloc = b.etat;
      if (b.etat === "ok") {
        c.d = b.d; c.app = b.d.app; c.nom = b.d.el.nom || b.d.au.nom; c.prenom = b.d.el.prenom || b.d.au.prenom;
        c.empreinte = b.d.e; c.empOk = empreinteDe(b.d) === b.d.e;
      } else {
        const g = devinerNom(r.texte, f.name); c.nom = g.nom; c.prenom = g.prenom; c.app = devinerActivite(r.texte, f.name);
        if (b.etat === "abime") c.alertes.push("Données de contrôle illisibles ou modifiées (" + b.msg + ")");
        if (r.texte.replace(/\s/g, "").length < 200) c.scan = true;
      }
    } catch (e) { c.bloc = "illisible"; c.alertes.push("PDF illisible : " + e.message); const g = devinerNom("", f.name); c.nom = g.nom; c.prenom = g.prenom; }
    c.id = c.d ? (c.app || "?") + "|" + cleNom(c.nom, c.prenom) + "|" + c.empreinte : "fichier|" + c.fichier + ":" + c.taille;
    c.nomLu = c.nom; c.prenomLu = c.prenom;
    S.copies.push(c);
  }
  $("#charge").textContent = "";
  recalculer(); message(pdfs.length + " PDF lus · " + Object.keys(S.cles).length + " corrigé(s) machine en mémoire.");
}
async function chargerCle(f) {
  try {
    const j = JSON.parse(await f.text()), L = Array.isArray(j) ? j : j.cles || [j];
    L.forEach(k => { if (k.format !== "si-cle-1" || !k.app) throw new Error("format"); S.cles[k.app] = k; });
    S.copies.filter(c => !c.d && !c.app).forEach(c => { c.app = devinerActivite(c.texte || "", c.fichier); });
  } catch (e) { message("« " + f.name + " » n'est pas un corrigé machine (format si-cle-1)."); }
}

/* ---------- calculs globaux ---------- */
function recalculer() {
  /* doublons : même élève + même activité → on retient la copie la plus récente (date PDF) ou la plus complète */
  S.copies.forEach(c => { const m = S.decisions[c.id]?._eleve; if (m && m.nom) { c.nom = m.nom; c.prenom = m.prenom || ""; } if (m && m.app) c.app = m.app; });
  const groupes = {};
  S.copies.forEach(c => { c.doublon = false; const k = (c.app || "?") + "|" + cleNom(c.nom, c.prenom); (groupes[k] = groupes[k] || []).push(c); });
  Object.values(groupes).forEach(g => {
    if (g.length < 2) return;
    g.sort((a, b) => (b.d ? 1 : 0) - (a.d ? 1 : 0) || String(b.d?.pdf || "").localeCompare(String(a.d?.pdf || "")) || (b.taille - a.taille));
    g.slice(1).forEach(c => { c.doublon = true; c.doublonDe = g[0].fichier; });
  });
  S.copies.forEach(c => { c.alertesAuto = alertesDe(c); noter(c); });
  dessinerTout();
  sauverSession();
}
function alertesDe(c) {
  const A = c.alertes.slice();
  if (c.d) {
    const st = c.d.st || {}, tot = (st.tp || 0) + (st.co || 0), pc = tot ? Math.round(100 * st.co / tot) : 0;
    if (!c.empOk) A.push("Empreinte recalculée différente : PDF retouché");
    if (st.sc === 0) A.push("Fichier .json retouché à la main avant l'impression");
    if (pc >= 30) A.push(pc + " % du texte collé (" + st.nc + " collages)");
    if (st.rf) A.push(st.rf + " tentative(s) d'impression refusée(s) (nom changé)");
    if (st.cn) A.push("Nom corrigé " + st.cn + " fois");
    if (cleNom(c.d.el.nom, c.d.el.prenom) !== cleNom(c.d.au.nom, c.d.au.prenom)) A.push("Cartouche ≠ auteur d'origine");
    if (st.ac !== undefined && st.ac < 300 && tot > 300) A.push("Temps actif très court (" + Math.round(st.ac / 60) + " min) pour " + tot + " caractères");
  } else if (c.bloc === "absent") A.push(c.scan ? "Scan / photo : pas de texte, à corriger sur la copie" : "PDF sans données de contrôle (ancienne fiche ou impression hors site)");
  if (c.app && !S.cles[c.app]) A.push("Pas de corrigé machine chargé pour cette activité");
  if (!c.app) A.push("Activité non reconnue");
  if (!c.nom) A.push("Élève non reconnu");
  return A;
}
function noter(c) {
  const k = S.cles[c.app]; c.qs = []; c.note = null; c.nbDoute = 0;
  if (!k) return;
  const dec = S.decisions[c.id] || (S.decisions[c.id] = {});
  let tot = 0, provisoire = false;
  k.questions.forEach(q => {
    const e = evalQuestion(q, c.d ? c.d.r : null), d = dec[q.q];
    if (!q.points) { c.qs.push({ q, e, pts: 0, prop: 0, auto: true, comm: d?.comm || "", horsBareme: true }); return; }
    const prop = e.f === null ? null : e.f * q.points;
    let pts, auto;
    if (d && d.pts !== undefined && d.pts !== null) { pts = d.pts; auto = false; }
    else if (e.etat !== "doute") { pts = prop; auto = true; }
    else { pts = null; auto = false; }
    if (e.etat === "doute" && (pts === null)) { c.nbDoute++; provisoire = true; }
    tot += pts ?? prop ?? 0;
    c.qs.push({ q, e, pts, prop, auto, comm: d?.comm || "" });
  });
  c.note = Math.round(tot * 2) / 2; c.provisoire = provisoire;
}

/* ---------- ressemblances ---------- */
function signature(c) {
  const k = S.cles[c.app], S2 = new Set(); if (!k || !c.d) return S2;
  c.qs.forEach(x => x.e.cases.forEach(cs => {
    if (cs.c.type === "ignore" || cs.e.v === "ok" || cs.e.v === "vide" || cs.e.complet || cs.e.v === "mots" && cs.e.tot && cs.e.ok === cs.e.tot) return;
    const t = norm(cs.r).replace(/[^a-z0-9]+/g, "");
    if (t.length < 2) return;
    if (t.length < 5) S2.add(cs.c.champ + ":" + t);
    else for (let i = 0; i + 4 <= t.length; i++) S2.add(cs.c.champ + ":" + t.slice(i, i + 4));
  }));
  return S2;
}
function ressemblances() {
  const parAct = {}; S.copies.filter(c => !c.doublon && c.d && S.cles[c.app]).forEach(c => (parAct[c.app] = parAct[c.app] || []).push(c));
  const paires = {};
  Object.entries(parAct).forEach(([app, L]) => {
    const sig = L.map(signature);
    for (let i = 0; i < L.length; i++) for (let j = i + 1; j < L.length; j++) {
      const A = sig[i], B = sig[j]; let s;
      if (L[i].empreinte && L[i].d.id === L[j].d.id) s = 100;
      else { if (A.size < 6 || B.size < 6) continue; let n = 0; A.forEach(x => { if (B.has(x)) n++; }); s = Math.round(200 * n / (A.size + B.size)); }
      const a = cleNom(L[i].nom, L[i].prenom), b = cleNom(L[j].nom, L[j].prenom), key = [a, b].sort().join("§");
      (paires[key] = paires[key] || {})[app] = s;
    }
  });
  return paires;
}

/* ---------- affichage ---------- */
const NOMS_ACT = () => Object.values(S.cles).sort((a, b) => (a.ordre ?? 99) - (b.ordre ?? 99) || a.fichier.localeCompare(b.fichier));
function eleves() {
  const m = {}; S.copies.forEach(c => { const k = cleNom(c.nom, c.prenom); if (k) m[k] = m[k] || joliNom(c.nom, c.prenom); });
  return Object.entries(m).sort((a, b) => a[0].localeCompare(b[0]));
}
function dessinerTout() { dessinerRendus(); dessinerListe(); dessinerRessemblances(); dessinerAlertes(); dessinerSynthese();
  const nd = S.copies.filter(c => !c.doublon).reduce((a, c) => a + c.nbDoute, 0); $("#bdg-doute").hidden = !nd; $("#bdg-doute").textContent = nd;
  const na = S.copies.filter(c => !c.doublon && c.alertesAuto.length).length; $("#bdg-alerte").hidden = !na; $("#bdg-alerte").textContent = na;
  $("#etat").textContent = S.copies.length + " PDF · " + Object.keys(S.cles).length + " corrigé(s) machine · " + eleves().length + " élèves";
  if (S.copieActive) afficherCopie(S.copieActive);
}
function dessinerRendus() {
  const acts = NOMS_ACT(), E = eleves(), o = $("#o-rendus");
  if (!S.copies.length) { o.innerHTML = '<p class="vide">Aucun PDF chargé.</p>'; return; }
  const autres = [...new Set(S.copies.filter(c => !S.cles[c.app]).map(c => c.app || "?"))];
  let h = '<h2>Rendus</h2><div class="defil"><table class="t rot"><thead><tr><th>Élève</th>' + acts.map(k => '<th class="r">' + esc(k.fichier) + "</th>").join("") +
    autres.map(a => '<th class="r">' + esc(a === "?" ? "non reconnue" : a) + "</th>").join("") + "<th>Rendus</th></tr></thead><tbody>";
  E.forEach(([k, nom]) => {
    let n = 0;
    h += "<tr><th>" + esc(nom) + "</th>" + acts.map(a => a.app).concat(autres).map(app => {
      const L = S.copies.filter(c => c.app === app && cleNom(c.nom, c.prenom) === k), p = L.find(c => !c.doublon);
      if (!p) return '<td class="c cel-vide">·</td>';
      n++; const t = p.d ? "✓" : "✓*", tip = L.map(c => c.fichier + (c.doublon ? " (doublon)" : "")).join("\n");
      return '<td class="c ' + (p.d ? "cel-ok" : "cel-sb") + '" title="' + esc(tip) + '">' + t + (L.length > 1 ? "<sup>" + L.length + "</sup>" : "") + "</td>";
    }).join("") + '<td class="c"><b>' + n + "</b></td></tr>";
  });
  h += "</tbody><tfoot><tr><th>Nb rendus</th>" + acts.map(a => a.app).concat(autres).map(app => '<td class="c"><b>' + new Set(S.copies.filter(c => c.app === app && !c.doublon).map(c => cleNom(c.nom, c.prenom))).size + "</b></td>").join("") + "<td></td></tr></tfoot></table></div>";
  h += '<p class="petit">✓ = PDF avec données de contrôle · ✓* = PDF sans données (ancienne fiche, scan) : à corriger sur la copie · chiffre en exposant = nombre de dépôts (le plus récent est retenu).</p>';
  const sans = S.copies.filter(c => !c.nom || !c.app);
  if (sans.length) h += "<h3>Fichiers non attribués</h3><ul>" + sans.map(c => "<li>" + esc(c.chemin) + " — " + esc(alertesDe(c).join(" ; ")) + "</li>").join("") + "</ul>";
  o.innerHTML = h;
}
function dessinerListe() {
  const sel = $("#f-act"), v = sel.value;
  sel.innerHTML = '<option value="">Toutes les activités</option>' + NOMS_ACT().map(k => '<option value="' + esc(k.app) + '">' + esc(k.fichier) + "</option>").join("");
  sel.value = v;
  const seul = $("#f-doutes").checked;
  let h = "";
  NOMS_ACT().filter(k => !sel.value || k.app === sel.value).forEach(k => {
    const L = S.copies.filter(c => c.app === k.app && !c.doublon && (!seul || c.nbDoute)).sort((a, b) => cleNom(a.nom, a.prenom).localeCompare(cleNom(b.nom, b.prenom)));
    if (!L.length) return;
    h += '<li class="groupe">' + esc(k.fichier) + " (" + L.length + ")</li>";
    L.forEach(c => { h += '<li data-id="' + esc(c.id) + '" class="' + (S.copieActive === c.id ? "actif" : "") + '"><span>' + esc(joliNom(c.nom, c.prenom) || c.fichier) + (c.alertesAuto.length ? ' <span title="' + esc(c.alertesAuto.join("\n")) + '">⚠</span>' : "") + "</span>" +
      '<span class="n">' + (c.nbDoute ? '<span class="badge">' + c.nbDoute + "</span> " : "") + (c.note !== null ? frNb(c.note) + (c.provisoire ? "*" : "") : "—") + "</span></li>"; });
  });
  $("#liste-copies").innerHTML = h || '<li class="vide">Aucune copie.</li>';
}
const LIB = { ok: "juste", ko: "faux", demi: "½", nt: "non traité", doute: "à trancher", ignore: "non noté" };
function afficherCopie(id) {
  const c = S.copies.find(x => x.id === id); if (!c) return;
  S.copieActive = id; $$("#liste-copies li").forEach(li => li.classList.toggle("actif", li.dataset.id === id));
  const k = S.cles[c.app], seulDoutes = $("#revue").dataset.seul === "1";
  let h = '<div class="tete-copie"><div><b style="font-size:18px">' + esc(joliNom(c.nom, c.prenom)) + "</b><br><span class=\"petit\">" + esc(k ? k.fichier : c.app) + " · " + esc(c.fichier) + "</span></div>" +
    '<div class="note">' + (c.note !== null ? frNb(c.note) + " / 20" : "—") + (c.provisoire ? ' <span class="petit">(provisoire : ' + c.nbDoute + " à trancher)</span>" : "") + "</div>" +
    (c.d ? '<span class="puce">PDF du ' + esc(new Date(c.d.pdf).toLocaleString("fr-FR")) + "</span>" : '<span class="puce orange">sans données de contrôle</span>') +
    c.alertesAuto.map(a => '<span class="puce rouge">' + esc(a) + "</span>").join("") +
    '<button type="button" class="btn" data-voir="' + esc(c.id) + '">Voir le PDF</button>' +
    (!c.d ? '<span class="petit">Élève : <input id="m-nom" size="12" placeholder="NOM" value="' + esc(c.nom) + '"> <input id="m-prenom" size="10" placeholder="Prénom" value="' + esc(c.prenom) + '"> <select id="m-app">' + NOMS_ACT().map(k => '<option value="' + esc(k.app) + '"' + (k.app === c.app ? " selected" : "") + ">" + esc(k.fichier) + "</option>").join("") + '</select> <button type="button" class="btn" id="m-ok">Attribuer</button></span>' : "") +
    '<label class="petit"><input type="checkbox" id="seul-doutes"' + (seulDoutes ? " checked" : "") + "> seulement les questions à trancher</label></div>";
  if (!k) h += '<p class="vide">Charge le corrigé machine de cette activité pour corriger.</p>';
  else c.qs.forEach(x => {
    if (x.e.etat === "ignore") return;
    if (seulDoutes && x.e.etat !== "doute") return;
    const P = x.q.points, choix = x.horsBareme ? [] : [0, P / 2, P];
    h += '<div class="q ' + x.e.etat + '" data-q="' + esc(x.q.q) + '"><div class="q-tete"><b>' + esc(x.q.q) + "</b><span>" + esc(x.q.intitule || "") + '</span><span class="pas ' + x.e.etat + '">' + LIB[x.e.etat] + "</span>" +
      (x.e.motif ? '<span class="petit">' + esc(x.e.motif) + "</span>" : "") +
      '<span class="pts">' + choix.map(v => '<button type="button" class="choix" data-pts="' + v + '" aria-pressed="' + (x.pts !== null && Math.abs(x.pts - v) < 1e-9) + '">' + frNb(v) + "</button>").join("") +
      (x.horsBareme ? '<span class="puce">hors barème (pour information)</span>' : '<span class="petit">/ ' + frNb(P) + "</span>") + (x.horsBareme ? "" : x.auto ? ' <span class="auto">(auto)</span>' : x.pts !== null ? ' <span class="auto">(décidé)</span>' : x.prop !== null ? ' <span class="auto">proposé : ' + frNb(x.prop) + "</span>" : "") + "</span></div>" +
      '<table class="champs"><colgroup><col style="width:24%"><col style="width:34%"><col style="width:28%"><col style="width:14%"></colgroup><tr><th>Case</th><th>Réponse de l\'élève</th><th>Attendu</th><th></th></tr>' +
      x.e.cases.filter(cs => cs.c.type !== "ignore").map(cs => {
        const att = cs.c.type === "nombre" ? frNb(cs.c.attendu) + (cs.c.tol ? " (±" + Math.round(cs.c.tol * 100) + " %)" : "") + (cs.c.alternatives ? " ou " + cs.c.alternatives.map(frNb).join(", ") : "")
          : cs.c.type === "unite" ? (cs.c.attendu || []).join(" ou ") : cs.c.affiche || cs.c.attendu || "";
        const v = cs.e.v === "mots" ? (cs.e.ok === cs.e.tot ? '<span class="v ok">mots-clés ✓</span>' : '<span class="v doute">' + cs.e.ok + "/" + cs.e.tot + " mots-clés</span>") :
          '<span class="v ' + cs.e.v + '">' + ({ ok: "✔", ko: "✖", vide: "vide", doute: "?" }[cs.e.v] || "") + "</span>";
        return "<tr><td>" + esc(cs.c.label || cs.c.champ) + '</td><td class="el">' + esc(cs.r ?? "") + '</td><td class="att">' + esc(att) + "</td><td>" + v + (cs.e.msg ? '<span class="msg">' + esc(cs.e.msg) + "</span>" : "") + "</td></tr>";
      }).join("") + "</table>" +
      '<input class="comm" type="text" placeholder="Commentaire (facultatif, repris dans l\'export)" value="' + esc(x.comm) + '"></div>';
  });
  const L = $$("#liste-copies li[data-id]").map(li => li.dataset.id), i = L.indexOf(id);
  h += '<div class="nav-copie"><button type="button" class="btn" data-aller="' + esc(L[i - 1] || "") + '"' + (i > 0 ? "" : " disabled") + '>← Copie précédente</button>' +
    '<button type="button" class="btn btn-jaune" data-aller="' + esc(L[i + 1] || "") + '"' + (i >= 0 && i < L.length - 1 ? "" : " disabled") + ">Copie suivante →</button></div>";
  $("#revue").innerHTML = h;
}
function decider(qid, pts, comm) {
  const c = S.copies.find(x => x.id === S.copieActive); if (!c) return;
  const d = (S.decisions[c.id] = S.decisions[c.id] || {}), e = (d[qid] = d[qid] || {});
  if (pts !== undefined) e.pts = pts; if (comm !== undefined) e.comm = comm;
  noter(c); dessinerListe(); afficherCopie(c.id); dessinerSynthese(); sauverSession();
  const nd = S.copies.filter(x => !x.doublon).reduce((a, x) => a + x.nbDoute, 0); $("#bdg-doute").hidden = !nd; $("#bdg-doute").textContent = nd;
}
function dessinerRessemblances() {
  const P = ressemblances(), E = eleves(), o = $("#o-ressemblances");
  if (!E.length) { o.innerHTML = '<p class="vide">Aucune copie.</p>'; return; }
  const moy = d => Math.round(Object.values(d).reduce((a, b) => a + b, 0) / Object.values(d).length);
  const coul = s => { const t = Math.min(1, s / 100); const r = 255, g = Math.round(255 - t * 230), b = Math.round(255 - t * 255); return "rgb(" + (s >= 40 ? 220 : r) + "," + g + "," + b + ")"; };
  let h = "<h2>Ressemblances entre élèves (0 à 100)</h2><p class=\"petit\">Score = part des réponses fausses ou personnelles identiques (les réponses justes communes ne comptent pas). 100 = mêmes réponses mot pour mot. Case = moyenne des activités communes ; survoler pour le détail.</p>" +
    '<div class="defil"><table class="t mat rot"><thead><tr><th>Élève</th>' + E.map(([, n]) => '<th class="r">' + esc(n) + "</th>").join("") + "</tr></thead><tbody>";
  E.forEach(([a, na]) => {
    h += "<tr><th>" + esc(na) + "</th>" + E.map(([b, nb]) => {
      if (a === b) return '<td class="s diag"></td>';
      const d = P[[a, b].sort().join("§")]; if (!d) return '<td class="s"></td>';
      const m = moy(d), tip = na + " / " + nb + "\n" + Object.entries(d).map(([app, s]) => (S.cles[app]?.fichier || app) + " : " + s).join("\n");
      return '<td class="s" style="background:' + coul(m) + (m >= 60 ? ";color:#fff;font-weight:700" : "") + '" title="' + esc(tip) + '">' + m + "</td>";
    }).join("") + "</tr>";
  });
  h += "</tbody></table></div>";
  const top = Object.entries(P).map(([k, d]) => ({ k, d, max: Math.max(...Object.values(d)) })).filter(x => x.max >= 50).sort((x, y) => y.max - x.max);
  h += "<h3>Paires à examiner (au moins une activité ≥ 50)</h3>" + (top.length ? '<table class="t"><tr><th>Élèves</th><th>Max</th><th>Activités</th></tr>' + top.map(x => {
    const [a, b] = x.k.split("§"), na = E.find(e => e[0] === a)?.[1], nb = E.find(e => e[0] === b)?.[1];
    return "<tr><td>" + esc(na + " / " + nb) + '</td><td class="c" style="background:' + coul(x.max) + '">' + x.max + "</td><td>" + Object.entries(x.d).filter(([, s]) => s >= 50).map(([app, s]) => esc(S.cles[app]?.fichier || app) + " " + s).join(" · ") + "</td></tr>";
  }).join("") + "</table>" : '<p class="petit">Aucune.</p>');
  o.innerHTML = h;
}
function dessinerAlertes() {
  const L = S.copies.filter(c => c.alertesAuto.length);
  $("#o-alertes").innerHTML = "<h2>Alertes</h2>" + (L.length ? '<table class="t"><tr><th>Élève</th><th>Activité</th><th>Fichier</th><th>Alertes</th></tr>' +
    L.map(c => "<tr><td>" + esc(joliNom(c.nom, c.prenom) || "?") + "</td><td>" + esc(S.cles[c.app]?.fichier || c.app || "?") + "</td><td>" + esc(c.fichier) + (c.doublon ? " (doublon)" : "") + "</td><td>" + c.alertesAuto.map(esc).join("<br>") + "</td></tr>").join("") + "</table>" : '<p class="petit">Aucune alerte.</p>');
}
function statsQuestions() {
  const R = [];
  NOMS_ACT().forEach(k => {
    const L = S.copies.filter(c => c.app === k.app && !c.doublon && c.qs.length);
    k.questions.forEach((q, i) => {
      if (!q.points) return;
      const n = { ok: 0, demi: 0, ko: 0, nt: 0, doute: 0 }; let pts = 0;
      L.forEach(c => { const x = c.qs[i]; const f = x.pts === null ? null : x.pts / q.points; if (f === null) n.doute++; else if (x.e.etat === "nt" && f === 0) n.nt++; else if (f >= 0.99) n.ok++; else if (f > 0) n.demi++; else n.ko++; pts += x.pts ?? 0; });
      R.push({ act: k.fichier, q: q.q, intitule: q.intitule || "", points: q.points, copies: L.length, ...n, taux: L.length ? pts / (L.length * q.points) : null });
    });
  });
  return R;
}
function dessinerSynthese() {
  const acts = NOMS_ACT(), E = eleves();
  let h = "<h2>Notes proposées (/20)</h2><div class=\"defil\"><table class=\"t rot\"><thead><tr><th>Élève</th>" + acts.map(k => '<th class="r">' + esc(k.fichier) + "</th>").join("") + "<th>Moyenne</th></tr></thead><tbody>";
  E.forEach(([k, n]) => {
    const notes = acts.map(a => S.copies.find(c => c.app === a.app && !c.doublon && cleNom(c.nom, c.prenom) === k));
    const v = notes.filter(c => c && c.note !== null).map(c => c.note);
    h += "<tr><th>" + esc(n) + "</th>" + notes.map(c => '<td class="c">' + (c && c.note !== null ? frNb(c.note) + (c.provisoire ? "*" : "") : "") + "</td>").join("") + '<td class="c"><b>' + (v.length ? frNb(v.reduce((a, b) => a + b, 0) / v.length) : "") + "</b></td></tr>";
  });
  h += "</tbody></table></div><p class=\"petit\">* = note provisoire (questions encore à trancher, comptées avec la proposition).</p>";
  const Q = statsQuestions().filter(x => x.copies).sort((a, b) => b.ko - a.ko || (a.taux ?? 1) - (b.taux ?? 1));
  h += "<h3>Questions les moins réussies</h3><table class=\"t\"><tr><th>Activité</th><th>Q</th><th>Intitulé</th><th>Copies</th><th>Juste</th><th>½</th><th>Faux (tenté)</th><th>Non traité</th><th>À trancher</th><th>Réussite</th></tr>" +
    Q.slice(0, 25).map(x => "<tr><td>" + esc(x.act) + "</td><td>" + esc(x.q) + "</td><td>" + esc(x.intitule) + '</td><td class="c">' + x.copies + '</td><td class="c">' + x.ok + '</td><td class="c">' + x.demi + '</td><td class="c"><b>' + x.ko + '</b></td><td class="c">' + x.nt + '</td><td class="c">' + x.doute + '</td><td class="c">' + (x.taux === null ? "" : Math.round(x.taux * 100) + " %") + "</td></tr>").join("") + "</table>";
  h += "<h3>Activités non rendues</h3><table class=\"t\"><tr><th>Élève</th><th>Non rendues</th></tr>" + E.map(([k, n]) => {
    const m = acts.filter(a => !S.copies.some(c => c.app === a.app && cleNom(c.nom, c.prenom) === k)).map(a => a.fichier);
    return "<tr><td>" + esc(n) + "</td><td>" + (m.length ? esc(m.join(" · ")) : "—") + "</td></tr>";
  }).join("") + "</table>";
  $("#o-synthese").innerHTML = h;
}

/* ---------- visionneuse ---------- */
async function voirPdf(id) {
  const c = S.copies.find(x => x.id === id); if (!c) return;
  $("#visu-titre").textContent = joliNom(c.nom, c.prenom) + " — " + c.fichier; $("#visu-pages").innerHTML = ""; $("#visu").hidden = false;
  let doc = c._doc; if (!doc && c.file) doc = c._doc = await pdfjsLib.getDocument({ data: await c.file.arrayBuffer(), isEvalSupported: false, standardFontDataUrl: "./lib/standard_fonts/", cMapUrl: "./lib/cmaps/", cMapPacked: true }).promise;
  if (!doc) { $("#visu-pages").innerHTML = '<p style="color:#fff">Le PDF n\'est plus en mémoire : recharge-le.</p>'; return; }
  for (let i = 1; i <= doc.numPages; i++) {
    const p = await doc.getPage(i), vp = p.getViewport({ scale: 1.4 }), cv = document.createElement("canvas");
    cv.width = vp.width; cv.height = vp.height; $("#visu-pages").appendChild(cv);
    await p.render({ canvasContext: cv.getContext("2d"), viewport: vp }).promise;
  }
}

/* ---------- export .xlsx ---------- */
function exporter() {
  if (!window.XLSX) { message("Bibliothèque d'export absente."); return; }
  const acts = NOMS_ACT(), E = eleves(), wb = XLSX.utils.book_new();
  const notes = [["Élève"].concat(acts.map(a => a.fichier), ["Moyenne des rendus"])];
  E.forEach(([k, n]) => { const L = acts.map(a => S.copies.find(c => c.app === a.app && !c.doublon && cleNom(c.nom, c.prenom) === k)); const v = L.filter(c => c && c.note !== null).map(c => c.note);
    notes.push([n].concat(L.map(c => c && c.note !== null ? c.note : ""), [v.length ? Math.round(100 * v.reduce((a, b) => a + b, 0) / v.length) / 100 : ""])); });
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(notes), "Notes");
  const det = [["Élève", "Activité", "Question", "Intitulé", "Points", "Proposé", "Retenu", "Décision", "Statut", "Case", "Réponse élève", "Attendu", "Constat", "Commentaire"]];
  S.copies.filter(c => !c.doublon && c.qs.length).forEach(c => c.qs.forEach(x => { if (x.e.etat === "ignore") return;
    x.e.cases.filter(cs => cs.c.type !== "ignore").forEach((cs, j) => det.push([joliNom(c.nom, c.prenom), S.cles[c.app].fichier, x.q.q, x.q.intitule || "", j ? "" : x.q.points, j ? "" : x.prop ?? "", j ? "" : x.pts ?? "", j ? "" : x.auto ? "auto" : x.pts === null ? "à trancher" : "professeur", LIB[x.e.etat],
      cs.c.label || cs.c.champ, cs.r ?? "", cs.c.type === "nombre" ? cs.c.attendu : cs.c.type === "unite" ? (cs.c.attendu || []).join(" / ") : cs.c.affiche || cs.c.attendu || "", cs.e.msg || (cs.e.v === "mots" ? cs.e.ok + "/" + cs.e.tot + " mots-clés" : cs.e.v), j ? "" : x.comm])); }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(det), "Détail");
  const Q = [["Activité", "Question", "Intitulé", "Points", "Copies", "Juste", "½", "Faux (tenté)", "Non traité", "À trancher", "Taux de réussite"]].concat(statsQuestions().filter(x => x.copies).sort((a, b) => b.ko - a.ko || (a.taux ?? 1) - (b.taux ?? 1)).map(x => [x.act, x.q, x.intitule, x.points, x.copies, x.ok, x.demi, x.ko, x.nt, x.doute, x.taux === null ? "" : Math.round(x.taux * 100) / 100]));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(Q), "Questions ratées");
  const nf = [["Élève", "Nb non rendues", "Activités non rendues"]].concat(E.map(([k, n]) => { const m = acts.filter(a => !S.copies.some(c => c.app === a.app && cleNom(c.nom, c.prenom) === k)).map(a => a.fichier); return [n, m.length, m.join(" · ")]; }));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(nf), "Non faits");
  const P = ressemblances(), mat = [["Élève"].concat(E.map(e => e[1]))];
  E.forEach(([a, na]) => mat.push([na].concat(E.map(([b]) => { if (a === b) return "—"; const d = P[[a, b].sort().join("§")]; return d ? Math.round(Object.values(d).reduce((x, y) => x + y, 0) / Object.values(d).length) : ""; }))));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(mat), "Ressemblances");
  const al = [["Élève", "Activité", "Fichier", "Alerte"]]; S.copies.forEach(c => c.alertesAuto.forEach(a => al.push([joliNom(c.nom, c.prenom), S.cles[c.app]?.fichier || c.app || "?", c.fichier, a])));
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(al), "Alertes");
  const d = new Date(), z = x => String(x).padStart(2, "0");
  XLSX.writeFile(wb, "Correction_PRIVE_" + d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + ".xlsx");
  message("Classeur exporté (dossier Téléchargements) — PRIVÉ : contient des noms et des notes.");
}

/* ---------- session ---------- */
function etatSession() { return { app: "si-correcteur", version: 1, enregistre: new Date().toISOString(), decisions: S.decisions, cles: S.cles }; }
function sauverSession() { try { localStorage.setItem(CLE_SESSION, JSON.stringify(etatSession())); } catch (e) { } }
function reprendre(j) { if (!j || j.app !== "si-correcteur") throw new Error("format"); S.decisions = j.decisions || {}; Object.assign(S.cles, j.cles || {}); recalculer(); }
function telechargerSession() {
  const b = new Blob([JSON.stringify(etatSession(), null, 1)], { type: "application/json" }), a = document.createElement("a");
  a.href = URL.createObjectURL(b); a.download = "Session_correction_PRIVE.json"; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  message("Session enregistrée (décisions et corrigés, sans les PDF).");
}

/* ---------- divers ---------- */
let tm = null;
function message(t) { const m = $("#toast"); m.textContent = t; m.hidden = false; clearTimeout(tm); tm = setTimeout(() => { m.hidden = true; }, 4500); }
function onglet(n) { $$(".onglets button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.o === n))); $$(".onglet").forEach(s => { s.hidden = s.id !== "o-" + n; }); }

/* ---------- branchements ---------- */
$$(".onglets button").forEach(b => b.addEventListener("click", () => onglet(b.dataset.o)));
$("#in-pdf").addEventListener("change", e => { ajouterFichiers(e.target.files); e.target.value = ""; });
$("#in-dossier").addEventListener("change", e => { ajouterFichiers(e.target.files); e.target.value = ""; });
$("#in-cle").addEventListener("change", async e => { for (const f of e.target.files) await chargerCle(f); e.target.value = ""; recalculer(); message("Corrigé(s) machine chargé(s)."); });
$("#in-session").addEventListener("change", async e => { try { reprendre(JSON.parse(await e.target.files[0].text())); message("Session reprise."); } catch (err) { message("Ce fichier n'est pas une session du Correcteur."); } e.target.value = ""; });
$("#btn-xlsx").addEventListener("click", exporter);
$("#btn-session").addEventListener("click", telechargerSession);
$("#btn-vider").addEventListener("click", () => { if (!confirm("Vider les PDF, les corrigés et toutes les décisions de ce navigateur ?")) return; S.copies = []; S.cles = {}; S.decisions = {}; S.copieActive = null; try { localStorage.removeItem(CLE_SESSION); } catch (e) { } $("#revue").innerHTML = ""; recalculer(); });
$("#f-act").addEventListener("change", dessinerListe);
$("#f-doutes").addEventListener("change", dessinerListe);
$("#liste-copies").addEventListener("click", e => { const li = e.target.closest("li[data-id]"); if (li) afficherCopie(li.dataset.id); });
$("#revue").addEventListener("click", e => {
  const b = e.target.closest("[data-pts]"); if (b) { decider(b.closest(".q").dataset.q, +b.dataset.pts); return; }
  const a = e.target.closest("[data-aller]"); if (a && a.dataset.aller) { afficherCopie(a.dataset.aller); window.scrollTo(0, 0); return; }
  const v = e.target.closest("[data-voir]"); if (v) voirPdf(v.dataset.voir);
  if (e.target.id === "m-ok") { const c = S.copies.find(x => x.id === S.copieActive); (S.decisions[c.id] = S.decisions[c.id] || {})._eleve = { nom: $("#m-nom").value.trim().toUpperCase(), prenom: $("#m-prenom").value.trim(), app: $("#m-app").value }; recalculer(); message("Copie attribuée."); }
});
$("#revue").addEventListener("change", e => {
  if (e.target.id === "seul-doutes") { $("#revue").dataset.seul = e.target.checked ? "1" : ""; afficherCopie(S.copieActive); }
  if (e.target.classList.contains("comm")) decider(e.target.closest(".q").dataset.q, undefined, e.target.value);
});
$("#visu-fermer").addEventListener("click", () => { $("#visu").hidden = true; $("#visu-pages").innerHTML = ""; });
document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#visu").hidden) $("#visu-fermer").click(); });
let prof = 0;
document.addEventListener("dragenter", e => { e.preventDefault(); prof++; $("#depot").hidden = false; });
document.addEventListener("dragleave", () => { if (--prof <= 0) { prof = 0; $("#depot").hidden = true; } });
document.addEventListener("dragover", e => e.preventDefault());
document.addEventListener("drop", e => { e.preventDefault(); prof = 0; $("#depot").hidden = true; if (e.dataTransfer.files.length) ajouterFichiers(e.dataTransfer.files); });

/* démarrage : reprise des décisions et corrigés gardés dans ce navigateur */
try { const j = JSON.parse(localStorage.getItem(CLE_SESSION) || "null"); if (j) { S.decisions = j.decisions || {}; S.cles = j.cles || {}; } } catch (e) { }
recalculer();
window.__correcteur = S; /* pour les tests */
