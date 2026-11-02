/* TD ROVIO — Vitesse de rotation du robot — 1re SI, S3 Énergie, séance 5 (10/11/2026)
   Contenu ÉLÈVE uniquement (repris du générateur td.js). Aucune valeur de corrigé ici. */
window.ACTIVITE = {
  id: "td_rovio", fichier: "TD_ROVIO", court: "TD ROVIO · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD · 40 min",
  titre: "Vitesse de rotation du robot ROVIO",
  sous: "Chaîne de puissance d'une roue : moteur, réducteur, vitesse du robot",
  blocs: [
    { t: "encadre", titre: "Problématique", html:
      "<p class=\"pb\"><b>Le robot ROVIO peut-il tourner sur lui-même à la vitesse annoncée par le constructeur (30 tr/min) ?</b></p>" +
      "<p><b>Support :</b> robot d'inspection ROVIO à 3 roues ; caractéristiques du moteur et du réducteur d'une roue ; relations V = ω × R, P = C × ω, rapport de réduction, rendements.</p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-02 (puissance et rendements de la chaîne), SI-MOD-02 (grandeurs d'entrée et de sortie : C, ω, V), SI-ANA-13 (écart entre la donnée constructeur et le calcul).</i></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "ligne", blocs: [
      { t: "html", html: "<p>Le robot ROVIO permet d'inspecter une habitation à distance via Internet. Il est pour cela muni d'une caméra ainsi que d'un système de propulsion. Les 3 roues disposent chacune de leur motoréducteur.</p><p>Dans une première approche, nous ferons l'hypothèse que la vitesse de rotation de la roue est <b>proportionnelle à la tension d'alimentation</b> du moteur. On suppose que le moteur fonctionne en <b>régime nominal</b>.</p><p>Le ROVIO doit pouvoir tourner sur lui-même rapidement. Pour cela, les 3 roues tournent dans le même sens.</p>" },
      { t: "figure", src: "../assets/img/rovio_photo_rovio_original.png", largeur: "180px", alt: "Photo du robot ROVIO.", legende: "Robot ROVIO." } ] },
    { t: "methode", html: "<b>Méthode :</b> chaque calcul en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Rappel : ω (rad/s) = \\frac{2π × N (tr/min)}{60}." },

    { t: "bandeau", id: "sA", titre: "A — Vitesse des roues à partir de la donnée constructeur", duree: "≈ 15 min", comp: "SI-MOD-02", cr: "Résultats" },
    { t: "html", html: "<p>On donne le modèle suivant, qui exprime la vitesse de rotation du robot ω_{robot} en fonction de la vitesse V_{roue} du point A de contact entre la roue et le sol :</p><p style=\"text-align:center;font-size:18px\"><b>ω_{robot} = \\frac{V_{roue}}{D_{centre}}</b></p>" },
    { t: "figure", id: "fig1", src: "../assets/img/rovio_fig1_robot_roue.png", largeur: "640px", alt: "Robot vu de dessus (rotation sur lui-même autour du centre O, point de contact A à la distance D_centre) et roue vue de côté (rayon R_roue).", legende: "Figure 1 – Robot vu de dessus (rotation sur lui-même) et roue vue de côté." },
    { t: "donnees", lignes: [["Vitesse maxi du robot (donnée constructeur)", "N_{robot} = 30 tr/min"], ["Rayon de la roue", "R_{roue} = 42 mm"], ["Distance du point A au centre de rotation O", "D_{centre} = 135 mm"], ["Vitesse du point A de contact roue / sol", "V_{roue} (à calculer)"]] },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Calculer** la vitesse linéaire V_{roue} du point A en m/s (et la **convertir** en km/h).", ref: "a) **Convertis** N_{robot} en rad/s : ω_{robot} = \\frac{2π × 30}{60}. b) V_{roue} = ω_{robot} × D_{centre} avec D_{centre} en mètres (0,135 m). c) × 3,6 pour passer en km/h." },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Calculer** ω_{roue} en rad/s (et la **convertir** en tr/min).", ref: "V = ω × R, donc ω_{roue} = \\frac{V_{roue}}{R_{roue}} avec R_{roue} = 0,042 m. Puis N_{roue} = \\frac{ω_{roue} × 60}{2π}." },
    { t: "tableau3", titre: "Q1 et Q2", lignes: [
      { id: "Q1a", q: "Q1", lab: "Q1 a", grandeur: "Vitesse angulaire du robot", sym: "ω_{robot}" },
      { id: "Q1b", q: "Q1", lab: "Q1 b", grandeur: "Vitesse linéaire du point A", sym: "V_{roue}" },
      { id: "Q2a", q: "Q2", lab: "Q2 a", grandeur: "Vitesse angulaire de la roue", sym: "ω_{roue}" },
      { id: "Q2b", q: "Q2", lab: "Q2 b", grandeur: "Fréquence de rotation de la roue", sym: "N_{roue}" } ] },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Exprimer** ω_{robot} en fonction de ω_{roue}, D_{centre} et R_{roue}.", ref: "**Remplace** V_{roue} par ω_{roue} × R_{roue} dans le modèle ω_{robot} = \\frac{V_{roue}}{D_{centre}}." },
    { t: "zone", q: "Q3", lignes: 2 },

    { t: "bandeau", id: "sB", titre: "B — Vitesse des roues calculée à partir du moteur", duree: "≈ 25 min", comp: "SI-ANA-02 · SI-MOD-02 · SI-ANA-13", cr: "Résultats" },
    { t: "html", html: "<p><b>Caractéristiques du moteur :</b></p><div class=\"tab-wrap\"><table class=\"grille\"><thead><tr><th>Tension nominale (V)</th><th colspan=\"2\">À vide</th><th colspan=\"3\">Sous charge, en régime nominal</th><th colspan=\"2\">À rotor bloqué</th></tr><tr><th></th><th>Vitesse (tr/min)</th><th>Courant (A)</th><th>Vitesse (tr/min)</th><th>Courant (A)</th><th>Couple et puissance</th><th>Couple (mN·m)</th><th>Courant (A)</th></tr></thead><tbody><tr><td class=\"fixe\">3</td><td>11 000</td><td>0,16</td><td class=\"fixe\">9 500</td><td class=\"fixe\">0,3</td><td><i>à calculer (Q4)</i></td><td>18</td><td>1,7</td></tr></tbody></table></div>" +
      "<p><b>Caractéristiques de la chaîne de puissance :</b> rendement du moteur électrique <b>η_{mot} = 0,89</b> ; rendement du réducteur <b>η_{réd} = 0,55</b>.</p>" },
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Caractéristiques des roues dentées", cls: "pouce", html: "<p>• Z_{1} = Z_{2} = Z_{4} = Z_{8} = Z_{10} = Z_{12} = 10 dents<br>• Z_{6} = 15 dents · Z_{3} = 39 dents · Z_{5} = 31 dents<br>• Z_{7} = 21 dents · Z_{9} = 24 dents · Z_{11} = 23 dents · Z_{13} = 18 dents</p><p class=\"ent-doc\"><b>Ordre des roues d'après la vue 3D :</b> 1 (pignon moteur) → 2 → 3 ; 4 → 5 ; 6 → 7 ; 8 → 9 ; 10 → 11 ; 12 → 13 (la roue 13 entraîne la roue du robot). Les repères « 3 + 4 », « 5 + 6 »… désignent deux roues dentées solidaires du même arbre.</p>" },
      { t: "figure", id: "fig2", src: "../assets/img/rovio_fig2_reducteur_original.png", largeur: "420px", alt: "Réducteur de la roue du robot (illustration technique d'origine) : roues 1 à 13.", legende: "Figure 2 – Réducteur de la roue (illustration technique d'origine)." } ] },
    { t: "encadre", titre: "Hypothèse et objectif", html: "<p><b>Hypothèse :</b> sous charge, en régime nominal. <b>Objectif :</b> on recherche ω_{roue} afin d'obtenir N_{robot}. Cette valeur sera comparée avec la donnée constructeur (N_{robot} = 30 tr/min).</p>" },
    { t: "q", id: "Q4", lab: "Q4", bac: "**Compléter** l'extrait de la chaîne de puissance du système (figure 3) : aucune valeur ne doit manquer. (r_{réd}, ω_{roue} et C_{roue} se complètent après la Q7.)", ref: "**Remplis** les cases du tableau sous la figure 3 : U et I (régime nominal), P_{élec} = U × I, P_{mot} = η_{mot} × P_{élec}, ω_{mot} (9 500 tr/min en rad/s), C_{mot} = \\frac{P_{mot}}{ω_{mot}}, P_{roue} = η_{réd} × P_{mot}, η_{g} = η_{mot} × η_{réd}. Les trois dernières cases attendent la Q7." },
    { t: "figure", id: "fig3", src: "../assets/img/rovio_fig3_chaine_eleve.png", largeur: "760px", alt: "Extrait de la chaîne de puissance d'une roue : entrée U, I, P_élec → Moteur (η_mot, C_mot, ω_mot, P_mot) → Réducteur (η_réd, r_réd) → sortie C_roue, ω_roue, P_roue ; rendement global η_g.", legende: "Figure 3 – Extrait de la chaîne de puissance d'une roue." },
    { t: "grille", q: "Q4", titre: "Q4 – valeurs de la chaîne de puissance", entetes: ["U (V)", "I (A)", "P_{élec} (W)", "η_{mot}", "ω_{mot} (rad/s)", "C_{mot} (mN·m)", "P_{mot} (W)"], lignes: [[{ champ: "Q4_U", num: true }, { champ: "Q4_I", num: true }, { champ: "Q4_Pelec", num: true }, { champ: "Q4_etamot", num: true }, { champ: "Q4_wmot", num: true }, { champ: "Q4_Cmot", num: true }, { champ: "Q4_Pmot", num: true }]] },
    { t: "grille", q: "Q4", titre: "Q4 – suite", entetes: ["η_{réd}", "P_{roue} (W)", "η_{g}", "r_{réd} (après Q7)", "ω_{roue} (rad/s, après Q7)", "C_{roue} (N·m, après Q7)"], lignes: [[{ champ: "Q4_etared", num: true }, { champ: "Q4_Proue", num: true }, { champ: "Q4_etag", num: true }, { champ: "Q4_r", num: true }, { champ: "Q4_wroue", num: true }, { champ: "Q4_Croue", num: true }]] },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Donner** l'expression littérale du rapport de réduction r de la transmission en fonction de la fréquence de rotation du moteur N_{moteur} et de la fréquence de rotation de la roue N_{roue}.", ref: "Le rapport de réduction compare la vitesse de sortie à la vitesse d'entrée : r = \\frac{N_{sortie}}{N_{entrée}}. **Écris**-le avec N_{roue} et N_{moteur} et **précise** s'il est plus petit ou plus grand que 1." },
    { t: "zone", q: "Q5", lignes: 2 },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Calculer** le rapport de réduction r_{1/13} entre l'arbre moteur (1) et la roue (13).", ref: "Engrènements : 1 → 2 → 3 (2 est une roue intermédiaire : Z_{2} se simplifie), puis 4 → 5, 6 → 7, 8 → 9, 10 → 11, 12 → 13. r = \\frac{Z_{1} × Z_{4} × Z_{6} × Z_{8} × Z_{10} × Z_{12}}{Z_{3} × Z_{5} × Z_{7} × Z_{9} × Z_{11} × Z_{13}} : **remplace** par les nombres de dents et **calcule** (écris aussi sous la forme \\frac{1}{k})." },
    { t: "zone", q: "Q6", lignes: 4 },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Calculer** ω_{roue}. **En déduire** V_{roue}.", ref: "a) N_{roue} = r × N_{moteur} avec N_{moteur} = 9 500 tr/min, puis ω_{roue} = \\frac{2π × N_{roue}}{60}. b) V_{roue} = ω_{roue} × R_{roue}. **Reporte** r, ω_{roue} et C_{roue} = \\frac{P_{roue}}{ω_{roue}} dans la Q4." },
    { t: "tableau3", titre: "Q7", lignes: [
      { id: "Q7a", q: "Q7", lab: "Q7 a", grandeur: "Fréquence de rotation de la roue", sym: "N_{roue}" },
      { id: "Q7b", q: "Q7", lab: "Q7 b", grandeur: "Vitesse angulaire de la roue", sym: "ω_{roue}" },
      { id: "Q7c", q: "Q7", lab: "Q7 c", grandeur: "Vitesse linéaire du point A", sym: "V_{roue}" } ] },
    { t: "q", id: "Q8", lab: "Q8", cr: "Conclusion", bac: "**Comparer** les résultats obtenus à partir de la donnée constructeur (partie A) avec les résultats obtenus par calcul (partie B). **Conclure** sur la vitesse de rotation du robot par rapport à la donnée constructeur.", ref: "a) **Mets** côte à côte ω_{roue} et V_{roue} de la partie A et de la partie B. b) **Calcule** la vitesse du robot avec le modèle de la partie A : ω_{robot} = \\frac{V_{roue}}{D_{centre}} (V_{roue} de la Q7), **convertis** en tr/min et **calcule** l'écart relatif avec 30 tr/min. c) **Conclus** : le robot atteint-il la vitesse annoncée en régime nominal ? Avec l'hypothèse « vitesse proportionnelle à la tension », quelle tension faudrait-il ?" },
    { t: "zone", q: "Q8", lignes: 6 }
  ]
};
