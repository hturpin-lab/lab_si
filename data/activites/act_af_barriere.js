/* Activité — Barrière SYMPACT — 1re SI, S1 Analyse fonctionnelle (27/08/2026)
   Énoncés repris du PDF d'Henri (Act_AF_barrière.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "act_af_barriere", fichier: "Act_AF_Barriere", court: "Barrière SYMPACT · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Activité : Barrière SYMPACT",
  sous: "Analyser les systèmes pluri-technologiques — besoin, énergie, flux et comportement d'une barrière de péage",
  blocs: [
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Présentation du système", html:
        "<p>La société ERO, spécialisée dans la fabrication et la commercialisation d'équipements de contrôle d'accès, a développé le type de barrière étudié dans ce TP. Cette barrière est utilisée dans différentes configurations correspondant à différentes longueurs de lisses (barre de fermeture).</p>" +
        "<p>Cette barrière SYMPACT est conçue pour les passages privés : copropriétés, campings, etc. Sur le même principe avec la même partie opérative, il existe la barrière COMPACT conçue pour les passages fréquents : péages, parkings payants, etc.</p>" +
        "<p>Le dispositif de laboratoire permet la simulation de la barrière Sympact pour plusieurs longueurs de lisses. Pour cela elle est munie d'une lisse plus courte avec une masse mobile.</p>" },
      { t: "figure", id: "fig-photo", src: "../assets/img/s1_bar_photo.jpg", alt: "Barrière SYMPACT du laboratoire : fût jaune, lisse rouge et blanche, pupitre de commande.", legende: "La barrière SYMPACT du laboratoire.", largeur: "260px" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> les diagrammes à compléter se font avec le fichier draw.io de départ (ou sur papier) puis tu **colles** une capture ; les réponses rédigées se tapent directement. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "Analyse du besoin", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Diagramme des cas d'utilisation à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Superviseur ; S'assurer de l'autorisation de passage ; Ouvrir la barrière ; Fermer la barrière ; Véhicule ; Réseau électrique ; Maintenir la barrière ouverte</i>.",
      ref: "Sur le diagramme des cas d'utilisation (figure ci-dessous), des cases sont vides. **Place** chaque mot de la liste au bon endroit : les <b>acteurs</b> (bonshommes ou boîtes à l'extérieur du cadre : superviseur, véhicule, réseau électrique) et les <b>cas d'utilisation</b> (ovales : ouvrir, fermer, maintenir ouverte, s'assurer de l'autorisation).",
      figure: { src: "../assets/img/s1_bar_ucd_eleve.png", alt: "Diagramme des cas d'utilisation de la barrière Sympact avec des ovales et des acteurs vides à compléter ; le cas principal est « Contrôler l'accès d'un automobiliste ».", legende: "Diagramme des cas d'utilisation à compléter." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q2", lab: "Q2", bac: "Sur la flèche « Contrôler l'accès d'un automobiliste », **déterminer** en le justifiant si cela représente une inclusion « include » ou une extension « extend ».", ref: "**Regarde** la flèche en pointillés qui part du cas « Contrôler l'accès d'un automobiliste ». **Dis** si c'est un « include » (le cas est <b>obligatoire</b>, il fait toujours partie de l'autre) ou un « extend » (le cas est <b>optionnel</b>, il ne se produit que dans certains cas). **Justifie** en une phrase." },
    { t: "zone", q: "Q2", label: "Include ou extend ? Justification", lignes: 3 },

    { t: "bandeau", id: "p2", titre: "Analyse de la source d'énergie du système", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "q", id: "Q3", lab: "Q3", bac: "Sur le système, quelle est la source d'énergie ? Pensez-vous que la source d'énergie soit la même dans le laboratoire SI que sur le système réel ? Peut-on apporter cette source d'énergie lors de son implantation sur les voies privées ?", ref: "a) **Indique** la source d'énergie de la barrière du laboratoire (d'où vient l'énergie ?). b) Sur une vraie route privée, est-ce la même source ? c) Est-il facile d'amener cette énergie jusqu'à la barrière installée dehors ? **Explique**." },
    { t: "zone", q: "Q3", label: "Source d'énergie : laboratoire, système réel, implantation", lignes: 4 },
    { t: "q", id: "Q4", lab: "Q4", bac: "Quel est le nom du composant permettant de convertir une énergie électrique en énergie mécanique de rotation ?", ref: "**Nomme** le composant qui transforme l'électricité en rotation (il fait tourner la lisse)." },
    { t: "zone", q: "Q4", label: "Composant convertisseur électrique → mécanique de rotation", lignes: 1 },

    { t: "bandeau", id: "p3", titre: "Analyse des flux", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "diagramme", q: "Q5", lab: "Q5", titre: "Diagramme de blocs (chaîne de puissance) à compléter",
      bac: "**Compléter** le diagramme de blocs suivant avec les éléments suivants : <i>Énergie électrique ; Énergie mécanique de rotation ; ALIMENTER ; CONVERTIR ; TRANSMETTRE ; COMMUNIQUER ; TRAITER ; DISTRIBUER ; AGIR</i>.",
      ref: "**Place** dans les cases vides de la chaîne d'énergie les fonctions (ALIMENTER, DISTRIBUER, CONVERTIR, TRANSMETTRE, AGIR) et dans la chaîne d'information (COMMUNIQUER, TRAITER). Sur les flèches, **écris** le type d'énergie qui circule (électrique ou mécanique de rotation).",
      figure: { src: "../assets/img/s1_bar_chaine_eleve.png", alt: "Diagramme de blocs interne de la barrière : chaîne d'information (carte Ethernet, calculateur, capteur angulaire…) et chaîne d'énergie (variateur de fréquence, moteur, réducteur, lisse…) avec des cases vides à compléter.", legende: "Diagramme de blocs à compléter (questions 5 et 6)." },
      drawio: "../docs/drawio/Chaine_energie_information_depart.drawio" },
    { t: "diagramme", q: "Q6", lab: "Q6", titre: "Diagramme de flux à compléter",
      bac: "**Compléter** le diagramme de flux suivant. **Repasser** en : vert, le flux d'information ; rouge, le flux d'énergie électrique ; bleu, le flux d'énergie mécanique.",
      ref: "Sur le diagramme de blocs interne, **colorie** chaque flèche selon ce qui circule : <span style=\"color:#2E7D32\"><b>vert</b></span> = information, <span style=\"color:#C62828\"><b>rouge</b></span> = énergie électrique, <span style=\"color:#1565C0\"><b>bleu</b></span> = énergie mécanique. Si tu travailles en niveaux de gris, **écris** aussi le mot (info / élec / méca) sur la flèche.",
      consigne: "<p class=\"petit\">Le diagramme de flux est celui de la question 5 (chaînes d'information et d'énergie) : colle ici une capture de ce diagramme complété et colorié.</p>",
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },

    { t: "bandeau", id: "p4", titre: "Analyse comportementale", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "diagramme", q: "Q7", lab: "Q7", titre: "Diagramme d'états à compléter",
      bac: "**Compléter** le diagramme d'états en utilisant les termes suivants : <i>Piloter le variateur pour maintenir le couple ; Piloter le variateur pour ouvrir en suivant un profil de vitesse ; Véhicule passé ; barrière verticale ; barrière horizontale</i>.",
      ref: "**Place** les termes dans le diagramme d'états : les termes qui décrivent ce que fait le système (« Piloter le variateur… ») vont <b>dans les états</b> (après do /), les termes qui décrivent un événement (« Véhicule passé », « barrière verticale », « barrière horizontale ») vont <b>sur les transitions</b> (flèches).",
      figure: { src: "../assets/img/s1_bar_stm_eleve.png", alt: "Diagramme d'états de la barrière Sympact avec des états et des transitions à compléter : mode automatique, barrière ouverte, fermeture barrière, barrière fermée, ouverture barrière.", legende: "Diagramme d'états à compléter." },
      drawio: "../docs/drawio/Diagramme_etats_depart.drawio" },

    { t: "retenir", q: "RET", titre: "À retenir", aide: "Écris le mot qui manque.", items: [
      ["Relation UML entre cas d'utilisation : cas **obligatoire** inclus dans un autre", "ret_include"],
      ["Relation UML : cas **optionnel** qui étend un autre", "ret_extend"],
      ["Couleur du flux d'information sur les diagrammes de flux", "ret_vert"],
      ["Fonction de la chaîne d'énergie qui transforme l'électricité en rotation", "ret_convertir"]
    ] },
    { t: "autoeval", items: [
      "compléter un diagramme des cas d'utilisation (acteurs, cas, include / extend)",
      "identifier la source d'énergie et le convertisseur d'un système",
      "compléter une chaîne d'énergie et d'information",
      "distinguer et colorier les flux (information, énergie électrique, énergie mécanique)",
      "compléter un diagramme d'états (états, transitions)"
    ] }
  ]
};
