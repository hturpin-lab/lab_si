/* TD 1 — Algorithme et algorigramme — 1re SI, S2 Comportement (séance 1, 17/09/2026)
   Énoncés repris du PDF d'Henri (TD1_algorithme_algorigramme.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "td1_algorigramme", fichier: "TD1_Algorigramme", court: "TD 1 Algorigramme · 1re SI", sequence: "s2",
  classe: "1re SI", seq: "S2 · Comportement séquentiel",
  titre: "TD 1 — Algorithme et algorigramme",
  sous: "Modéliser les systèmes pluri-technologiques — traduire un fonctionnement en algorigramme puis en algorithme",
  blocs: [
    { t: "encadre", titre: "Définitions", html:
      "<p><b>ALGORITHME</b> : c'est une suite d'instructions élémentaires (règles), qui s'appliquent dans un ordre déterminé pour fournir un résultat. <i>(Exemple : suivre une recette de cuisine.)</i></p>" +
      "<p><i>Exemple</i> : l'algorithme suivant calcule et affiche le carré des nombres de 1 à 10.</p>" +
      "<pre class=\"algo\">DÉBUT Calcul\n    Pour A de 1 à 10 par pas de 1\n        Stocker A^{2} dans B\n        Afficher B\nFIN Calcul</pre>" +
      "<p><b>ALGORIGRAMME</b> : c'est une représentation graphique de l'algorithme utilisant des symboles normalisés. En réalité c'est un diagramme qui permet de représenter et d'étudier le fonctionnement des systèmes.</p>" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-symboles", src: "../assets/img/s2_algo_symboles.png", alt: "Tableau des symboles d'algorigramme : début ou fin (ovale), traitement (rectangle), entrée ou sortie (parallélogramme), commentaire, test ou branchement conditionnel (losange), sous-programme, liaison (flèche).", legende: "Liste des symboles utilisés." },
      { t: "figure", id: "fig-structures", src: "../assets/img/s2_algo_structures.png", alt: "Structure linéaire (Début, Action 1, Action 2, Fin) et structure alternative (Début, Condition, Action 1 ou Action 2) avec l'algorithme correspondant : Si condition Alors Action 1 Sinon Action 2.", legende: "Les différentes structures : linéaire et alternative, avec leur écriture en Python (if / else)." }
    ] },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-tantque", src: "../assets/img/s2_algo_tantque.png", alt: "Boucle Tant que : on teste la condition ; si elle est respectée (OUI) on exécute les instructions à répéter puis on revient au test ; sinon (NON) on passe à la suite du programme.", legende: "Boucle « Tant que condition vraie, faire action » (Python : while)." },
      { t: "figure", id: "fig-pour", src: "../assets/img/s2_algo_pour.png", alt: "Boucle Pour : pour chaque item de la séquence, on teste si le dernier item est atteint ; NON : on exécute l'instruction et on recommence ; OUI : fin de la boucle FOR.", legende: "Boucle « Pour nombre d'itérations, faire action » (Python : for i in range(x))." },
      { t: "figure", id: "fig-erreurs", src: "../assets/img/s2_algo_erreurs.png", alt: "Erreurs à éviter : une flèche qui traverse un bloc ; une flèche qui repart d'un autre côté que le bas ; un test sans OUI et NON ; des traits obliques. Utiliser uniquement des traits horizontaux ou verticaux.", legende: "Attention aux erreurs : j'arrive par le dessus, je repars par le dessous ; d'une flèche on va ou on retourne à une autre flèche ; traits horizontaux ou verticaux seulement." }
    ] },
    { t: "methode", html: "<b>Méthode :</b> pour chaque système, tu complètes d'abord l'<b>algorigramme</b> (sur draw.io ou sur papier, puis tu colles une capture), puis tu écris l'<b>algorithme</b> correspondant (DÉBUT … FIN, avec Si / Alors / Sinon, Tant que, Attendre…). Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "1 — Le portail automatique du lycée", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "encadre", titre: "Situation", html: "<p>À l'entrée du lycée, il y a un portail automatique. Lorsque l'on appuie sur le bouton « Ouvrir », le portail s'ouvre puis se referme tout seul sans qu'on ne lui en donne l'ordre, après un temps de 5 secondes.</p>" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Compléter l'organigramme",
      bac: "<b>Compléter</b> l'organigramme du portail automatique.", ref: "<b>Complète</b> chaque case vide de l'organigramme (figure ci-dessous) : le losange est un <b>test</b> (question avec OUI / NON), les rectangles sont des <b>actions</b>. Pense à l'attente de 5 secondes avant la fermeture.",
      figure: { src: "../assets/img/s2_td1_portail_eleve.png", alt: "Organigramme à compléter : Début, un losange de test avec une boucle de retour, trois rectangles d'action, Fin.", legende: "Organigramme à compléter (portail du lycée).", largeur: "220px" },
      drawio: "../docs/drawio/Algorigramme_depart.drawio" },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Donner** l'algorithme correspondant.", ref: "**Écris** l'algorithme qui correspond à ton organigramme : une ligne par case, entre DÉBUT et FIN. Pour le test, utilise « Tant que … » ou « Si … Alors … »." },
    { t: "zone", q: "Q2", label: "Algorithme du portail du lycée", lignes: 7, ph: "DÉBUT\n…\nFIN" },

    { t: "bandeau", id: "p2", titre: "2 — Le portail automatique de magasin", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "encadre", titre: "Situation", html: "<p>Lorsqu'une personne est détectée devant la porte du magasin, la porte s'ouvre et reste ouverte pendant 10 secondes. Si une personne est détectée au bout de ces 10 secondes, la porte reste ouverte encore 5 secondes puis se referme, sinon elle se referme (au bout des 10 secondes).</p>" },
    { t: "diagramme", q: "Q3", lab: "Q3", titre: "Compléter l'organigramme",
      bac: "<b>Compléter</b> l'organigramme de la porte de magasin.", ref: "<b>Complète</b> les cases de l'organigramme ci-dessous. Il y a <b>deux tests</b> (deux losanges) : « une personne est-elle détectée ? » au début, puis à nouveau au bout de 10 secondes. Chaque test a une sortie OUI et une sortie NON.",
      figure: { src: "../assets/img/s2_td1_magasin_eleve.png", alt: "Organigramme à compléter : Début, un premier losange avec boucle de retour, deux rectangles, un second losange dont les deux sorties mènent à deux rectangles, Fin.", legende: "Organigramme à compléter (porte de magasin).", largeur: "300px" },
      drawio: "../docs/drawio/Algorigramme_depart.drawio" },
    { t: "q", id: "Q4", lab: "Q4", bac: "**Donner** l'algorithme correspondant.", ref: "**Écris** l'algorithme de la porte de magasin, ligne par ligne, avec « Attendre 10 s », « Si une personne est détectée Alors … Sinon … »." },
    { t: "zone", q: "Q4", label: "Algorithme de la porte de magasin", lignes: 8, ph: "DÉBUT\n…\nFIN" },

    { t: "bandeau", id: "p3", titre: "3 — Le portail SET", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "diagramme", q: "Q5", lab: "Q5", titre: "Compléter l'algorigramme avec les termes donnés",
      bac: "<b>Compléter</b> le diagramme avec les termes suivants, pour décrire le fonctionnement du système : <i>Allumer gyrophare ? · Activer moteur pour la fermeture · Arrêter le moteur · Arrêter le moteur · fin de course « fermé » activé ? · Télécommande activée</i>.", ref: "<b>Place</b> chacun des termes de la liste dans une case vide de l'algorigramme : les termes qui finissent par un <b>?</b> vont dans les <b>losanges</b> (tests), les autres dans les <b>rectangles</b> (actions). « Arrêter le moteur » est utilisé deux fois.",
      figure: { src: "../assets/img/s2_td1_set_eleve.png", alt: "Algorigramme du portail SET à compléter : Initialisation, test, activer le moteur pour l'ouverture, allumer l'éclairage, test du capteur de fin de course ouvert, attendre 12 s (passage du véhicule), puis cases vides pour la fermeture.", legende: "Algorigramme du portail SET à compléter.", largeur: "520px" },
      drawio: "../docs/drawio/Algorigramme_depart.drawio" },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Traduire** l'algorigramme en algorithme de fonctionnement.", ref: "**Écris** l'algorithme complet du portail SET à partir de l'algorigramme complété : une ligne par case, dans l'ordre, avec les tests écrits « Tant que … » ou « Si … Alors … »." },
    { t: "zone", q: "Q6", label: "Algorithme de fonctionnement du portail SET", lignes: 10, ph: "DÉBUT\nInitialisation\n…\nFIN" },

    { t: "bandeau", id: "p4", titre: "4 — La tondeuse", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "figure", id: "fig-tondeuse", src: "../assets/img/s2_td1_tondeuse_eleve.png", alt: "Algorigramme Taux de charge : N ← convertir la tension U2 ; si N > N75 alors vTauxCh = 100 ; sinon si N > N50 alors vTauxCh = 75 ; sinon si N > N25 alors vTauxCh = 50 ; sinon si N > N0 alors vTauxCh = 25 ; sinon vTauxCh = 0. À droite, le début de l'algorithme : constantes N75 = 3450, N50 = 3350, N25 = 3250, N0 = 2850 ; variables entier N, vTauxCh ; Début ; N ← convertir la tension U2 ; SI N > N75 ALORS…", legende: "Algorigramme « Taux de charge » de la tondeuse et début de l'algorithme à compléter." },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Compléter** l'algorithme de fonctionnement correspondant à l'algorigramme ci-dessus.", ref: "**Recopie** le début de l'algorithme donné à droite de la figure, puis **continue-le** en suivant l'algorigramme : chaque losange devient une ligne « SI N > … ALORS vTauxCh = … SINON … », jusqu'à « vTauxCh = 0 ». **Termine** par FIN." },
    { t: "zone", q: "Q7", label: "Algorithme « Taux de charge »", lignes: 12, ph: "ALGORITHME Taux_de_charge\nCONSTANTES N75 = 3450 ; N50 = 3350 ; N25 = 3250 ; N0 = 2850\nVARIABLES ENTIER : N, vTauxCh\nDébut\n  N ← convertir la tension U2\n  SI N > N75 ALORS …" },

    { t: "retenir", q: "RET", titre: "À retenir", aide: "Écris le mot qui manque.", items: [
      ["Symbole d'un **test** (question OUI / NON) dans un algorigramme", "ret_test"],
      ["Symbole d'une **action** (traitement)", "ret_action"],
      ["Structure qui répète des instructions tant qu'une condition est vraie", "ret_boucle"],
      ["Mot-clé qui ouvre une alternative dans un algorithme (… Alors … Sinon)", "ret_si"]
    ] },
    { t: "autoeval", items: [
      "lire un algorigramme et retrouver l'ordre des actions",
      "compléter un algorigramme avec les bons symboles (test, action, début / fin)",
      "traduire un algorigramme en algorithme (DÉBUT … FIN, Si / Alors / Sinon, Tant que)",
      "repérer une boucle (retour en arrière) et une attente (temporisation)"
    ] }
  ]
};
