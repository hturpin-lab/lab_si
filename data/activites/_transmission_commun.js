/* Blocs communs aux deux TD de transmission (séance 4, 5/11/2026) : méthode, partie A/I (train d'engrenages),
   partie B/II (ROVIO, télescope). Contenu ÉLÈVE uniquement (repris du générateur td_transmission.js). */
window.TRANS_COMMUN = function (pref) {
  /* pref : "A"/"B" (TD Perceuse suite) ou "I"/"II" (TD 2) */
  var A = pref === "A" ? "A" : "I", B = pref === "A" ? "B" : "II";
  return [
    { t: "encadre", titre: "Méthode : rapport de transmission d'un train d'engrenages", cls: "pouce", html:
      "<p>Un <b>engrenage</b> = 2 roues dentées en prise. La roue <b>menante</b> entraîne la roue <b>menée</b>. Z = nombre de dents (pour une <b>vis sans fin</b>, Z = nombre de <b>filets</b>).</p>" +
      "<p>Rapport de transmission : <b>r = \\frac{ω_{sortie}}{ω_{entrée}} = \\frac{n_{sortie}}{n_{entrée}} = \\frac{produit des Z menantes}{produit des Z menées}</b>.</p>" +
      "<p>r &lt; 1 : <b>réducteur</b> (la sortie tourne moins vite) ; r &gt; 1 : multiplicateur. Pour un réducteur, on écrit souvent r = \\frac{1}{k} (la vitesse est divisée par k).</p>" +
      "<p><b>Sens de rotation</b> (axes parallèles) : chaque <b>contact extérieur</b> inverse le sens, un contact intérieur le conserve. Avec n contacts extérieurs : r = (−1)^{n} × … ; n pair : même sens que l'entrée, n impair : sens inverse.</p>" +
      "<p>Une <b>roue intermédiaire</b> (à la fois menée et menante) se simplifie dans r : elle ne change que le sens de rotation.</p>" },
    { t: "figure", src: "../assets/img/trans_rappel_contacts.png", largeur: "640px", alt: "Rappel : contact extérieur (sens inversé) et contact intérieur (sens conservé).", legende: "Rappel – Contact extérieur : sens inversé ; contact intérieur : sens conservé." },
    { t: "methode", html: "<b>Méthode :</b> chaque calcul en 3 temps : <b>relation littérale → application numérique → résultat</b>. Calculatrice autorisée." },

    { t: "bandeau", id: "s1", titre: A + " — Introduction : train d'engrenages", comp: "SI-MOD-03 · SI-MOD-02", cr: "Résultats" },
    { t: "html", html: "<p>L'arbre d'entrée 7 tourne dans le <b>sens horaire</b> (vu de face, figure 1). Les roues 3 et 3′, 4 et 4′, 5 et 5′ sont <b>solidaires</b> deux à deux (même arbre).</p>" },
    { t: "figure", id: "fig1", src: "../assets/img/trans_train_eleve.png", largeur: "760px", alt: "Train d'engrenages vu de face : roues 7 (30 dents), 6 (54), 5 (26) et 5′ (82), 4 (38) et 4′ (48), 3 (24) et 3′ (65), 2, 1 ; repère de chaque roue avec son nombre de dents.", legende: "Figure 1 – Train d'engrenages vu de face — repère de la roue (nombre de dents)." },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Indiquer** par une flèche, sur la figure, le sens de rotation de chaque roue dentée, puis **compléter** le tableau (H = horaire, AH = anti-horaire).", ref: "**Pars** de la roue 7 (horaire). À chaque contact extérieur, le sens s'inverse ; à un contact intérieur, il se conserve. **Note** H ou AH pour chaque roue dans le tableau (les roues solidaires tournent dans le même sens)." },
    { t: "grille", q: "Q1", titre: "Q1", entetes: ["Roue(s)", "7", "6", "5 et 5′", "4 et 4′", "3 et 3′", "2", "1"], lignes: [[{ txt: "Sens de rotation", cls: "fixe g" }, { txt: "H (donné)" }, { champ: "Q1_s6", ph: "H / AH" }, { champ: "Q1_s5", ph: "H / AH" }, { champ: "Q1_s4", ph: "H / AH" }, { champ: "Q1_s3", ph: "H / AH" }, { champ: "Q1_s2", ph: "H / AH" }, { champ: "Q1_s1", ph: "H / AH" }]] },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Déterminer** le nombre d'engrenages, puis le nombre d'engrenages à contact extérieur et à contact intérieur.", ref: "**Compte** les couples de roues en prise sur la figure 1 (chaque couple = un engrenage). **Repère** ceux où une roue est à l'intérieur de l'autre (contact intérieur)." },
    { t: "zone", q: "Q2", lignes: 2 },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Donner** l'expression littérale du rapport de transmission r = \\frac{ω_{1}}{ω_{7}} du train d'engrenages (signe compris).", ref: "**Écris** r = (−1)^{n} × \\frac{Z_{menantes}}{Z_{menées}} en listant les roues menantes (7, 6, 5, 4, 3, 2) au numérateur et les roues menées (6, 5′, 4′, 3′, 2, 1) au dénominateur ; n = nombre de contacts extérieurs (Q2). **Simplifie** les roues intermédiaires." },
    { t: "zone", q: "Q3", lignes: 3 },
    { t: "q", id: "Q4", lab: "Q4", cr: "Analyse", bac: "**Faire** l'application numérique. **En déduire** s'il s'agit d'un réducteur ou d'un multiplicateur de vitesse, et le sens de rotation de l'arbre de sortie 1.", ref: "**Remplace** les Z par les nombres de dents de la figure 1 et **calcule** r (fraction puis valeur, sous la forme \\frac{1}{k}). r &lt; 1 → réducteur. Signe + (n pair) → même sens que 7 ; signe − → sens inverse." },
    { t: "zone", q: "Q4", lignes: 3 },

    { t: "bandeau", id: "s2", titre: B + " — Rapport de réduction des réducteurs à engrenages", comp: "SI-MOD-03 · SI-MOD-02", cr: "Résultats" },
    { t: "html", html: "<p><b>1. Robot ROVIO (robot de téléprésence à roues omnidirectionnelles).</b> Chaque roue est entraînée par un moteur à courant continu suivi d'un réducteur à engrenages (figure 2 : ordre des engrenages établi d'après la vue 3D du document d'origine ; les couleurs sont rappelées en toutes lettres).</p>" },
    { t: "ligne", inv: true, blocs: [
      { t: "figure", src: "../assets/img/trans_photo_rovio.png", largeur: "260px", alt: "Photo du robot ROVIO.", legende: "Robot ROVIO." },
      { t: "html", html: "<div class=\"tab-wrap\"><table class=\"grille\"><thead><tr><th>Arbre (couleur)</th><th>Roue(s) : Z</th><th>Remarque</th></tr></thead><tbody>" +
        "<tr><td class=\"fixe g\">bleu</td><td>8</td><td>pignon moteur</td></tr><tr><td class=\"fixe g\">blanc</td><td>16</td><td>roue seule</td></tr><tr><td class=\"fixe g\">marron</td><td>40 et 12</td><td></td></tr><tr><td class=\"fixe g\">jaune</td><td>40 et 14</td><td></td></tr>" +
        "<tr><td class=\"fixe g\">blanc</td><td>28 et 12</td><td></td></tr><tr><td class=\"fixe g\">rouge</td><td>28 et 12</td><td></td></tr><tr><td class=\"fixe g\">violet / bleu ciel</td><td>40 et 22</td><td>solidaires</td></tr><tr><td class=\"fixe g\">vert</td><td>14</td><td>solidaire de la roue</td></tr></tbody></table></div>" } ] },
    { t: "figure", id: "fig2", src: "../assets/img/trans_rovio_reducteur.png", largeur: "760px", alt: "Réducteur du robot ROVIO, de l'arbre moteur (bleu, 8 dents) à la roue (vert, 14 dents), avec les couleurs et nombres de dents de chaque étage.", legende: "Figure 2 – Réducteur du robot, de l'arbre moteur (bleu) à la roue (vert) — couleur (nombre de dents)." },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Calculer** le rapport de réduction r du réducteur (moteur → roue).", ref: "**Suis** la chaîne de la figure 2 du pignon bleu (8) à la roue verte (14) : à chaque étage, note la roue menante (petit pignon qui entraîne) et la roue menée. r = \\frac{produit des Z menantes}{produit des Z menées}. Le blanc 16 est une roue intermédiaire : il se simplifie. **Donne** r sous la forme \\frac{1}{k}." },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Calculer** la fréquence de rotation de la roue quand le moteur tourne à 1 400 tr/min.", ref: "n_{roue} = r × n_{moteur} avec n_{moteur} = 1 400 tr/min." },
    { t: "tableau3", titre: "Q5 et Q6", lignes: [
      { id: "Q5", lab: "Q5", grandeur: "Rapport de réduction du réducteur (moteur → roue)", sym: "r" },
      { id: "Q6", lab: "Q6", grandeur: "Fréquence de rotation de la roue (moteur à 1 400 tr/min)", sym: "n_{roue}" } ] },
    { t: "html", html: "<p><b>2. Télescope motorisé.</b> L'axe du télescope est entraîné par un moteur, un réducteur à engrenages (roues 1 à 13) puis un système roue et vis sans fin (vis 14, roue 15).</p>" },
    { t: "ligne", inv: true, blocs: [
      { t: "figure", src: "../assets/img/trans_photo_telescope.png", largeur: "220px", alt: "Photo du télescope motorisé.", legende: "Télescope." },
      { t: "encadre", titre: "Nombres de dents", cls: "pouce", html: "<p>Z_{1} = Z_{3} = Z_{5} = Z_{7} = Z_{9} = 12 dents · Z_{2} = 56 dents · Z_{4} = Z_{6} = Z_{8} = Z_{10} = Z_{11} = 24 dents · Z_{12} = 8 dents ; Z_{13} = 22 dents.</p><p>La vis 14 a 1 filet : Z_{14} = 1 ; la roue 15 a 60 dents : Z_{15} = 60.</p>" } ] },
    { t: "figure", id: "fig3", src: "../assets/img/trans_telescope_reducteur.png", largeur: "720px", alt: "Schéma cinématique du réducteur du télescope : roues 1 à 13 puis vis 14 et roue 15, avec les nombres de dents.", legende: "Figure 3 – Schéma cinématique du réducteur du télescope — repère (nombre de dents)." },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Calculer** le rapport de réduction r_{1} du réducteur (de 1 à 13). <i>Repérer la roue 10.</i>", ref: "Les roues impaires (1, 3, 5, 7, 9) et 12 sont menantes ; 2, 4, 6, 8, 11, 13 sont menées. La roue 10 est menée par 9 et menante pour 11 : elle se simplifie. r_{1} = \\frac{12^{5} × 8}{56 × 24^{4} × 22} : **calcule** et **écris** sous la forme \\frac{1}{k}." },
    { t: "q", id: "Q8", lab: "Q8", bac: "**Calculer** le rapport r_{2} du système roue et vis sans fin (14 → 15).", ref: "r_{2} = \\frac{Z_{14}}{Z_{15}} avec Z_{14} = 1 filet et Z_{15} = 60 dents." },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Calculer** le rapport de transmission global r_{g} (moteur → roue 15).", ref: "Les deux systèmes sont en cascade : r_{g} = r_{1} × r_{2}." },
    { t: "q", id: "Q10", lab: "Q10", bac: "**Calculer** la fréquence de rotation de la roue 15 quand le moteur tourne à 1 133 tr/min.", ref: "n_{15} = r_{g} × n_{moteur}. Le résultat est très petit (quelques tours par heure) : c'est normal pour suivre un astre." },
    { t: "tableau3", titre: "Q7 à Q10", lignes: [
      { id: "Q7", lab: "Q7", grandeur: "Rapport de réduction du réducteur à engrenages (1 → 13)", sym: "r_{1}" },
      { id: "Q8", lab: "Q8", grandeur: "Rapport du système roue et vis sans fin (14 → 15)", sym: "r_{2}" },
      { id: "Q9", lab: "Q9", grandeur: "Rapport global (moteur → roue 15)", sym: "r_{g}" },
      { id: "Q10", lab: "Q10", grandeur: "Fréquence de rotation de la roue 15 (moteur à 1 133 tr/min)", sym: "n_{15}" } ] }
  ];
};
window.TRANS_RETENIR = { t: "trous", q: "RET", id: "retenir", titre: "À retenir (à compléter en fin de séance)", cls: "cadre-ret", label: "À retenir",
  html: "Rapport de transmission : r = [[RET_r|170]] · Réducteur : r [[RET_red|60]] 1 · Fréquence de sortie : n_{s} = [[RET_ns|90]] · Sens de sortie : (−1)^{n} avec n = nombre de [[RET_sens|150]] · Roue intermédiaire : ne change que [[RET_inter|90]] · Vis sans fin : Z_{vis} = nombre de [[RET_vis|80]]." };
