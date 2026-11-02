/* TD 1 — Vélo à assistance électrique (SysML) — 1re SI, S1 Analyse fonctionnelle (20/08/2026)
   Énoncés repris du PDF d'Henri (01_TD1_VAE_SYSMl2.pdf, document numérisé). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "td1_vae_sysml", fichier: "TD1_VAE_SysML", court: "TD 1 VAE SysML · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Travaux dirigés — Exercice 1 : vélo à assistance électrique",
  sous: "Analyser les systèmes pluri-technologiques — lire les diagrammes SysML d'un VAE (cas d'utilisation, exigences, blocs, blocs internes)",
  blocs: [
    { t: "methode", html: "<b>Méthode :</b> chaque question se lit sur le diagramme qui la précède. **Réponds** par des phrases courtes en reprenant les mots du diagramme. Les verbes d'action sont en gras. Le dernier diagramme (chaînes d'énergie et d'information) se complète avec le fichier draw.io ou sur papier, puis tu **colles** une capture." },

    { t: "bandeau", id: "p1", titre: "1 — Diagramme de « cas d'utilisation » du VAE", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "figure", id: "fig-ucd", src: "../assets/img/s1_vae_ucd.png", alt: "Diagramme des cas d'utilisation du vélo à assistance électrique : acteurs Cycliste, Utilisateur Rechargeur, Réseau routier, Chargeur Batterie ; cas Se déplacer, Se déplacer avec une assistance (extend), Activer l'éclairage (extend, Luminosité), Sélectionner un rapport de vitesse (include), Se déplacer en rechargeant la batterie (extend), Sélectionner un niveau d'assistance (include), Recharger facilement la batterie, Sélectionner un niveau de régénération (include).", legende: "Diagramme des cas d'utilisation du VAE." },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Donner** la fonction principale du vélo à assistance électrique (« le système permet à l'acteur de … »). **Donner** les fonctions complémentaires de ce système qui lui permettent de se différencier d'un autre type de vélo (« le système permet aussi à l'acteur de … »).", ref: "a) **Écris** la fonction principale sous la forme « Le VAE permet au cycliste de … » (c'est le cas d'utilisation central). b) **Liste** les fonctions en plus par rapport à un vélo classique, sous la forme « Le VAE permet aussi à … de … » (regarde les cas reliés par « extend » et « include »)." },
    { t: "zone", q: "Q1", label: "Fonction principale et fonctions complémentaires", lignes: 5, ph: "Le VAE permet au cycliste de …\nLe VAE permet aussi à … de …" },
    { t: "q", id: "Q2", lab: "Q2", bac: "Quelle est la différence entre « extend » et « include » ? **Donner** un exemple.", ref: "**Explique** : « include » = le cas est <b>toujours</b> réalisé avec l'autre (obligatoire) ; « extend » = le cas est réalisé <b>parfois</b>, sous condition (optionnel). **Donne** un exemple de chaque pris sur le diagramme." },
    { t: "zone", q: "Q2", label: "Différence extend / include et exemple", lignes: 4 },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Citer** les différents acteurs de ce système : acteur humain et acteur matériel.", ref: "**Relève** les acteurs (bonshommes et boîtes « actor » autour du cadre) et **classe**-les : humains / matériels." },
    { t: "zone", q: "Q3", label: "Acteurs humains et acteurs matériels", lignes: 3 },
    { t: "q", id: "Q4", lab: "Q4", bac: "En vous aidant des informations présentées sur le diagramme, **rédiger** une description de chacun des cas d'utilisation du vélo à assistance électrique.", ref: "Pour chaque ovale du diagramme, **écris** une phrase qui dit ce que fait le vélo pour l'utilisateur (une ligne par cas d'utilisation)." },
    { t: "zone", q: "Q4", label: "Description de chaque cas d'utilisation", lignes: 8, ph: "Se déplacer : …\nSe déplacer avec une assistance : …" },

    { t: "bandeau", id: "p2", titre: "2 — Diagramme d'« exigences » du VAE", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "figure", id: "fig-req", src: "../assets/img/s1_vae_req.png", alt: "Diagramme d'exigences du VAE : exigence système Vélo à assistance électrique, exigences Assister au pédalage et Procéder à la régénération de la batterie, sous-exigences (respecter les normes, être autonome, gérer le niveau d'assistance, gérer le niveau de régénération, limiter la puissance max, gérer le couple d'assistance, niveaux d'assistance et de régénération) et blocs Batteries, Moteur 250 W, Console de gestion.", legende: "Diagramme d'exigences du VAE (remarque : console de gestion = tableau de bord + microcontrôleur)." },
    { t: "q", id: "Q5", lab: "Q5", bac: "Quelles sont les sous-exigences de l'exigence « Assister au pédalage » ? **Citer** les composants permettant de réaliser ces sous-exigences. **Donner** un exemple d'exigence de même niveau.", ref: "a) **Liste** les exigences placées sous « Assister au pédalage » (reliées à elle). b) Pour chacune, **cite** le composant relié par « satisfy ». c) **Donne** une exigence qui est au même niveau qu'« Assister au pédalage » (même rang dans l'arbre)." },
    { t: "zone", q: "Q5", label: "Sous-exigences, composants, exigence de même niveau", lignes: 6 },
    { t: "q", id: "Q6", lab: "Q6", bac: "Quel type de relation utilise-t-on pour indiquer qu'une exigence précise les valeurs numériques d'une autre exigence ? **Donner** un exemple.", ref: "**Trouve** sur le diagramme le nom de la relation (écrit entre « » sur la flèche) entre une exigence et celle qui lui donne des <b>chiffres</b> (puissance, autonomie…). **Cite** un exemple avec les deux exigences." },
    { t: "zone", q: "Q6", label: "Relation « précise les valeurs numériques » et exemple", lignes: 3 },
    { t: "q", id: "Q7", lab: "Q7", bac: "Quel type de relation utilise-t-on pour indiquer qu'une exigence précise les éléments d'une autre exigence ? **Donner** un exemple.", ref: "**Trouve** le nom de la relation entre une exigence et celle qui en <b>découle</b> / la détaille (sans chiffres). **Cite** un exemple avec les deux exigences." },
    { t: "zone", q: "Q7", label: "Relation « précise les éléments » et exemple", lignes: 3 },

    { t: "bandeau", id: "p3", titre: "3 — Diagramme de blocs (bdd)", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "figure", id: "fig-bdd", src: "../assets/img/s1_vae_bdd.png", alt: "Diagramme de définition de blocs du VAE : bloc Vélo E-Bike ; blocs Structure du vélo, Boîtier de contrôle, Roue avant, Roue arrière, Batterie, Pédalier, Transmission primaire, Boîte de vitesse, Bloc d'assistance, Boîtier de commande de la boîte de vitesse, reliés par des losanges de composition ou d'agrégation ; la roue avec diamètre 654 mm et la multiplicité 2.", legende: "Diagramme de définition de blocs du VAE." },
    { t: "q", id: "Q8", lab: "Q8", bac: "**Donner** les éléments ayant un lien de composition avec le système.", ref: "**Relève** les blocs reliés au vélo par un losange <b>plein</b> (noir) : ce sont les parties qui composent le vélo et ne peuvent pas exister sans lui." },
    { t: "zone", q: "Q8", label: "Éléments en composition (losange plein)", lignes: 3 },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Citer** les éléments ayant un lien d'agrégation avec le système, et **expliquer** pourquoi.", ref: "**Relève** les blocs reliés par un losange <b>vide</b> (blanc) : agrégation. **Explique** pourquoi : ces éléments peuvent exister séparément du vélo (ils peuvent être enlevés ou remplacés)." },
    { t: "zone", q: "Q9", label: "Éléments en agrégation (losange vide) et explication", lignes: 3 },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-roue", src: "../assets/img/s1_vae_roue.png", alt: "Extrait : lien vers le bloc Roue avec la multiplicité 2.", legende: "Extrait du bdd : la multiplicité « 2 ».", largeur: "240px" },
      { t: "q", id: "Q10", lab: "Q10", bac: "**Expliquer** pourquoi nous n'avons pas le « bloc roue ». Que signifie le chiffre « 2 » sur la flèche ?", ref: "Il y a « Roue avant » et « Roue arrière » mais pas de bloc « Roue » seul : **explique** pourquoi. Le chiffre 2 à côté de la flèche est une <b>multiplicité</b> : **dis** ce qu'il signifie (combien de roues ?)." }
    ] },
    { t: "zone", q: "Q10", label: "Bloc roue et signification du chiffre 2", lignes: 3 },

    { t: "bandeau", id: "p4", titre: "4 — Diagramme de blocs interne (ibd)", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "figure", id: "fig-ibd", src: "../assets/img/s1_vae_ibd.png", alt: "Diagramme de blocs interne du VAE : blocs Pédalier, Chaîne Pignon, Roue libre, Roue, Batterie, Variateur, Moteur brushless, Tableau de bord, Microcontrôleur, Jauge de contraintes (capteur d'effort), Capteurs à effet Hall (capteurs vitesse), Console de pilotage, Bus CAN ; flux d'énergie mécanique (cycliste → pédalier → chaîne → roue libre → roue), d'énergie électrique (chargeur → batterie → variateur → moteur) et d'informations (commande cycliste, signal commande moteur, vitesse et effort moteur, informations affichées).", legende: "Diagramme de blocs interne du VAE." },
    { t: "q", id: "Q11", lab: "Q11", bac: "**Donner** les éléments qui permettent : l'échange d'énergie ou de matière ; l'échange d'information.", ref: "Sur l'ibd, **classe** les blocs en deux groupes : ceux qui font passer de l'<b>énergie</b> (pédalier, chaîne, batterie, moteur…) et ceux qui font passer de l'<b>information</b> (capteurs, microcontrôleur, tableau de bord…)." },
    { t: "zone", q: "Q11", label: "Éléments d'échange d'énergie / d'échange d'information", lignes: 4, ph: "Énergie : …\nInformation : …" },
    { t: "diagramme", q: "Q12", lab: "Q12", titre: "Chaîne d'énergie et d'information à compléter",
      bac: "**Compléter** la chaîne d'énergie et d'information suivante à l'aide du diagramme de blocs.",
      ref: "Dans chaque bloc vide de la chaîne d'information (en haut : acquérir, traiter, communiquer) et de la chaîne d'énergie (en bas : alimenter, distribuer, convertir, transmettre), **écris** la fonction et le composant du VAE qui la réalise (pris dans l'ibd). Sur les flèches, **écris** ce qui circule. **Colle** une capture.",
      figure: { src: "../assets/img/s1_vae_chaines_eleve.png", alt: "Chaînes d'information (en haut, trois blocs) et d'énergie (en bas, quatre blocs) du VAE, vides, à compléter.", legende: "Chaîne d'énergie et d'information à compléter." },
      drawio: "../docs/drawio/Chaine_energie_information_depart.drawio" },

    { t: "retenir", q: "RET", titre: "À retenir", aide: "Écris le mot qui manque.", items: [
      ["Relation entre cas d'utilisation : cas **obligatoire**", "ret_include"],
      ["Relation entre cas d'utilisation : cas **optionnel**", "ret_extend"],
      ["Relation d'exigences : une exigence **découle** d'une autre", "ret_derive"],
      ["Relation d'exigences : un **composant** réalise une exigence", "ret_satisfy"],
      ["Lien bdd à losange **plein** (la partie n'existe pas sans le tout)", "ret_composition"],
      ["Lien bdd à losange **vide** (la partie peut exister seule)", "ret_agregation"]
    ] },
    { t: "autoeval", items: [
      "lire un diagramme des cas d'utilisation (fonction principale, acteurs, include / extend)",
      "lire un diagramme d'exigences (refine, deriveReqt, satisfy)",
      "lire un diagramme de définition de blocs (composition, agrégation, multiplicité)",
      "lire un diagramme de blocs interne et en déduire les chaînes d'énergie et d'information"
    ] }
  ]
};
