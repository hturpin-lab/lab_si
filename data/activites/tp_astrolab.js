/* TP — Télescope ASTROLAB — 1re SI, S1 Analyse fonctionnelle (08/09/2026)
   Énoncés repris du document d'Henri (TP_analyse_ASTROLAB.docx). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "tp_astrolab", fichier: "TP_Astrolab", court: "TP ASTROLAB · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Activité : ASTROLAB",
  sous: "Analyser les systèmes pluri-technologiques — besoin, énergie, chaîne de puissance, exigences et flux d'un télescope automatisé",
  blocs: [
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Présentation du système", html:
        "<p>Un télescope (du grec <i>tele</i> signifiant « loin » et <i>skopein</i> signifiant « regarder, voir ») est un instrument optique qui permet d'augmenter la taille apparente des objets observés et surtout leur luminosité. Son rôle de récepteur de lumière est souvent plus important que son grossissement optique : il permet d'apercevoir des objets célestes ponctuels difficilement perceptibles ou invisibles à l'œil nu.</p>" +
        "<p>Le télescope automatisé Astrolab permet de lever deux difficultés :</p><ul><li>le <b>pointage</b> de l'instrument sur l'objet à observer (sa base de données contient plus de 30 000 objets célestes : planètes, étoiles, constellations et galaxies), autrement dit son positionnement pour avoir l'objet dans son champ de vision ;</li><li>le <b>suivi</b> de l'objet céleste dans le temps : la rotation de la Terre sur son axe fait que l'objet observé quitte rapidement le champ de l'instrument. La compensation automatique du déplacement terrestre permet d'observer confortablement un astre sur une durée intéressante.</li></ul>" },
      { t: "figure", id: "fig-photo", src: "../assets/img/s1_ast_photo.jpg", alt: "Télescope automatisé Astrolab sur son embase motorisée.", legende: "Le télescope ASTROLAB.", largeur: "260px" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> les diagrammes à compléter se font avec le fichier draw.io de départ (ou sur papier) puis tu **colles** une capture ; les réponses rédigées se tapent directement. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "Analyse du besoin", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Diagramme des cas d'utilisation à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Objet céleste, rechercher le Nord magnétique, utilisateur, champ magnétique terrestre, base de données</i>.",
      ref: "**Place** chaque élément de la liste dans une case vide du diagramme : les <b>acteurs</b> (utilisateur, objet céleste, champ magnétique terrestre, base de données, énergie électrique déjà placée) et le <b>cas d'utilisation</b> manquant (rechercher le Nord magnétique).",
      figure: { src: "../assets/img/s1_ast_ucd_eleve.png", alt: "Diagramme des cas d'utilisation du télescope : cas Rechercher, agrandir l'image et observer un objet céleste, Suivre l'objet céleste au cours du temps (include), acteur Énergie électrique, et des cases vides.", legende: "Diagramme des cas d'utilisation à compléter.", largeur: "520px" },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q2", lab: "Q2", bac: "Sur la flèche « Rechercher, agrandir… », **déterminer** en le justifiant si cela représente une inclusion « include » ou une extension « extend ».", ref: "**Regarde** la flèche en pointillés qui part de « Rechercher, agrandir… ». **Dis** si c'est un « include » (cas <b>obligatoire</b>) ou un « extend » (cas <b>optionnel</b>) et **justifie** en une phrase." },
    { t: "zone", q: "Q2", label: "Include ou extend ? Justification", lignes: 3 },

    { t: "bandeau", id: "p2", titre: "Analyse de la source d'énergie du système", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "q", id: "Q3", lab: "Q3", bac: "D'après vous, quels types d'énergie sont fournis au système pour qu'il fonctionne ?", ref: "**Indique** le ou les types d'énergie qui arrivent au télescope." },
    { t: "zone", q: "Q3", label: "Types d'énergie fournis", lignes: 2 },
    { t: "q", id: "Q4", lab: "Q4", bac: "L'ASTROLAB peut-il fonctionner sur batterie / piles ? **Justifier** cette fonction.", ref: "Le télescope s'utilise la nuit, dehors, loin des prises : **dis** s'il peut marcher sur batterie ou piles et **explique** pourquoi c'est utile." },
    { t: "zone", q: "Q4", label: "Fonctionnement sur batterie / piles et justification", lignes: 3 },

    { t: "bandeau", id: "p3", titre: "Analyse du fonctionnement", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "figure", id: "fig-moto", src: "../assets/img/s1_ast_motoreducteur.jpg", alt: "Vue 3D éclatée du sous-ensemble de mise en rotation de l'embase (pièces numérotées 1 à 15) et photo du motoréducteur d'embase.", legende: "Vue 3D et photo du sous-ensemble permettant la mise en rotation de l'embase." },
    { t: "diagramme", q: "Q5", lab: "Q5", titre: "Diagramme de blocs (chaîne d'énergie) à compléter",
      bac: "**Compléter** le diagramme de blocs suivant avec les éléments suivants : <i>énergie mécanique de rotation adaptée, roue / vis sans fin, énergie électrique, énergie mécanique, moteur électrique, énergie mécanique de rotation adaptée, réducteur à engrenages</i>.",
      ref: "**Place** les composants dans les blocs (moteur électrique, réducteur à engrenages, roue / vis sans fin) et les énergies sur les flèches (électrique → mécanique → rotation adaptée → rotation adaptée). **Colle** une capture.",
      figure: { src: "../assets/img/s1_ast_req_eleve.jpg", alt: "Photos des composants du motoréducteur (moteur, engrenages, roue et vis sans fin) reliés par des flèches, avec des cases et des ovales vides à compléter.", legende: "Diagramme de blocs à compléter." },
      drawio: "../docs/drawio/Chaine_energie_information_depart.drawio" },

    { t: "bandeau", id: "p4", titre: "Identification de composants réalisant certaines exigences", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "diagramme", q: "Q6", lab: "Q6", titre: "Diagramme d'exigences à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Batterie, moteur électrique, Guider le tube optique, réducteur, alimenter en énergie « câblée », microcontrôleur</i>.",
      ref: "Dans le diagramme d'exigences, des cases sont vides : certaines sont des <b>exigences</b> (Guider le tube optique, alimenter en énergie câblée), les autres des <b>composants</b> reliés par « satisfy » (batterie, moteur électrique, réducteur, microcontrôleur). **Place**-les puis **colle** une capture.",
      figure: { src: "../assets/img/s1_ast_req2_eleve.png", alt: "Diagramme d'exigences du télescope : Mettre l'objet à observer dans le champ de l'oculaire, Alimenter en énergie, Mesurer la position, Convertir l'énergie, Adapter l'énergie, Traiter les données… avec des cases vides.", legende: "Diagramme d'exigences à compléter." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "diagramme", q: "Q7", lab: "Q7", titre: "Diagramme de blocs interne à compléter",
      bac: "**Compléter** le diagramme de blocs interne suivant : **repasser** en vert le flux d'information, en rouge le flux d'énergie électrique, en bleu le flux d'énergie mécanique ; **donner** la fonction de chacun des éléments figurant sur le diagramme.",
      ref: "Sur le diagramme de blocs interne : **colorie** les liaisons (<span style=\"color:#2E7D32\"><b>vert</b></span> = information, <span style=\"color:#C62828\"><b>rouge</b></span> = énergie électrique, <span style=\"color:#1565C0\"><b>bleu</b></span> = énergie mécanique), **colle** une capture, puis **écris** la fonction de chaque élément dans la zone ci-dessous.",
      figure: { src: "../assets/img/s1_ast_ibd_eleve.png", alt: "Diagramme de blocs interne du télescope avec les photos des composants : raquette de commande (computer control), télescope, moteurs, cartes électroniques, câbles, alimentation.", legende: "Diagramme de blocs interne à compléter." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "zone", q: "Q7", id: "Q7_fonctions", label: "Fonction de chaque élément du diagramme", lignes: 8, ph: "Raquette de commande : …\nMoteur : …" },

    { t: "autoeval", items: [
      "compléter un diagramme des cas d'utilisation (acteurs, cas, include / extend)",
      "identifier la source d'énergie d'un système et justifier un fonctionnement sur batterie",
      "compléter une chaîne d'énergie (moteur, réducteur, roue / vis sans fin)",
      "associer des composants aux exigences (satisfy) et colorier les flux d'un ibd"
    ] }
  ]
};
