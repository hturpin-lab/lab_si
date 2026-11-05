/* TD Perceuse (suite) : rapport de réduction — 1re SI, S3 Énergie, séance 4 (5/11/2026)
   Partie C seule (roue et vis sans fin) : les parties A et B, identiques au TD 2, ne sont plus que dans le TD 2 (demande d'Henri, 5/11). Méthode et « À retenir » communs (_transmission_commun.js). Contenu ÉLÈVE uniquement. */
window.ACTIVITE = {
  id: "td_perceuse_transmission", fichier: "TD_Perceuse_Transmission", court: "TD Perceuse (suite) · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD · 20 min",
  titre: "TD Perceuse (suite) — roue et vis sans fin",
  sous: "Justifier le rapport de réduction d'un motoréducteur à deux étages (après le TD 2)",
  blocs: [
    { t: "encadre", titre: "Situation", html: "<p>Dans la perceuse (séance 3), un <b>réducteur</b> adapte la fréquence de rotation du moteur à celle du foret. Après le <b>TD 2</b>, on applique la méthode à un motoréducteur à deux étages roue et vis sans fin pour <b>justifier</b> une donnée constructeur.</p><p class=\"pb\"><b>Problématique : comment calculer la fréquence de rotation de sortie d'un réducteur à partir des nombres de dents de ses roues ?</b></p>" },
    { t: "cr", partie: "Problématique" }
  ].concat([window.TRANS_COMMUN("A")[0]], [
    { t: "bandeau", id: "s3", titre: "Rapport de réduction avec roues et vis sans fin", comp: "SI-MOD-03 · SI-ANA-02", cr: "Résultats" },
    { t: "html", html: "<p><b>Donnée constructeur</b> du motoréducteur :</p>" },
    { t: "donnees", lignes: [["Réducteur à deux étages — rapport de réduction des vitesses", "R_{réd} = \\frac{1}{1 085}"], ["Rendement", "η_{réd} = 0,16"]] },
    { t: "ligne", blocs: [
      { t: "html", html: "<p>Le moteur électrique est accouplé à un <b>réducteur à roues et vis sans fin à 2 étages</b> (vue éclatée ci-contre) :</p><ul><li>le <b>1er étage</b> est composé de la vis moteur <b>1</b> (z_{1} = 1 filet) et de la roue <b>4</b> (z_{4} = 31 dents) ;</li><li>le <b>2e étage</b> est composé de la vis <b>3</b> (z_{3} = 1 filet) et de la roue <b>2</b> (z_{2} = 35 dents) ;</li><li>la roue 4 et la vis 3 sont sur le même arbre ; l'arbre <b>48</b>, solidaire de la roue 2, est accouplé au bras 1.</li></ul>" },
      { t: "figure", id: "fig4", src: "../assets/img/trans_photo_motoreducteur.png", largeur: "260px", alt: "Vue éclatée du motoréducteur (document constructeur) : vis moteur 1, roue 4, vis 3, roue 2, arbre 48.", legende: "Figure 4 – Vue éclatée du motoréducteur (document constructeur)." } ] },
    { t: "figure", id: "fig5", src: "../assets/img/trans_motoreducteur_2_etages.png", largeur: "640px", alt: "Schéma de principe des deux étages roue et vis sans fin : vis 1 (1 filet) → roue 4 (31 dents) ; vis 3 (1 filet) → roue 2 (35 dents).", legende: "Figure 5 – Schéma de principe des deux étages roue et vis sans fin." },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Calculer** le rapport de réduction du 1er étage (vis 1 → roue 4).", ref: "Pour une vis sans fin, Z = nombre de filets. r_{1} = \\frac{z_{1}}{z_{4}} = \\frac{1}{31}." },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Calculer** le rapport de réduction du 2e étage (vis 3 → roue 2).", ref: "r_{2} = \\frac{z_{3}}{z_{2}} = \\frac{1}{35}." },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Calculer** le rapport global et **justifier** la valeur constructeur R_{réd}.", ref: "Les deux étages sont en cascade : R_{réd} = r_{1} × r_{2}. **Compare** le résultat à \\frac{1}{1 085}." },
    { t: "tableau3", titre: "Q1 à Q3", lignes: [
      { id: "Q1", lab: "Q1", grandeur: "Rapport de réduction du 1er étage (vis 1 → roue 4)", sym: "r_{1}" },
      { id: "Q2", lab: "Q2", grandeur: "Rapport de réduction du 2e étage (vis 3 → roue 2)", sym: "r_{2}" },
      { id: "Q3", lab: "Q3", grandeur: "Rapport global : justifier la valeur constructeur", sym: "R_{réd}" } ] },
    { t: "q", id: "Q4", lab: "Q4", cr: "Analyse", bac: "Pourquoi le rendement de ce réducteur (0,16) est-il bien plus faible que celui d'un réducteur à engrenages droits (≈ 0,9 par étage) ? Que devient la puissance perdue ?", ref: "Dans un système roue et vis sans fin, les filets de la vis **glissent** sur les dents de la roue. **Explique** ce que ce glissement provoque (frottements) et sous quelle forme part la puissance perdue (84 % !)." },
    { t: "zone", q: "Q4", lignes: 4 },
    window.TRANS_RETENIR
  ])
};
