/* Activité — Robot tondeuse — 1re SI, S1 Analyse fonctionnelle (03/09/2026)
   Énoncés repris du PDF d'Henri (Act_AF_tondeuse.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "act_af_tondeuse", fichier: "Act_AF_Tondeuse", court: "Robot tondeuse · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Activité : Robot TONDEUSE",
  sous: "Analyser les systèmes pluri-technologiques — besoin, énergie, structure, exigences et comportement d'un robot tondeuse",
  blocs: [
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Présentation du système", html:
        "<p>Le robot tondeuse BOSCH est muni de 2 roues motrices à l'arrière, de deux roues folles à l'avant et d'un rotor de coupe.</p>" +
        "<p>Le robot tondeuse BOSCH a besoin d'un câble périmétrique pour repérer les limites de la surface à tondre. Il est intelligent grâce à son système de navigation « Logicut » qui cartographie le jardin puis effectue une tonte en bandes parallèles pour plus d'efficacité. Lors de la première tonte le robot va débuter la cartographie de la surface de tonte, qui demande deux cycles complets. Il enregistre la position des obstacles délimités par le câble périmétrique, afin de définir plusieurs portions à tondre ; ce système évite à la tondeuse de passer deux fois au même endroit et d'oublier des zones.</p>" +
        "<p>Il est possible de programmer le robot tondeuse BOSCH pour qu'il fonctionne à différents horaires et jours de la semaine. En ce qui concerne la gestion des obstacles, le robot possède un capteur de contact. Il dispose d'une station de charge sur laquelle il se rend de façon autonome pour se recharger quand le taux de charge de la batterie est inférieur à 10 %.</p>" },
      { t: "figure", id: "fig-photo", src: "../assets/img/s1_ton_photo.jpg", alt: "Robot tondeuse Bosch Indego.", legende: "Le robot tondeuse BOSCH.", largeur: "260px" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> les diagrammes à compléter se font avec le fichier draw.io de départ (ou sur papier) puis tu **colles** une capture ; les réponses rédigées se tapent directement. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "Analyse du besoin", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Figure 1 : diagramme des cas d'utilisation à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Terrain à tondre ; Utilisateur ; Smartphone ; Tondre la pelouse de façon autonome ; Commander la tondeuse à distance</i>.",
      ref: "**Place** chaque élément de la liste dans une case vide du diagramme : les <b>acteurs</b> (utilisateur, smartphone, terrain à tondre) et les <b>cas d'utilisation</b> (tondre la pelouse de façon autonome, commander la tondeuse à distance). Le cas « Permettre la configuration (date, carte…) » est déjà placé.",
      figure: { src: "../assets/img/s1_ton_ucd_eleve.png", alt: "Diagramme des cas d'utilisation du robot tondeuse : cas Permettre la configuration (date, carte…), acteurs Réseau électrique et des cases vides.", legende: "Figure 1 : diagramme des cas d'utilisation.", largeur: "520px" },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q2", lab: "Q2", bac: "Sur la flèche « Rechercher, agrandir… », **déterminer** en le justifiant si cela représente une inclusion « include » ou une extension « extend ».", ref: "**Regarde** la flèche en pointillés entre les cas d'utilisation. **Dis** si c'est un « include » (cas <b>obligatoire</b>) ou un « extend » (cas <b>optionnel</b>) et **justifie** en une phrase." },
    { t: "zone", q: "Q2", label: "Include ou extend ? Justification", lignes: 3 },

    { t: "bandeau", id: "p2", titre: "Analyse de la source d'énergie du système", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "q", id: "Q3", lab: "Q3", bac: "D'après vous, quels types d'énergie sont fournis au système pour qu'il fonctionne ? **Nommer** le ou les composants permettant son fonctionnement.", ref: "**Indique** le type d'énergie que reçoit le robot (pense à la station de charge) et **nomme** les composants qui la fournissent et la stockent." },
    { t: "zone", q: "Q3", label: "Types d'énergie fournis et composants", lignes: 3 },

    { t: "bandeau", id: "p3", titre: "Analyse structurelle du système", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "diagramme", q: "Q4", lab: "Q4", titre: "Diagramme de blocs interne à compléter",
      bac: "**Compléter** le diagramme de blocs interne suivant : **repasser** en vert le flux d'information, en rouge le flux d'énergie électrique, en bleu le flux d'énergie mécanique ; **donner** la fonction de chacun des éléments figurant sur le diagramme ; **compléter** le diagramme en précisant le type de flux d'énergie entre les blocs.",
      ref: "Sur le diagramme (uniquement la partie « avancer » du robot) : 1) **colorie** les liaisons (<span style=\"color:#2E7D32\"><b>vert</b></span> = information, <span style=\"color:#C62828\"><b>rouge</b></span> = énergie électrique, <span style=\"color:#1565C0\"><b>bleu</b></span> = énergie mécanique) ; 2) **écris** dans les cases vides le type d'énergie entre les blocs ; 3) **colle** une capture. La fonction de chaque élément se rédige dans la question 5.",
      figure: { src: "../assets/img/s1_ton_ibd_eleve.png", alt: "Diagramme de blocs interne « Uniquement la partie avance du robot est représentée » : station de charge, batterie, électronique embarquée, interface homme-machine, moteur (2), réducteur (2), roue motrice (2), capteur incrémental (2), avec des cases vides.", legende: "Diagramme de blocs interne à compléter (partie « avancer »)." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Donner** la fonction de chacun des éléments figurant sur le diagramme.", ref: "Pour chaque bloc (station de charge, batterie, électronique embarquée, interface homme-machine, moteur, réducteur, roue motrice, capteur incrémental), **écris** sa fonction en quelques mots." },
    { t: "zone", q: "Q5", label: "Fonction de chaque élément du diagramme", lignes: 8, ph: "Station de charge : …\nBatterie : …" },

    { t: "bandeau", id: "p4", titre: "Analyse des exigences", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "figure", id: "fig-req", src: "../assets/img/s1_ton_req_eleve.png", alt: "Figure 2 : diagramme d'exigences du robot tondeuse : Couper l'herbe, Communiquer avec l'utilisateur, Tondre la pelouse de façon autonome, Se déplacer, Avoir une autonomie suffisante, Informer l'utilisateur, Repérer les limites du terrain, Se repérer de façon autonome, Détecter les obstacles, avec des liens à préciser.", legende: "Figure 2 : diagramme d'exigences." },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Citer** les exigences fixées par l'industriel permettant d'assurer la tonte de la pelouse de façon autonome.", ref: "Sur la figure 2, **relève** les exigences (nom et Id) reliées à « Tondre la pelouse de façon autonome » : ce sont celles qui la précisent ou en découlent." },
    { t: "zone", q: "Q6", label: "Exigences assurant la tonte autonome (Id et nom)", lignes: 5 },
    { t: "diagramme", q: "Q7", lab: "Q7", titre: "Liens du diagramme d'exigences",
      bac: "**Compléter** le diagramme en précisant les liens de « refine », « deriveReqt », « satisfy ».",
      ref: "Sur la figure 2, **écris** sur chaque flèche en pointillés le bon mot : <b>refine</b> (précise), <b>deriveReqt</b> (découle de), <b>satisfy</b> (un composant réalise l'exigence). **Colle** une capture du diagramme complété.",
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "figure", id: "fig-ibd-photos", src: "../assets/img/s1_ton_ibd_photos.jpg", alt: "Figure 3 : diagramme de blocs interne du robot tondeuse avec les photos des composants : rotor de coupe, moteur de coupe, interface homme-machine, communication GSM, station de charge, batterie, fil de contour, lames, capteur de contact, électronique embarquée, moteurs, réducteurs, roues motrices, capteur incrémental.", legende: "Figure 3 : diagramme de blocs interne." },
    { t: "q", id: "Q8", lab: "Q8", bac: "Pour chacun des composants du diagramme ci-dessus, **préciser** pour quelles exigences ces composants sont utilisés.", ref: "Pour chaque exigence du tableau, **écris** le ou les composants de la figure 3 qui servent à la réaliser (par exemple : couper l'herbe → rotor, lames, moteur de coupe)." },
    { t: "grille", q: "Q8", titre: "Exigence → composants", entetes: ["Exigence", "Composant(s)"], lignes: [
      ["Couper l'herbe", { champ: "Q8_couper", multi: true }],
      ["Communiquer avec l'utilisateur", { champ: "Q8_communiquer", multi: true }],
      ["Se déplacer", { champ: "Q8_deplacer", multi: true }],
      ["Avoir une autonomie suffisante", { champ: "Q8_autonomie", multi: true }],
      ["Doit se repérer de façon autonome sur le terrain", { champ: "Q8_reperer", multi: true }]
    ] },

    { t: "bandeau", id: "p5", titre: "Analyse comportementale", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "figure", id: "fig-algo", src: "../assets/img/s1_ton_algo_eleve.png", alt: "Algorigramme Taux de charge : N ← convertir la tension U2 ; si N > N75 alors vTauxCh = 100 ; sinon si N > N50 alors vTauxCh = 75 ; sinon si N > N25 alors vTauxCh = 50 ; sinon si N > N0 alors vTauxCh = 25 ; sinon vTauxCh = 0. À droite, début de l'algorithme : constantes N75 = 3450, N50 = 3350, N25 = 3250, N0 = 2850 ; variables entier N, vTauxCh ; Début ; N ← convertir la tension U2 ; SI N > N75 ALORS vTauxCh = 100 SINON …", legende: "Algorigramme « Taux de charge » et début de l'algorithme à compléter." },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Compléter** l'algorithme de fonctionnement correspondant à l'algorigramme ci-dessus.", ref: "**Recopie** le début de l'algorithme donné sur la figure, puis **continue-le** en suivant l'algorigramme : chaque losange devient une ligne « SI N > … ALORS vTauxCh = … SINON … », jusqu'à « vTauxCh = 0 ». **Termine** par FIN." },
    { t: "zone", q: "Q9", label: "Algorithme « Taux de charge »", lignes: 12, ph: "ALGORITHME Taux_de_charge\nCONSTANTES N75 = 3450 ; N50 = 3350 ; N25 = 3250 ; N0 = 2850\nVARIABLES ENTIER : N, vTauxCh\nDébut\n  N ← convertir la tension U2\n  SI N > N75 ALORS vTauxCh = 100\n  SINON …" },

    { t: "autoeval", items: [
      "compléter un diagramme des cas d'utilisation (acteurs, cas, include / extend)",
      "compléter un diagramme de blocs interne (flux colorés, type d'énergie, fonction des blocs)",
      "lire un diagramme d'exigences (refine / deriveReqt / satisfy) et associer les composants",
      "traduire un algorigramme en algorithme"
    ] }
  ]
};
