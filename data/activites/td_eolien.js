/* TD Éolien — Produire de l'électricité avec une éolienne — 1re SI, S3 Énergie, séance 7 (17/11/2026)
   Contenu ÉLÈVE uniquement (repris du générateur td.js). Aucune valeur de corrigé ici. */
window.ACTIVITE = {
  id: "td_eolien", fichier: "TD_Eolien", court: "TD Éolien · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD · 40 min",
  titre: "Produire de l'électricité avec une éolienne",
  sous: "Effort et flux, chaîne de puissance, multiplicateur, rendement global — parties C et D pour aller plus loin",
  blocs: [
    { t: "encadre", titre: "Problématique", html:
      "<p class=\"pb\"><b>Comment produire une énergie électrique adaptée au réseau à partir d'une énergie naturelle qui fluctue en direction et en intensité ?</b></p>" +
      "<p><b>Travail demandé (40 min) :</b> Q1 à Q7. Les parties C et D sont pour aller plus loin (élèves rapides, travail à la maison).</p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-02 (puissance et énergie nécessaires), SI-ANA-03 (échanges d'énergie sur un diagramme structurel), SI-MOD-02 (grandeurs d'entrée et de sortie). Fiches de synthèse de la séance 1 autorisées.</i></p>" },
    { t: "cr", partie: "Problématique" },

    { t: "bandeau", id: "sA", titre: "A — Rappel de cours : effort et flux", duree: "≈ 8 min", comp: "SI-MOD-02", cr: "Hypothèses" },
    { t: "html", html: "<p>La puissance (en watts) est toujours égale au produit d'une <b>grandeur d'effort</b> par une <b>grandeur de flux</b>.</p>" },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Compléter** le tableau : nom, symbole et unité de chaque grandeur, puis relation donnant la puissance.", ref: "Pour chaque domaine, **écris** la grandeur d'effort (nom, symbole, unité), la grandeur de flux et la formule P = effort × flux. Aide-toi de la Fiche Synthèse Effort / Flux." },
    { t: "grille", q: "Q1", titre: "Q1", entetes: ["Puissance (en W)", "Grandeur d'effort (symbole, unité)", "Grandeur de flux (symbole, unité)", "Relation"], lignes: [
      [{ txt: "Électrique", cls: "fixe g" }, { champ: "Q1_el_e" }, { champ: "Q1_el_f" }, { champ: "Q1_el_r", ph: "P = …" }],
      [{ txt: "Mécanique de translation", cls: "fixe g" }, { champ: "Q1_tr_e" }, { champ: "Q1_tr_f" }, { champ: "Q1_tr_r", ph: "P = …" }],
      [{ txt: "Mécanique de rotation", cls: "fixe g" }, { champ: "Q1_rot_e" }, { champ: "Q1_rot_f" }, { champ: "Q1_rot_r", ph: "P = …" }],
      [{ txt: "Pneumatique", cls: "fixe g" }, { champ: "Q1_pn_e" }, { champ: "Q1_pn_f" }, { champ: "Q1_pn_r", ph: "P = …" }],
      [{ txt: "Hydraulique", cls: "fixe g" }, { champ: "Q1_hy_e" }, { champ: "Q1_hy_f" }, { champ: "Q1_hy_r", ph: "P = …" }] ] },
    { t: "html", html: "<p class=\"ent-doc\"><i>Les autres rappels (rendement, rapport de réduction, V = ω × R, conversions) sont regroupés dans la carte mentale de la séance.</i></p>" },

    { t: "bandeau", id: "sB", titre: "B — Étude d'une éolienne de 400 kW", duree: "≈ 30 min", comp: "SI-ANA-02 · SI-ANA-03", cr: "Résultats" },
    { t: "ligne", blocs: [
      { t: "html", html: "<p>Une <b>éolienne</b> transforme l'énergie cinétique du vent en énergie électrique. Le <b>rotor</b> porte trois pales ; il est relié à la nacelle par le moyeu.</p><p>La <b>nacelle</b> renferme :<br>• un générateur électrique entraîné par le rotor par l'intermédiaire d'un multiplicateur de vitesse ;<br>• un vérin de réglage qui modifie l'orientation des pales (prise au vent) ;<br>• un moteur hydraulique qui maintient la nacelle face au vent ;<br>• un boîtier de contrôle qui centralise les informations d'un anémomètre et d'une girouette.</p><p>Le <b>mât</b> permet d'accéder à la nacelle (porte et échelle interne). L'ordinateur de pilotage et l'armoire de couplage au réseau électrique sont logés à la base du mât.</p>" },
      { t: "figure", id: "fig1", src: "../assets/img/eol_fig1_eolienne_original.png", largeur: "300px", alt: "Constituants de l'éolienne : pales, moyeu, nacelle, mât.", legende: "Figure 1 – Constituants de l'éolienne." } ] },
    { t: "encadre", titre: "Données constructeur", cls: "pouce", html:
      "<p>• <b>Vent :</b> démarrage de la production à <b>5 m/s</b> ; puissance nominale atteinte à <b>14 m/s</b> ; arrêt de la production (sécurité) à <b>25 m/s</b>.</p>" +
      "<p>• <b>Rotor :</b> trois pales ; longueur d'une pale <b>17 m</b>.</p>" +
      "<p>• <b>Transmission :</b> train d'engrenages à trois étages (axes parallèles) ; rapport de transmission <b>r = 45,45</b> ; rendement <b>η_{1} = 0,92</b>.</p>" +
      "<p>• <b>Générateur :</b> puissance nominale <b>400 kW</b> ; fréquence <b>50 Hz</b> ; fréquence de rotation <b>N_{géné} = 1 500 tr/min</b> ; rendement <b>η_{2} = 0,97</b>.</p>" },
    { t: "figure", id: "fig2", src: "../assets/img/eol_fig2_courbe_eleve.png", largeur: "640px", alt: "Courbe constructeur : puissance électrique fournie au réseau (kW) en fonction de la vitesse du vent (m/s), de 0 à 25 m/s, plateau à 400 kW à partir de 14 m/s.", legende: "Figure 2 – Puissance électrique fournie au réseau en fonction de la vitesse du vent (courbe constructeur redessinée)." },
    { t: "figure", id: "fig3", src: "../assets/img/eol_fig3_chaine_eleve.png", largeur: "760px", alt: "Chaîne de puissance de l'éolienne : vent → pales (P_pales, C, ω) → transmission (r = 45,45, η1 = 0,92) → générateur (η2 = 0,97, N = 1 500 tr/min) → réseau (P_élec) ; rendement global η_g à compléter.", legende: "Figure 3 – Chaîne de puissance de l'éolienne (liens de puissance en demi-flèches)." },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Donner** le **cas d'utilisation** principal du système (ce que l'éolienne permet de faire et pour quel acteur).", ref: "**Formule** une phrase du type « produire … à partir de … et le fournir à … ». **Précise** qui est l'acteur principal (celui qui profite du service) : le vent n'est pas un acteur, c'est l'environnement." },
    { t: "zone", q: "Q2", lignes: 2 },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Observer** le rapport de transmission r = 45,45 de la transmission à engrenages. S'agit-il d'un **rapport de réduction** ou d'un **rapport de multiplication** ? **Justifier**.", ref: "r = \\frac{ω_{sortie}}{ω_{entrée}} : ici l'entrée est l'arbre des pales, la sortie l'arbre du générateur. **Compare** r à 1 : qui tourne le plus vite, les pales ou le générateur ?" },
    { t: "zone", q: "Q3", lignes: 2 },
    { t: "q", id: "Q4", lab: "Q4", bac: "Pendant la production, le **vent** souffle entre 5 m/s et 25 m/s. D'après la courbe (figure 2), **déterminer** les valeurs minimale et maximale de la puissance électrique fournie au réseau.", ref: "**Lis** sur la figure 2 la puissance à 5 m/s (minimum) et la puissance du plateau entre 14 et 25 m/s (maximum)." },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Déterminer** le rendement global η_{g} entre les pales et le réseau.", ref: "Deux constituants en cascade : η_{g} = η_{1} × η_{2}." },
    { t: "q", id: "Q6", lab: "Q6", bac: "**En déduire** les valeurs minimale et maximale de la puissance que doivent fournir les pales.", ref: "Les pales sont **en amont** du réseau : on remonte la chaîne en divisant par le rendement, P_{pales} = \\frac{P_{élec}}{η_{g}}. **Fais** le calcul pour le minimum et pour le maximum." },
    { t: "q", id: "Q7", lab: "Q7", bac: "L'éolienne est couplée au réseau lorsque le générateur tourne à 1 500 tr/min. **Déterminer** alors la fréquence de rotation des pales N_{pales} (en tr/min), puis leur vitesse angulaire ω_{pales} (en rad/s).", ref: "a) N_{pales} = \\frac{N_{géné}}{r}. b) ω = \\frac{2π × N}{60} (N en tr/min → ω en rad/s)." },
    { t: "tableau3", titre: "Q4 à Q7", lignes: [
      { id: "Q4a", q: "Q4", lab: "Q4 a", grandeur: "Puissance électrique minimale (vent 5 m/s)", sym: "P_{élec min}" },
      { id: "Q4b", q: "Q4", lab: "Q4 b", grandeur: "Puissance électrique maximale", sym: "P_{élec max}" },
      { id: "Q5", lab: "Q5", grandeur: "Rendement global pales → réseau", sym: "η_{g}" },
      { id: "Q6a", q: "Q6", lab: "Q6 a", grandeur: "Puissance minimale des pales", sym: "P_{pales min}" },
      { id: "Q6b", q: "Q6", lab: "Q6 b", grandeur: "Puissance maximale des pales", sym: "P_{pales max}" },
      { id: "Q7a", q: "Q7", lab: "Q7 a", grandeur: "Fréquence de rotation des pales", sym: "N_{pales}" },
      { id: "Q7b", q: "Q7", lab: "Q7 b", grandeur: "Vitesse angulaire des pales", sym: "ω_{pales}" } ] },
    { t: "encadre", titre: "Coups de pouce", cls: "pouce", html: "<p><b>CP1 (Q3)</b> — Le rapport de transmission est r = \\frac{ω_{sortie}}{ω_{entrée}}. Ici, l'entrée est l'arbre des pales, la sortie l'arbre du générateur. Comparer r à 1.</p><p><b>CP2 (Q6)</b> — Les pales sont <b>en amont</b> du réseau : on remonte la chaîne en divisant par le rendement, P_{amont} = \\frac{P_{aval}}{η}.</p><p><b>CP3 (Q7)</b> — N_{pales} = \\frac{N_{géné}}{r} ; puis ω = \\frac{2π × N}{60} (N en tr/min, ω en rad/s).</p>" },

    { t: "bandeau", id: "sC", titre: "C — Pour aller plus loin : couples et vitesses", duree: "si fini", comp: "SI-ANA-02", cr: "Résultats" },
    { t: "q", id: "Q8", lab: "Q8", bac: "Les pales tournent à vitesse constante (générateur couplé au réseau). **Déterminer** les valeurs minimale et maximale du **couple** exercé par les pales.", ref: "P = C × ω donc C = \\frac{P}{ω_{pales}} : **calcule** avec P_{pales min} puis P_{pales max} (Q6) et ω_{pales} (Q7)." },
    { t: "tableau3", titre: "Q8", lignes: [
      { id: "Q8a", q: "Q8", lab: "Q8 a", grandeur: "Couple minimal des pales", sym: "C_{min}" },
      { id: "Q8b", q: "Q8", lab: "Q8 b", grandeur: "Couple maximal des pales", sym: "C_{max}" } ] },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Compléter** la **figure 3** avec vos valeurs (rendement global, puissances, couples, fréquence et vitesse de rotation).", ref: "**Reporte** sur la figure 3 (imprimée ou dans la zone ci-dessous) : η_{g}, P_{pales}, P_{élec}, C, N_{pales}, ω_{pales}." },
    { t: "zone", q: "Q9", lignes: 3, ph: "η_g = … ; P_pales = … ; C = … ; N_pales = … ; ω_pales = …" },
    { t: "q", id: "Q10", lab: "Q10", bac: "**Calculer** la vitesse linéaire de l'extrémité d'une pale (rayon R ≈ 17 m), en m/s puis en km/h.", ref: "V = ω_{pales} × R, puis × 3,6 pour les km/h. **Compare** à la vitesse du vent." },
    { t: "tableau3", titre: "Q10", lignes: [{ id: "Q10", lab: "Q10", grandeur: "Vitesse du bout de pale", sym: "V" }] },

    { t: "bandeau", id: "sD", titre: "D — Pour aller plus loin : propulsion d'un navire", duree: "si fini", comp: "SI-ANA-02 · SI-MOD-02", cr: "Résultats" },
    { t: "figure", id: "fig4", src: "../assets/img/eol_fig4_navire_original.png", largeur: "480px", alt: "Navire à propulsion électrique.", legende: "Figure 4 – Navire à propulsion électrique." },
    { t: "html", html: "<p>On évalue la puissance nécessaire à l'avancement du navire. Une étude numérique a évalué la <b>résistance à l'avancement</b> à <b>F = 45 300 N</b> pour une vitesse de <b>11 nœuds</b> (1 nœud = 1 mille nautique, soit <b>1 852 m</b>, parcouru en 1 heure). La chaîne de transmission de l'énergie, à partir du moteur électrique à courant continu, est représentée figure 5.</p>" },
    { t: "figure", id: "fig5", src: "../assets/img/eol_fig5_chaine_navire_eleve.png", largeur: "760px", alt: "Chaîne d'énergie du navire : P_e → moteur électrique à courant continu (η_m = 0,93, 530 tr/min) → P_m → transmission (η_t = 0,95) → P_h → hélice (η_h = 0,625) → P_s (F, v).", legende: "Figure 5 – Chaîne d'énergie du navire." },
    { t: "q", id: "Q11", lab: "Q11", bac: "**Déterminer** la vitesse v du navire en m/s.", ref: "11 nœuds = 11 × 1 852 m en 1 h = 3 600 s : v = \\frac{11 × 1 852}{3 600}." },
    { t: "q", id: "Q12", lab: "Q12", bac: "**Déterminer** la puissance mécanique de translation P_{s} (on prendra v = 5,7 m/s, valeur arrondie).", ref: "P_{s} = F × v avec F = 45 300 N." },
    { t: "q", id: "Q13", lab: "Q13", bac: "**Calculer** la puissance P_{h} reçue par l'hélice.", ref: "On remonte la chaîne : P_{h} = \\frac{P_{s}}{η_{h}} avec η_{h} = 0,625 (figure 5)." },
    { t: "q", id: "Q14", lab: "Q14", bac: "**Calculer** la puissance mécanique P_{m} fournie par le moteur.", ref: "P_{m} = \\frac{P_{h}}{η_{t}} avec η_{t} = 0,95." },
    { t: "q", id: "Q15", lab: "Q15", bac: "**Calculer** le couple du moteur.", ref: "ω = \\frac{2π × 530}{60} rad/s, puis C = \\frac{P_{m}}{ω}." },
    { t: "q", id: "Q16", lab: "Q16", bac: "**Calculer** la puissance électrique P_{e} à l'entrée du moteur.", ref: "P_{e} = \\frac{P_{m}}{η_{m}} avec η_{m} = 0,93." },
    { t: "q", id: "Q17", lab: "Q17", bac: "**Calculer** le rendement de la chaîne d'énergie.", ref: "η = η_{m} × η_{t} × η_{h} ; **vérifie** avec \\frac{P_{s}}{P_{e}}." },
    { t: "tableau3", titre: "Q11 à Q17", lignes: [
      { id: "Q11", lab: "Q11", grandeur: "Vitesse du navire", sym: "v" },
      { id: "Q12", lab: "Q12", grandeur: "Puissance mécanique de translation", sym: "P_{s}" },
      { id: "Q13", lab: "Q13", grandeur: "Puissance reçue par l'hélice", sym: "P_{h}" },
      { id: "Q14", lab: "Q14", grandeur: "Puissance mécanique du moteur", sym: "P_{m}" },
      { id: "Q15", lab: "Q15", grandeur: "Couple du moteur", sym: "C" },
      { id: "Q16", lab: "Q16", grandeur: "Puissance électrique à l'entrée du moteur", sym: "P_{e}" },
      { id: "Q17", lab: "Q17", grandeur: "Rendement de la chaîne d'énergie", sym: "η" } ] },
    { t: "html", html: "<p><b>Engrenage.</b> Un pignon de <b>17 dents</b> (roue menante) tourne à <b>1 000 tr/min</b> ; il entraîne une roue de <b>68 dents</b>.</p>" },
    { t: "q", id: "Q18", lab: "Q18", bac: "**Calculer** le rapport de réduction r de cet engrenage, puis la fréquence de rotation de la roue.", ref: "r = \\frac{Z_{menante}}{Z_{menée}} = \\frac{17}{68}, puis N_{roue} = r × N_{pignon}." },
    { t: "tableau3", titre: "Q18", lignes: [
      { id: "Q18a", q: "Q18", lab: "Q18 a", grandeur: "Rapport de réduction", sym: "r" },
      { id: "Q18b", q: "Q18", lab: "Q18 b", grandeur: "Fréquence de rotation de la roue", sym: "N_{roue}" } ] }
  ]
};
