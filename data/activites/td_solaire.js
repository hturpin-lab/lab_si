/* TD Solaire — Dimensionnement énergétique d'un système de pompage autonome — 1re SI, S3 Énergie, séance 1 (27/10/2026)
   Contenu ÉLÈVE uniquement (repris du générateur td.js). Aucune valeur de corrigé ici. */
window.ACTIVITE = {
  id: "td_solaire", fichier: "TD_Solaire", court: "TD Solaire · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD · 2 h",
  titre: "Dimensionnement énergétique d'un système de pompage autonome",
  sous: "Panneau photovoltaïque, pompe, onduleur et batteries",
  blocs: [
    { t: "encadre", titre: "Problématique", html:
      "<p class=\"pb\"><b>Comment concevoir et dimensionner un système photovoltaïque autonome pour alimenter une pompe et assurer le stockage d'énergie nécessaire ?</b></p>" +
      "<p><b>Support :</b> données techniques du panneau solaire, de la pompe, de l'onduleur et des batteries ; calculs de courant, puissance, énergie, nombre de cellules et de batteries ; schémas simplifiés du panneau et de l'association des batteries.</p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-02 (puissance et énergie nécessaires), SI-ANA-03 (échanges d'énergie sur un schéma), SI-MOD-02 (grandeurs d'entrée et de sortie). La Fiche Formules de l'énergie est autorisée.</i></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "methode", html: "<b>Méthode :</b> chaque calcul en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Les dessins demandés (Q6, Q11) se font sur papier ou dans un outil de dessin : décris-les ici en quelques mots et joins-les à ton rendu." },

    { t: "bandeau", id: "sA", titre: "A — Présentation de l'installation", duree: "≈ 15 min", comp: "SI-ANA-03", cr: "Hypothèses" },
    { t: "html", html: "<p>Une installation a été créée pour récupérer les eaux de pluie d'un bâtiment et les envoyer vers les toilettes. Le système utilise une <b>pompe monophasée</b> alimentée à partir de deux sources électriques (le système photovoltaïque et le réseau EDF). En cas de manque d'eau dans la cuve, on alimente les toilettes à partir du réseau d'eau public.</p>" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig1", src: "../assets/img/solaire_installation.png", alt: "Installation : panneaux photovoltaïques, cuve d'eau de pluie, pompe, toilettes, réseau EDF et réseau d'eau public.", legende: "Figure 1 – Installation (eau de pluie, deux sources d'énergie électrique)." },
      { t: "figure", id: "fig2", src: "../assets/img/solaire_schema.png", alt: "Schéma simplifié de l'installation : panneaux photovoltaïques → élément 1 → élément 2 → élément 3 → pompe ; réseau EDF en seconde source.", legende: "Figure 2 – Schéma simplifié de l'installation (éléments 1, 2 et 3 à identifier)." } ] },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Donner** le nom et le rôle des 3 éléments (1, 2 et 3) du schéma de principe (figure 2).", ref: "Sur la figure 2, entre les panneaux et la pompe, il y a trois boîtes numérotées. **Écris** pour chacune son nom (régulateur de charge, batteries, onduleur… dans l'ordre que tu trouves logique) et, en une phrase, à quoi elle sert." },
    { t: "grille", q: "Q1", titre: "Q1", entetes: ["N°", "Nom", "Rôle"], lignes: [
      [{ txt: "1" }, { champ: "Q1_1_nom" }, { champ: "Q1_1_role", multi: true }],
      [{ txt: "2" }, { champ: "Q1_2_nom" }, { champ: "Q1_2_role", multi: true }],
      [{ txt: "3" }, { champ: "Q1_3_nom" }, { champ: "Q1_3_role", multi: true }] ] },
    { t: "html", html: "<p class=\"ent-doc\"><b>Q2.</b> Réaliser et compléter la chaîne d'énergie du système : <i>déjà traitée dans l'activité « Formes d'énergie » — passe à la Q3.</i></p>" },

    { t: "bandeau", id: "sB", titre: "B — Les panneaux photovoltaïques", duree: "≈ 30 min", comp: "SI-ANA-02 · SI-MOD-02", cr: "Résultats" },
    { t: "html", html: "<p>Notre panneau a une <b>puissance crête de 75 W</b>. La tension aux bornes du panneau vaut <b>17 V</b>. Le panneau est constitué de cellules photovoltaïques : dans chaque <b>branche</b>, les cellules sont associées <b>en série</b> ; les différentes branches sont montées <b>en dérivation</b> (parallèle). Chaque cellule délivre une tension de <b>0,5 V</b> et un courant de <b>450 mA</b>.</p>" },
    { t: "donnees", lignes: [["Puissance crête du panneau", "P_{c} = 75 W"], ["Tension du panneau", "U_{panneau} = 17 V"], ["Tension d'une cellule", "U_{cellule} = 0,5 V"], ["Courant d'une cellule", "I_{cellule} = 450 mA"]] },
    { t: "q", id: "Q3", lab: "Q3", bac: "Quel est le nombre de cellules dans une branche ?", ref: "Dans une branche, les cellules sont en série : les tensions s'additionnent. **Divise** la tension du panneau par la tension d'une cellule." },
    { t: "q", id: "Q4", lab: "Q4", bac: "Quelle est l'intensité du courant débitée par le panneau ? **En déduire** le nombre de branches du panneau.", ref: "a) P = U × I, donc I_{panneau} = \\frac{P_{c}}{U_{panneau}}. b) Les branches sont en parallèle : les courants s'additionnent. **Divise** I_{panneau} par le courant d'une cellule (0,45 A) et **arrondis** à l'entier supérieur (il faut au moins 75 W)." },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Déterminer** le nombre total de cellules du panneau.", ref: "**Multiplie** le nombre de cellules par branche (Q3) par le nombre de branches (Q4)." },
    { t: "tableau3", titre: "Q3 à Q5", lignes: [
      { id: "Q3", lab: "Q3", grandeur: "Nombre de cellules par branche", sym: "n" },
      { id: "Q4a", q: "Q4", lab: "Q4 a", grandeur: "Courant débité par le panneau", sym: "I_{panneau}" },
      { id: "Q4b", q: "Q4", lab: "Q4 b", grandeur: "Nombre de branches", sym: "n_{br}" },
      { id: "Q5", lab: "Q5", grandeur: "Nombre total de cellules", sym: "N" } ] },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Faire** un dessin simplifié du panneau en faisant apparaître les différentes cellules (et les grandeurs U et I).", ref: "Sur papier : **dessine** les branches en parallèle, chacune avec ses cellules en série (tu peux en dessiner 3 et écrire « … »). **Place** U_{panneau} entre les deux bornes et I_{panneau} sur le fil de sortie. **Décris** ici ton dessin en une phrase." },
    { t: "zone", q: "Q6", lignes: 2, ph: "Dessin fait sur papier : … branches en parallèle de … cellules en série ; U aux bornes, I en sortie." },

    { t: "bandeau", id: "sC", titre: "C — Le stockage de l'énergie", duree: "≈ 60 min", comp: "SI-ANA-02", cr: "Résultats" },
    { t: "html", html: "<p>Nous allons maintenant déterminer la ou les batteries nécessaires à notre système.</p>" },
    { t: "encadre", titre: "Données techniques", cls: "pouce", html:
      "<p>• Pompe monophasée <b>230 V, 900 W</b> (puissance utile, plaque signalétique), <b>cos φ = 0,78</b>, rendement <b>η = 0,64</b>.</p>" +
      "<p>• Fonctionnement moyen : <b>1 heure par jour</b> (à pleine puissance). • Rendement de l'onduleur (24 V / 230 V) : <b>98 %</b>.</p>" +
      "<p>• Batteries disponibles : <b>12 V, 215 A·h</b>. • On doit pouvoir fonctionner <b>7 jours sans soleil</b>.</p>" },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Calculer** la puissance consommée (absorbée) par la pompe. **En déduire** l'énergie quotidienne consommée par le moteur de la pompe (en W·h).", ref: "a) 900 W est la puissance **utile** ; la puissance absorbée est plus grande : P_{a} = \\frac{P_{u}}{η}. b) Énergie = puissance × durée : E_{jour} = P_{a} × t avec t = 1 h → résultat en W·h." },
    { t: "q", id: "Q8", lab: "Q8", bac: "**Calculer** l'énergie à stocker dans les batteries pour faire fonctionner le système (7 jours, onduleur compris).", ref: "L'onduleur perd 2 % : l'énergie prise aux batteries chaque jour vaut \\frac{E_{jour}}{0,98}. **Multiplie** ensuite par 7 jours." },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Calculer** l'énergie stockée par une batterie (en charge complète).", ref: "E_{batterie} = U × Q avec U = 12 V et Q = 215 A·h (résultat en W·h)." },
    { t: "q", id: "Q10", lab: "Q10", bac: "**En déduire** le nombre de batteries nécessaires pour stocker l'énergie.", ref: "**Divise** l'énergie à stocker (Q8) par l'énergie d'une batterie (Q9) et **arrondis** à l'entier supérieur." },
    { t: "tableau3", titre: "Q7 à Q10", lignes: [
      { id: "Q7a", q: "Q7", lab: "Q7 a", grandeur: "Puissance absorbée par la pompe", sym: "P_{a}" },
      { id: "Q7b", q: "Q7", lab: "Q7 b", grandeur: "Énergie quotidienne consommée", sym: "E_{jour}" },
      { id: "Q8", lab: "Q8", grandeur: "Énergie à stocker (7 jours, onduleur compris)", sym: "E_{stockée}" },
      { id: "Q9", lab: "Q9", grandeur: "Énergie d'une batterie", sym: "E_{batterie}" },
      { id: "Q10", lab: "Q10", grandeur: "Nombre de batteries", sym: "n" } ] },
    { t: "q", id: "Q11", lab: "Q11", bac: "**Déterminer** de quelle manière on doit associer les batteries pour alimenter l'onduleur (faire un dessin simplifié).", ref: "L'onduleur a besoin de 24 V et les batteries font 12 V : combien faut-il en mettre **en série** pour obtenir 24 V ? Avec le nombre total de batteries (Q10), combien de groupes identiques peux-tu mettre **en parallèle** ? **Dessine** l'association sur papier et **décris**-la ici." },
    { t: "zone", q: "Q11", lignes: 3, ph: "… batteries en série (pour 24 V), … branches en parallèle, soit … batteries au total." },
    { t: "html", html: "<p>On considère maintenant que notre association de batteries équivaut à une seule « grosse » batterie.</p>" },
    { t: "q", id: "Q12", lab: "Q12", bac: "**Donner** les caractéristiques de cette « grosse » batterie (tension, capacité).", ref: "En série les tensions s'additionnent ; en parallèle les capacités (A·h) s'additionnent. **Calcule** la tension totale et la capacité totale de l'association de la Q11." },
    { t: "q", id: "Q13", lab: "Q13", bac: "La mesure du courant de la pompe (à pleine puissance) est 7,83 A. **Retrouver** par calcul la valeur de ce courant.", ref: "En monophasé, P_{a} = U × I × cos φ. **Isole** I = \\frac{P_{a}}{U × cos φ} avec P_{a} de la Q7, U = 230 V et cos φ = 0,78, puis **compare** à 7,83 A." },
    { t: "q", id: "Q14", lab: "Q14", bac: "**Calculer** la puissance consommée par l'onduleur lorsque la pompe est à pleine puissance. **En déduire** le courant consommé par l'onduleur.", ref: "a) L'onduleur a un rendement de 98 % : P_{onduleur} = \\frac{P_{a}}{0,98}. b) Côté batteries (24 V continu) : I_{onduleur} = \\frac{P_{onduleur}}{24}." },
    { t: "q", id: "Q15", lab: "Q15", cr: "Conclusion", bac: "À ce régime-là, combien de temps peut fonctionner la pompe ?", ref: "Durée = capacité ÷ courant : t = \\frac{Q}{I_{onduleur}} avec la capacité de la « grosse » batterie (Q12). **Convertis** en heures et minutes et **vérifie** que les 7 jours × 1 h sont assurés." },
    { t: "tableau3", titre: "Q12 à Q15", lignes: [
      { id: "Q12a", q: "Q12", lab: "Q12 a", grandeur: "Tension de la « grosse » batterie", sym: "U" },
      { id: "Q12b", q: "Q12", lab: "Q12 b", grandeur: "Capacité de la « grosse » batterie", sym: "Q" },
      { id: "Q13", lab: "Q13", grandeur: "Courant de la pompe (calcul)", sym: "I" },
      { id: "Q14a", q: "Q14", lab: "Q14 a", grandeur: "Puissance consommée par l'onduleur", sym: "P_{onduleur}" },
      { id: "Q14b", q: "Q14", lab: "Q14 b", grandeur: "Courant consommé par l'onduleur", sym: "I_{onduleur}" },
      { id: "Q15", lab: "Q15", grandeur: "Durée de fonctionnement possible", sym: "t" } ] },
    { t: "zone", q: "Q15", id: "Q15_conclusion", label: "Conclusion : le dimensionnement est-il vérifié ? Réponds à la problématique.", lignes: 3 }
  ]
};
