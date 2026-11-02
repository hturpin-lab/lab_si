/* ============================================================
   S.I — Sciences de l'Ingénieur · MOTEUR COMMUN des activités en ligne
   Lit la description window.ACTIVITE (fichier data/activites/<id>.js),
   construit la page, gère : version type bac / reformulée (globale et
   par question), sauvegarde automatique (localStorage), enregistrement
   et reprise d'un fichier .json, export PDF (impression A4), dépôt Nuage,
   progression et sommaire. Aucune donnée n'est envoyée sur internet.

   Notation des textes (convertie par fmt) :
     **gras**      verbe d'action en tête de consigne
     _{x}  ^{x}    indice, exposant
     \frac{a}{b}   vraie fraction 2D      \sqrt{x}   racine 2D
   ============================================================ */
"use strict";
(function () {
  var A = window.ACTIVITE, CFG = window.SI_CONFIG || {};
  if (!A) return;
  var NUAGE = A.nuage || CFG.nuage || "", LOGO_NUAGE = (CFG.logos && CFG.logos.nuage && CFG.logos.nuage.fichier) ? '<img class="ico" src="../' + CFG.logos.nuage.fichier + '" alt="">' : "", APP = "si-activite-" + A.id, CLE = APP + "-v1";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- mise en forme des textes ---------- */
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function fmt(s) {
    if (s == null) return "";
    s = String(s);
    s = s.replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
    for (var i = 0; i < 3; i++) { s = s.replace(/_\{([^{}]*)\}/g, "<sub>$1</sub>").replace(/\^\{([^{}]*)\}/g, "<sup>$1</sup>"); }
    for (i = 0; i < 3; i++) {
      s = s.replace(/\\sqrt\{([^{}]*)\}/g, '<span class="sqrt"><i>√</i><span>$1</span></span>');
      s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, '<span class="fr"><span>$1</span><span>$2</span></span>');
    }
    return s;
  }
  var UNITES = ["W", "kW", "V", "A", "Ω", "%", "tr/min", "rad/s", "N·m", "N", "m/s", "J", "W·h", "A·h", "s", "min", "h", "sans unité"];

  /* ---------- champs ---------- */
  function champ(o) {
    /* o : {id, q, label, cls, ph, multi, num, liste, rows} */
    var a = ' id="' + esc(o.id) + '" data-champ="' + esc(o.id) + '" data-q="' + esc(o.q) + '" aria-label="' + esc(o.label || o.id) + '" autocomplete="off" spellcheck="false"';
    if (o.ph) a += ' placeholder="' + esc(o.ph) + '"';
    if (o.multi) return '<textarea class="rep auto ' + (o.cls || "") + '" rows="' + (o.rows || (/cel/.test(o.cls || "") ? 1 : 2)) + '"' + a + "></textarea>";
    if (o.num) return '<input type="text" inputmode="decimal" class="rep num ' + (o.cls || "") + '"' + a + ">";
    if (o.liste) a += ' list="' + o.liste + '"';
    return '<input type="text" class="rep ' + (o.cls || "") + '"' + a + ">";
  }
  var QUESTIONS = [], NOMQ = {}, SOMMAIRE = [], LIB = {};

  /* ---------- blocs ---------- */
  function bEncadre(b) {
    return '<section class="encadre ' + (b.cls || "") + '"' + (b.id ? ' id="' + esc(b.id) + '"' : "") + "><h2>" + fmt(b.titre) + "</h2>" + fmt(b.html) + "</section>";
  }
  function bDonnees(b) {
    var cols = b.cols || 2, h = '<div class="tab-wrap"><table class="donnees"' + (b.titre ? ' aria-label="' + esc(b.titre) + '"' : "") + ">";
    for (var i = 0; i < b.lignes.length; i += cols) {
      h += "<tr>";
      for (var j = 0; j < cols; j++) {
        var l = b.lignes[i + j];
        h += l ? "<td>" + fmt(l[0]) + "</td><td>" + fmt(l[1]) + "</td>" : '<td class="vide"></td><td class="vide"></td>';
      }
      h += "</tr>";
    }
    return h + "</table></div>";
  }
  function bFigure(b) {
    var img = b.svg ? b.svg : '<img class="fig-img" src="' + esc(b.src) + '" alt="' + esc(b.alt || "") + '"' + (b.largeur ? ' style="width:min(100%,' + esc(b.largeur) + ')"' : "") + ">";
    return '<figure' + (b.id ? ' id="' + esc(b.id) + '"' : "") + ">" + img + (b.legende ? "<figcaption>" + fmt(b.legende) + "</figcaption>" : "") + "</figure>";
  }
  function bLigne(b) { return '<div class="fig-ligne' + (b.inv ? " inv" : "") + '">' + b.blocs.map(function (x) { return "<div>" + rendre(x) + "</div>"; }).join("") + "</div>"; }
  function bBandeau(b) {
    SOMMAIRE.push({ id: b.id, titre: b.titre, qs: [] });
    return '<h2 class="bandeau" id="' + esc(b.id) + '">' + fmt(b.titre) + (b.duree ? ' <span class="duree">' + esc(b.duree) + "</span>" : "") + "<span>" + esc(b.comp || "") + "</span></h2>" + (b.cr ? cr(b.cr) : "");
  }
  function cr(partie) { return '<span class="cr no-print" title="Où réutiliser ce travail dans ton compte rendu (Labrio)">→ partie « ' + esc(partie) + " » du compte rendu</span>"; }
  function bQ(b) {
    QUESTIONS.push(b.id); NOMQ[b.id] = b.nom || b.lab; LIB[b.id] = b.lab;
    if (SOMMAIRE.length && !b.hors) SOMMAIRE[SOMMAIRE.length - 1].qs.push(b.id);
    var ref = b.ref || b.bac;
    return '<div class="q" id="q-' + esc(b.id) + '" data-qid="' + esc(b.id) + '" data-m="bac"><div class="q-tete"><span class="q-lab">' + esc(b.lab) + "</span>" +
      '<span class="bascule no-print" role="group" aria-label="Version de la question ' + esc(b.lab) + '"><button type="button" data-v="bac" aria-pressed="true">Type bac</button><button type="button" data-v="ref" aria-pressed="false">Reformulée</button></span></div>' +
      '<div class="q-texte"><div class="bac">' + fmt(b.bac) + '</div><div class="ref">' + fmt(ref) + "</div></div>" + (b.cr ? cr(b.cr) : "") + "</div>";
  }
  function bTableau3(b) {
    var h = '<div class="tab-wrap"><table class="rep3" aria-label="' + esc(b.titre || "Tableau de réponses") + '"><thead><tr><th>Q</th><th>Grandeur</th><th>Relation littérale</th><th>Application numérique</th><th>Résultat avec unité</th></tr></thead><tbody>';
    b.lignes.forEach(function (l) {
      var q = l.q || l.id, lab = l.lab || l.id;
      h += '<tr><td class="c-q" data-l="Question">' + esc(lab) + '</td><td class="c-g" data-l="Grandeur">' + fmt(l.grandeur) + "</td>" +
        '<td data-l="Relation littérale">' + champ({ id: l.id + "_relation", q: q, label: lab + " relation littérale", cls: "cel", multi: true }) + "</td>" +
        '<td data-l="Application numérique">' + champ({ id: l.id + "_application", q: q, label: lab + " application numérique", cls: "cel", multi: true }) + "</td>" +
        '<td data-l="Résultat avec unité"><span class="resu"><span class="sym">' + fmt(l.sym) + " =</span>" +
        champ({ id: l.id + "_valeur", q: q, label: lab + " résultat (nombre)", cls: "val", ph: "nombre", num: true }) +
        champ({ id: l.id + "_unite", q: q, label: lab + " unité", cls: "uni", ph: "unité", liste: "unites" }) + "</span></td></tr>";
    });
    return h + "</tbody></table></div>";
  }
  function bGrille(b) {
    var h = '<div class="tab-wrap"><table class="grille" aria-label="' + esc(b.titre || "Tableau à compléter") + '">';
    if (b.entetes) h += "<thead><tr>" + b.entetes.map(function (e) { return "<th>" + fmt(e) + "</th>"; }).join("") + "</tr></thead>";
    h += "<tbody>";
    b.lignes.forEach(function (l) {
      h += "<tr>" + l.map(function (c, j) {
        if (typeof c === "string") return '<td class="fixe' + (j === 0 ? "" : "") + '"' + (b.entetes ? ' data-l="' + esc(b.entetes[j].replace(/<[^>]+>/g, "")) + '"' : "") + ">" + fmt(c) + "</td>";
        if (c.txt !== undefined) return '<td class="' + (c.cls || "fixe") + '">' + fmt(c.txt) + "</td>";
        return "<td" + (b.entetes ? ' data-l="' + esc(b.entetes[j].replace(/<[^>]+>/g, "")) + '"' : "") + ">" + champ({ id: c.champ, q: c.q || b.q, label: c.label || (b.entetes ? b.entetes[j].replace(/<[^>]+>/g, "") : c.champ), cls: c.multi ? "cel" : "", multi: !!c.multi, num: !!c.num, ph: c.ph }) + "</td>";
      }).join("") + "</tr>";
    });
    return h + "</tbody></table></div>";
  }
  function bZone(b) {
    var id = b.id || (b.q + "_reponse");
    return '<div class="zone"' + (b.sans ? ' style="margin-left:0"' : "") + ">" + (b.label ? '<label class="zone-lab" for="' + esc(id) + '">' + fmt(b.label) + "</label>" : "") + (b.cr ? cr(b.cr) : "") +
      champ({ id: id, q: b.q, label: b.aria || b.label || (LIB[b.q] || b.q) + " réponse", multi: true, rows: b.lignes || 3, ph: b.ph || "Ta réponse rédigée…" }) + "</div>";
  }
  function bTrous(b) {
    /* [[id]] ou [[id|largeur]] dans le texte → champ en ligne */
    var n = 0, html = fmt(b.html).replace(/\[\[([A-Za-z0-9_]+)(?:\|(\d+))?\]\]/g, function (_, id, w) {
      n++; return champ({ id: id, q: b.q, label: (b.label || "Texte à trous") + " " + n, cls: "trou" }).replace('class="rep trou"', 'class="rep trou" style="width:' + (w || 90) + 'px"');
    });
    var corps = '<div class="trous">' + html + "</div>";
    if (b.titre) return '<section class="encadre ' + (b.cls || "") + '"' + (b.id ? ' id="' + esc(b.id) + '"' : "") + "><h2>" + fmt(b.titre) + "</h2>" + corps + "</section>";
    return b.cls ? '<div class="' + b.cls + '">' + corps + "</div>" : corps;
  }
  function bRetenir(b) {
    return '<section class="encadre retenir" id="' + esc(b.id || "retenir") + '"><h2>' + fmt(b.titre || "À retenir") + '</h2><p class="aide-ret no-print">' + fmt(b.aide || "Écris la relation ou le mot qui manque.") + '</p><div class="ret-grille">' +
      b.items.map(function (it, k) { return '<label class="ret">' + fmt(it[0]) + " :" + champ({ id: it[1] || ("retenir_" + k), q: b.q || "RET", label: "À retenir : " + it[0].replace(/<[^>]+>/g, ""), cls: "ret-c" }) + "</label>"; }).join("") + "</div></section>";
  }
  function bAutoeval(b) {
    return '<section class="encadre" id="autoeval"><h2>Auto-évaluation</h2><table class="autoeval"><thead><tr><th>Je sais…</th><th>non</th><th>à peu près</th><th>oui</th></tr></thead><tbody>' +
      b.items.map(function (t, k) { return "<tr><td>" + fmt(t) + "</td>" + ["non", "apeupres", "oui"].map(function (v) { return '<td><input type="radio" name="auto_' + k + '" value="' + v + '" class="rep-radio" data-champ="auto_' + k + '" data-q="AUTO" aria-label="' + esc(t.replace(/<[^>]+>/g, "")) + " : " + v + '"></td>'; }).join("") + "</tr>"; }).join("") +
      "</tbody></table></section>";
  }
  function bEtapes(b) { return '<ol class="etapes-num">' + b.items.map(function (t) { return "<li>" + fmt(t) + "</li>"; }).join("") + "</ol>"; }
  function bHtml(b) { return fmt(b.html); }
  function rendre(b) {
    switch (b.t) {
      case "encadre": return bEncadre(b); case "donnees": return bDonnees(b); case "figure": return bFigure(b); case "ligne": return bLigne(b);
      case "bandeau": return bBandeau(b); case "q": return bQ(b); case "tableau3": return bTableau3(b); case "grille": return bGrille(b);
      case "zone": return bZone(b); case "trous": return bTrous(b); case "retenir": return bRetenir(b); case "autoeval": return bAutoeval(b);
      case "etapes": return bEtapes(b); case "html": return bHtml(b); case "methode": return '<p class="methode">' + fmt(b.html) + "</p>";
      case "cr": return cr(b.partie);
      default: return "";
    }
  }

  /* ---------- construction de la page ---------- */
  function construire() {
    var corps = A.blocs.map(rendre).join("");
    var ITEMS = QUESTIONS.slice();
    var RENDRE = '<ol class="etapes"><li><button type="button" class="btn btn-jaune" data-action="pdf">1 · Enregistrer en PDF</button><span>Dans la fenêtre d\'impression, choisis <b>« Enregistrer au format PDF »</b> comme destination.</span></li>' +
      (NUAGE ? '<li><a class="btn btn-bleu" href="' + esc(NUAGE) + '" target="_blank" rel="noopener noreferrer">' + LOGO_NUAGE + '2 · Déposer mon PDF sur le Nuage</a><span>Dépose le fichier PDF dans le dossier de la classe.</span></li>' : "") + "</ol>";
    var som = SOMMAIRE.map(function (s) {
      return '<li><a href="#' + esc(s.id) + '">' + fmt(s.titre) + "</a>" + (s.qs.length ? '<ul class="som-q">' + s.qs.map(function (q) { return '<li><a href="#q-' + esc(q) + '" data-etat-q="' + esc(q) + '"><span class="pt" aria-hidden="true"></span>' + esc(NOMQ[q]) + "</a></li>"; }).join("") + "</ul>" : "") + "</li>";
    }).join("");
    var logo = '<img src="../assets/img/logo_si_128.png" alt="">';
    var cartouche = '<section class="carto" id="haut" aria-label="Cartouche"><div class="carto-g"><b>' + esc(A.classe || CFG.classe || "1re SI") + "</b><span>" + esc(A.seq || "") + '</span></div>' +
      '<div class="carto-m"><h1>' + fmt(A.titre) + "</h1><p>" + fmt(A.sous || "") + "</p></div>" +
      '<div class="carto-d"><label class="ce"><span>NOM</span><input type="text" id="e_nom" class="rep-e maj" data-eleve="nom" autocomplete="off" spellcheck="false" aria-label="Nom"></label>' +
      '<label class="ce"><span>Prénom</span><input type="text" id="e_prenom" class="rep-e" data-eleve="prenom" autocomplete="off" spellcheck="false" aria-label="Prénom"></label>' +
      '<div class="ce-ligne"><label class="ce"><span>Classe</span><input type="text" id="e_classe" class="rep-e" data-eleve="classe" value="1SI" autocomplete="off" aria-label="Classe"></label>' +
      '<label class="ce"><span>Date</span><input type="date" id="e_date" class="rep-e" data-eleve="date" aria-label="Date"></label></div></div></section>' +
      '<p class="version-imprimee print-only">Version des questions : <b id="vlib">type bac</b></p>';
    var rendreSec = '<section class="encadre rendre no-print" id="rendre"><h2>Rendre mon travail</h2>' + RENDRE + '<p class="petit">Garde aussi une copie modifiable : bouton <b>Enregistrer mon travail (.json)</b> (pour reprendre plus tard avec <b>Reprendre un travail</b>).</p></section>';
    var pied = '<footer class="pied-imp print-only"><span>' + (NUAGE ? "Dépôt de la classe : " + esc(NUAGE) : "") + "</span><span>S.I — Sciences de l'Ingénieur · " + esc(A.fichier) + "</span></footer>";

    document.body.innerHTML =
      '<header class="barre no-print"><div class="barre-in">' +
      '<a class="marque" href="../index.html#s3/activites">' + logo + "<span>S.I<small> · " + esc(A.court || A.fichier) + "</small></span></a>" +
      '<a class="retour" href="../index.html#' + esc(A.sequence || "s3") + '/activites">← Retour aux activités</a>' +
      '<nav class="actions" aria-label="Actions sur mon travail"><button type="button" class="btn" id="btn-json">Enregistrer mon travail (.json)</button><button type="button" class="btn" id="btn-reprendre">Reprendre un travail</button><input type="file" id="fichier" accept=".json,application/json" hidden>' +
      '<button type="button" class="btn btn-jaune" data-action="pdf">Exporter en PDF</button>' + (NUAGE ? '<a class="btn" href="' + esc(NUAGE) + '" target="_blank" rel="noopener noreferrer">' + LOGO_NUAGE + 'Déposer mon PDF</a>' : "") +
      '<button type="button" class="btn btn-danger" id="btn-effacer">Tout effacer</button></nav></div>' +
      '<div class="barre-2"><div class="barre-in"><span class="seg-lab">Version des questions :</span><span class="seg" id="seg-version" role="group" aria-label="Version de toutes les questions"><button type="button" data-v="bac" aria-pressed="true">Type bac</button><button type="button" data-v="ref" aria-pressed="false">Reformulée</button></span>' +
      '<span class="prog-mini" aria-hidden="true"><span class="piste"><i></i></span><span class="prog-n">0 / ' + ITEMS.length + '</span></span><span class="etat" id="etat" role="status" aria-live="polite"></span></div></div></header>' +
      '<div class="page"><main class="feuille" id="contenu">' + cartouche + corps + rendreSec + pied + "</main>" +
      '<aside class="cote no-print" aria-label="Sommaire et progression"><div class="boite"><h2>Progression</h2><div class="prog" id="prog-barre" role="progressbar" aria-label="Questions remplies" aria-valuemin="0" aria-valuemax="' + ITEMS.length + '" aria-valuenow="0"><i></i></div><p class="prog-txt"><b class="prog-n">0 / ' + ITEMS.length + '</b> questions remplies</p>' +
      '<p class="legende"><span class="pt" style="display:inline-block"></span> à faire · <span class="pt" style="display:inline-block;background:linear-gradient(90deg,#56677A 50%,#fff 50%)"></span> en cours · <span class="pt" style="display:inline-block;background:#2E7D32;border-color:#2E7D32"></span> remplie</p></div>' +
      '<details class="boite som-det" id="som-det" open><summary><h2>Sommaire</h2></summary><nav aria-label="Sommaire"><ul class="som">' + som + '</ul></nav></details><div class="boite b-rendre"><h2>Rendre mon travail</h2>' + RENDRE + "</div></aside></div>" +
      '<p class="pied no-print">S.I — Sciences de l\'Ingénieur · tes réponses restent dans ce navigateur : rien n\'est envoyé sur internet. <a href="../mentions.html">Mentions légales</a></p>' +
      '<div class="modal-fond" id="boite-effacer" role="dialog" aria-modal="true" aria-labelledby="eff-titre" hidden><div class="modal"><h2 id="eff-titre">Tout effacer ?</h2><p>Toutes tes réponses, ton nom et tes choix de version seront supprimés de ce navigateur. Un fichier .json déjà enregistré n\'est pas touché.</p><div class="modal-actions"><button type="button" class="b2" id="eff-non" data-defaut>Annuler</button><button type="button" class="b2 rouge" id="eff-oui">Oui, tout effacer</button></div></div></div>' +
      '<div class="aide-pdf" id="boite-pdf" role="dialog" aria-modal="true" aria-labelledby="pdf-titre" hidden><div class="modal" style="border-top-color:var(--jaune)"><h2 id="pdf-titre">Enregistrer en PDF</h2><p>Dans la fenêtre qui va s\'ouvrir :</p><ol style="margin:0 0 14px;padding-left:20px"><li>Destination : choisis <b>« Enregistrer au format PDF »</b> (pas une imprimante).</li><li>Dans « Plus de paramètres », décoche <b>En-têtes et pieds de page</b>.</li><li>Clique sur <b>Enregistrer</b> : le nom proposé est <b id="pdf-nom">NOM_Prenom_' + esc(A.fichier) + '</b>.</li></ol>' + (NUAGE ? "<p>Ensuite : <b>Déposer mon PDF</b> sur le Nuage.</p>" : "") + '<div class="modal-actions"><button type="button" class="b2" id="pdf-non">Annuler</button><button type="button" class="b2" id="pdf-oui" data-defaut style="background:var(--jaune);border-color:var(--jaune)">Ouvrir la fenêtre d\'impression</button></div></div></div>' +
      '<div class="toast" id="toast" role="status" aria-live="polite" hidden></div>' +
      '<datalist id="unites">' + UNITES.map(function (u) { return '<option value="' + esc(u) + '">'; }).join("") + "</datalist>";
    return ITEMS;
  }
  var ITEMS = construire();
  document.title = A.fichier;

  /* ---------- logique (dérivée du TD Perceuse interactif) ---------- */
  var champs = $$(".rep"), eleves = $$(".rep-e"), radios = $$(".rep-radio"), questions = $$(".q");
  var stockage = true, minuteur = null;

  function aujourdhui() { var d = new Date(), m = String(d.getMonth() + 1).padStart(2, "0"), j = String(d.getDate()).padStart(2, "0"); return d.getFullYear() + "-" + m + "-" + j; }
  function dateFr(v) { var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ""); return m ? m[3] + "/" + m[2] + "/" + m[1] : (v || ""); }
  function sansAccents(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function nomFichier() {
    var n = sansAccents($("#e_nom").value).toUpperCase().trim().replace(/\s+/g, "-").replace(/[^A-Z0-9-]/g, "");
    var p = sansAccents($("#e_prenom").value).trim().replace(/\s+/g, "-").replace(/[^A-Za-z0-9-]/g, "");
    if (p) p = p.charAt(0).toUpperCase() + p.slice(1);
    return (n || "NOM") + "_" + (p || "Prenom") + "_" + A.fichier;
  }
  function majTitre() { document.title = nomFichier(); }

  /* miroirs pour l'impression */
  function creerMiroirs() {
    champs.concat(eleves).forEach(function (el) {
      var s = document.createElement("span"); s.className = "imp" + (el.tagName === "TEXTAREA" ? " bloc" : ""); s.setAttribute("aria-hidden", "true");
      el.parentNode.insertBefore(s, el.nextSibling); el._imp = s;
    });
  }
  function majMiroir(el) {
    if (!el._imp) return;
    var v = el.value; if (el.type === "date") v = dateFr(v); if (el.classList.contains("maj")) v = v.toUpperCase();
    el._imp.textContent = v; el._imp.classList.toggle("vide", !v.trim());
  }
  function autoTaille(t) { t.style.height = "auto"; t.style.height = (t.scrollHeight + 2) + "px"; }

  /* versions */
  function poserVersion(q, v) { q.dataset.m = v; $$(".bascule button", q).forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.v === v)); }); }
  function majVersionGlobale() {
    var vs = questions.map(function (q) { return q.dataset.m; });
    var tousBac = vs.every(function (v) { return v === "bac"; }), tousRef = vs.every(function (v) { return v === "ref"; });
    $$("#seg-version button").forEach(function (b) { b.setAttribute("aria-pressed", String((b.dataset.v === "bac" && tousBac) || (b.dataset.v === "ref" && tousRef))); });
    $("#vlib").textContent = tousBac ? "type bac" : tousRef ? "reformulée" : "mixte (type bac ou reformulée selon les questions)";
  }

  /* état */
  function lireEtat() {
    var e = { app: APP, version: 1, enregistre: new Date().toISOString(), eleve: {}, versions: {}, reponses: {} };
    eleves.forEach(function (el) { e.eleve[el.dataset.eleve] = el.value; });
    questions.forEach(function (q) { e.versions[q.dataset.qid] = q.dataset.m; });
    champs.forEach(function (el) { if (el.value) e.reponses[el.dataset.champ] = el.value; });
    radios.forEach(function (r) { if (r.checked) e.reponses[r.dataset.champ] = r.value; });
    return e;
  }
  function appliquerEtat(e) {
    e = e || {}; var el = e.eleve || {}, r = e.reponses || {}, v = e.versions || {};
    eleves.forEach(function (x) { var k = x.dataset.eleve; x.value = (typeof el[k] === "string") ? el[k] : (k === "classe" ? "1SI" : k === "date" ? aujourdhui() : ""); });
    questions.forEach(function (q) { poserVersion(q, v[q.dataset.qid] === "ref" ? "ref" : "bac"); });
    champs.forEach(function (x) { x.value = (typeof r[x.dataset.champ] === "string") ? r[x.dataset.champ] : ""; });
    radios.forEach(function (x) { x.checked = r[x.dataset.champ] === x.value; });
    toutRafraichir();
  }
  function toutRafraichir() {
    champs.concat(eleves).forEach(function (x) { majMiroir(x); if (x.tagName === "TEXTAREA") autoTaille(x); if (x.classList.contains("num")) verifNombre(x); });
    majVersionGlobale(); majProgression(); majTitre();
  }
  function sauver() {
    if (!stockage) return;
    try { localStorage.setItem(CLE, JSON.stringify(lireEtat())); var d = new Date(); etat("Sauvegarde automatique · " + String(d.getHours()).padStart(2, "0") + " h " + String(d.getMinutes()).padStart(2, "0")); }
    catch (err) { stockage = false; etat("Sauvegarde automatique indisponible : pense à « Enregistrer mon travail (.json) »."); }
  }
  function sauverBientot() { clearTimeout(minuteur); minuteur = setTimeout(sauver, 400); }
  function etat(t) { $("#etat").textContent = t; }

  function verifNombre(el) {
    var v = el.value.trim(), ok = !v || /^[-−]?\s*\d[\d\s  ]*([.,]\d+)?(\s*[×x]\s*10\^?-?\d+)?$/.test(v);
    el.classList.toggle("a-verifier", !ok); el.setAttribute("aria-invalid", String(!ok));
    el.title = ok ? "" : "Écris seulement le nombre (ex. 12,5) ; l'unité va dans la case d'à côté.";
  }

  function majProgression() {
    var fait = 0;
    ITEMS.forEach(function (q) {
      var cs = champs.filter(function (c) { return c.dataset.q === q; });
      var n = cs.filter(function (c) { return c.value.trim() !== ""; }).length;
      var st = cs.length === 0 ? "vide" : n === 0 ? "vide" : n === cs.length ? "complet" : "partiel";
      if (st === "complet") fait++;
      $$('[data-etat-q="' + q + '"]').forEach(function (a) { a.dataset.etat = st; a.title = NOMQ[q] + " : " + (st === "vide" ? "non commencée" : st === "complet" ? "remplie" : "en cours (" + n + "/" + cs.length + " cases)"); });
    });
    var pc = ITEMS.length ? Math.round(100 * fait / ITEMS.length) : 0;
    $$(".piste i,.prog i").forEach(function (i) { i.style.width = pc + "%"; });
    $$(".prog-n").forEach(function (s) { s.textContent = fait + " / " + ITEMS.length; });
    var p = $("#prog-barre"); if (p) p.setAttribute("aria-valuenow", String(fait));
  }

  /* fichiers */
  function telecharger() {
    var e = lireEtat(), b = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(b); a.download = nomFichier() + ".json"; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
    message("Fichier « " + a.download + " » enregistré (dossier Téléchargements).");
  }
  function ouvrirFichier(f) {
    if (!f) return;
    var lr = new FileReader();
    lr.onload = function () {
      try { var e = JSON.parse(lr.result); if (!e || e.app !== APP) throw new Error("format"); appliquerEtat(e); sauver();
        message("Travail repris : " + ((e.eleve && ((e.eleve.nom || "") + " " + (e.eleve.prenom || "")).trim()) || "sans nom") + "."); }
      catch (err) { message("Ce fichier n'est pas un travail « " + A.fichier + " » enregistré avec cet outil."); }
    };
    lr.onerror = function () { message("Lecture du fichier impossible."); };
    lr.readAsText(f);
  }

  /* boîtes */
  var dernierFocus = null, tm = null;
  function ouvrirBoite(id) { dernierFocus = document.activeElement; var m = $(id); m.hidden = false; var b = $("[data-defaut]", m); if (b) b.focus(); }
  function fermerBoite(id) { $(id).hidden = true; if (dernierFocus && dernierFocus.focus) dernierFocus.focus(); }
  function message(t) { var m = $("#toast"); m.textContent = t; m.hidden = false; clearTimeout(tm); tm = setTimeout(function () { m.hidden = true; }, 4200); }
  function toutEffacer() {
    try { localStorage.removeItem(CLE); } catch (err) { }
    appliquerEtat({ eleve: { classe: "1SI", date: aujourdhui() } });
    fermerBoite("#boite-effacer"); message("Tout a été effacé."); window.scrollTo(0, 0);
  }
  function lancerPdf() {
    if (!$("#e_nom").value.trim() || !$("#e_prenom").value.trim()) { message("Écris d'abord ton NOM et ton prénom dans le cartouche."); $((!$("#e_nom").value.trim()) ? "#e_nom" : "#e_prenom").focus(); return; }
    $("#pdf-nom").textContent = nomFichier() + ".pdf"; ouvrirBoite("#boite-pdf");
  }
  function imprimer() { fermerBoite("#boite-pdf"); sauver(); majTitre(); toutRafraichir(); setTimeout(function () { window.print(); }, 60); }

  /* branchements */
  creerMiroirs();
  champs.concat(eleves).forEach(function (el) {
    el.addEventListener("input", function () { majMiroir(el); if (el.tagName === "TEXTAREA") autoTaille(el); if (el.classList.contains("num")) verifNombre(el); if (el.classList.contains("rep-e")) majTitre(); majProgression(); sauverBientot(); });
    el.addEventListener("change", function () { majMiroir(el); sauverBientot(); });
  });
  radios.forEach(function (r) { r.addEventListener("change", sauverBientot); });
  questions.forEach(function (q) { $$(".bascule button", q).forEach(function (b) { b.addEventListener("click", function () { poserVersion(q, b.dataset.v); majVersionGlobale(); sauverBientot(); }); }); });
  $$("#seg-version button").forEach(function (b) { b.addEventListener("click", function () { questions.forEach(function (q) { poserVersion(q, b.dataset.v); }); majVersionGlobale(); toutRafraichir(); sauverBientot(); }); });
  $$('[data-action="pdf"]').forEach(function (b) { b.addEventListener("click", lancerPdf); });
  $("#btn-json").addEventListener("click", telecharger);
  $("#btn-reprendre").addEventListener("click", function () { $("#fichier").click(); });
  $("#fichier").addEventListener("change", function () { ouvrirFichier(this.files[0]); this.value = ""; });
  $("#btn-effacer").addEventListener("click", function () { ouvrirBoite("#boite-effacer"); });
  $("#eff-non").addEventListener("click", function () { fermerBoite("#boite-effacer"); });
  $("#eff-oui").addEventListener("click", toutEffacer);
  $("#pdf-non").addEventListener("click", function () { fermerBoite("#boite-pdf"); });
  $("#pdf-oui").addEventListener("click", imprimer);
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape") { ["#boite-effacer", "#boite-pdf"].forEach(function (id) { if (!$(id).hidden) fermerBoite(id); }); } });
  $$(".modal-fond,.aide-pdf").forEach(function (f) { f.addEventListener("click", function (ev) { if (ev.target === f) fermerBoite("#" + f.id); }); });
  window.addEventListener("beforeprint", function () { majTitre(); champs.concat(eleves).forEach(majMiroir); });
  window.addEventListener("resize", function () { clearTimeout(window._rt); window._rt = setTimeout(function () { $$("textarea.rep").forEach(autoTaille); }, 150); });

  /* démarrage : reprise automatique */
  var e0 = null;
  try { var brut = localStorage.getItem(CLE); if (brut) e0 = JSON.parse(brut); } catch (err) { stockage = false; }
  if (e0 && e0.app === APP) { appliquerEtat(e0); etat("Travail repris automatiquement (sauvegarde de ce navigateur)."); }
  else { appliquerEtat({ eleve: { classe: "1SI", date: aujourdhui() } }); etat(stockage ? "Sauvegarde automatique activée." : "Sauvegarde automatique indisponible : pense à « Enregistrer mon travail (.json) »."); }
  try { if (window.matchMedia && window.matchMedia("(max-width:860px)").matches) $("#som-det").open = false; } catch (err) { }
  if (!$("#e_date").value) { $("#e_date").value = aujourdhui(); majMiroir($("#e_date")); }
  if (location.hash) { var cible = $(location.hash); if (cible) setTimeout(function () { cible.scrollIntoView(); }, 50); }
})();
