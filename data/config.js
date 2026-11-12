/* ============================================================
   CONFIGURATION DU SITE — c'est ICI que l'on change les liens.
   Fichier lu par toutes les pages (index, activités, outils).
   Une valeur vide ("") = le bouton correspondant est masqué
   ou affiché « bientôt ».
   ============================================================ */
window.SI_CONFIG = {
  /* Nom affiché du site (en-tête) */
  nom: "S.I — Sciences de l'Ingénieur",
  classe: "1re SI",
  annee: "2026-2027",

  /* Dépôt Nuage (apps.education) de la classe : bouton « Rendre son travail »
     et bouton « Déposer » des activités en ligne. */
  nuage: "https://nuage07.apps.education.fr/index.php/s/tXLpRtew8nFFq7p",

  /* Lien de CONSULTATION du Nuage (réservé à l'enseignant) : affiché dans le petit
     encadré repliable « Espace enseignant » sous les Outils, comme sur le site STI2D.
     Vide : l'encadré n'apparaît pas. */
  nuageAdmin: "https://nuage07.apps.education.fr/index.php/s/efB4zXxkQfDnpYp",

  /* Dossier Nuage des CORRIGÉS (protégé par le mot de passe donné en classe).
     Même lien partout : onglet « Corrections » de chaque séquence et bouton
     « Corrigé » des activités. Vide : les boutons affichent « bientôt ». */
  corriges: "https://nuage07.apps.education.fr/index.php/s/7ysm2zdzeYjMstC",

  /* Dossier Google Drive partagé contenant les PDF. Vide : la tuile
     « Documents en ligne » renvoie vers la liste des séquences du site ;
     rempli : un bouton « Dossier Drive » s'ajoute dans le panneau de séquence. */
  drive: "",

  /* Ressources (tuiles du bloc supérieur) */
  tinkercad: "https://www.tinkercad.com",
  castor: "https://concours.castor-informatique.fr",
  algorea: "https://algorea.org",
  metice: "https://hubix.ac-reunion.fr/",   /* ENT de l'académie (Hubix) ; vide = tuile « bientôt » */

  /* Outils */
  labrio: "https://hturpin-lab.github.io/compte-rendu-tp/?theme=si&verrou=1",

  /* Logos des services (tuiles). Dépose le fichier dans assets/logos/ PUIS
     écris son chemin ici (ex. "assets/logos/castor.png"). Chemin vide ("") :
     la tuile affiche un badge texte (initiales) — jamais d'image cassée. */
  logos: {
    documents: { fichier: "assets/logos/documents.png", badge: "DOC" },   /* tuile Documents en ligne */
    drive:     { fichier: "assets/logos/drive.png",     badge: "DRV" },   /* boutons « Drive » des PDF */
    tinkercad: { fichier: "assets/logos/tinkercad.png", badge: "TKC" },
    algorea:   { fichier: "assets/logos/algorea.png",   badge: "CAS" },   /* tuile Concours Castor & Algoréa */
    metice:    { fichier: "assets/logos/metice.png",    badge: "MET" },
    nuage:     { fichier: "assets/logos/nuage.png",     badge: "NUA" },   /* tuile Rendre son travail, boutons Déposer */
    pdf:       { fichier: "assets/logos/pdf.png",       badge: "PDF" },   /* petite icône des liens PDF */
    labrio:    { fichier: "assets/logos/labrio.svg",    badge: "LAB" }
  },

  /* Pied de page */
  auteur: "Henri Turpin et Julie Turpin",
  lycee: "Lycée Jean-Claude Fruteau",
  maj: "2 novembre 2026"
};
