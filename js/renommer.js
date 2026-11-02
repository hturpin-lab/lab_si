/* ============================================================
   Outil « Renommer son document » (1re SI)
   Reprise de l'outil de préparation des rendus STI2D, adaptée :
   - pas de niveau ni de matière (1re SI uniquement) ;
   - types de travail = activités de la séquence en cours
     (data/sequences.js) + Compte rendu de TP, Devoir, Autre ;
   - nom : NOM_Prenom_Activite[_Precision][_NN].ext, comme l'export
     PDF des activités en ligne ;
   - 1 fichier : téléchargé renommé ; plusieurs : archive ZIP (JSZip) ;
   - lien de dépôt : SI_CONFIG.nuage (data/config.js), seul endroit
     où il se change.
   Tout se passe dans le navigateur : aucun fichier n'est envoyé.
   ============================================================ */
"use strict";
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var CFG = window.SI_CONFIG || {}, SEQ = window.SI_SEQUENCES || [];
  var TAILLE_MAX_MO = 200, LONGUEUR_MAX = 90, CLE = "si-renommer";
  var EXTENSIONS = [
    ".pdf", ".doc", ".docx", ".odt", ".txt", ".rtf", ".md",
    ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".svg", ".webp", ".heic",
    ".ppt", ".pptx", ".odp",
    ".xls", ".xlsx", ".ods", ".csv",
    ".zip", ".7z",
    ".mp3", ".mp4", ".mov", ".wav", ".m4a", ".webm",
    ".py", ".ino", ".html", ".css", ".js", ".json", ".sb3",
    ".stl", ".step", ".stp", ".3mf", ".f3d", ".obj", ".dxf",
    ".drawio", ".ggb"
  ];
  var AUTRES = [
    { code: "CR_TP", libelle: "Compte rendu de TP (Labrio)" },
    { code: "Devoir", libelle: "Devoir" },
    { code: "__AUTRE__", libelle: "Autre (je l'écris moi-même)" }
  ];
  var fichiers = [];   /* objets File, dans l'ordre de numérotation */

  /* ---------- nettoyage des noms (comme l'export PDF des activités) ---------- */
  function sansAccents(s) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[œ]/g, "oe").replace(/[Œ]/g, "OE").replace(/[æ]/g, "ae").replace(/[Æ]/g, "AE");
  }
  function nettoieNom(s) { return sansAccents(s).toUpperCase().trim().replace(/[\s'’]+/g, "-").replace(/[^A-Z0-9-]/g, "").replace(/-{2,}/g, "-").replace(/^-|-$/g, ""); }
  function nettoieMot(s) {
    s = sansAccents(s).trim().replace(/[\s'’]+/g, "-").replace(/[^A-Za-z0-9-]/g, "").replace(/-{2,}/g, "-").replace(/^-|-$/g, "");
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  }
  function nettoieLibre(s) {   /* « Mini projet drone » → « Mini_projet_drone » */
    s = sansAccents(s).trim().replace(/[\s'’-]+/g, "_").replace(/[^A-Za-z0-9_]/g, "").replace(/_{2,}/g, "_").replace(/^_|_$/g, "");
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : "";
  }
  function extension(nom) { var i = nom.lastIndexOf("."); return i > 0 ? nom.slice(i).toLowerCase() : ""; }
  function autorise(f) { return EXTENSIONS.indexOf(extension(f.name)) >= 0 && f.size <= TAILLE_MAX_MO * 1048576; }
  function raison(f) { return f.size > TAILLE_MAX_MO * 1048576 ? "trop volumineux (max " + TAILLE_MAX_MO + " Mo)" : "format non accepté (" + (extension(f.name) || "sans extension") + ")"; }
  function taille(o) {
    if (!o) return "0 o";
    var u = ["o", "Ko", "Mo", "Go"], i = Math.min(3, Math.floor(Math.log(o) / Math.log(1024)));
    return (o / Math.pow(1024, i)).toFixed(i ? 1 : 0).replace(".", ",") + " " + u[i];
  }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* ---------- liste des types de travail ---------- */
  function sequenceEnCours() {
    var auj = new Date().toISOString().slice(0, 10), avec = SEQ.filter(function (s) { return (s.seances || []).length; });
    return avec.filter(function (s) { return s.etat === "en-ligne"; })[0] ||
      avec.filter(function (s) { return s.debut <= auj && auj <= s.fin; })[0] || avec[avec.length - 1] || null;
  }
  function codeActivite(a) {   /* même code que l'export PDF : nom du PDF sans extension */
    if (a.pdf) return a.pdf.replace(/^.*\//, "").replace(/\.pdf$/i, "");
    return nettoieLibre(a.titre);
  }
  function remplitTypes() {
    var sel = $("#r-type"), s = sequenceEnCours(), html = '<option value="">— Choisis —</option>', vus = {};
    if (s) {
      html += '<optgroup label="' + esc(s.num + " · " + s.court + " (séquence en cours)") + '">';
      (s.seances || []).forEach(function (se) { (se.activites || []).forEach(function (a) {
        var c = codeActivite(a); if (!c || vus[c]) return; vus[c] = 1;
        html += '<option value="' + esc(c) + '">' + esc(a.titre) + "</option>";
      }); });
      html += "</optgroup>";
    }
    html += '<optgroup label="Autres travaux">' + AUTRES.map(function (a) { return '<option value="' + a.code + '">' + esc(a.libelle) + "</option>"; }).join("") + "</optgroup>";
    sel.innerHTML = html;
  }

  /* ---------- construction du nom ---------- */
  function activite() {
    var v = $("#r-type").value;
    return v === "__AUTRE__" ? nettoieLibre($("#r-autre").value) : v;
  }
  function base() {
    var n = nettoieNom($("#r-nom").value), p = nettoieMot($("#r-prenom").value), a = activite(), pr = nettoieMot($("#r-precision").value);
    if (!n || !p || !a) return null;
    var b = n + "_" + p + "_" + a + (pr ? "_" + pr : "");
    return b.length > LONGUEUR_MAX ? b.slice(0, LONGUEUR_MAX) : b;
  }
  function valides() { return fichiers.filter(autorise); }
  function nomFinal(f) {
    var b = base(), v = valides(); if (!b || !autorise(f)) return null;
    return b + (v.length > 1 ? "_" + String(v.indexOf(f) + 1).padStart(2, "0") : "") + extension(f.name);
  }
  function manque() {
    var m = [];
    if (!nettoieNom($("#r-nom").value)) m.push("ton nom");
    if (!nettoieMot($("#r-prenom").value)) m.push("ton prénom");
    if (!activite()) m.push($("#r-type").value === "__AUTRE__" ? "le nom du travail" : "le type de travail");
    return m;
  }

  /* ---------- affichage ---------- */
  var ICO = {
    haut: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 10l4-4 4 4"/></svg>',
    bas: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>',
    sup: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8"/></svg>'
  };
  function rafraichit() {
    var v = valides(), total = fichiers.length, ko = total - v.length, poids = 0, b = base();
    fichiers.forEach(function (f) { poids += f.size; });
    $("#r-compteurs").hidden = !total;
    $("#r-nb-ok").textContent = v.length; $("#r-nb-ko").textContent = ko; $("#r-ko-bloc").hidden = !ko; $("#r-poids").textContent = taille(poids);

    $("#r-liste").innerHTML = fichiers.map(function (f, i) {
      var ok = autorise(f), nf = nomFinal(f), rang = ok ? String(v.indexOf(f) + 1).padStart(2, "0") : "—";
      return '<li class="fic' + (ok ? "" : " refuse") + '"><span class="rang" aria-hidden="true">' + rang + "</span>" +
        '<div class="infos"><div class="nouveau">' + (ok ? (nf ? esc(nf) : '<span class="attente">nom à compléter</span>') : "Refusé : " + esc(raison(f))) + "</div>" +
        '<div class="ancien">' + esc(f.name) + " · " + taille(f.size) + "</div></div>" +
        '<div class="outils-f">' +
        '<button type="button" class="mini" data-act="haut" data-i="' + i + '" aria-label="Monter ' + esc(f.name) + '"' + (i ? "" : " disabled") + ">" + ICO.haut + "</button>" +
        '<button type="button" class="mini" data-act="bas" data-i="' + i + '" aria-label="Descendre ' + esc(f.name) + '"' + (i < total - 1 ? "" : " disabled") + ">" + ICO.bas + "</button>" +
        '<button type="button" class="mini" data-act="sup" data-i="' + i + '" aria-label="Retirer ' + esc(f.name) + '">' + ICO.sup + "</button></div></li>";
    }).join("");

    var ap = $("#r-apercu"), m = manque();
    if (!b) {
      ap.innerHTML = '<code class="gris">NOM_Prenom_Activite.ext</code><span>Complète ' + esc(m.join(", ").replace(/, ([^,]*)$/, " et $1")) + ".</span>";
    } else if (!v.length) {
      ap.innerHTML = "<code>" + esc(b) + '<i>.ext</i></code><span>Ajoute au moins un fichier à l\'étape 03.</span>';
    } else {
      var lignes = v.slice(0, 5).map(function (f) { return "<code>" + esc(nomFinal(f)) + "</code>"; }).join("");
      ap.innerHTML = lignes + (v.length > 5 ? "<span>… et " + (v.length - 5) + " autre(s)</span>" : "") +
        (v.length > 1 ? "<span>Ces " + v.length + " fichiers seront regroupés dans <b>" + esc(b) + ".zip</b>.</span>" : "<span>Le fichier sera téléchargé directement, renommé.</span>");
    }
    var g = $("#r-generer");
    g.disabled = !(b && v.length);
    g.textContent = v.length > 1 ? "Générer le ZIP (" + v.length + " fichiers)" : "Télécharger le fichier renommé";
    $("#r-nom-aide").textContent = nettoieNom($("#r-nom").value) ? "Sera écrit : " + nettoieNom($("#r-nom").value) : "Obligatoire";
    $("#r-prenom-aide").textContent = nettoieMot($("#r-prenom").value) ? "Sera écrit : " + nettoieMot($("#r-prenom").value) : "Obligatoire";
  }
  function message(t) { $("#r-msg").textContent = t; }

  /* ---------- fichiers ---------- */
  function ajoute(liste) {
    var n = 0;
    Array.prototype.forEach.call(liste || [], function (f) {
      if (fichiers.some(function (x) { return x.name === f.name && x.size === f.size && x.lastModified === f.lastModified; })) return;
      fichiers.push(f); n++;
    });
    var ko = Array.prototype.filter.call(liste || [], function (f) { return !autorise(f); }).length;
    message(n ? n + " fichier(s) ajouté(s)" + (ko ? ", dont " + ko + " refusé(s)." : ".") : "");
    rafraichit();
  }

  /* ---------- téléchargement ---------- */
  function telecharge(blob, nom) {
    var url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = nom; document.body.appendChild(a); a.click();
    document.body.removeChild(a); setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }
  function generer() {
    var v = valides(), b = base(), g = $("#r-generer");
    if (!b || !v.length) return;
    sauve();
    if (v.length === 1) { telecharge(v[0], nomFinal(v[0])); message("Fichier téléchargé : " + nomFinal(v[0]) + ". Dépose-le maintenant sur le Nuage (étape 05)."); return; }
    if (!window.JSZip) { message("Création du ZIP impossible (bibliothèque manquante). Ajoute un seul fichier à la fois."); return; }
    var zip = new window.JSZip(), pris = {};
    v.forEach(function (f) { var nm = nomFinal(f), k = 1; while (pris[nm]) { nm = nomFinal(f).replace(/(\.[^.]*)?$/, "-" + (++k) + "$1"); } pris[nm] = 1; zip.file(nm, f); });
    g.disabled = true; g.textContent = "Création du ZIP…";
    zip.generateAsync({ type: "blob", compression: "DEFLATE" }).then(function (blob) {
      telecharge(blob, b + ".zip");
      message(v.length + " fichiers renommés dans " + b + ".zip. Dépose ce ZIP sur le Nuage (étape 05).");
      rafraichit();
    }, function () { message("La création du ZIP a échoué. Réessaie avec moins de fichiers."); rafraichit(); });
  }

  /* ---------- mémorisation du nom (ce navigateur seulement) ---------- */
  function sauve() { try { localStorage.setItem(CLE, JSON.stringify({ nom: $("#r-nom").value, prenom: $("#r-prenom").value })); } catch (e) { } }
  function restaure() { try { var d = JSON.parse(localStorage.getItem(CLE) || "{}"); $("#r-nom").value = d.nom || ""; $("#r-prenom").value = d.prenom || ""; } catch (e) { } }

  /* ---------- branchements ---------- */
  remplitTypes();
  restaure();
  var pa = new URLSearchParams(location.search).get("a");   /* ?a=TP_Joule : activité présélectionnée */
  if (pa && $('#r-type option[value="' + pa.replace(/[^A-Za-z0-9_-]/g, "") + '"]')) $("#r-type").value = pa;
  $("#r-max").textContent = TAILLE_MAX_MO + " Mo";

  ["#r-nom", "#r-prenom", "#r-autre", "#r-precision"].forEach(function (s) { $(s).addEventListener("input", function () { rafraichit(); if (s === "#r-nom" || s === "#r-prenom") sauve(); }); });
  $("#r-type").addEventListener("change", function () { var autre = this.value === "__AUTRE__"; $("#r-autre-champ").hidden = !autre; if (autre) $("#r-autre").focus(); rafraichit(); });

  var zone = $("#r-depose"), input = $("#r-fichiers");
  $("#r-choisir").addEventListener("click", function (e) { e.stopPropagation(); input.click(); });
  zone.addEventListener("click", function (e) { if (!e.target.closest("button")) input.click(); });
  input.addEventListener("change", function () { ajoute(input.files); input.value = ""; });
  ["dragenter", "dragover"].forEach(function (ev) { zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add("survol"); }); });
  ["dragleave", "drop"].forEach(function (ev) { zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove("survol"); }); });
  zone.addEventListener("drop", function (e) { ajoute(e.dataTransfer && e.dataTransfer.files); });

  $("#r-liste").addEventListener("click", function (e) {
    var b = e.target.closest("button.mini"); if (!b) return;
    var i = +b.dataset.i, act = b.dataset.act;
    if (act === "sup") fichiers.splice(i, 1);
    if (act === "haut" && i > 0) fichiers.splice(i - 1, 0, fichiers.splice(i, 1)[0]);
    if (act === "bas" && i < fichiers.length - 1) fichiers.splice(i + 1, 0, fichiers.splice(i, 1)[0]);
    rafraichit();
    var cible = $('#r-liste button[data-act="' + act + '"][data-i="' + (act === "haut" ? i - 1 : act === "bas" ? i + 1 : i) + '"]:not([disabled])') || $("#r-choisir");
    cible.focus();
  });
  $("#r-vider").addEventListener("click", function () { fichiers = []; message("Liste des fichiers vidée."); rafraichit(); $("#r-choisir").focus(); });
  $("#r-generer").addEventListener("click", generer);
  $("#r-reinit").addEventListener("click", function () {
    fichiers = []; $("#r-type").value = ""; $("#r-autre").value = ""; $("#r-precision").value = ""; $("#r-autre-champ").hidden = true;
    message("Formulaire réinitialisé (ton nom et ton prénom sont gardés)."); rafraichit();
  });

  var depot = $("#r-depot");
  if (CFG.nuage) depot.href = CFG.nuage;
  else { depot.hidden = true; $("#r-depot-absent").hidden = false; }

  rafraichit();
})();
