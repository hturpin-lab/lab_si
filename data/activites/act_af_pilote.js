/* Activité — Pilote automatique de bateau — 1re SI, S1 Analyse fonctionnelle (03/09/2026)
   Énoncés repris du PDF d'Henri (Act_AF_pilote.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "act_af_pilote", fichier: "Act_AF_Pilote", court: "Pilote de bateau · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Activité : Pilote de bateau",
  sous: "Analyser les systèmes pluri-technologiques — besoin, énergie, composants, flux et comportement d'un pilote automatique",
  blocs: [
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Présentation du système", html:
        "<p>Un voilier est un bateau propulsé par la force du vent. Le <b>cap</b> est la direction suivie par le bateau. Le cap s'exprime par rapport à la direction du Nord magnétique, indiqué sur une boussole.</p>" +
        "<p>On fait varier la direction du bateau en agissant sur la barre. Le pilote automatique permet de remplacer le navigateur en agissant sur la barre pour suivre un cap choisi.</p>" },
      { t: "figure", id: "fig-boussole", src: "../assets/img/s1_pil_boussole.jpg", alt: "Boussole : flèche ligne de visée, socle tournant, aiguille aimantée dont le rouge indique le Nord, repères du socle tournant.", legende: "Boussole : l'aiguille aimantée indique le Nord.", largeur: "300px" }
    ] },
    { t: "figure", id: "fig-bateau", src: "../assets/img/s1_pil_bateau.jpg", alt: "Vue 3D du pilote automatique monté sur un bateau : vérin électrique relié à la barre.", legende: "Le pilote automatique agit sur la barre.", largeur: "420px" },
    { t: "methode", html: "<b>Méthode :</b> les diagrammes à compléter se font avec le fichier draw.io de départ (ou sur papier) puis tu **colles** une capture ; les réponses rédigées se tapent directement. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "Analyse du besoin", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Diagramme des cas d'utilisation à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Bateau, barreur du voilier, champ magnétique terrestre, enregistrer le cap choisi, calculer la position par rapport au Nord magnétique, batterie</i>.",
      ref: "**Place** chaque élément de la liste dans une case vide du diagramme : les <b>acteurs</b> (barreur, bateau, champ magnétique terrestre, batterie) et les <b>cas d'utilisation</b> (enregistrer le cap choisi, calculer la position par rapport au Nord). Le cas principal est « Maintenir le bateau dans un cap ».",
      figure: { src: "../assets/img/s1_pil_ucd_eleve.png", alt: "Diagramme des cas d'utilisation du pilote automatique : cas Maintenir le bateau dans un cap, un include, des acteurs et des ovales vides.", legende: "Diagramme des cas d'utilisation à compléter.", largeur: "560px" },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q2", lab: "Q2", bac: "Sur la flèche « Maintenir le bateau dans un cap », **déterminer** en le justifiant si cela représente une inclusion « include » ou une extension « extend ».", ref: "**Regarde** la flèche en pointillés qui part de « Maintenir le bateau dans un cap ». **Dis** si c'est un « include » (étape <b>obligatoire</b>) ou un « extend » (étape <b>optionnelle</b>) et **justifie** en une phrase." },
    { t: "zone", q: "Q2", label: "Include ou extend ? Justification", lignes: 3 },
    { t: "ligne", blocs: [
      { t: "html", html: "<p>➜ <b>Mettre</b> le pilote automatique sous tension en mettant le bouton ON / OFF de l'alimentation sur la position ON.</p><p>➜ <b>Mettre</b> la tige en position milieu, en agissant sur les boutons du pilote automatique.</p><p>➜ Il faut imaginer que la barre est dans la bonne position pour que le bateau suive le cap voulu (le cap est la direction dans laquelle va le bateau).</p>" },
      { t: "figure", id: "fig-boutons", src: "../assets/img/s1_pil_boutons.jpg", alt: "Alimentation du pilote, boutons bâbord / tribord et Auto / Stby, vue 3D du vérin.", legende: "Alimentation, boutons de commande et vérin.", largeur: "220px" }
    ] },

    { t: "bandeau", id: "p2", titre: "Analyse de la source d'énergie du système", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "q", id: "Q3", lab: "Q3", bac: "D'après vous, quels types d'énergie sont fournis au système pour qu'il fonctionne ?", ref: "**Indique** le ou les types d'énergie qui arrivent au pilote automatique." },
    { t: "zone", q: "Q3", label: "Types d'énergie fournis", lignes: 2 },
    { t: "q", id: "Q4", lab: "Q4", bac: "Sur le système, quelle est la source d'énergie ? Pensez-vous que la source d'énergie soit la même dans le laboratoire SI et sur le bateau ? Quel composant doit-on rajouter sur le bateau ?", ref: "a) **Indique** la source d'énergie du pilote au laboratoire (il est branché sur quoi ?). b) Sur un voilier, il n'y a pas de prise secteur : quelle est la source ? c) **Nomme** le composant qu'il faut ajouter sur le bateau pour stocker l'énergie." },
    { t: "zone", q: "Q4", label: "Source d'énergie : laboratoire, bateau, composant à ajouter", lignes: 3 },
    { t: "html", html: "<p>L'énergie électrique arrive sur le composant entouré sur la photo du système. <b>Faire</b> translater manuellement la tige en appuyant sur l'un des 2 boutons et <b>observer</b> le mouvement de la partie mobile de ce composant.</p>" },
    { t: "q", id: "Q5", lab: "Q5", bac: "Quel est le nom du composant permettant de convertir une énergie électrique en énergie mécanique de rotation ?", ref: "**Nomme** le composant entouré qui transforme l'électricité en rotation." },
    { t: "zone", q: "Q5", label: "Composant convertisseur électrique → rotation", lignes: 1 },
    { t: "figure", id: "fig-composants", src: "../assets/img/s1_pil_composants.jpg", alt: "Vues 3D du vérin du pilote automatique avec des sous-ensembles entourés : poulies-courroie, vis-écrou, moteur.", legende: "Sous-ensembles du vérin (questions 6 et 7)." },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Indiquer** le nom du système entouré ci-contre.", ref: "Sur la vue 3D, un ensemble est entouré (deux roues reliées par une courroie) : **nomme** ce système de transmission." },
    { t: "zone", q: "Q6", label: "Nom du système entouré (transmission)", lignes: 1 },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Indiquer** le nom du système entouré ci-dessous. **Préciser** son rôle dans le système. (Quel est le mouvement de la tige ? Quel type d'énergie a-t-on à l'aide de la tige ?)", ref: "Un second ensemble est entouré (une vis longue et un écrou qui avance dessus) : **nomme**-le, puis **explique** son rôle : il transforme la rotation en quel mouvement de la tige ? Quel type d'énergie mécanique obtient-on au bout de la tige (rotation ou translation) ?" },
    { t: "zone", q: "Q7", label: "Nom du système entouré, rôle, mouvement de la tige, type d'énergie", lignes: 3 },

    { t: "bandeau", id: "p3", titre: "Identification de composants réalisant certaines exigences", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "figure", id: "fig-req", src: "../assets/img/s1_pil_req_eleve.png", alt: "Diagramme d'exigences du pilote automatique : Gérer le pilotage des mouvements, Alimenter en énergie, Distribuer l'énergie, Convertir l'énergie électrique en énergie mécanique, Transmettre l'énergie mécanique, Prendre appui sur la coque, Transmettre le mouvement à la barre, avec des cases satisfy vides.", legende: "Diagramme d'exigences à compléter." },
    { t: "diagramme", q: "Q8", lab: "Q8", titre: "Composants satisfaisant les exigences",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Système vis-écrou ; carte de puissance ; carte de commande ; moteur ; batterie ; système poulies-courroie</i>.",
      ref: "**Associe** chaque composant de la liste à l'exigence qu'il réalise (cases « satisfy » vides du diagramme ci-dessus et photos ci-dessous), puis **colle** une capture du diagramme complété (ou **liste** les associations dans la zone de la question 9).",
      figure: { src: "../assets/img/s1_pil_req2_eleve.jpg", alt: "Photos des composants du pilote (bateau, poulies-courroie, vis-écrou, moteur) avec des ovales vides à compléter.", legende: "Composants à identifier." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },

    { t: "bandeau", id: "p4", titre: "Analyse des flux", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "diagramme", q: "Q9", lab: "Q9", titre: "Diagramme de blocs (chaîne d'énergie) et diagramme de flux",
      bac: "**Compléter** le diagramme de blocs suivant avec les éléments suivants : <i>Énergie mécanique de translation ; Énergie électrique ; Énergie mécanique de rotation ; système poulie-courroie ; moteur électrique ; système vis-écrou ; CONVERTIR ; TRANSMETTRE ; AGIR</i>.",
      ref: "Dans la chaîne d'énergie (figure du haut), **place** les fonctions (CONVERTIR, TRANSMETTRE, AGIR), les composants (moteur, poulie-courroie, vis-écrou) et les énergies sur les flèches (électrique → rotation → translation). **Colle** une capture.",
      figure: { src: "../assets/img/s1_pil_chaine_ibd_eleve.png", alt: "En haut : chaîne d'énergie du pilote avec des cases vides ; en bas : diagramme de blocs interne du pilote (batterie, carte électronique, moteur, poulies, vis-écrou, barre) avec ses liaisons à colorier.", legende: "Diagramme de blocs (question 9, en haut) et diagramme de flux (question 10, en bas) à compléter." },
      drawio: "../docs/drawio/Chaine_energie_information_depart.drawio" },
    { t: "diagramme", q: "Q10", lab: "Q10", titre: "Diagramme de flux : couleurs",
      bac: "**Compléter** le diagramme de flux suivant. **Repasser** en : vert, le flux d'information ; rouge, le flux d'énergie électrique ; bleu, le flux d'énergie mécanique.",
      ref: "Sur le diagramme de blocs interne (figure du bas de la question 9), **colorie** chaque liaison : <span style=\"color:#2E7D32\"><b>vert</b></span> = information, <span style=\"color:#C62828\"><b>rouge</b></span> = énergie électrique, <span style=\"color:#1565C0\"><b>bleu</b></span> = énergie mécanique. **Colle** une capture.",
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },

    { t: "bandeau", id: "p5", titre: "Analyse comportementale", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "diagramme", q: "Q11", lab: "Q11", titre: "Diagramme d'états à compléter",
      bac: "**Compléter** le diagramme d'états en utilisant les termes suivants : <i>Bouton bâbord relâché ; Bouton bâbord appuyé ; Appui bouton Auto/Stby ; Bouton tribord relâché ; Bouton tribord appuyé</i>.",
      ref: "Les termes de la liste sont des <b>événements</b> : ils vont <b>sur les transitions</b> (flèches) du diagramme, entre les états repos, rotation gauche, rotation droite, mode manu et mode automatique. **Place**-les puis **colle** une capture.",
      figure: { src: "../assets/img/s1_pil_stm_eleve.png", alt: "Diagramme d'états du pilote automatique : mode manu (repos, rotation gauche, rotation droite), mode automatique, avec des étiquettes de transition vides.", legende: "Diagramme d'états à compléter." },
      drawio: "../docs/drawio/Diagramme_etats_depart.drawio" },

    { t: "autoeval", items: [
      "compléter un diagramme des cas d'utilisation (acteurs, cas, include / extend)",
      "identifier la source d'énergie, le moteur et les transmissions (poulies-courroie, vis-écrou)",
      "associer des composants aux exigences (satisfy)",
      "compléter une chaîne d'énergie et colorier les flux",
      "compléter un diagramme d'états (événements sur les transitions)"
    ] }
  ]
};
