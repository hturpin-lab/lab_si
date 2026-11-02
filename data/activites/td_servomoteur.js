/* TD Servomoteur de direction d'une voiture RC — 1re SI, S3 Énergie, séance 4 (5/11/2026)
   Contenu ÉLÈVE uniquement (repris du générateur td_servo.js). Aucun corrigé ici. */
window.ACTIVITE = {
  id: "td_servomoteur", fichier: "TD_Servomoteur", court: "TD Servomoteur · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD autonomie",
  titre: "Servomoteur de direction d'une voiture RC",
  sous: "Rapport de réduction d'un train d'engrenages en cascade — 25 min",
  blocs: [
    { t: "encadre", titre: "Situation", html:
      "<p>Les roues avant d'une voiture radiocommandée sont orientées par un <b>servomoteur</b> : un petit moteur à courant continu entraîne, par l'intermédiaire d'un <b>réducteur à quatre étages</b> (cascade de pignons et de roues), un <b>palonnier</b> qui pousse la biellette de direction.</p>" +
      "<p class=\"pb\"><b>Problématique : à quelle vitesse doit tourner le moteur pour que le palonnier tourne de 90° en 5 s ?</b> <i>(vitesse supposée constante pendant le mouvement)</i></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "encadre", titre: "Méthode : rapport de réduction d'un engrenage", cls: "pouce", html:
      "<p>Dans un engrenage, la roue <b>menante</b> entraîne la roue <b>menée</b>. Rapport : <b>r = \\frac{ω_{menée}}{ω_{menante}} = \\frac{Z_{menante}}{Z_{menée}}</b> (Z = nombre de dents).</p>" +
      "<p><i>Exemple</i> : un pignon de 12 dents entraîne une roue de 36 dents : r = \\frac{12}{36} = \\frac{1}{3} ; la roue tourne 3 fois moins vite (r &lt; 1 : <b>réducteur</b>).</p>" +
      "<p>Pour plusieurs engrenages <b>en cascade</b>, les rapports se <b>multiplient</b> : r_{global} = r_{1} × r_{2} × r_{3} × …</p>" +
      "<p>À chaque <b>contact extérieur</b>, le sens de rotation s'inverse.</p>" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig1", src: "../assets/img/servo_cascade.png", alt: "Réducteur du servomoteur : moteur (pièce 1), pièces 2, 3 et 4 portant chacune une grande roue a et un pignon b, palonnier (pièce 5).", legende: "Figure 1 – Réducteur du servomoteur (pièces 1 à 5)." },
      { t: "html", html: "<p><b>Nombre de dents des roues</b></p>" +
        "<div class=\"tab-wrap\"><table class=\"grille\"><thead><tr><th>Pièce</th><th>Roue menée (reçoit)</th><th>Roue menante (transmet)</th></tr></thead><tbody>" +
        "<tr><td class=\"fixe\">1 (moteur)</td><td>—</td><td>Z_{1} = 14</td></tr>" +
        "<tr><td class=\"fixe\">2</td><td>Z_{2a} = 58</td><td>Z_{2b} = 14</td></tr>" +
        "<tr><td class=\"fixe\">3</td><td>Z_{3a} = 58</td><td>Z_{3b} = 14</td></tr>" +
        "<tr><td class=\"fixe\">4</td><td>Z_{4a} = 58</td><td>Z_{4b} = 20</td></tr>" +
        "<tr><td class=\"fixe\">5 (palonnier)</td><td>Z_{5} = 44</td><td>—</td></tr></tbody></table></div>" +
        "<p class=\"ent-doc\"><i>Les pièces 2, 3 et 4 portent chacune une grande roue (indice a) et un pignon (indice b) solidaires du même axe : ils tournent à la même vitesse.</i></p>" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> chaque calcul se fait en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Calculatrice autorisée." },

    { t: "bandeau", id: "s1", titre: "1 — Rapports de réduction", comp: "SI-MOD-03 · SI-MOD-02", cr: "Résultats" },
    { t: "q", id: "Q1", lab: "Q1",
      bac: "**Indiquer**, pour chaque étage, la roue menante et la roue menée, puis **calculer** le rapport de réduction (fraction puis valeur décimale à 3 chiffres significatifs).",
      ref: "Pour chaque étage (ligne du tableau) : **écris** quelle roue entraîne (menante) et quelle roue est entraînée (menée), avec le tableau des dents. Puis **calcule** r = Z_{menante} / Z_{menée} : écris la fraction, puis le nombre à virgule (3 chiffres significatifs)." },
    { t: "grille", q: "Q1", titre: "Rapports par étage", entetes: ["Étage", "Roue menante", "Roue menée", "Rapport (fraction)", "Valeur décimale"], lignes: [
      ["r_{1/2}", { champ: "Q1_r12_menante", ph: "Z…" }, { champ: "Q1_r12_menee", ph: "Z…" }, { champ: "Q1_r12_fraction", ph: "… / …" }, { champ: "Q1_r12_val", num: true, ph: "0,…" }],
      ["r_{2/3}", { champ: "Q1_r23_menante", ph: "Z…" }, { champ: "Q1_r23_menee", ph: "Z…" }, { champ: "Q1_r23_fraction", ph: "… / …" }, { champ: "Q1_r23_val", num: true, ph: "0,…" }],
      ["r_{3/4}", { champ: "Q1_r34_menante", ph: "Z…" }, { champ: "Q1_r34_menee", ph: "Z…" }, { champ: "Q1_r34_fraction", ph: "… / …" }, { champ: "Q1_r34_val", num: true, ph: "0,…" }],
      ["r_{4/5}", { champ: "Q1_r45_menante", ph: "Z…" }, { champ: "Q1_r45_menee", ph: "Z…" }, { champ: "Q1_r45_fraction", ph: "… / …" }, { champ: "Q1_r45_val", num: true, ph: "0,…" }]
    ] },

    { t: "bandeau", id: "s2", titre: "2 — Rapport global et vitesse du moteur", comp: "SI-MOD-03 · SI-MOD-02", cr: "Résultats" },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Calculer** le rapport de réduction global r_{g} du réducteur.", ref: "Les quatre étages sont en cascade : **multiplie** les quatre rapports de la Q1 pour obtenir r_{g}. **Donne** aussi le résultat sous la forme \\frac{1}{…}." },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Calculer** la fréquence de rotation n_{5} du palonnier (tr/min) puis sa vitesse angulaire ω_{5} (rad/s).", ref: "Le palonnier tourne de 90° en 5 s. a) 90° = \\frac{1}{4} de tour et 5 s = \\frac{5}{60} min : **calcule** n_{5} en tr/min. b) 90° = \\frac{π}{2} rad : **calcule** ω_{5} = \\frac{θ}{t} en rad/s." },
    { t: "q", id: "Q4", lab: "Q4", bac: "**En déduire** la fréquence de rotation n_{1} du moteur (tr/min).", ref: "Comme n_{5} = r_{g} × n_{1}, **calcule** n_{1} = \\frac{n_{5}}{r_{g}}. Le moteur doit tourner **plus vite** que le palonnier : vérifie que n_{1} est bien plus grand que n_{5}." },
    { t: "tableau3", titre: "Q2 à Q4", lignes: [
      { id: "Q2", lab: "Q2", grandeur: "Rapport de réduction global du réducteur", sym: "r_{g}" },
      { id: "Q3a", q: "Q3", lab: "Q3 a", grandeur: "Fréquence de rotation du palonnier (tr/min)", sym: "n_{5}" },
      { id: "Q3b", q: "Q3", lab: "Q3 b", grandeur: "Vitesse angulaire du palonnier (rad/s)", sym: "ω_{5}" },
      { id: "Q4", lab: "Q4", grandeur: "Fréquence de rotation du moteur (tr/min)", sym: "n_{1}" }
    ] },
    { t: "q", id: "Q5", lab: "Q5", cr: "Analyse",
      bac: "Ce train d'engrenages est-il un réducteur ou un multiplicateur de vitesse ? Le palonnier tourne-t-il dans le même sens que le moteur ? **Justifier**.",
      ref: "a) **Compare** r_{g} à 1 : plus petit → réducteur, plus grand → multiplicateur. b) **Compte** les contacts extérieurs entre les roues sur la figure 1 : chaque contact inverse le sens. Nombre pair → même sens que le moteur, impair → sens contraire. **Rédige** ta réponse avec ces deux arguments." },
    { t: "zone", q: "Q5", lignes: 4 },

    { t: "bandeau", id: "s3", titre: "3 — Pour aller plus loin : le couple sur le palonnier", comp: "SI-ANA-02", cr: "Résultats" },
    { t: "q", id: "Q6", lab: "Q6",
      bac: "Le moteur fournit un couple C_{1} = 5 mN·m. Le rendement global du réducteur est η = 0,60. **Calculer** la puissance mécanique du moteur P_{1}, la puissance sur le palonnier P_{5}, puis le couple disponible sur le palonnier C_{5}.",
      ref: "Données : C_{1} = 5 mN·m = 0,005 N·m ; η = 0,60. a) P_{1} = C_{1} × ω_{1} : il te faut d'abord ω_{1} = \\frac{2π × n_{1}}{60} (n_{1} trouvé en Q4). b) P_{5} = η × P_{1} (le réducteur perd 40 %). c) C_{5} = \\frac{P_{5}}{ω_{5}} avec ω_{5} de la Q3." },
    { t: "tableau3", titre: "Q6", lignes: [
      { id: "Q6a", q: "Q6", lab: "Q6 a", grandeur: "Puissance mécanique du moteur", sym: "P_{1}" },
      { id: "Q6b", q: "Q6", lab: "Q6 b", grandeur: "Puissance sur le palonnier", sym: "P_{5}" },
      { id: "Q6c", q: "Q6", lab: "Q6 c", grandeur: "Couple disponible sur le palonnier", sym: "C_{5}" }
    ] },
    { t: "q", id: "Q7", lab: "Q7", cr: "Conclusion", bac: "**Répondre** à la problématique en une phrase.", ref: "**Écris** une phrase du type : « Pour que le palonnier tourne de 90° en 5 s, le moteur doit tourner à environ … tr/min, soit … rad/s. »" },
    { t: "zone", q: "Q7", lignes: 2, ph: "Pour que le palonnier tourne de 90° en 5 s, le moteur doit tourner à …" },

    { t: "encadre", titre: "Coups de pouce", cls: "pouce", html:
      "<p><b>CP1</b> — Pièce 2 : Z_{2a} est <b>menée</b> par Z_{1} ; Z_{2b} est <b>menant</b> pour Z_{3a}.</p>" +
      "<p><b>CP2</b> — 90° = \\frac{1}{4} de tour = \\frac{π}{2} rad ; 5 s = \\frac{5}{60} min.</p>" +
      "<p><b>CP3</b> — Le moteur tourne <b>plus vite</b> que le palonnier : n_{1} doit être plus grand que n_{5}.</p>" },
    { t: "autoeval", items: ["calculer le rapport d'un engrenage", "calculer un rapport global en cascade", "convertir un angle et une durée en vitesse", "en déduire la vitesse du moteur"] }
  ]
};
