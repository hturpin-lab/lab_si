/* Activité — Portail solaire Avidsen — 1re SI, S1 Analyse fonctionnelle (27/08/2026)
   Énoncés repris du PDF d'Henri (Act_AF_portail.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "act_af_portail", fichier: "Act_AF_Portail", court: "Portail solaire · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Activité : Portail solaire",
  sous: "Analyser les systèmes pluri-technologiques — besoin, exigences, structure, flux et comportement d'un ouvre-portail",
  blocs: [
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Présentation du système", html:
        "<p>La société Avidsen propose aux particuliers de disposer d'un ouvre-portail motorisé « écologique ». L'installation en site isolé est rendue possible grâce à son panneau photovoltaïque.</p>" +
        "<p>Répondant aux normes de sécurité, ce produit de la domotique assure une installation rapide pour les particuliers souhaitant une ouverture à double vantaux.</p>" },
      { t: "figure", id: "fig-photo", src: "../assets/img/s1_por_photo.jpg", alt: "Portail automatique SET du laboratoire : deux vantaux, panneau solaire, boîtier de commande.", legende: "Le portail solaire du laboratoire (SET).", largeur: "320px" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> les diagrammes à compléter se font avec le fichier draw.io de départ (ou sur papier) puis tu **colles** une capture ; les réponses rédigées se tapent directement. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "Analyse du besoin", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Figure 1 : diagramme des cas d'utilisation à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Recharger les batteries ; Utilisateur ; Soleil ; Éviter les contacts durant le mouvement des vantaux ; Passant ; Véhicule ; Pilier de la clôture ; Vantaux ; Manœuvrer automatiquement les vantaux sur ordre</i>.",
      ref: "**Place** chaque mot de la liste dans une case vide du diagramme : les <b>acteurs</b> (à l'extérieur du cadre : utilisateur, soleil, passant, véhicule, pilier, vantaux) et les <b>cas d'utilisation</b> (ovales : manœuvrer les vantaux, recharger les batteries, éviter les contacts).",
      figure: { src: "../assets/img/s1_por_ucd_eleve.png", alt: "Diagramme des cas d'utilisation du portail automatique SET avec des acteurs et des ovales vides à compléter.", legende: "Figure 1 : diagramme des cas d'utilisation." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q2", lab: "Q2", bac: "Sur la flèche « Rechercher, agrandir… », **déterminer** en le justifiant si cela représente une inclusion « include » ou une extension « extend ».", ref: "**Regarde** la flèche en pointillés entre les deux cas d'utilisation. **Dis** si c'est un « include » (cas <b>obligatoire</b>, toujours réalisé) ou un « extend » (cas <b>optionnel</b>). **Justifie** en une phrase." },
    { t: "zone", q: "Q2", label: "Include ou extend ? Justification", lignes: 3 },

    { t: "bandeau", id: "p2", titre: "Analyse de la source d'énergie du système", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "figure", id: "fig-req", src: "../assets/img/s1_por_req_eleve.png", alt: "Figure 2 : extrait du diagramme d'exigences du portail avec les exigences Autonomie, Panneau photovoltaïque, Chargeur, Batterie et des liens à compléter.", legende: "Figure 2 : extrait du diagramme d'exigences." },
    { t: "q", id: "Q3", lab: "Q3", bac: "D'après vous, quels types d'énergie sont fournis au système pour qu'il fonctionne ? **Nommer** le ou les composants permettant son fonctionnement.", ref: "**Indique** le ou les types d'énergie qui arrivent au portail (pense au soleil et à la batterie), puis **nomme** les composants qui fournissent cette énergie." },
    { t: "zone", q: "Q3", label: "Types d'énergie fournis et composants", lignes: 3 },
    { t: "q", id: "Q4", lab: "Q4", bac: "**Donner** les fonctions des 3 composants du diagramme.", ref: "Pour chacun des 3 composants, **écris** en une phrase à quoi il sert dans le portail." },
    { t: "grille", q: "Q4", titre: "Fonction des composants", entetes: ["Composant", "Fonction"], lignes: [
      ["Panneau photovoltaïque", { champ: "Q4_panneau", multi: true }],
      ["Chargeur", { champ: "Q4_chargeur", multi: true }],
      ["Batterie", { champ: "Q4_batterie", multi: true }]
    ] },
    { t: "diagramme", q: "Q5", lab: "Q5", titre: "Liens du diagramme d'exigences",
      bac: "**Compléter** le diagramme en précisant les liens de « refine », « deriveReqt », « satisfy ».",
      ref: "Sur la figure 2, **écris** sur chaque flèche en pointillés le bon mot : <b>refine</b> (une exigence précise une autre), <b>deriveReqt</b> (une exigence découle d'une autre), <b>satisfy</b> (un composant réalise une exigence). **Colle** une capture du diagramme complété.",
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },

    { t: "bandeau", id: "p3", titre: "Analyse structurelle du système", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "diagramme", q: "Q6", lab: "Q6", titre: "Diagramme de blocs interne à compléter",
      bac: "**Compléter** le diagramme de blocs interne suivant : **repasser** en vert le flux d'information, en rouge le flux d'énergie électrique, en bleu le flux d'énergie mécanique ; **donner** la fonction de chacun des éléments figurant sur le diagramme ; **compléter** le diagramme en précisant le type de flux d'énergie entre les blocs.",
      ref: "Sur le diagramme de blocs interne (figure ci-dessous, remise à l'horizontale) : 1) **colorie** les liaisons : <span style=\"color:#2E7D32\"><b>vert</b></span> = information, <span style=\"color:#C62828\"><b>rouge</b></span> = énergie électrique, <span style=\"color:#1565C0\"><b>bleu</b></span> = énergie mécanique ; 2) **écris** dans les cases vides le type d'énergie qui circule entre les blocs ; 3) **colle** une capture. La fonction de chaque élément se rédige dans la question 7.",
      figure: { src: "../assets/img/s1_por_ibd_eleve.png", alt: "Diagramme de blocs interne du portail automatisé SET : panneau photovoltaïque, batterie, cellules photoélectriques, boîtier de réglage, feu clignotant, antenne, carte électronique, interface relais + transistor, moteur électrique, réducteur de vitesse, mécanisme de déverrouillage, liaison avec les vantaux ; des cases sont vides.", legende: "Diagramme de blocs interne à compléter (image tournée pour la lecture)." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Donner** la fonction de chacun des éléments figurant sur le diagramme.", ref: "Pour chaque bloc du diagramme (panneau, batterie, cellules photoélectriques, carte électronique, moteur, réducteur, mécanisme de déverrouillage…), **écris** sa fonction en quelques mots : un élément par ligne." },
    { t: "zone", q: "Q7", label: "Fonction de chaque élément du diagramme", lignes: 10, ph: "Panneau photovoltaïque : …\nBatterie : …" },

    { t: "bandeau", id: "p4", titre: "Analyse comportementale", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "diagramme", q: "Q8", lab: "Q8", titre: "Algorigramme à compléter",
      bac: "**Compléter** le diagramme avec les termes suivants, pour décrire le fonctionnement du système : <i>Allumer gyrophare ? · Activer moteur pour la fermeture · Arrêter le moteur · Arrêter le moteur · fin de course « fermé » activé ? · Télécommande activée</i>.",
      ref: "**Place** chaque terme dans une case vide de l'algorigramme : les termes avec un <b>?</b> vont dans les <b>losanges</b> (tests), les autres dans les <b>rectangles</b> (actions). « Arrêter le moteur » sert deux fois.",
      figure: { src: "../assets/img/s1_por_algo_eleve.png", alt: "Algorigramme du portail : Initialisation, test, activer le moteur pour l'ouverture, allumer l'éclairage, capteur de fin de course ouvert activé ?, attendre 12 s (passage du véhicule), puis des cases vides jusqu'à éteindre le gyrophare et l'éclairage.", legende: "Algorigramme à compléter.", largeur: "420px" },
      drawio: "../docs/drawio/Algorigramme_depart.drawio" },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Traduire** l'algorigramme en algorithme de fonctionnement.", ref: "**Écris** l'algorithme du portail à partir de l'algorigramme complété : une ligne par case, de DÉBUT à FIN, avec les tests écrits « Tant que … » ou « Si … Alors … »." },
    { t: "zone", q: "Q9", label: "Algorithme de fonctionnement du portail", lignes: 10, ph: "DÉBUT\nInitialisation\n…\nFIN" },

    { t: "autoeval", items: [
      "compléter un diagramme des cas d'utilisation (acteurs, cas, include / extend)",
      "lire un diagramme d'exigences et nommer les liens refine / deriveReqt / satisfy",
      "compléter un diagramme de blocs interne (flux colorés, type d'énergie, fonction des blocs)",
      "compléter un algorigramme et le traduire en algorithme"
    ] }
  ]
};
