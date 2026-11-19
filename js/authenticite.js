/* ============================================================
   S.I — Attestation de travail (authenticité des copies)
   Module commun aux activités en ligne (activite.js, td_perceuse.js).
   - auteur d'origine figé (nom + prénom) ; impression BLOQUÉE si le cartouche change
     (une simple faute corrigée, ≤ 2 lettres, est acceptée et notée) ;
   - dates : début du travail, enregistrements .json, reprises, PDF ;
   - journal de saisie : temps actif, sessions, caractères tapés / collés, détail des collages ;
   - pied de page imprimé + dernière page « Attestation de travail » ;
   - empreinte (SHA-256 tronquée) des réponses : le prof la recalcule depuis le .json.
   Aucune donnée n'est envoyée sur internet. Dissuasif, pas infalsifiable (site statique).
   ============================================================ */
"use strict";
(function () {
  var SEL = "si-attestation-2026"; /* graine du sceau (détecte un .json retouché à la main) */

  /* ---------- SHA-256 (synchrone, UTF-8) ---------- */
  function sha256(txt) {
    var s = unescape(encodeURIComponent(txt)), i, j, l = s.length, w = [], K = [], H = [], p = 2, n = 0;
    function frac(x) { return ((x - Math.floor(x)) * 4294967296) | 0; }
    while (n < 64) { for (j = 2; j * j <= p; j++) if (p % j === 0) break; if (j * j > p) { if (n < 8) H[n] = frac(Math.pow(p, 1 / 2)); K[n++] = frac(Math.pow(p, 1 / 3)); } p++; }
    var b = []; for (i = 0; i < l; i++) b[i >> 2] |= (s.charCodeAt(i) & 255) << (24 - (i % 4) * 8);
    b[l >> 2] |= 0x80 << (24 - (l % 4) * 8); b[(((l + 8) >> 6) << 4) + 15] = l * 8;
    function r(x, c) { return (x >>> c) | (x << (32 - c)); }
    for (i = 0; i < b.length; i += 16) {
      var a = H.slice(0);
      for (j = 0; j < 64; j++) {
        if (j < 16) w[j] = b[i + j] | 0;
        else { var x = w[j - 15], y = w[j - 2]; w[j] = (w[j - 16] + (r(x, 7) ^ r(x, 18) ^ (x >>> 3)) + w[j - 7] + (r(y, 17) ^ r(y, 19) ^ (y >>> 10))) | 0; }
        var t1 = a[7] + (r(a[4], 6) ^ r(a[4], 11) ^ r(a[4], 25)) + ((a[4] & a[5]) ^ (~a[4] & a[6])) + K[j] + w[j];
        var t2 = (r(a[0], 2) ^ r(a[0], 13) ^ r(a[0], 22)) + ((a[0] & a[1]) ^ (a[0] & a[2]) ^ (a[1] & a[2]));
        a.unshift((t1 + t2) | 0); a[4] = (a[4] + t1) | 0; a.pop();
      }
      for (j = 0; j < 8; j++) H[j] = (H[j] + a[j]) | 0;
    }
    return H.map(function (h) { return ("00000000" + (h >>> 0).toString(16)).slice(-8); }).join("");
  }
  function stable(o) { /* JSON aux clés triées : même texte quel que soit l'ordre */
    if (o === null || typeof o !== "object") return JSON.stringify(o);
    if (Array.isArray(o)) return "[" + o.map(stable).join(",") + "]";
    return "{" + Object.keys(o).sort().map(function (k) { return JSON.stringify(k) + ":" + stable(o[k]); }).join(",") + "}";
  }
  function sansAccents(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function cleNom(nom, prenom) { return sansAccents((nom || "") + " " + (prenom || "")).toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim(); }
  function distance(a, b) { /* Levenshtein */
    var m = a.length, n = b.length, d = [], i, j; if (!m) return n; if (!n) return m;
    for (i = 0; i <= m; i++) d[i] = [i]; for (j = 0; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  function iso() { return new Date().toISOString(); }
  function fr(isoTxt) {
    if (!isoTxt) return "—"; var d = new Date(isoTxt); if (isNaN(d)) return "—";
    var z = function (x) { return String(x).padStart(2, "0"); };
    return z(d.getDate()) + "/" + z(d.getMonth() + 1) + "/" + d.getFullYear() + " à " + z(d.getHours()) + " h " + z(d.getMinutes());
  }
  function duree(s) { s = Math.round(s || 0); var h = Math.floor(s / 3600), m = Math.round((s % 3600) / 60); return h ? h + " h " + String(m).padStart(2, "0") + " min" : m + " min"; }
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function nouvelId() {
    var a = new Uint8Array(8); try { crypto.getRandomValues(a); } catch (e) { for (var i = 0; i < 8; i++) a[i] = Math.random() * 256 | 0; }
    return Array.prototype.map.call(a, function (x) { return ("0" + x.toString(16)).slice(-2); }).join("").toUpperCase().replace(/(.{4})(?!$)/g, "$1-");
  }

  var STYLE = "@media screen{.auth-recap,.auth-refus{display:none}}" +
    "@media print{.auth-recap{display:block!important;break-before:page;page-break-before:always;font-family:'IBM Plex Sans',Arial,sans-serif;font-size:9pt;color:#000}" +
    ".auth-recap h2{font-size:13pt;margin:0 0 2mm;color:#13263F;border-bottom:1pt solid #13263F;padding-bottom:1mm}" +
    ".auth-recap p{margin:1.5mm 0}.auth-recap table{border-collapse:collapse;width:100%;margin:2mm 0}" +
    ".auth-recap th,.auth-recap td{border:.6pt solid #888;padding:1mm 1.6mm;text-align:left;vertical-align:top}.auth-recap th{background:#EEF2F6;width:46%}" +
    ".auth-recap .alerte{color:#B71C1C;font-weight:700}.auth-recap .note{font-size:7.5pt;color:#444}" +
    ".auth-data{margin-top:4mm;border-top:.6pt dashed #999;padding-top:1.5mm;break-inside:avoid}.auth-data p{font-size:7pt;color:#555;margin:0 0 1mm}" +
    ".auth-data .l{font-family:'IBM Plex Mono','Courier New',monospace;font-size:6.2pt;line-height:1.2;white-space:nowrap;overflow:hidden;color:#444;letter-spacing:0}" +
    ".auth-refus{display:none}html.auth-bloque body>*{display:none!important}html.auth-bloque body>.auth-refus{display:block!important;font:14pt Arial,sans-serif;padding:20mm;color:#B71C1C}}";

  /* opts : { app, fichier, nom(), prenom(), reponses(), champs: [éléments], feuille: élément, message(txt) } */
  window.SI_AUTH = function (opts) {
    var A = null, dernier = 0, st = document.createElement("style"); st.textContent = STYLE; document.head.appendChild(st);
    var recap = document.createElement("section"); recap.className = "auth-recap"; recap.setAttribute("aria-hidden", "true");
    (opts.feuille || document.body).appendChild(recap);
    var refus = document.createElement("div"); refus.className = "auth-refus"; document.body.appendChild(refus);

    function sceau(a) { return sha256(SEL + "|" + a.id + "|" + a.auteur.nom + "|" + a.auteur.prenom + "|" + a.cree).slice(0, 16); }
    function vierge(note) {
      return { version: 1, id: nouvelId(), cree: iso(), auteur: { nom: "", prenom: "" }, fige: null, sceau: "", note: note || "",
        corrections_nom: [], json: { premier: null, dernier: null, nb: 0 }, reprises: [], pdf: [], sessions: [{ debut: iso(), fin: iso(), actif_s: 0 }],
        saisie: { tapes: 0, colles: 0, nb_collages: 0, collages: [] }, refus: [] };
    }
    function fixer() { /* fige l'auteur dès que NOM et prénom sont remplis */
      if (A.fige) return; var n = opts.nom().trim(), p = opts.prenom().trim();
      if (!n || !p) return; A.auteur = { nom: n, prenom: p }; A.fige = iso(); A.sceau = sceau(A);
    }
    function etatNom() {
      if (!A.fige) return { ok: true };
      var avant = cleNom(A.auteur.nom, A.auteur.prenom), maint = cleNom(opts.nom(), opts.prenom());
      if (avant === maint) return { ok: true };
      var d = distance(avant, maint);
      return { ok: d <= 2 && maint.length > 0, faute: d <= 2, avant: A.auteur.nom.toUpperCase() + " " + A.auteur.prenom, apres: (opts.nom().toUpperCase() + " " + opts.prenom()).trim() };
    }
    function integre() { return !A.fige || A.sceau === sceau(A); }
    function activite() { /* temps actif : écarts < 2 min comptés (max 60 s), nouvelle session après 30 min */
      var t = Date.now(), s = A.sessions[A.sessions.length - 1], ecart = dernier ? (t - dernier) / 1000 : 0;
      if (!s || ecart > 1800) { A.sessions.push(s = { debut: iso(), fin: iso(), actif_s: 0 }); if (A.sessions.length > 60) A.sessions.splice(1, 1); }
      else if (dernier && ecart < 120) s.actif_s += Math.min(ecart, 60);
      s.fin = iso(); dernier = t;
    }
    function qDe(el) { return el.dataset.champ || el.dataset.q || el.id || "?"; }
    (opts.champs || []).forEach(function (el) {
      el.addEventListener("beforeinput", function (ev) {
        if (!A) return; activite();
        if ((ev.inputType === "insertText" || ev.inputType === "insertCompositionText") && ev.data) A.saisie.tapes += ev.data.length;
      });
      el.addEventListener("paste", function (ev) {
        if (!A) return; var t = ""; try { t = (ev.clipboardData || window.clipboardData).getData("text") || ""; } catch (e) { }
        if (!t) return; activite();
        A.saisie.colles += t.length; A.saisie.nb_collages++;
        A.saisie.collages.push({ champ: qDe(el), car: t.length, t: iso() }); if (A.saisie.collages.length > 80) A.saisie.collages.shift();
      });
      el.addEventListener("drop", function (ev) {
        if (!A) return; var t = ""; try { t = ev.dataTransfer.getData("text") || ""; } catch (e) { }
        if (!t) return; activite(); A.saisie.colles += t.length; A.saisie.nb_collages++;
        A.saisie.collages.push({ champ: qDe(el), car: t.length, t: iso(), glisse: true });
      });
    });

    function sansImages(r) { var o = {}; Object.keys(r || {}).forEach(function (k) { o[k] = /^data:image\//.test(r[k]) ? "[image]" : r[k]; }); return o; }
    function empreinte() { return sha256(stable({ id: A.id, auteur: A.auteur, reponses: sansImages(opts.reponses()) })).slice(0, 12).toUpperCase().replace(/(.{4})(?!$)/g, "$1-"); }
    function actifTotal() { return A.sessions.reduce(function (s, x) { return s + (x.actif_s || 0); }, 0); }
    function construireRecap(pdfIso) {
      var sa = A.saisie, tot = sa.tapes + sa.colles, pc = tot ? Math.round(100 * sa.colles / tot) : 0;
      var lignes = [
        ["Auteur d'origine du travail", esc(A.auteur.nom.toUpperCase() + " " + A.auteur.prenom) + (A.fige ? " (nom fixé le " + fr(A.fige) + ")" : "")],
        ["Identifiant du travail", esc(A.id)],
        ["Travail commencé le", fr(A.cree) + (A.note ? '<br><span class="note">' + esc(A.note) + "</span>" : "")],
        ["Fichier .json : 1er enregistrement", A.json.premier ? fr(A.json.premier) + " (" + A.json.nb + " enregistrement" + (A.json.nb > 1 ? "s" : "") + ", dernier le " + fr(A.json.dernier) + ")" : "jamais enregistré"],
        ["Reprises depuis un .json", A.reprises.length ? A.reprises.map(function (r) { return fr(r.t); }).join(" · ") : "aucune"],
        ["PDF créé le", fr(pdfIso) + (A.pdf.length > 1 ? " (PDF n° " + A.pdf.length + ")" : "")],
        ["Temps de travail actif mesuré", duree(actifTotal()) + " en " + A.sessions.length + " session" + (A.sessions.length > 1 ? "s" : "")],
        ["Caractères tapés au clavier", String(sa.tapes)],
        ["Caractères collés", '<span class="' + (pc >= 30 ? "alerte" : "") + '">' + sa.colles + " (" + pc + " % du texte saisi) en " + sa.nb_collages + " collage" + (sa.nb_collages > 1 ? "s" : "") + "</span>"],
        ["Corrections du nom", A.corrections_nom.length ? A.corrections_nom.map(function (c) { return esc(c.avant) + " → " + esc(c.apres) + " (" + fr(c.t) + ")"; }).join("<br>") : "aucune"],
        ["Tentatives d'impression refusées", A.refus.length ? '<span class="alerte">' + A.refus.map(function (c) { return esc(c.nom) + " (" + fr(c.t) + ")"; }).join("<br>") + "</span>" : "aucune"],
        ["Empreinte des réponses", "<b>" + empreinte() + "</b>"]
      ];
      var col = sa.collages.filter(function (c) { return c.car >= 20; });
      recap.innerHTML = "<h2>Attestation de travail — " + esc(opts.fichier) + "</h2>" +
        "<p>Page produite automatiquement par la fiche en ligne au moment de la création du PDF. Elle ne se remplit pas à la main.</p>" +
        "<table>" + lignes.map(function (l) { return "<tr><th>" + l[0] + "</th><td>" + l[1] + "</td></tr>"; }).join("") + "</table>" +
        (col.length ? "<p><b>Détail des collages de 20 caractères ou plus</b></p><table><tr><th style=\"width:30%\">Case</th><th style=\"width:20%\">Caractères</th><th>Moment</th></tr>" +
          col.map(function (c) { return "<tr><td>" + esc(c.champ) + "</td><td>" + c.car + (c.glisse ? " (glissé)" : "") + "</td><td>" + fr(c.t) + "</td></tr>"; }).join("") + "</table>" : "") +
        blocDonnees(pdfIso) +
        '<p class="note">L\'empreinte est calculée à partir de l\'identifiant, de l\'auteur et des réponses : le professeur peut la recalculer depuis le fichier .json pour vérifier que ce PDF n\'a pas été modifié. Les collages comptent le texte copié depuis une autre page, un autre document ou une autre case.</p>';
    }
    function blocDonnees(pdfIso) { /* réponses case par case, lisibles par l'outil Correcteur du professeur */
      var et = opts.etat ? opts.etat() : { reponses: opts.reponses() }, r = {}, sa = A.saisie;
      r = sansImages(et.reponses);
      var d = { v: 1, app: opts.app || "", f: opts.fichier, id: A.id, au: A.auteur, el: et.eleve || {}, cr: A.cree, pdf: pdfIso, r: r, ve: et.versions || {}, e: empreinte(),
        st: { tp: sa.tapes, co: sa.colles, nc: sa.nb_collages, ac: Math.round(actifTotal()), se: A.sessions.length, rf: A.refus.length, cn: A.corrections_nom.length, js: A.json.nb, rp: A.reprises.length, sc: integre() ? 1 : 0 } };
      var b = btoa(unescape(encodeURIComponent(JSON.stringify(d)))), L = [], i, N = 96;
      for (i = 0; i < b.length; i += N) L.push(b.slice(i, i + N));
      var crc = sha256(b).slice(0, 8);
      return '<div class="auth-data"><p>Données de contrôle — lues automatiquement par l\'outil du professeur. Ne pas modifier.</p>' +
        '<div class="l">SICTRL1 ' + L.length + ' ' + crc + '</div>' + L.map(function (x, k) { return '<div class="l">' + String(k + 1).padStart(3, "0") + "|" + x + '</div>'; }).join("") + '<div class="l">SICTRL-FIN</div></div>';
    }
    function bloquer(msg) {
      refus.textContent = "Impression refusée — " + msg;
      document.documentElement.classList.add("auth-bloque");
    }

    var api = {
      /* au chargement d'un état (sauvegarde du navigateur, .json repris, tout effacé) */
      charger: function (auth, origine) {
        if (auth && auth.id && auth.auteur) {
          A = auth; ["corrections_nom", "reprises", "pdf", "sessions", "refus"].forEach(function (k) { if (!Array.isArray(A[k])) A[k] = []; });
          A.saisie = A.saisie || { tapes: 0, colles: 0, nb_collages: 0, collages: [] }; A.json = A.json || { premier: null, dernier: null, nb: 0 };
          if (origine === "fichier") A.reprises.push({ t: iso() });
        } else {
          A = vierge(origine === "efface" ? "" : (origine === "fichier" || origine === "navigateur") ? "Travail commencé avant la mise en place de l'attestation (19/11/2026) : historique antérieur inconnu." : "");
          fixer();
        }
        dernier = 0; activite();
      },
      exporter: function () { fixer(); return A; },
      surNom: function () { if (!A) return; fixer(); }, /* à appeler sur « change » des cases NOM / Prénom */
      surReponse: function () { if (A) fixer(); },
      surJson: function () { fixer(); A.json.nb++; A.json.dernier = iso(); if (!A.json.premier) A.json.premier = A.json.dernier; },
      ligne: function () {
        if (!A || !A.fige) return "";
        return "Auteur d'origine : " + A.auteur.nom.toUpperCase() + " " + A.auteur.prenom + " · travail commencé le " + fr(A.cree) + " · id " + A.id;
      },
      /* contrôle avant impression : renvoie "" si autorisé, sinon le message d'erreur */
      verifier: function () {
        fixer();
        if (!integre()) return "le fichier .json de ce travail a été modifié en dehors de la fiche (attestation invalide). Reprends ton propre fichier .json ou demande à ton professeur.";
        var e = etatNom();
        if (!e.ok) return "le nom du cartouche (« " + e.apres + " ») ne correspond pas à l'auteur de ce travail (« " + e.avant + " »). Un travail ne peut être imprimé qu'au nom de l'élève qui l'a commencé.";
        return "";
      },
      /* juste avant window.print() ou sur « beforeprint » : true si l'impression est autorisée */
      avantPdf: function () {
        document.documentElement.classList.remove("auth-bloque"); refus.textContent = "";
        var msg = api.verifier();
        if (msg) { A.refus.push({ nom: (opts.nom().toUpperCase() + " " + opts.prenom()).trim(), t: iso() }); bloquer(msg); return msg; }
        var e = etatNom();
        if (e.faute) { A.corrections_nom.push({ avant: e.avant, apres: e.apres, t: iso() }); A.auteur = { nom: opts.nom().trim(), prenom: opts.prenom().trim() }; A.sceau = sceau(A); }
        var t = iso(), prec = A.pdf[A.pdf.length - 1];
        if (prec && Date.now() - new Date(prec).getTime() < 5000) t = prec; /* même impression (événement reçu deux fois) */
        else { A.pdf.push(t); if (A.pdf.length > 40) A.pdf.shift(); }
        api.dernierPdf = t; construireRecap(t); return "";
      },
      noterRefus: function () { if (A) { A.refus.push({ nom: (opts.nom().toUpperCase() + " " + opts.prenom()).trim(), t: iso() }); if (A.refus.length > 30) A.refus.shift(); } },
      lignePdf: function () { return A && api.dernierPdf ? "PDF créé le " + fr(api.dernierPdf) + " · empreinte " + empreinte() : ""; },
      empreinte: function () { return A ? empreinte() : ""; },
      _sha256: sha256, _stable: stable
    };
    return api;
  };
  window.SI_AUTH.sha256 = sha256; window.SI_AUTH.stable = stable; window.SI_AUTH.SEL = SEL;
})();
