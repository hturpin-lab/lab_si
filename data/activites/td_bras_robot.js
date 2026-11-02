/* TD Couple, vitesse, puissance : bras de robot et vérin électrique — 1re SI, S3 Énergie, séance 5 (10/11/2026)
   Contenu ÉLÈVE uniquement (repris du générateur td.js). Aucune valeur de corrigé ici. */
window.ACTIVITE = {
  id: "td_bras_robot", fichier: "TD_Bras_Robot_Verin", court: "TD Bras robot · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD · 1 h 10",
  titre: "Couple, vitesse, puissance : bras de robot et vérin électrique",
  sous: "Réducteur, système vis-écrou, courroie crantée — exercices 1 et 2 ; exercice 3 facultatif",
  blocs: [
    { t: "encadre", titre: "Problématique", html:
      "<p class=\"pb\"><b>Quelle puissance et quel couple doit fournir le moteur pour déplacer une charge à une vitesse donnée, à travers un réducteur et un système de transformation de mouvement ?</b></p>" +
      "<p><b>Support :</b> chaîne de puissance d'un bras de robot (moteur, réducteur, vis-écrou), vérin électrique à courroie crantée et vis à billes, motoréducteur d'un papillon de chauffage ; relations P = C × ω = F × V, rendements, rapports de transmission.</p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-02 (puissance nécessaire, rendements et pertes), SI-MOD-02 (grandeurs d'entrée et de sortie : C, ω, F, V), SI-MOD-03 (modèles du réducteur et du système vis-écrou).</i></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "methode", html: "<b>Méthode :</b> chaque calcul en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Rappels : ω = \\frac{2π N}{60} ; un système vis-écrou avance d'un <b>pas</b> par tour ; P = C × ω = F × V." },

    { t: "bandeau", id: "s1", titre: "Exercice 1 — Bras de robot", duree: "≈ 40 min", comp: "SI-ANA-02 · SI-MOD-02 · SI-MOD-03", cr: "Résultats" },
    { t: "html", html: "<p>Soit la chaîne de puissance suivante (figure 1). Le bras de robot doit exercer une force <b>F_{3} = 900 N</b> sur l'objet à déplacer, en fonctionnement nominal.</p>" },
    { t: "figure", id: "fig1", src: "../assets/img/bras_chaine.png", alt: "Chaîne de puissance : P_E (U, I) → moteur à courant continu (N1 = 10 000 tr/min, U = 24 V, η1 = 0,8) → P1 (C1, ω1) → réducteur (Z1 = 18 dents, Z2 = 40 dents, η2 = 0,9) → P2 (C2, ω2) → système vis-écrou (pas p = 2 mm, η3 = 0,6) → P3 (F3 = 900 N, V3) → bras de robot.", legende: "Figure 1 – Chaîne de puissance du bras de robot (valeurs nominales)." },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Déterminer** à quelle vitesse se déplace le bras de robot.", ref: "a) Réducteur : N_{2} = N_{1} × \\frac{Z_{1}}{Z_{2}}. b) La vis-écrou avance d'un pas (2 mm = 0,002 m) par tour de vis : V_{3} = \\frac{N_{2} × p}{60} (N en tr/min → V en m/s)." },
    { t: "tableau3", titre: "Q1", lignes: [
      { id: "Q1a", q: "Q1", lab: "Q1 a", grandeur: "Fréquence de rotation en sortie du réducteur", sym: "N_{2}" },
      { id: "Q1b", q: "Q1", lab: "Q1 b", grandeur: "Vitesse de déplacement du bras", sym: "V_{3}" } ] },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Déterminer** la puissance et le couple nominaux du moteur nécessaire.", ref: "**Remonte** la chaîne de la sortie vers le moteur : a) P_{3} = F_{3} × V_{3} ; b) P_{2} = \\frac{P_{3}}{η_{3}} ; c) P_{1} = \\frac{P_{2}}{η_{2}} ; d) ω_{1} = \\frac{2π × N_{1}}{60} puis C_{1} = \\frac{P_{1}}{ω_{1}}." },
    { t: "tableau3", titre: "Q2", lignes: [
      { id: "Q2a", q: "Q2", lab: "Q2 a", grandeur: "Puissance utile sur le bras", sym: "P_{3}" },
      { id: "Q2b", q: "Q2", lab: "Q2 b", grandeur: "Puissance en entrée du système vis-écrou", sym: "P_{2}" },
      { id: "Q2c", q: "Q2", lab: "Q2 c", grandeur: "Puissance utile du moteur", sym: "P_{1}" },
      { id: "Q2d", q: "Q2", lab: "Q2 d", grandeur: "Vitesse angulaire du moteur", sym: "ω_{1}" },
      { id: "Q2e", q: "Q2", lab: "Q2 e", grandeur: "Couple nominal du moteur", sym: "C_{1}" } ] },
    { t: "q", id: "Q3", lab: "Q3", cr: "Analyse", bac: "**Déterminer** l'intensité électrique nominale consommée.", ref: "a) P_{E} = \\frac{P_{1}}{η_{1}} ; b) P_{E} = U × I donc I = \\frac{P_{E}}{U} avec U = 24 V. c) **Calcule** aussi le rendement global η_{g} = η_{1} × η_{2} × η_{3} et **reporte** toutes les valeurs (P, C, ω, F, V) sur la chaîne de la figure 1 (sur ta feuille ou dans la zone ci-dessous)." },
    { t: "tableau3", titre: "Q3", lignes: [
      { id: "Q3a", q: "Q3", lab: "Q3 a", grandeur: "Puissance électrique absorbée", sym: "P_{E}" },
      { id: "Q3b", q: "Q3", lab: "Q3 b", grandeur: "Intensité nominale consommée", sym: "I" },
      { id: "Q3c", q: "Q3", lab: "Q3 c", grandeur: "Rendement global de la chaîne", sym: "η_{g}" } ] },
    { t: "zone", q: "Q3", id: "Q3_bilan", label: "Bilan : valeurs de C_{2}, ω_{2} et commentaire sur les pertes", lignes: 3 },

    { t: "bandeau", id: "s2", titre: "Exercice 2 — Vérin électrique", duree: "≈ 30 min", comp: "SI-MOD-03 · SI-MOD-02", cr: "Résultats" },
    { t: "html", html: "<p>Le vérin électrique fonctionne grâce à un moteur. Il facilite la levée de charges lourdes grâce à un système vis-écrou : il transforme le mouvement de rotation créé par le moteur électrique en un mouvement de translation de la tige. Ici, le moteur entraîne <b>la vis à billes</b> en rotation par l'intermédiaire d'une <b>courroie crantée</b> ; l'<b>écrou</b>, bloqué en rotation et lié à la tige, se déplace en translation et fait sortir la tige. La vitesse linéaire de la tige dépend donc de la vitesse de rotation du moteur et des éléments de transmission.</p><p>La poulie du moteur qui entraîne la courroie crantée possède <b>20 dents</b>. La poulie qui entraîne la vis à billes possède <b>15 dents</b>. Le pas de la vis est de <b>1,5 mm</b>.</p>" },
    { t: "figure", id: "fig2", src: "../assets/img/bras_verin.png", alt: "Schéma de principe du vérin électrique : moteur, poulie motrice 20 dents, courroie crantée, poulie 15 dents sur la vis à billes, écrou lié à la tige.", legende: "Figure 2 – Schéma de principe du vérin électrique (courroie crantée et vis à billes)." },
    { t: "q", id: "Q4", lab: "Q4", bac: "**Déterminer** le rapport de transmission R_{1} = \\frac{N_{vis}}{N_{mot}}.", ref: "La courroie avance à la même vitesse sur les deux poulies : N_{mot} × Z_{mot} = N_{vis} × Z_{vis}. **Isole** R_{1} = \\frac{N_{vis}}{N_{mot}} = \\frac{Z_{mot}}{Z_{vis}}. Est-il plus grand ou plus petit que 1 ?" },
    { t: "zone", q: "Q4", lignes: 2 },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Déterminer** la vitesse de translation de la tige en fonction de la vitesse de rotation du moteur et des éléments du montage : V_{tige} = f(N_{moteur}).", ref: "La tige avance d'un pas par tour de vis : V_{tige} = \\frac{p × N_{vis}}{60}. **Remplace** N_{vis} par R_{1} × N_{moteur} et **écris** la formule avec les valeurs (p en m)." },
    { t: "zone", q: "Q5", lignes: 3 },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Déterminer** la vitesse de rotation du moteur en tr/min si la tige du vérin sort à une vitesse de 0,2 m/s.", ref: "**Inverse** la formule de la Q5 : N_{moteur} = \\frac{60 × V_{tige}}{p × R_{1}} avec V_{tige} = 0,2 m/s." },
    { t: "tableau3", titre: "Q6", lignes: [{ id: "Q6", lab: "Q6", grandeur: "Fréquence de rotation du moteur pour V_{tige} = 0,2 m/s", sym: "N_{moteur}" }] },

    { t: "bandeau", id: "s3", titre: "Exercice 3 (facultatif) — Papillon de chauffage d'une voiture", duree: "≈ 25 min", comp: "SI-MOD-03", cr: "Résultats" },
    { t: "ligne", blocs: [
      { t: "html", html: "<p><b>Présentation du système :</b> le système étudié est la motorisation du papillon d'admission d'air chaud dans une automobile. L'air chaud, provenant de la chaleur du moteur, circule dans des conduites spécialement aménagées. Le réglage électronique de la température intérieure de l'habitacle se fait par l'ouverture et la fermeture automatiques des papillons (sortes de robinets) qui permettent ou non l'entrée de l'air chaud dans le véhicule.</p><p><b>Objectif :</b> déterminer la vitesse de fermeture du papillon d'admission d'air chaud.</p><p><b>Caractéristiques :</b><br>• <b>Moteur</b> (référence 238-9709) : pignon Z_{mot} = 12 dents.<br>• <b>Arbre 2</b> : roue menée Z_{2a} = 41 dents ; pignon menant Z_{2b} = 12 dents.<br>• <b>Arbre 3</b> : roue Z_{3} = 41 dents, solidaire du papillon.</p>" },
      { t: "figure", id: "fig3", src: "../assets/img/bras_motoreducteur_papillon.png", largeur: "300px", alt: "Motoréducteur du papillon : moteur, pignon, deux arbres à roues dentées.", legende: "Figure 3 – Motoréducteur du papillon." } ] },
    { t: "figure", id: "fig4", src: "../assets/img/bras_papillon.png", largeur: "480px", alt: "Schéma de principe : papillon dans la conduite d'air chaud.", legende: "Figure 4 – Schéma de principe : papillon dans la conduite d'air chaud." },
    { t: "html", html: "<p><b>Moteurs disponibles</b> (le moteur du papillon est le 238-9709, ligne grisée) :</p><div class=\"tab-wrap\"><table class=\"grille\"><thead><tr><th>Code commande</th><th>U_{nom} (V)</th><th>N_{nom} (tr/min)</th><th>I_{nom} (A)</th><th>Prix 1-9 (€)</th><th>Prix 10-24 (€)</th><th>Prix 25-49 (€)</th></tr></thead><tbody>" +
      "<tr><td>238-9692</td><td>1,5</td><td>8 200</td><td>0,19</td><td>3,64</td><td>3,28</td><td>3,09</td></tr>" +
      "<tr><td class=\"fixe\">238-9709</td><td class=\"fixe\">1,5</td><td class=\"fixe\">4 600</td><td class=\"fixe\">0,12</td><td class=\"fixe\">4,76</td><td class=\"fixe\">4,28</td><td class=\"fixe\">4,05</td></tr>" +
      "<tr><td>238-9721</td><td>6</td><td>11 400</td><td>0,1</td><td>6,50</td><td>5,85</td><td>5,53</td></tr>" +
      "<tr><td>238-9715</td><td>12</td><td>10 668</td><td>0,132</td><td>8,73</td><td>7,86</td><td>7,42</td></tr>" +
      "<tr><td>238-9737</td><td>12</td><td>12 600</td><td>0,25</td><td>9,39</td><td>8,45</td><td>7,98</td></tr>" +
      "<tr><td>238-9759</td><td>6</td><td>7 500</td><td>0,45</td><td>10,78</td><td>9,70</td><td>9,16</td></tr></tbody></table></div>" },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Réaliser** le schéma cinématique (à la règle) du mécanisme. <i>Remarque : le schéma doit comporter le moteur, les engrenages, le carter et donc les liaisons entre les différentes pièces.</i>", ref: "Sur papier : **dessine** le carter (bâti hachuré), les trois arbres en liaison pivot avec le carter, le pignon moteur engrenant avec Z_{2a}, puis Z_{2b} engrenant avec Z_{3}. **Décris** ici ton schéma en une phrase et joins-le à ton rendu." },
    { t: "zone", q: "Q7", lignes: 2, ph: "Schéma fait sur papier : …" },
    { t: "q", id: "Q8", lab: "Q8", bac: "**Déterminer** le rapport de réduction de la transmission par engrenages.", ref: "Deux étages en cascade : r = \\frac{Z_{mot} × Z_{2b}}{Z_{2a} × Z_{3}}. **Précise** aussi le sens de rotation du papillon par rapport au moteur (2 contacts extérieurs)." },
    { t: "q", id: "Q9", lab: "Q9", bac: "D'après la référence du moteur électrique, **déterminer** la vitesse de rotation du papillon en tours par minute.", ref: "**Lis** N_{nom} du moteur 238-9709 dans le tableau, puis N_{papillon} = r × N_{nom}." },
    { t: "q", id: "Q10", lab: "Q10", cr: "Conclusion", bac: "**En déduire** le temps mis pour que le papillon effectue ¼ de tour (passage de la position « ouvert » à « fermé »).", ref: "t = \\frac{0,25 tour}{N_{papillon}} avec N en tr/min → résultat en minutes ; **multiplie** par 60 pour l'avoir en secondes." },
    { t: "tableau3", titre: "Q8 à Q10", lignes: [
      { id: "Q8", lab: "Q8", grandeur: "Rapport de réduction de la transmission", sym: "r" },
      { id: "Q9", lab: "Q9", grandeur: "Fréquence de rotation du papillon", sym: "N_{papillon}" },
      { id: "Q10", lab: "Q10", grandeur: "Durée d'un quart de tour", sym: "t" } ] }
  ]
};
