/* TD Portail solaire SET — Puissances et rendements — 1re SI, S3 Énergie, séance 6 (12/11/2026)
   Contenu ÉLÈVE uniquement (repris du générateur td.js). Aucune valeur de corrigé ici. */
window.ACTIVITE = {
  id: "td_portail_set", fichier: "TD_Portail_SET", court: "TD Portail SET · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TD · 100 min",
  titre: "Puissances et rendements — portail solaire SET",
  sous: "Chaîne de puissance, rendement du moteur, de la transmission et rendement global",
  blocs: [
    { t: "encadre", titre: "Problématique", html:
      "<p class=\"pb\"><b>On souhaite évaluer les performances énergétiques du portail SET.</b> Pour cela, on détermine les puissances en entrée et en sortie des constituants de la chaîne de puissance, puis leurs rendements et le rendement global.</p>" +
      "<p><b>Support :</b> mesures sur le portail (vantail « presque ouvert »), résultats de simulation du moteur, dossier technique du motoréducteur et du mécanisme bielle-manivelle.</p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-03 (échanges d'énergie sur un diagramme), SI-MOD-02 (grandeurs d'entrée et de sortie), SI-ANA-02 (puissances et rendements), SI-ANA-13 (exploiter et comparer des résultats de simulation), SI-MOD-03 (modèle du réducteur). Travail individuel sur document (sans maquette).</i></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "methode", html: "<b>Méthode :</b> chaque calcul en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Pour les lectures graphiques, note la valeur lue et laisse les traits de lecture sur la figure imprimée." },

    { t: "bandeau", id: "sA", titre: "A — Mise en situation et mesures", duree: "≈ 10 min", comp: "SI-ANA-03", cr: "Hypothèses" },
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Mesures relevées (vantail « presque ouvert »)", cls: "pouce", html: "<p>Le portail SET permet d'ouvrir et de fermer un passage à l'aide d'une télécommande. Le panneau solaire associé à une batterie le rend <b>autonome en énergie</b>.</p><p>• Moteur : <b>I_{moteur} = 1,2 A</b> sous <b>U_{moteur} = 12 V</b>.</p><p>• Effort de la bielle sur le vantail : <b>F_{bielle} = 22 N</b> ; bras de levier de cet effort par rapport à l'axe du vantail : <b>d = 0,59 m</b> (figure 6).</p><p>• Position du bras : <b>8</b> (repère gradué de la figure 8).</p>" },
      { t: "figure", id: "fig1", src: "../assets/img/set_fig1_photo_set.png", largeur: "260px", alt: "Portail SET (maquette) avec son panneau solaire.", legende: "Figure 1 – Portail SET (maquette)." } ] },

    { t: "bandeau", id: "sB", titre: "B — Modélisation : chaîne de puissance", duree: "≈ 15 min", comp: "SI-ANA-03 · SI-MOD-02", cr: "Résultats" },
    { t: "figure", id: "fig2", src: "../assets/img/set_fig2_chaine_eleve.png", largeur: "760px", alt: "Chaîne de puissance du portail SET à compléter : panneau photovoltaïque + batterie → (U, I, P_absorbée) → carte de puissance (η_carte ≈ 1) → (U_moteur, I_moteur) → moteur à courant continu (η_moteur) → (C_moteur, ω_moteur, P_moteur) → réducteur + bielle-manivelle (η_transmission) → (C_vantail, ω_vantail, P_vantail) → modifier la position du vantail. Cadres vides : fonction de chaque bloc et forme d'énergie de chaque lien.", legende: "Figure 2 – Chaîne de puissance du portail SET." },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Compléter** la chaîne de puissance (figure 2) : écrire dans le cadre du haut de chaque bloc sa **fonction** (alimenter, distribuer, convertir ou transmettre) et, dans chaque cadre pointillé, la **forme d'énergie** transportée par le lien.", ref: "Tableau ci-dessous : pour chaque bloc, **choisis** sa fonction (ALIMENTER : fournir l'énergie ; DISTRIBUER : la doser ; CONVERTIR : changer sa forme ; TRANSMETTRE : adapter couple et vitesse). Pour chaque lien, **écris** la forme d'énergie (électrique ou mécanique de rotation)." },
    { t: "grille", q: "Q1", titre: "Q1 – fonctions des blocs", entetes: ["Bloc", "Fonction"], lignes: [
      [{ txt: "Panneau photovoltaïque + batterie", cls: "fixe g" }, { champ: "Q1_f_panneau", ph: "ALIMENTER / DISTRIBUER / CONVERTIR / TRANSMETTRE" }],
      [{ txt: "Carte de puissance", cls: "fixe g" }, { champ: "Q1_f_carte" }],
      [{ txt: "Moteur à courant continu", cls: "fixe g" }, { champ: "Q1_f_moteur" }],
      [{ txt: "Réducteur + bielle-manivelle", cls: "fixe g" }, { champ: "Q1_f_trans" }] ] },
    { t: "grille", q: "Q1", titre: "Q1 – formes d'énergie des liens", entetes: ["Lien", "Forme d'énergie"], lignes: [
      [{ txt: "Batterie → carte (U, I)", cls: "fixe g" }, { champ: "Q1_e_1" }],
      [{ txt: "Carte → moteur (U_{moteur}, I_{moteur})", cls: "fixe g" }, { champ: "Q1_e_2" }],
      [{ txt: "Moteur → réducteur (C_{moteur}, ω_{moteur})", cls: "fixe g" }, { champ: "Q1_e_3" }],
      [{ txt: "Réducteur → vantail (C_{vantail}, ω_{vantail})", cls: "fixe g" }, { champ: "Q1_e_4" }] ] },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Exprimer** la puissance P_{vantail} en fonction de la puissance absorbée P_{absorbée} et des rendements η_{carte}, η_{moteur} et η_{transmission}.", ref: "Chaque bloc multiplie la puissance qu'il reçoit par son rendement. **Écris** P_{vantail} = … × … × … × P_{absorbée}." },
    { t: "zone", q: "Q2", lignes: 2 },

    { t: "bandeau", id: "sC", titre: "C — Rendement du moteur", duree: "≈ 25 min", comp: "SI-ANA-02 · SI-ANA-13", cr: "Résultats" },
    { t: "html", html: "<p>Le moteur du portail a été simulé sous <b>U = 12 V</b> (figure 3). Comme <b>η_{carte} ≈ 1</b>, la puissance absorbée par la chaîne est égale à la puissance électrique reçue par le moteur.</p>" },
    { t: "figure", id: "fig3", src: "../assets/img/set_fig3_moteur_eleve.png", largeur: "640px", alt: "Résultats de la simulation du moteur sous 12 V : graphe du haut, courant en fonction du couple ; graphe du bas, vitesse de rotation en fonction du couple.", legende: "Figure 3 – Résultats de la simulation du moteur (U = 12 V) : courant et vitesse de rotation en fonction du couple." },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Calculer** la puissance absorbée P_{absorbée} (puissance électrique reçue par le moteur).", ref: "P_{absorbée} = U_{moteur} × I_{moteur} avec les mesures de la partie A." },
    { t: "q", id: "Q4", lab: "Q4", bac: "Sur la figure 3 (graphe du haut), **relever** le couple moteur C_{moteur} correspondant à I_{moteur} = 1,2 A. Laisser les traits de lecture.", ref: "Sur le graphe du haut, **pars** de 1,2 A sur l'axe vertical, **va** jusqu'à la droite, puis **descends** sur l'axe des couples : **lis** C_{moteur} (en N·m)." },
    { t: "q", id: "Q5", lab: "Q5", bac: "Sur la figure 3 (graphe du bas), **relever** la vitesse de rotation du moteur ω_{moteur} correspondant à ce couple C_{moteur}.", ref: "Sur le graphe du bas, **pars** du couple trouvé en Q4 sur l'axe horizontal, **monte** jusqu'à la droite et **lis** ω_{moteur} (rad/s)." },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Calculer** la puissance mécanique fournie par le moteur P_{moteur}.", ref: "P_{moteur} = C_{moteur} × ω_{moteur}." },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Calculer** le rendement du moteur η_{moteur}.", ref: "η_{moteur} = \\frac{P_{moteur}}{P_{absorbée}} (sans unité, ou en %)." },
    { t: "tableau3", titre: "Q3 à Q7", lignes: [
      { id: "Q3", lab: "Q3", grandeur: "Puissance absorbée", sym: "P_{absorbée}" },
      { id: "Q4", lab: "Q4", grandeur: "Couple moteur (lecture graphique)", sym: "C_{moteur}" },
      { id: "Q5", lab: "Q5", grandeur: "Vitesse de rotation du moteur (lecture graphique)", sym: "ω_{moteur}" },
      { id: "Q6", lab: "Q6", grandeur: "Puissance mécanique du moteur", sym: "P_{moteur}" },
      { id: "Q7", lab: "Q7", grandeur: "Rendement du moteur", sym: "η_{moteur}" } ] },

    { t: "bandeau", id: "sD", titre: "D — Rendement de la transmission", duree: "≈ 35 min", comp: "SI-MOD-03 · SI-ANA-02", cr: "Résultats" },
    { t: "html", html: "<p>Le moteur est accouplé à un <b>réducteur à roues et vis sans fin à deux étages</b> (figures 4 et 5, déjà étudié en séance 4) :</p><p>• 1^{er} étage : vis moteur <b>1</b> (z_{1} = 1 filet) et roue <b>4</b> (z_{4} = 31 dents) ; • 2^{e} étage : vis <b>3</b> (z_{3} = 1 filet) et roue <b>2</b> (z_{2} = 35 dents) ;<br>• la roue 4 et la vis 3 sont sur le même arbre ; l'arbre <b>48</b>, solidaire de la roue 2, entraîne le <b>bras 1</b> du mécanisme bielle-manivelle.</p>" },
    { t: "ligne", inv: true, blocs: [
      { t: "figure", id: "fig4", src: "../assets/img/set_fig4_eclate.png", largeur: "220px", alt: "Vue éclatée du motoréducteur.", legende: "Figure 4 – Vue éclatée du motoréducteur." },
      { t: "figure", id: "fig5", src: "../assets/img/set_fig5_motoreducteur_2_etages.png", alt: "Schéma de principe des deux étages roue et vis sans fin.", legende: "Figure 5 – Schéma de principe des deux étages (séance 4)." } ] },
    { t: "html", html: "<p>Le <b>bras 1</b> (manivelle) fait tourner le <b>vantail 3</b> autour de son axe O par l'intermédiaire de la <b>bielle 2</b> (figures 6 et 7). <i>Attention : les repères 0 à 3 des figures 6 et 7 désignent les pièces du mécanisme ; ils sont différents des repères du réducteur (figure 4).</i></p>" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig6", src: "../assets/img/set_fig6_bielle_manivelle.png", alt: "Mécanisme bielle-manivelle vu de dessus : bras 1, bielle 2, vantail 3 tournant autour de O, bras de levier d de l'effort de la bielle.", legende: "Figure 6 – Mécanisme bielle-manivelle (vue de dessus)." },
      { t: "figure", id: "fig7", src: "../assets/img/set_fig7_vues_3d.png", largeur: "300px", alt: "Vues 3D : vantail fermé et vantail presque ouvert.", legende: "Figure 7 – Vantail fermé et presque ouvert." } ] },
    { t: "figure", id: "fig8", src: "../assets/img/set_fig8_rapport_eleve.png", largeur: "640px", alt: "Courbe du rapport ω_vantail / ω_bras en fonction de la position du bras (repère gradué de 0 à 10).", legende: "Figure 8 – Rapport ω_{vantail} / ω_{bras} en fonction de la position du bras." },
    { t: "q", id: "Q8", lab: "Q8", bac: "À partir de la description du réducteur, **montrer** que le rapport de réduction r = \\frac{ω_{bras}}{ω_{moteur}} vaut \\frac{1}{1 085}.", ref: "Une vis à 1 filet se comporte comme une roue de 1 dent : r = \\frac{z_{1}}{z_{4}} × \\frac{z_{3}}{z_{2}}. **Calcule** le produit 31 × 35." },
    { t: "zone", q: "Q8", lignes: 2 },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Calculer** la vitesse de rotation du bras 1, ω_{bras}.", ref: "ω_{bras} = r × ω_{moteur} = \\frac{ω_{moteur}}{1 085} avec ω_{moteur} de la Q5." },
    { t: "q", id: "Q10", lab: "Q10", bac: "Sur la figure 8, **relever** le rapport \\frac{ω_{vantail}}{ω_{bras}} pour la position du bras de la mesure (position 8).", ref: "Sur la figure 8, **repère** la position 8 sur l'axe horizontal et **lis** la valeur du rapport sur la courbe." },
    { t: "q", id: "Q11", lab: "Q11", bac: "**En déduire** la vitesse de rotation du vantail ω_{vantail}.", ref: "ω_{vantail} = (rapport lu en Q10) × ω_{bras}." },
    { t: "q", id: "Q12", lab: "Q12", bac: "**Montrer** que le couple résistant sur le vantail C_{vantail} vaut environ 13 N·m (utiliser F_{bielle} et le bras de levier d, figure 6).", ref: "Un couple = force × bras de levier : C_{vantail} = F_{bielle} × d avec F_{bielle} = 22 N et d = 0,59 m." },
    { t: "q", id: "Q13", lab: "Q13", bac: "**En déduire** la puissance reçue par le vantail P_{vantail}.", ref: "P_{vantail} = C_{vantail} × ω_{vantail} (prends 13 N·m)." },
    { t: "q", id: "Q14", lab: "Q14", bac: "**En déduire** le rendement de la transmission η_{transmission} (réducteur + bielle-manivelle).", ref: "η_{transmission} = \\frac{P_{vantail}}{P_{moteur}} avec P_{moteur} de la Q6." },
    { t: "tableau3", titre: "Q9 à Q14", lignes: [
      { id: "Q9", lab: "Q9", grandeur: "Vitesse de rotation du bras", sym: "ω_{bras}" },
      { id: "Q10", lab: "Q10", grandeur: "Rapport ω_{vantail} / ω_{bras} (lecture, position 8)", sym: "\\frac{ω_{vantail}}{ω_{bras}}" },
      { id: "Q11", lab: "Q11", grandeur: "Vitesse de rotation du vantail", sym: "ω_{vantail}" },
      { id: "Q12", lab: "Q12", grandeur: "Couple résistant sur le vantail", sym: "C_{vantail}" },
      { id: "Q13", lab: "Q13", grandeur: "Puissance reçue par le vantail", sym: "P_{vantail}" },
      { id: "Q14", lab: "Q14", grandeur: "Rendement de la transmission", sym: "η_{transmission}" } ] },

    { t: "bandeau", id: "sE", titre: "E — Rendement global de la chaîne de puissance", duree: "≈ 15 min", comp: "SI-ANA-02", cr: "Conclusion" },
    { t: "html", html: "<p>Quels que soient les résultats précédents, on prend : <b>η_{carte} ≈ 1</b>, <b>η_{moteur} = 0,65</b> et <b>η_{transmission} = 0,12</b>.</p>" },
    { t: "q", id: "Q15", lab: "Q15", bac: "**Calculer** le rendement global η_{global} de la chaîne de puissance.", ref: "η_{global} = η_{carte} × η_{moteur} × η_{transmission}. **Compare** avec \\frac{P_{vantail}}{P_{absorbée}} calculé avec tes valeurs." },
    { t: "tableau3", titre: "Q15", lignes: [{ id: "Q15", lab: "Q15", grandeur: "Rendement global de la chaîne", sym: "η_{global}" }] },
    { t: "q", id: "Q16", lab: "Q16", cr: "Conclusion", bac: "**Conclure** sur les performances énergétiques du portail, en lien avec son fonctionnement autonome (panneau solaire + batterie).", ref: "a) Quelle part de l'énergie prise à la batterie est perdue, et où surtout (pense au rendement du réducteur à vis sans fin vu en séance 4) ? b) Est-ce gênant pour l'autonomie, sachant que le portail ne fonctionne que quelques secondes par manœuvre (ordre de grandeur : P_{absorbée} × 20 s, à comparer à une batterie 12 V – 10 A·h) ? c) Pourquoi garder quand même un réducteur à vis sans fin (irréversibilité) ?" },
    { t: "zone", q: "Q16", lignes: 5 }
  ]
};
