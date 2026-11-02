/* Activité — Hemo-mixer — 1re SI, S1 Analyse fonctionnelle (01/09/2026)
   Énoncés repris du PDF d'Henri (Act_AF_Hemomixer.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "act_af_hemomixer", fichier: "Act_AF_Hemomixer", court: "Hemo-mixer · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Activité : Hemo-mixer",
  sous: "Analyser les systèmes pluri-technologiques — besoin, énergie, exigences et flux d'un automate de prélèvement sanguin",
  blocs: [
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Présentation du système", html:
        "<p>Le système pédagogique est issu de l'automate de prélèvement sanguin « HEMO-MIXER », conçu et réalisé par la société « HEMOPHARM ». L'HEMO-MIXER est un automate de prélèvement dédié aux collectes mobiles. Cet appareil est utilisé pendant la phase de prélèvement de sang.</p>" +
        "<p>L'automate pédagogique reprend en tous points la partie mécatronique des deux fonctions principales (composants identiques à la version réelle). Les deux dispositifs sont pilotés par une carte à microcontrôleur mais par une interface de pilotage et acquisition fonctionnant sur PC (liaison avec l'automate par câble USB).</p>" +
        "<p>Cette architecture permet également d'acquérir l'ensemble des grandeurs physiques lors d'un cycle complet grâce à une carte d'acquisition National Instruments implantée dans l'automate.</p>" },
      { t: "figure", id: "fig-photo", src: "../assets/img/s1_hem_photo.jpg", alt: "Hemo-mixer du laboratoire : potence avec poche de sang, plateau d'agitation et clavier.", legende: "L'Hemo-mixer pédagogique.", largeur: "220px" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> les diagrammes à compléter se font avec le fichier draw.io de départ (ou sur papier) puis tu **colles** une capture ; les réponses rédigées se tapent directement. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "Analyse du besoin", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Diagramme des cas d'utilisation à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Personnel médical ; Donneur ; Prélever le sang automatiquement ; Poche hermétique ; agitant le plateau</i>.",
      ref: "**Place** chaque élément de la liste dans une case vide du diagramme : les <b>acteurs</b> (personnel médical, donneur, poche hermétique), le <b>cas principal</b> (prélever le sang automatiquement) et le complément de phrase « … en agitant le plateau ».",
      figure: { src: "../assets/img/s1_hem_ucd_eleve.png", alt: "Diagramme des cas d'utilisation de l'Hemo-mixer : cas Peser le prélèvement, Clamper le tube, avec des acteurs et un ovale vides.", legende: "Diagramme des cas d'utilisation à compléter." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "q", id: "Q2", lab: "Q2", bac: "Sur la flèche « Clamper le tube », **déterminer** en le justifiant si cela représente une inclusion « include » ou une extension « extend ».", ref: "**Regarde** la flèche en pointillés qui arrive sur « Clamper le tube ». **Dis** si c'est un « include » (étape <b>obligatoire</b> du prélèvement) ou un « extend » (étape <b>optionnelle</b>). **Justifie** en une phrase." },
    { t: "zone", q: "Q2", label: "Include ou extend ? Justification", lignes: 3 },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Allumer** le PC et **mettre** sous tension le système. Dans la barre de Windows, **rechercher** le logiciel « Hemomixer ». **Appeler** le professeur.", ref: "En salle : **allume** le PC, **mets** le système sous tension, **ouvre** le logiciel « Hemomixer » et **appelle** le professeur. **Note** ici ce que tu observes au lancement d'un cycle." },
    { t: "zone", q: "Q3", label: "Observations au lancement (validation du professeur)", lignes: 2 },

    { t: "bandeau", id: "p2", titre: "Analyse de la source d'énergie du système", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "q", id: "Q4", lab: "Q4", bac: "D'après vous, quels types d'énergie sont fournis au système pour qu'il fonctionne ?", ref: "**Indique** le ou les types d'énergie qui arrivent à l'automate." },
    { t: "zone", q: "Q4", label: "Types d'énergie fournis", lignes: 2 },
    { t: "q", id: "Q5", lab: "Q5", bac: "Sur le système, quelle est la source d'énergie ? Pensez-vous que la source d'énergie soit la même dans le laboratoire SI et dans les laboratoires de prélèvement sanguin ? **Expliquez** pourquoi.", ref: "a) **Indique** d'où vient l'énergie de l'automate du laboratoire. b) Lors d'une collecte mobile (camion, salle des fêtes…), est-ce la même source ? **Explique**." },
    { t: "zone", q: "Q5", label: "Source d'énergie : laboratoire et collecte mobile", lignes: 3 },
    { t: "q", id: "Q6", lab: "Q6", bac: "Quel est le mouvement du « dispositif de pesage et d'agitation » lors du prélèvement ?", ref: "**Observe** le plateau pendant un cycle : **décris** son mouvement (rotation ? translation ? balancement ? dans quel sens ?)." },
    { t: "zone", q: "Q6", label: "Mouvement du plateau de pesage et d'agitation", lignes: 2 },
    { t: "q", id: "Q7", lab: "Q7", bac: "Quel est le nom du composant permettant de convertir une énergie électrique en énergie mécanique de rotation ?", ref: "**Nomme** le composant qui transforme l'électricité en rotation." },
    { t: "zone", q: "Q7", label: "Composant convertisseur électrique → rotation", lignes: 1 },

    { t: "bandeau", id: "p3", titre: "Identification de composants réalisant certaines exigences", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "diagramme", q: "Q8", lab: "Q8", titre: "Diagramme d'exigences à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Buzzer ; LEDs ; Afficheur LCD ; Microcontrôleur ; Touche de clavier ; Dispositif de pesage et d'agitation de prélèvement ; Dispositif de clampage de la tubulure</i>.",
      ref: "Dans le diagramme d'exigences (deux figures ci-dessous), des blocs « satisfy » sont vides : **place** chaque composant de la liste en face de l'exigence qu'il réalise (signaler une alarme → buzzer, afficher → afficheur LCD, etc.). **Colle** une capture du diagramme complété.",
      figure: { src: "../assets/img/s1_hem_req_eleve.png", alt: "Diagramme d'exigences de l'Hemo-mixer (première partie) avec des blocs satisfy vides.", legende: "Diagramme d'exigences à compléter (1/2)." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "figure", id: "fig-req2", src: "../assets/img/s1_hem_req2_eleve.png", alt: "Diagramme d'exigences de l'Hemo-mixer (seconde partie) avec des blocs satisfy vides.", legende: "Diagramme d'exigences à compléter (2/2)." },

    { t: "bandeau", id: "p4", titre: "Analyse des flux", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "diagramme", q: "Q9", lab: "Q9", titre: "Diagramme de blocs (chaîne d'énergie) à compléter",
      bac: "**Compléter** le diagramme de blocs suivant avec les éléments suivants : <i>Énergie électrique ; Énergie mécanique de translation ; Énergie mécanique de rotation</i>.",
      ref: "Sur les flèches vides de la chaîne d'énergie, **écris** le type d'énergie qui circule : électrique au début, puis mécanique de rotation (après le moteur), puis mécanique de translation (après le mécanisme). **Colle** une capture.",
      figure: { src: "../assets/img/s1_hem_chaine_eleve.png", alt: "Chaîne d'énergie de l'Hemo-mixer : blocs Alimenter, Distribuer, Convertir, Transmettre, Agir avec des cases vides pour les énergies.", legende: "Diagramme de blocs à compléter." },
      drawio: "../docs/drawio/Chaine_energie_information_depart.drawio" },
    { t: "diagramme", q: "Q10", lab: "Q10", titre: "Diagramme de flux à compléter",
      bac: "**Compléter** le diagramme de flux suivant. **Repasser** en : vert, le flux d'information ; rouge, le flux d'énergie électrique ; bleu, le flux d'énergie mécanique.",
      ref: "Sur le diagramme de blocs interne, **colorie** chaque liaison : <span style=\"color:#2E7D32\"><b>vert</b></span> = information, <span style=\"color:#C62828\"><b>rouge</b></span> = énergie électrique, <span style=\"color:#1565C0\"><b>bleu</b></span> = énergie mécanique (en niveaux de gris, **écris** aussi info / élec / méca). **Colle** une capture.",
      figure: { src: "../assets/img/s1_hem_ibd_eleve.png", alt: "Diagrammes de blocs internes de l'Hemo-mixer (fin de la question 9 et diagramme de flux de la question 10) avec des cases et liaisons à compléter.", legende: "Diagramme de flux à compléter (la partie haute termine le diagramme de la question 9)." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },

    { t: "autoeval", items: [
      "compléter un diagramme des cas d'utilisation (acteurs, cas, include / extend)",
      "identifier la source d'énergie et le convertisseur d'un système",
      "associer des composants aux exigences (satisfy)",
      "compléter une chaîne d'énergie et colorier les flux (information, électrique, mécanique)"
    ] }
  ]
};
