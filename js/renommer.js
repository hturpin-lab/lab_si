/* Outil « Renommer son document » : NOM_Prenom_Activite.ext */
"use strict";
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var CFG = window.SI_CONFIG || {}, SEQ = window.SI_SEQUENCES || [];
  function sansAccents(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, ""); }
  function nettoyer(s, maj) {
    s = sansAccents(s).trim().replace(/[\s']+/g, "-").replace(/[^A-Za-z0-9_-]/g, "");
    if (maj) return s.toUpperCase();
    return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
  }
  function activite(s) { return sansAccents(s).trim().replace(/[\s'’]+/g, "_").replace(/[^A-Za-z0-9_-]/g, ""); }
  function calc() {
    var n = nettoyer($("#nom").value, true) || "NOM", p = nettoyer($("#prenom").value) || "Prenom", a = activite($("#activite").value) || "Activite";
    var r = n + "_" + p + "_" + a + "." + $("#ext").value;
    $("#res").textContent = r; return r;
  }
  ["#nom", "#prenom", "#activite", "#ext"].forEach(function (s) { $(s).addEventListener("input", calc); $(s).addEventListener("change", calc); });
  $("#f").addEventListener("submit", function (e) { e.preventDefault(); });
  $("#copier").addEventListener("click", function () {
    var r = calc(), m = $("#msg");
    function fini(okk) { m.textContent = okk ? "Nom copié : " + r + " — colle-le avec Ctrl + V au moment de renommer." : "Copie automatique impossible : sélectionne le nom et copie-le avec Ctrl + C."; }
    try { navigator.clipboard.writeText(r).then(function () { fini(true); }, function () { fini(false); }); } catch (e) { fini(false); }
  });
  /* liste des activités connues (séquences en ligne) */
  var dl = $("#activites"), vus = {};
  SEQ.forEach(function (s) { (s.seances || []).forEach(function (se) { (se.activites || []).forEach(function (a) {
    var nom = a.ligne ? a.ligne.replace(/^.*\//, "").replace(/\.html$/, "") : (a.pdf ? a.pdf.replace(/^.*\//, "").replace(/\.pdf$/, "") : "");
    nom = nom.replace(/^td_/, "TD_").replace(/^tp_/, "TP_");
    if (nom && !vus[nom]) { vus[nom] = 1; var o = document.createElement("option"); o.value = nom; dl.appendChild(o); }
  }); }); });
  var ln = $("#lien-nuage"); if (ln) { if (CFG.nuage) { ln.href = CFG.nuage; ln.target = "_blank"; ln.rel = "noopener noreferrer"; } else { ln.replaceWith(document.createTextNode("Nuage de la classe")); } }
  calc();
})();
