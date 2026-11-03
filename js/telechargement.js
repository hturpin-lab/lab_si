/* ============================================================
   Téléchargement direct des fichiers draw.io
   Un clic sur un lien .drawio télécharge le fichier (à importer
   ensuite dans draw.io) au lieu de l'afficher dans le navigateur.
   Contenu fourni par data/fichiers_drawio.js (fonctionne en ligne
   et en ouvrant le site en local).
   ============================================================ */
(function () {
  "use strict";
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href$=".drawio"]') : null;
    if (!a) return;
    var nom = decodeURIComponent(a.getAttribute("href").split("/").pop());
    var contenu = (window.SI_FICHIERS || {})[nom];
    if (typeof contenu !== "string") return;            /* repli : comportement normal du lien */
    e.preventDefault();
    var blob = new Blob([contenu], { type: "application/octet-stream" });
    var url = URL.createObjectURL(blob);
    var lien = document.createElement("a");
    lien.href = url; lien.download = nom; lien.style.display = "none";
    document.body.appendChild(lien); lien.click(); lien.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  });
})();
