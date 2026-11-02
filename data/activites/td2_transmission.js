/* TD 2 : transmission et rapport de réduction — 1re SI, S3 Énergie, séance 4 (5/11/2026)
   Parties I et II communes (_transmission_commun.js) + partie III (fenêtre de toit motorisée). Contenu ÉLÈVE uniquement. */
window.ACTIVITE = {
  id: "td2_transmission", fichier: "TD2_Transmission", court: "TD 2 Transmission · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD · 45 min",
  titre: "TD 2 : transmission et rapport de réduction",
  sous: "Sens de rotation, trains d'engrenages, roue et vis sans fin, chaîne",
  blocs: [
    { t: "encadre", titre: "Situation", html: "<p>Entre le moteur et l'effecteur, la fonction <b>TRANSMETTRE</b> adapte la vitesse et le couple : le moteur tourne vite, l'effecteur (roue, axe de télescope, fenêtre) doit tourner lentement. On étudie quatre transmissions réelles.</p><p class=\"pb\"><b>Problématique : comment calculer la fréquence de rotation de sortie d'un réducteur à partir des nombres de dents de ses roues ?</b></p>" },
    { t: "cr", partie: "Problématique" }
  ].concat(window.TRANS_COMMUN("I"), [
    { t: "bandeau", id: "s3", titre: "III — Fenêtre de toit motorisée (Velux Integra® Solar)", comp: "SI-MOD-03 · SI-ANA-02", cr: "Résultats" },
    { t: "html", html: "<p>L'ouvrant de la fenêtre est poussé par une <b>chaîne</b> rigide. Un moteur alimenté par une batterie (rechargée par un panneau solaire) entraîne la chaîne par l'intermédiaire d'un réducteur : une vis motrice puis trois engrenages. Rendements donnés par le constructeur : partie électrique (carte électronique et moteur, fonctions DISTRIBUER et CONVERTIR) <b>η_{DC} = 0,77</b> ; transmission (fonction TRANSMETTRE) <b>η_{T} = 0,22</b>. Le pignon de chaîne 5 (Z_{5} = 7 dents, pas p = 12,7 mm) a pour diamètre primitif Dp_{5} = \\frac{p}{sin(180°/Z_{5})} ≈ 29,3 mm.</p>" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig4", src: "../assets/img/trans_photo_velux.png", largeur: "300px", alt: "Structure de la motorisation de la fenêtre (vue 3D du constructeur).", legende: "Figure 4 – Structure de la motorisation (vue 3D du constructeur)." },
      { t: "figure", id: "fig5", src: "../assets/img/trans_velux_chaine.png", alt: "Structure interne de la motorisation : vis 1 (1 filet) / roue 1′ (40 dents), pignon 2 (14) / roue 2′ (55), pignon 3 (22) / roue 3′ (35), pignon 4 (11) / roue 4′ (43), pignon de chaîne 5 (7 dents).", legende: "Figure 5 – Structure interne de la motorisation : nombres de dents de chaque étage." } ] },
    { t: "q", id: "Q11", lab: "Q11", bac: "**Calculer** le rapport de transmission de chaque étage (fraction puis valeur décimale à 3 chiffres significatifs).", ref: "Pour chaque ligne du tableau : r = \\frac{Z_{menante}}{Z_{menée}} (les deux Z sont donnés). **Écris** la fraction puis le nombre à virgule." },
    { t: "grille", q: "Q11", titre: "Q11", entetes: ["Étage", "Z menante", "Z menée", "r (fraction)", "r (décimal)"], lignes: [
      [{ txt: "<b>1</b> : vis 1 / roue 1′", cls: "fixe g" }, { txt: "1" }, { txt: "40" }, { champ: "Q11_r1_f", ph: "… / …" }, { champ: "Q11_r1_d", num: true }],
      [{ txt: "<b>2</b> : pignon 2 / roue 2′", cls: "fixe g" }, { txt: "14" }, { txt: "55" }, { champ: "Q11_r2_f", ph: "… / …" }, { champ: "Q11_r2_d", num: true }],
      [{ txt: "<b>3</b> : pignon 3 / roue 3′", cls: "fixe g" }, { txt: "22" }, { txt: "35" }, { champ: "Q11_r3_f", ph: "… / …" }, { champ: "Q11_r3_d", num: true }],
      [{ txt: "<b>4</b> : pignon 4 / roue 4′", cls: "fixe g" }, { txt: "11" }, { txt: "43" }, { champ: "Q11_r4_f", ph: "… / …" }, { champ: "Q11_r4_d", num: true }] ] },
    { t: "q", id: "Q12", lab: "Q12", bac: "**Calculer** le rapport global de transmission r_{g} (arbre moteur → pignon de chaîne 5).", ref: "Les quatre étages sont en cascade : r_{g} = r_{1} × r_{2} × r_{3} × r_{4}. **Donne** le résultat sous la forme \\frac{1}{k}." },
    { t: "q", id: "Q13", lab: "Q13", bac: "**Calculer** le rendement global de la motorisation (batterie → chaîne).", ref: "Le rendement global est le produit des rendements : η_{g} = η_{DC} × η_{T}. **Exprime**-le aussi en %." },
    { t: "tableau3", titre: "Q12 et Q13", lignes: [
      { id: "Q12", lab: "Q12", grandeur: "Rapport global de transmission (moteur → pignon de chaîne 5)", sym: "r_{g}" },
      { id: "Q13", lab: "Q13", grandeur: "Rendement global de la motorisation (batterie → chaîne)", sym: "η_{g}" } ] },
    { t: "q", id: "Q14", lab: "Q14", bac: "Quel étage réduit le plus la vitesse ?", ref: "**Compare** les quatre valeurs de r de la Q11 : le plus petit r réduit le plus." },
    { t: "zone", q: "Q14", lignes: 1 },
    { t: "q", id: "Q15", lab: "Q15", cr: "Analyse", bac: "Quelle part de la puissance prélevée à la batterie arrive à la chaîne ? Que devient le reste, et quel élément en est surtout responsable ?", ref: "a) La part qui arrive = η_{g} (Q13) en %. b) Le reste est perdu : sous quelle forme ? c) **Compare** η_{DC} et η_{T} : lequel est le plus faible ? Dans la transmission, quel système perd le plus (pense à la vis sans fin) ?" },
    { t: "zone", q: "Q15", lignes: 3 },
    window.TRANS_RETENIR
  ])
};
