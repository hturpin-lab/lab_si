/* ============================================================
   S.I — Export PDF direct (sans fenêtre d'impression)
   La fiche fabrique elle-même son PDF : pages A4 en image (html2canvas),
   pied de page en texte, données de contrôle jointes au PDF (pièce jointe
   « donnees_controle_SI.json ») pour l'outil Correcteur du professeur.
   Bibliothèques chargées à la demande depuis js/lib/ (aucun appel extérieur).
   ============================================================ */
"use strict";
(function () {
  var BASE = ((document.currentScript && document.currentScript.src) || "").replace(/[^\/]*$/, "");
  var MM = 96 / 25.4, MARGE = { h: 11, b: 12, g: 11, d: 11 }, LARG_MM = 210 - MARGE.g - MARGE.d, HAUT_MM = 297 - MARGE.h - MARGE.b;
  var W = Math.round(LARG_MM * MM), PH = Math.floor(HAUT_MM * MM), ECHELLE = 2;

  function charger(f) {
    return new Promise(function (ok, ko) {
      var ex = document.querySelector('script[data-si-lib="' + f + '"]');
      if (ex && ex.dataset.pret) return ok();
      var s = ex || document.createElement("script");
      s.addEventListener("load", function () { s.dataset.pret = "1"; ok(); });
      s.addEventListener("error", function () { ko(new Error("bibliothèque " + f + " introuvable")); });
      if (!ex) { s.src = BASE + f; s.dataset.siLib = f; document.head.appendChild(s); }
    });
  }
  function libs() {
    var L = [];
    if (!window.html2canvas) L.push(charger("lib/html2canvas.min.js"));
    if (!window.PDFLib) L.push(charger("lib/pdf-lib.min.js"));
    return Promise.all(L);
  }

  /* les règles @media print du site, recopiées sous html.pdf-gen (l'image est faite « comme à l'impression ») */
  function cssImpression() {
    if (document.getElementById("pdfgen-css")) return;
    var out = [];
    function pref(sel) {
      return sel.split(",").map(function (x) {
        x = x.trim();
        if (/^html\b/.test(x)) return x.replace(/^html/, "html.pdf-gen");
        if (/^:root\b/.test(x)) return x.replace(/^:root/, "html.pdf-gen");
        return "html.pdf-gen " + x;
      }).join(",");
    }
    function parcourir(regles, imp) {
      Array.prototype.forEach.call(regles || [], function (r) {
        if (r.type === 4) parcourir(r.cssRules, imp || (/print/.test(r.media.mediaText) && !/screen/.test(r.media.mediaText)));
        else if (r.type === 1 && imp && r.selectorText.indexOf("pdfgen") < 0) out.push(pref(r.selectorText) + "{" + r.style.cssText + "}");
      });
    }
    Array.prototype.forEach.call(document.styleSheets, function (f) { try { parcourir(f.cssRules, false); } catch (e) { } });
    out.push("html.pdf-gen,html.pdf-gen body{background:#fff!important}");
    out.push("html.pdf-gen .page{display:block!important;width:" + W + "px!important;max-width:none!important;margin:0!important;padding:0!important}");
    out.push("html.pdf-gen .feuille{width:" + W + "px!important;max-width:none!important;margin:0!important;padding:0!important;box-shadow:none!important;border:0!important}");
    var st = document.createElement("style"); st.id = "pdfgen-css"; st.textContent = out.join("\n"); document.head.appendChild(st);
  }

  /* découpage en pages A4 : on coupe au début d'un bloc, sans casser un bloc « insécable », et aux sauts de page imposés */
  function pagination(F) {
    var base = F.getBoundingClientRect().top, H = Math.ceil(F.getBoundingClientRect().height), cand = [], forces = [], evite = [];
    Array.prototype.forEach.call(F.querySelectorAll("*"), function (el) {
      var cs = getComputedStyle(el);
      if (cs.display === "none" || cs.position === "absolute" || cs.position === "fixed") return;
      var r = el.getBoundingClientRect(); if (!r.height) return;
      var t = r.top - base, b = r.bottom - base;
      if (/^(block|table|table-row|list-item|flex|grid|flow-root)$/.test(cs.display)) cand.push(Math.round(t));
      if (cs.breakBefore === "page" || cs.pageBreakBefore === "always") forces.push(Math.round(t));
      if ((cs.breakInside === "avoid" || cs.pageBreakInside === "avoid") && r.height < PH * 0.95) evite.push([t, b]);
    });
    cand = cand.filter(function (v, i, a) { return v > 0 && a.indexOf(v) === i; }).sort(function (a, b) { return a - b; });
    var pages = [], y = 0, garde = 0;
    while (y < H - 2 && garde++ < 200) {
      var lim = y + PH, coupe;
      var f = forces.filter(function (v) { return v > y + 5 && v <= lim; })[0];
      if (f !== undefined) coupe = f;
      else if (lim >= H) coupe = H;
      else {
        var c = cand.filter(function (v) { return v > y + PH * 0.35 && v <= lim; });
        var ok = c.filter(function (v) { return !evite.some(function (a) { return v > a[0] + 1 && v < a[1] - 1; }); });
        coupe = ok.length ? ok[ok.length - 1] : c.length ? c[c.length - 1] : lim;
      }
      pages.push([y, coupe]); y = coupe;
    }
    return pages;
  }

  /* texte du pied de page : seulement les caractères de la police PDF standard (WinAnsi) */
  var WINANSI = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";
  function ansi(t) { return String(t || "").replace(/[  ]/g, " ").split("").map(function (c) { var n = c.charCodeAt(0); return (n >= 32 && n <= 126) || (n >= 160 && n <= 255) || WINANSI.indexOf(c) >= 0 ? c : "?"; }).join(""); }
  function octets(dataUrl) { var b = atob(dataUrl.split(",")[1]), u = new Uint8Array(b.length); for (var i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u; }

  /* ---------- fenêtre de progression ---------- */
  var V = null;
  function voile() {
    if (V) return V;
    var st = document.createElement("style");
    st.textContent = ".pdfgen-voile{position:fixed;inset:0;z-index:9999;background:rgba(19,38,63,.92);display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans',Arial,sans-serif}" +
      ".pdfgen-boite{background:#fff;border-radius:12px;padding:22px 26px;width:min(460px,92vw);box-shadow:0 10px 40px rgba(0,0,0,.4);border-top:6px solid var(--jaune,#FFC21A)}" +
      ".pdfgen-boite h2{margin:0 0 6px;font-size:20px;color:#13263F}.pdfgen-boite p{margin:6px 0;color:#13263F;font-size:15px}" +
      ".pdfgen-barre{height:16px;background:#E3E9F0;border-radius:8px;overflow:hidden;margin:14px 0 4px}" +
      ".pdfgen-barre>div{height:100%;width:0;background:linear-gradient(90deg,#0b3f85,#2f7bd6);transition:width .25s}" +
      ".pdfgen-pct{font-size:13px;color:#56677A;text-align:right}" +
      ".pdfgen-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.pdfgen-actions[hidden],.pdfgen-boite [hidden]{display:none!important}" +
      ".pdfgen-btn{border:1px solid #b9c6d6;background:#fff;border-radius:8px;padding:9px 14px;font:inherit;font-size:15px;cursor:pointer;color:#13263F;text-decoration:none}" +
      ".pdfgen-btn.jaune{background:var(--jaune,#FFC21A);border-color:var(--jaune,#FFC21A);font-weight:600}" +
      ".pdfgen-lien{background:none;border:0;color:#56677A;text-decoration:underline;cursor:pointer;font:inherit;font-size:13px;padding:0;margin-top:12px}" +
      ".pdfgen-err{color:#C62828!important}@media print{.pdfgen-voile{display:none!important}}";
    document.head.appendChild(st);
    V = document.createElement("div"); V.className = "pdfgen-voile"; V.id = "pdfgen-voile"; V.setAttribute("role", "dialog"); V.setAttribute("aria-modal", "true");
    V.innerHTML = '<div class="pdfgen-boite"><h2 id="pdfgen-titre">Création de ton PDF…</h2><p id="pdfgen-msg">Patiente : ne ferme pas la page. La fenêtre pour enregistrer ton travail arrive juste après.</p>' +
      '<div class="pdfgen-barre" role="progressbar" aria-valuemin="0" aria-valuemax="100"><div id="pdfgen-prog"></div></div><p class="pdfgen-pct" id="pdfgen-pct">0 %</p>' +
      '<div class="pdfgen-actions" id="pdfgen-actions" hidden></div><button type="button" class="pdfgen-lien" id="pdfgen-secours">Ça ne marche pas ? Utiliser la fenêtre d\'impression</button></div>';
    document.body.appendChild(V);
    return V;
  }
  function progres(p, msg) {
    var b = document.getElementById("pdfgen-prog"); if (b) b.style.width = Math.round(p) + "%";
    var t = document.getElementById("pdfgen-pct"); if (t) t.textContent = Math.round(p) + " %";
    var r = V && V.querySelector('[role="progressbar"]'); if (r) r.setAttribute("aria-valuenow", Math.round(p));
    if (msg) document.getElementById("pdfgen-msg").textContent = msg;
  }
  function fermer() { if (V) { V.remove(); V = null; } }

  async function enregistrer(octetsPdf, nom) {
    var blob = new Blob([octetsPdf], { type: "application/pdf" });
    if (window.showSaveFilePicker) {
      try {
        var h = await window.showSaveFilePicker({ suggestedName: nom, types: [{ description: "Document PDF", accept: { "application/pdf": [".pdf"] } }] });
        var w = await h.createWritable(); await w.write(blob); await w.close(); return h.name || nom;
      } catch (e) { if (e && e.name === "AbortError") return null; }
    }
    var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = nom; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 2000);
    return nom + " (dossier Téléchargements)";
  }

  /* opts : { feuille, nom (fichier .pdf), titre, pied() → [ligne1, ligne2], donnees() → objet, imprimer() (secours), nuage (url) } */
  async function fabriquer(o) {
    progres(3, "Préparation…");
    await libs(); progres(10);
    cssImpression();
    window.dispatchEvent(new Event("beforeprint")); /* attestation, page récap, miroirs des réponses */
    if (document.documentElement.classList.contains("auth-bloque")) { window.dispatchEvent(new Event("afterprint")); throw new Error("bloque"); }
    document.documentElement.classList.add("pdf-gen");
    try {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
      await new Promise(function (r) { setTimeout(r, 80); });
      var F = o.feuille, R = F.getBoundingClientRect(), pages = pagination(F), images = [];
      for (var i = 0; i < pages.length; i++) {
        progres(12 + 73 * i / pages.length, "Page " + (i + 1) + " sur " + pages.length + "…");
        var h = Math.max(1, Math.round(pages[i][1] - pages[i][0]));
        var cv = await window.html2canvas(F, { scale: ECHELLE, x: 0, y: pages[i][0], width: W, height: h, windowWidth: Math.max(W + 40, document.documentElement.clientWidth),
          backgroundColor: "#ffffff", logging: false, useCORS: true, ignoreElements: function (el) { return el.id === "pdfgen-voile"; } });
        images.push({ url: cv.toDataURL("image/jpeg", 0.9), w: cv.width, h: cv.height });
      }
      progres(88, "Assemblage du PDF…");
      var P = window.PDFLib, doc = await P.PDFDocument.create(), police = await doc.embedFont(P.StandardFonts.Helvetica);
      var pt = 72 / 25.4, lignes = (o.pied ? o.pied() : []).map(ansi).filter(Boolean), d = o.donnees ? o.donnees() : null;
      doc.setTitle(ansi(o.titre || o.nom)); doc.setCreator("Site S.I — export direct"); doc.setProducer("Site S.I (pdf-lib)");
      if (d) { doc.setAuthor(ansi((d.au.nom || "").toUpperCase() + " " + (d.au.prenom || ""))); doc.setSubject(ansi("Données de contrôle jointes · empreinte " + d.e)); doc.setKeywords(["SICTRL1", d.e, d.f || ""]); }
      for (var k = 0; k < images.length; k++) {
        var img = await doc.embedJpg(octets(images[k].url)), pg = doc.addPage([595.28, 841.89]);
        var lw = LARG_MM * pt, lh = images[k].h / images[k].w * lw;
        pg.drawImage(img, { x: MARGE.g * pt, y: 841.89 - MARGE.h * pt - lh, width: lw, height: lh });
        var y0 = MARGE.b * pt - 12;
        lignes.forEach(function (l, j) {
          var taille = 6.5, larg = police.widthOfTextAtSize(l, taille);
          if (larg > lw) { taille = taille * lw / larg; larg = lw; }
          pg.drawText(l, { x: (595.28 - larg) / 2, y: y0 - j * 9, size: taille, font: police, color: P.rgb(0.34, 0.4, 0.48) });
        });
        var np = "Page " + (k + 1) + " / " + images.length;
        pg.drawText(np, { x: 595.28 - MARGE.d * pt - police.widthOfTextAtSize(np, 6.5), y: 841.89 - MARGE.h * pt + 14, size: 6.5, font: police, color: P.rgb(0.34, 0.4, 0.48) });
      }
      if (d) await doc.attach(new TextEncoder().encode(JSON.stringify(d)), "donnees_controle_SI.json",
        { mimeType: "application/json", description: "Données de contrôle (outil Correcteur S.I)", creationDate: new Date(), modificationDate: new Date() });
      progres(97);
      var out = await doc.save();
      progres(100, "Ton PDF est prêt (" + images.length + " page" + (images.length > 1 ? "s" : "") + ").");
      return out;
    } finally {
      document.documentElement.classList.remove("pdf-gen");
      window.dispatchEvent(new Event("afterprint"));
    }
  }

  window.SI_PDF = {
    lancer: async function (o) {
      voile(); progres(0);
      document.getElementById("pdfgen-secours").onclick = function () { fermer(); if (o.imprimer) o.imprimer(); };
      var act = document.getElementById("pdfgen-actions");
      try {
        var octetsPdf = await fabriquer(o);
        document.getElementById("pdfgen-titre").textContent = "Ton PDF est prêt";
        progres(100, "Clique sur « Enregistrer mon PDF » : la fenêtre pour l'enregistrer va s'ouvrir.");
        act.innerHTML = '<button type="button" class="pdfgen-btn jaune" id="pdfgen-ok">Enregistrer mon PDF</button><button type="button" class="pdfgen-btn" id="pdfgen-annuler">Annuler</button>';
        act.hidden = false; document.getElementById("pdfgen-ok").focus();
        document.getElementById("pdfgen-annuler").onclick = fermer;
        document.getElementById("pdfgen-ok").onclick = async function () {
          var nom = await enregistrer(octetsPdf, o.nom);
          if (!nom) return; /* fenêtre fermée sans enregistrer : on peut recommencer */
          document.getElementById("pdfgen-titre").textContent = "PDF enregistré ✓";
          progres(100, "Enregistré : " + nom + ". Dernière étape : dépose ce PDF sur le Nuage.");
          act.innerHTML = (o.nuage ? '<a class="pdfgen-btn jaune" href="' + o.nuage + '" target="_blank" rel="noopener noreferrer">Déposer mon PDF sur le Nuage</a>' : "") + '<button type="button" class="pdfgen-btn" id="pdfgen-fermer">Fermer</button>';
          document.getElementById("pdfgen-fermer").onclick = fermer;
          document.getElementById("pdfgen-secours").hidden = true;
        };
      } catch (e) {
        if (e && e.message === "bloque") { fermer(); return; }
        document.getElementById("pdfgen-titre").textContent = "Le PDF n'a pas pu être créé";
        var m = document.getElementById("pdfgen-msg"); m.textContent = "Utilise la fenêtre d'impression (lien ci-dessous) et choisis « Enregistrer au format PDF ». (" + (e && e.message || e) + ")"; m.className = "pdfgen-err";
        act.innerHTML = '<button type="button" class="pdfgen-btn" id="pdfgen-fermer">Fermer</button>'; act.hidden = false;
        document.getElementById("pdfgen-fermer").onclick = fermer;
      }
    }
  };
})();
