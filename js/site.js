/* S.I — Sciences de l'Ingénieur · moteur de la page d'accueil
   (tuiles, rail des séquences, panneau à onglets, ancre #s3/activites) */
"use strict";
(function () {
  var CFG = window.SI_CONFIG || {}, SEQ = window.SI_SEQUENCES || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
  var MOIS_C = ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛT", "SEP", "OCT", "NOV", "DÉC"];

  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function dateFr(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ""); return m ? (+m[3]) + " " + MOIS[+m[2] - 1] + " " + m[1] : ""; }
  function dateCourte(iso) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ""); return m ? (+m[3]) + " " + MOIS[+m[2] - 1] : ""; }
  function jj(iso) { return (iso || "").slice(8, 10); }
  function mm(iso) { var m = +(iso || "").slice(5, 7); return MOIS_C[m - 1] || ""; }
  function aujourdhui() { var d = new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

  /* ---------- séquence en cours (à la date du jour) ---------- */
  var JOUR = aujourdhui();
  function sequenceEnCours() {
    var i, s;
    for (i = 0; i < SEQ.length; i++) { s = SEQ[i]; if (JOUR >= s.debut && JOUR <= s.fin) return s; }
    for (i = 0; i < SEQ.length; i++) { s = SEQ[i]; if (JOUR < s.debut) return i > 0 ? SEQ[i - 1] : s; }
    return SEQ[SEQ.length - 1];
  }
  var EN_COURS = sequenceEnCours();

  /* ---------- tuiles (ressources, outils) ---------- */
  function logo(cle, alt) {
    var l = (CFG.logos || {})[cle] || {}, badge = esc(l.badge || cle.slice(0, 3).toUpperCase());
    if (!l.fichier) return '<span class="med"><b>' + badge + '</b></span>';
    return '<span class="med l-' + esc(cle) + '" data-badge="' + badge + '"><img src="' + esc(l.fichier) + '" alt="' + esc(alt) + '" loading="lazy"></span>';
  }
  function tuile(o) {
    var off = !o.href && !o.liens, href = off ? "#" : (o.href || "#"), ext = /^https?:/.test(href) || !!o.liens;
    var corps = '<span class="bar" data-ref="' + esc(o.ref) + '"><span class="txt"><h3>' + esc(o.titre) + (ext ? '<span class="ext" title="lien externe" aria-label="(lien externe)">↗</span>' : "") + "</h3><p>" + esc(off ? (o.off || "Bientôt") : o.sous) + "</p>" +
      (o.liens ? '<span class="liens">' + o.liens.map(function (l) { return '<a class="tag" href="' + esc(l.href) + '" target="_blank" rel="noopener noreferrer">' + esc(l.t) + "</a>"; }).join("") + "</span>" : "") + "</span></span>";
    if (o.liens) return '<div class="tile multi" data-ref="' + esc(o.ref) + '">' + logo(o.logo, o.titre + " (logo)") + corps + "</div>";
    return '<a class="tile' + (off ? " off" : "") + '" href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : "") + (off ? ' aria-disabled="true" tabindex="-1"' : "") + ">" + logo(o.logo, o.titre + " (logo)") + corps + "</a>";
  }
  function rendreTuiles() {
    var drive = CFG.drive || "#sequences";
    $("#tuiles-ressources").innerHTML = [
      { ref: "R-01", logo: "documents", titre: "Documents en ligne", sous: CFG.drive ? "Les PDF de la classe sur le Drive" : "Les documents, séquence par séquence", href: drive },
      { ref: "R-02", logo: "tinkercad", titre: "Tinkercad", sous: "Circuits et 3D en ligne", href: CFG.tinkercad },
      { ref: "R-03", logo: "algorea", titre: "Concours Castor & Algoréa", sous: "Informatique et logique (France-ioi)", liens: [{ t: "Castor", href: CFG.castor }, { t: "Algoréa", href: CFG.algorea }] },
      { ref: "R-04", logo: "metice", titre: "Métice", sous: "ENT de l'académie — Hubix", href: CFG.metice, off: "Lien à venir" }
    ].map(tuile).join("");
    $("#tuiles-outils").innerHTML = [
      { ref: "T-01", logo: "renommer", titre: "Renommer son document", sous: "NOM_Prenom_Activite.pdf", href: "outils/renommer.html" },
      { ref: "T-02", logo: "nuage", titre: "Rendre son travail", sous: "Dépôt sur le Nuage de la classe", href: CFG.nuage },
      { ref: "T-03", logo: "labrio", titre: "Labrio — compte rendu", sous: "Rédiger un compte rendu de TP", href: CFG.labrio }
    ].map(tuile).join("");
    /* logo manquant → badge texte (jamais d'image cassée) */
    Array.prototype.forEach.call(document.querySelectorAll(".med img"), function (img) {
      img.addEventListener("error", function () { var s = img.parentNode; s.className = "med"; s.innerHTML = "<b>" + esc(s.getAttribute("data-badge")) + "</b>"; });
    });
    var ren = $('.tile[href="outils/renommer.html"] .med'); if (ren) { ren.className = "med svg"; ren.innerHTML = '<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 34h10l18-18-10-10L8 24z"/><path d="M22 10l10 10M8 40h32"/><path d="M30 38h6" stroke-dasharray="2 3"/></svg>'; }
  }

  /* ---------- rail ---------- */
  function rendreRail(actif) {
    $("#rail").innerHTML = SEQ.map(function (s) {
      var cls = s.id === actif ? " on" : (s.etat === "bientot" ? " bientot" : s.etat === "fait" ? " fait" : "");
      var etat = s.etat === "en-ligne" ? "en ligne" : s.etat === "fait" ? "faite" : "bientôt";
      return '<a href="#' + s.id + '" class="' + cls.trim() + '" data-seq="' + s.id + '"' + (s.id === actif ? ' aria-current="true"' : "") + "><b>" + esc(s.num) + "</b><span>" + esc(s.court) + "<small>" + dateCourte(s.debut) + " → " + dateCourte(s.fin) + "</small></span><span class=\"etat\">" + etat + "</span></a>";
    }).join("");
  }

  /* ---------- panneau ---------- */
  function lienDoc(d, texteLigne) {
    var h = "";
    if (d.ligne) h += '<a class="tag ligne" href="' + esc(d.ligne) + '">' + esc(texteLigne || "Faire en ligne") + "</a>";
    if (d.pdf) h += '<a class="tag" href="' + esc(d.pdf) + '" target="_blank" rel="noopener">' + ico("pdf") + "PDF</a>";
    if (d.drive) h += '<a class="tag" href="' + esc(d.drive) + '" target="_blank" rel="noopener noreferrer">' + icoDrive() + "Ouvrir sur le Drive</a>";
    (d.ressources || []).forEach(function (r) {
      /* fichiers à importer dans un logiciel (draw.io, classeur…) : téléchargement direct, pas d'ouverture dans le navigateur */
      var aTelecharger = !/\.pdf$/i.test(r.fichier);
      var nom = r.fichier.split("/").pop();
      h += aTelecharger
        ? '<a class="tag" href="' + esc(r.fichier) + '" download="' + esc(nom) + '" title="Télécharger ' + esc(nom) + '">⤓ ' + esc(r.titre) + "</a>"
        : '<a class="tag" href="' + esc(r.fichier) + '" target="_blank" rel="noopener">' + esc(r.titre) + "</a>";
    });
    if (!d.ligne && !d.pdf && !d.drive) h += '<span class="tag off">Bientôt</span>';
    return h;
  }
  function ico(cle) { var l = (CFG.logos || {})[cle]; return l && l.fichier ? '<img class="ico" src="' + esc(l.fichier) + '" alt="">' : ""; }
  function icoDrive() { return ico("drive"); }
  function ongletCours(s) {
    if (!s.cours.length) return '<p class="vide">Pas encore de fiche de cours en ligne pour cette séquence.</p>';
    return '<div class="liste">' + s.cours.map(function (c) {
      return '<div class="doc"><div><h4>' + esc(c.titre) + "</h4><small>" + esc(c.sous) + '</small></div><div class="liens">' + lienDoc(c) + "</div></div>";
    }).join("") + "</div>";
  }
  function ongletActivites(s) {
    var h = "", n = 0;
    s.seances.forEach(function (se) {
      var nbEtapes = se.activites.length;
      se.activites.forEach(function (a, k) {
        n++;
        var now = se.date === JOUR;
        /* ordre de travail dans la séance : étiquette « Étape k / N » dans le coin inférieur droit */
        var etape = nbEtapes > 1
          ? '<span class="etape' + (a.bonus ? " bonus" : "") + '" title="Ordre de travail dans la séance">' + (now && k === 0 ? "Commence ici · " : "") + "Étape " + (k + 1) + " / " + nbEtapes + (a.bonus ? " · si tu as fini" : "") + "</span>"
          : "";
        h += '<div class="act' + (now ? " now" : "") + (etape ? " avec-etape" : "") + '"><div class="d"><b>' + jj(se.date) + "</b>" + mm(se.date) + "</div><div><h4>" + esc(a.titre) + "</h4><small>" + esc(a.sous) + (a.duree ? " · " + esc(a.duree) : "") + '</small><div class="liens">' + lienDoc(a) + "</div></div>" + etape + "</div>";
      });
    });
    if (!n) return '<p class="vide">Les activités de cette séquence arriveront ici.</p>';
    return '<div class="acts">' + h + '</div><p class="note">« Faire en ligne » : tu complètes l\'activité dans ton navigateur, tu l\'exportes en PDF puis tu la déposes sur le Nuage. Ton travail est enregistré automatiquement dans ce navigateur.</p>';
  }
  function ongletEvaluations(s) {
    if (!s.evaluations.length) return '<p class="vide">Dates à venir.</p>';
    return '<div class="evals">' + s.evaluations.map(function (e) {
      return '<div class="eval"><div class="d act"><div class="d"><b>' + jj(e.date) + "</b>" + mm(e.date) + "</div></div><div><h4>" + esc(e.type) + " · " + esc(e.titre) + (e.duree ? " · " + esc(e.duree) : "") + "</h4><p>" + esc(e.info) + '</p><div class="comp">' + (e.competences || []).map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div></div></div>";
    }).join("") + '</div><p class="note">Les sujets et corrigés ne sont pas publiés sur ce site.</p>';
  }
  function progression(s) {
    var tot = s.seances.length, faites = s.seances.filter(function (se) { return se.date <= JOUR; }).length;
    return { tot: tot, faites: faites, pc: tot ? Math.round(100 * faites / tot) : 0 };
  }
  function rendrePanneau(s, onglet) {
    var p = $("#panneau"), pr = progression(s);
    var tabs = [["cours", "Cours"], ["activites", "Activités"], ["evaluations", "Évaluations"]];
    var h = '<span class="mono">' + esc(s.num) + " · " + dateFr(s.debut) + " → " + dateFr(s.fin) + (s.seances.length ? " · " + s.seances.length + " séances" : "") + "</span>";
    h += "<h3>" + esc(s.titre) + "</h3>";
    h += '<div class="meta comp">' + (s.competences || []).map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") +
      (CFG.drive && s.etat === "en-ligne" ? '<a class="tag" href="' + esc(CFG.drive) + '" target="_blank" rel="noopener noreferrer">' + icoDrive() + "Dossier Drive des PDF</a>" : "") + "</div>";
    if (s.etat === "en-ligne") h += '<div class="prog" role="progressbar" aria-valuemin="0" aria-valuemax="' + pr.tot + '" aria-valuenow="' + pr.faites + '" aria-label="Avancement de la séquence"><i data-w="' + pr.pc + '"></i></div><span class="prog-txt">séance ' + Math.min(pr.faites + (pr.faites < pr.tot ? 1 : 0), pr.tot) + " / " + pr.tot + "</span>";
    if (s.etat === "bientot") { h += '<p class="vide" style="margin-top:16px">Séquence à venir : les documents seront mis en ligne au moment voulu.</p>'; p.innerHTML = h; return; }
    if (s.etat === "fait" && !s.cours.length && !s.seances.length && !s.evaluations.length) { h += '<p class="vide" style="margin-top:16px">Séquence terminée. Ses ressources seront ajoutées ici plus tard.</p>'; p.innerHTML = h; return; }
    if (s.etat === "fait") h += '<p class="note" style="margin-top:10px">Séquence terminée : ses documents restent consultables ici pour réviser.</p>';
    h += '<div class="tabs" role="tablist">' + tabs.map(function (t) { return '<button type="button" role="tab" id="tab-' + t[0] + '" aria-selected="' + (t[0] === onglet) + '" aria-controls="pan-' + t[0] + '" data-onglet="' + t[0] + '">' + t[1] + "</button>"; }).join("") + "</div>";
    h += '<div role="tabpanel" id="pan-' + onglet + '" aria-labelledby="tab-' + onglet + '">' + (onglet === "cours" ? ongletCours(s) : onglet === "evaluations" ? ongletEvaluations(s) : ongletActivites(s)) + "</div>";
    p.innerHTML = h;
    var i = $(".prog i", p); if (i) setTimeout(function () { i.style.width = i.getAttribute("data-w") + "%"; }, 50);
    Array.prototype.forEach.call(p.querySelectorAll("[data-onglet]"), function (b) {
      b.addEventListener("click", function () { aller(s.id, b.getAttribute("data-onglet"), true); });
    });
  }

  /* ---------- routage par ancre : #s3 ou #s3/activites ---------- */
  var ETAT = { seq: null, onglet: "activites" };
  function lireHash() {
    var m = /^#(s\d)(?:\/(cours|activites|evaluations))?$/.exec(location.hash || "");
    return m ? { seq: m[1], onglet: m[2] || null } : null;
  }
  function aller(seq, onglet, pousser) {
    var s = SEQ.filter(function (x) { return x.id === seq; })[0] || EN_COURS;
    ETAT.seq = s.id; ETAT.onglet = onglet || ETAT.onglet || "activites";
    rendreRail(s.id); rendrePanneau(s, ETAT.onglet);
    var on = $("#rail a.on"); if (on && on.scrollIntoView && window.matchMedia && window.matchMedia("(max-width:1000px)").matches) { try { on.scrollIntoView({ block: "nearest", inline: "center" }); } catch (e) { } }
    var h = "#" + s.id + "/" + ETAT.onglet;
    if (pousser && location.hash !== h) { try { history.replaceState(null, "", h); } catch (e) { location.hash = h; } }
  }
  window.addEventListener("hashchange", function () {
    var r = lireHash(); if (!r) return;
    aller(r.seq, r.onglet || (r.seq === ETAT.seq ? ETAT.onglet : "activites"), false);
    var sec = $("#sequences"); if (sec) sec.scrollIntoView({ block: "start" });
  });
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest && ev.target.closest("#rail a[data-seq]");
    if (!a) return;
    ev.preventDefault(); aller(a.getAttribute("data-seq"), null, true);
  });

  /* ---------- démarrage ---------- */
  rendreTuiles();
  var sm = $("#sous-marque"); if (sm) sm.textContent = (CFG.classe || "1re SI") + " · " + (CFG.annee || "");
  var ha = $("#hero-annee"); if (ha) ha.textContent = CFG.annee || "";
  var ec = $("#en-cours");
  if (ec && EN_COURS) {
    var pr = progression(EN_COURS), lib = EN_COURS.etat === "en-ligne" ? "En cours · " + EN_COURS.num + " " + EN_COURS.court + (pr.tot ? " · séance " + Math.min(pr.faites + (pr.faites < pr.tot ? 1 : 0), pr.tot) + " / " + pr.tot : "") : "Prochaine séquence · " + EN_COURS.num + " " + EN_COURS.court;
    ec.querySelector("span").textContent = lib; ec.href = "#" + EN_COURS.id + "/activites";
  }
  var r0 = lireHash();
  aller(r0 ? r0.seq : EN_COURS.id, r0 && r0.onglet ? r0.onglet : "activites", false);
  if (r0) { var sec0 = $("#sequences"); if (sec0) setTimeout(function () { sec0.scrollIntoView({ block: "start" }); }, 80); }
})();
