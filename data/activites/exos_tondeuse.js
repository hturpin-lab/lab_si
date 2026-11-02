/* Exercices d'entraînement : tondeuse robot et pilote de bateau — 1re SI, S3 Énergie, séance 7 (17/11/2026)
   Contenu ÉLÈVE uniquement (repris du générateur exercices.js). Le tableau de simulation du moteur est une donnée de l'énoncé. */
window.ACTIVITE = {
  id: "exos_tondeuse", fichier: "Exercices_Tondeuse_Pilote", court: "Exercices Tondeuse · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · Exercices · 35 min",
  titre: "Entraînement : tondeuse robot et pilote de bateau",
  sous: "Lire une caractéristique de moteur, enchaîner puissances et rendements",
  blocs: [
    { t: "encadre", titre: "Objectif", html:
      "<p>**S'entraîner** avant la sommative du 19/11 : lire une caractéristique de moteur, enchaîner puissances et rendements, rédiger chaque calcul (<b>relation littérale → application numérique → résultat avec son unité</b>).</p>" +
      "<p><b>Partie A (≈ 20 min) :</b> Q1 à Q5 ; Q6 à Q8 pour aller plus loin. <b>Partie B (≈ 15 min) :</b> remédiation ou approfondissement.</p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-02 (puissance et énergie nécessaires), SI-MOD-02 (grandeurs d'entrée et de sortie), SI-MOD-03 (associer un modèle aux composants d'une chaîne de puissance).</i></p>" },

    { t: "bandeau", id: "sA", titre: "A — Tondeuse robot électrique", duree: "≈ 20 min", comp: "SI-ANA-02 · SI-MOD-02", cr: "Résultats" },
    { t: "html", html: "<p>Une tondeuse robot avance grâce à un moteur à courant continu, alimenté par une batterie, suivi d'un réducteur qui entraîne les roues. Le constructeur fournit la simulation de son moteur (tableau et figure 1).</p><p><b>Simulation du moteur</b> (alimenté sous U = 24 V) :</p><div class=\"tab-wrap\"><table class=\"grille\"><thead><tr><th>C (N·m)</th><th>N (tr/min)</th><th>P_{élec} = U × I (W)</th><th>P_{méca} = C × ω (W)</th><th>η = P_{méca} / P_{élec}</th></tr></thead><tbody><tr><td class=\"fixe\">0,000</td><td>6 216</td><td>17,6</td><td>0,0</td><td>0 %</td></tr><tr><td class=\"fixe\">0,012</td><td>6 091</td><td>26,0</td><td>7,9</td><td>30 %</td></tr><tr><td class=\"fixe\">0,031</td><td>5 905</td><td>38,6</td><td>19,1</td><td>49 %</td></tr><tr><td class=\"fixe\">0,068</td><td>5 532</td><td>63,7</td><td>39,3</td><td>62 %</td></tr><tr><td class=\"fixe\">0,105</td><td>5 159</td><td>88,8</td><td>56,7</td><td>64 %</td></tr><tr><td class=\"fixe\">0,136</td><td>4 848</td><td>109,8</td><td>69,0</td><td>63 %</td></tr><tr><td class=\"fixe\">0,179</td><td>4 413</td><td>139,1</td><td>82,7</td><td>59 %</td></tr><tr><td class=\"fixe\">0,241</td><td>3 792</td><td>180,9</td><td>95,6</td><td>53 %</td></tr><tr><td class=\"fixe\">0,309</td><td>3 108</td><td>227,0</td><td>100,5</td><td>44 %</td></tr><tr><td class=\"fixe\">0,370</td><td>2 486</td><td>268,9</td><td>96,4</td><td>36 %</td></tr><tr><td class=\"fixe\">0,432</td><td>1 865</td><td>310,7</td><td>84,4</td><td>27 %</td></tr><tr><td class=\"fixe\">0,488</td><td>1 305</td><td>348,4</td><td>66,7</td><td>19 %</td></tr><tr><td class=\"fixe\">0,537</td><td>808</td><td>381,9</td><td>45,4</td><td>12 %</td></tr><tr><td class=\"fixe\">0,580</td><td>373</td><td>411,2</td><td>22,7</td><td>6 %</td></tr><tr><td class=\"fixe\">0,617</td><td>0</td><td>436,4</td><td>0,0</td><td>0 %</td></tr></tbody></table></div>" },
    { t: "figure", id: "fig1", src: "../assets/img/tond_fig1_courbes_eleve.png", largeur: "420px", alt: "Caractéristiques du moteur en fonction du couple résistant : vitesse, puissances et rendement (courbes redessinées d'après le tableau).", legende: "Figure 1 – Caractéristiques du moteur en fonction du couple résistant (redessinées d'après le tableau)." },
    { t: "encadre", titre: "Données constructeur", cls: "pouce", html: "<p>• Batterie : capacité <b>Q = 17 A·h</b> sous <b>24 V</b>. • Vitesse de déplacement : <b>v = 0,5 m/s</b>. • Rayon des roues : <b>R = 120 mm</b>.</p><p>• Effort résistant à l'avancement : <b>F = 100 N</b>. • Rendement du réducteur : <b>η_{réd} = 90 %</b>. • Rendement du moteur : <b>η_{mot} = 64 %</b>.</p>" },
    { t: "figure", id: "fig2", src: "../assets/img/tond_fig2_chaine_tondeuse_eleve.png", largeur: "720px", alt: "Chaîne de puissance de la tondeuse : batterie (U, I, P_élec) → moteur (η_mot, C_mot, ω_mot, P_mot) → réducteur (η_réd, P_réd) → roues.", legende: "Figure 2 – Chaîne de puissance de la tondeuse (à compléter au fil des questions)." },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Exprimer** la puissance P_{réd} en sortie du réducteur en fonction de la puissance P_{élec} et des rendements η_{mot} et η_{réd}.", ref: "Chaque constituant ne transmet qu'une partie de la puissance qu'il reçoit : P_{sortie} = η × P_{entrée}. **Applique** la relation deux fois (moteur, puis réducteur)." },
    { t: "zone", q: "Q1", lignes: 1 },
    { t: "q", id: "Q2", lab: "Q2", bac: "À partir de la simulation du moteur, **relever** au point de fonctionnement où **η_{mot} = 64 %** : le couple moteur C_{mot}, la puissance électrique P_{élec} et la puissance mécanique P_{mot}.", ref: "**Cherche** la ligne du tableau où η = 64 % et **recopie** C, P_{élec} et P_{méca} de cette ligne." },
    { t: "grille", q: "Q2", titre: "Q2", entetes: ["C_{mot} (N·m)", "P_{élec} (W)", "P_{mot} (W)", "N (tr/min)"], lignes: [[{ champ: "Q2_C", num: true }, { champ: "Q2_Pe", num: true }, { champ: "Q2_Pm", num: true }, { champ: "Q2_N", num: true }]] },
    { t: "q", id: "Q3", lab: "Q3", bac: "**En déduire** l'intensité I absorbée par le moteur et sa vitesse angulaire ω_{mot}.", ref: "a) P_{élec} = U × I donc I = \\frac{P_{élec}}{24}. b) ω_{mot} = \\frac{2π × N}{60} avec N de la ligne relevée (**vérifie** que C × ω ≈ P_{mot})." },
    { t: "q", id: "Q4", lab: "Q4", bac: "**Calculer** la puissance mécanique P_{réd} en sortie du réducteur.", ref: "P_{réd} = η_{réd} × P_{mot} = 0,90 × P_{mot}." },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Calculer** le rendement global η_{g} de la chaîne.", ref: "η_{g} = η_{mot} × η_{réd} ; **vérifie** avec \\frac{P_{réd}}{P_{élec}}." },
    { t: "tableau3", titre: "Q3 à Q5", lignes: [
      { id: "Q3a", q: "Q3", lab: "Q3 a", grandeur: "Intensité absorbée par le moteur", sym: "I" },
      { id: "Q3b", q: "Q3", lab: "Q3 b", grandeur: "Vitesse angulaire du moteur", sym: "ω_{mot}" },
      { id: "Q4", lab: "Q4", grandeur: "Puissance en sortie du réducteur", sym: "P_{réd}" },
      { id: "Q5", lab: "Q5", grandeur: "Rendement global de la chaîne", sym: "η_{g}" } ] },
    { t: "html", html: "<p><b>Pour aller plus loin</b> (exploiter les données encore inutilisées)</p>" },
    { t: "q", id: "Q6", lab: "Q6", cr: "Analyse", bac: "**Calculer** la puissance nécessaire pour faire avancer la tondeuse à 0,5 m/s. Le moteur, à ce point de fonctionnement, convient-il ?", ref: "P = F × v avec F = 100 N et v = 0,5 m/s. **Compare** à P_{réd} (Q4) : la puissance disponible aux roues couvre-t-elle le besoin ?" },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Calculer** la vitesse angulaire des roues, puis le rapport de réduction r = \\frac{ω_{roue}}{ω_{mot}} du réducteur.", ref: "a) V = ω × R donc ω_{roue} = \\frac{v}{R} avec R = 0,120 m. b) r = \\frac{ω_{roue}}{ω_{mot}} (Q3) ; **écris**-le sous la forme \\frac{1}{k}." },
    { t: "q", id: "Q8", lab: "Q8", bac: "**Calculer** l'énergie stockée dans la batterie, puis l'autonomie de la tondeuse à ce régime.", ref: "a) E = U × Q = 24 × 17 (W·h). b) t = \\frac{E}{P_{élec}} (en heures, batterie supposée entièrement déchargeable) ; **convertis** en h et min." },
    { t: "tableau3", titre: "Q6 à Q8", lignes: [
      { id: "Q6", lab: "Q6", grandeur: "Puissance nécessaire à l'avancement", sym: "P" },
      { id: "Q7a", q: "Q7", lab: "Q7 a", grandeur: "Vitesse angulaire des roues", sym: "ω_{roue}" },
      { id: "Q7b", q: "Q7", lab: "Q7 b", grandeur: "Rapport de réduction du réducteur", sym: "r" },
      { id: "Q8a", q: "Q8", lab: "Q8 a", grandeur: "Énergie stockée dans la batterie", sym: "E" },
      { id: "Q8b", q: "Q8", lab: "Q8 b", grandeur: "Autonomie à ce régime", sym: "t" } ] },
    { t: "zone", q: "Q6", id: "Q6_conclusion", label: "Q6 — le moteur convient-il ? Justifie.", lignes: 2 },

    { t: "bandeau", id: "sB", titre: "B — Pilote automatique de bateau", duree: "≈ 15 min", comp: "SI-ANA-02 · SI-MOD-03", cr: "Résultats" },
    { t: "html", html: "<p>Le pilote automatique fait pivoter la barre du bateau à l'aide d'un <b>vérin hydraulique</b>, alimenté par une <b>pompe</b> entraînée par un <b>moteur électrique</b>. Extrait du cahier des charges :</p><div class=\"tab-wrap\"><table class=\"grille\"><thead><tr><th>Fonction</th><th>Critère</th><th>Niveau</th></tr></thead><tbody><tr><td class=\"fixe g\"><b>FP :</b> faire pivoter la barre par rapport à la coque du bateau</td><td class=\"g\">Action sur la barre :<br>• force de poussée<br>• course<br>• durée de la course</td><td class=\"g\"><br>700 N mini ; <b>850 N maxi</b><br>250 mm mini<br>5 s à vide ; 10 s maxi (en charge)</td></tr></tbody></table></div>" },
    { t: "encadre", titre: "Données", cls: "pouce", html: "<p>• Moteur : <b>le même que celui de la tondeuse</b> (tableau et figure 1). Il fonctionne au point où son rendement vaut environ <b>59 %</b>, du côté des fortes puissances.</p><p>• Pression fournie par la pompe au vérin : <b>p = 25 bar</b> (1 bar = 10^{5} Pa). • Rendement de la pompe : <b>72 %</b>. • Rendement du vérin : <b>85 %</b>.</p><p>• <b>Hypothèse :</b> prendre les données <b>maximales</b> du cahier des charges (force de poussée F = 850 N).</p>" },
    { t: "figure", id: "fig3", src: "../assets/img/tond_fig3_chaine_pilote_eleve.png", largeur: "760px", alt: "Chaîne de puissance du pilote : P_élec → moteur (η_mot, C, ω) → pompe (η_pompe, p, Q_v) → vérin (η_vérin, F, v) → barre.", legende: "Figure 3 – Chaîne de puissance du pilote (à compléter au fil des questions)." },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Relever** dans la simulation du moteur (tableau) sa puissance d'entrée, sa puissance de sortie et son couple au point de fonctionnement indiqué.", ref: "**Cherche** la ligne où η ≈ 59 % du côté des grandes puissances (couple plus élevé) et **recopie** P_{élec}, P_{méca} et C." },
    { t: "grille", q: "Q9", titre: "Q9", entetes: ["P_{élec} (W)", "P_{mot} (W)", "C_{mot} (N·m)"], lignes: [[{ champ: "Q9_Pe", num: true }, { champ: "Q9_Pm", num: true }, { champ: "Q9_C", num: true }]] },
    { t: "q", id: "Q10", lab: "Q10", bac: "**Calculer** la vitesse angulaire ω_{mot}. Que vaut sa fréquence de rotation en tr/min ?", ref: "P_{mot} = C × ω donc ω_{mot} = \\frac{P_{mot}}{C_{mot}} ; puis N = \\frac{60 × ω}{2π} (**compare** à la colonne N du tableau)." },
    { t: "q", id: "Q11", lab: "Q11", bac: "**Calculer** la puissance P_{pompe} fournie par la pompe. **En déduire** son débit volumique Q_{v}.", ref: "a) P_{pompe} = η_{pompe} × P_{mot}. b) En hydraulique P = p × Q_{v} : Q_{v} = \\frac{P_{pompe}}{p} avec p = 25 × 10^{5} Pa (résultat en m³/s ; 1 m³/s = 60 000 L/min)." },
    { t: "q", id: "Q12", lab: "Q12", bac: "**Calculer** la puissance P_{vérin} fournie par le vérin. **En déduire** la vitesse maximale de déplacement de sa tige.", ref: "a) P_{vérin} = η_{vérin} × P_{pompe}. b) P = F × v donc v = \\frac{P_{vérin}}{F} avec F = 850 N (en m/s, puis en mm/s)." },
    { t: "q", id: "Q13", lab: "Q13", bac: "**Calculer** le rendement global η_{g} de la chaîne.", ref: "η_{g} = η_{mot} × η_{pompe} × η_{vérin} ; **vérifie** avec \\frac{P_{vérin}}{P_{élec}}." },
    { t: "tableau3", titre: "Q10 à Q13", lignes: [
      { id: "Q10a", q: "Q10", lab: "Q10 a", grandeur: "Vitesse angulaire du moteur", sym: "ω_{mot}" },
      { id: "Q10b", q: "Q10", lab: "Q10 b", grandeur: "Fréquence de rotation du moteur", sym: "N" },
      { id: "Q11a", q: "Q11", lab: "Q11 a", grandeur: "Puissance fournie par la pompe", sym: "P_{pompe}" },
      { id: "Q11b", q: "Q11", lab: "Q11 b", grandeur: "Débit volumique de la pompe", sym: "Q_{v}" },
      { id: "Q12a", q: "Q12", lab: "Q12 a", grandeur: "Puissance fournie par le vérin", sym: "P_{vérin}" },
      { id: "Q12b", q: "Q12", lab: "Q12 b", grandeur: "Vitesse maximale de la tige", sym: "v" },
      { id: "Q13", lab: "Q13", grandeur: "Rendement global de la chaîne", sym: "η_{g}" } ] },
    { t: "q", id: "Q14", lab: "Q14", cr: "Conclusion", bac: "<i>Pour aller plus loin.</i> **Calculer** la durée d'une course complète de 250 mm. Le critère « durée de la course » du cahier des charges est-il respecté ?", ref: "t = \\frac{course}{v} = \\frac{0,250}{v} (v de la Q12, en m/s). **Compare** à 10 s maxi." },
    { t: "tableau3", titre: "Q14", lignes: [{ id: "Q14", lab: "Q14", grandeur: "Durée d'une course de 250 mm", sym: "t" }] },
    { t: "zone", q: "Q14", id: "Q14_conclusion", label: "Le critère est-il respecté ?", lignes: 2 },
    { t: "encadre", titre: "Coups de pouce", cls: "pouce", html: "<p><b>CP1 (Q1)</b> — Chaque constituant ne transmet qu'une partie de la puissance qu'il reçoit : P_{sortie} = η × P_{entrée}. On applique la relation deux fois.</p><p><b>CP2 (Q3, Q10)</b> — P_{élec} = U × I ; P_{méca} = C × ω ; ω = \\frac{2π × N}{60} (N en tr/min, ω en rad/s).</p><p><b>CP3 (Q11, Q12)</b> — En hydraulique, P = p × Q_{v} avec p en Pa et Q_{v} en m³/s ; 1 m³/s = 60 000 L/min. Pour le vérin, P = F × v.</p>" }
  ]
};
