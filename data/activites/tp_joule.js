/* TP Joule — Pertes par effet Joule dans une ligne électrique — 1re SI, S3 Énergie, séance 2 (29/10/2026)
   Contenu ÉLÈVE uniquement (repris du générateur tp_joule.js). Aucune valeur de corrigé ici. */
window.ACTIVITE = {
  id: "tp_joule", fichier: "TP_Joule", court: "TP Joule · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · TP · 60 min",
  titre: "Pertes par effet Joule dans une ligne électrique",
  sous: "Simulation Tinkercad Circuits + tracé sous LibreOffice Calc",
  blocs: [
    { t: "encadre", titre: "Problème posé", html:
      "<p>Dans la centrale photovoltaïque de Porette de Nérone (Corse), les câbles qui relient les panneaux aux onduleurs <b>perdent 38 kW</b> sous forme de chaleur : un câble n'est pas un conducteur parfait, il possède une <b>résistance R_{c}</b>. On le modélise par une résistance en <b>série</b> avec la charge (ici R_{ch} = 6 Ω, à la place d'un moteur).</p>" +
      "<p class=\"pb\"><b>Problématique : de quoi dépendent les pertes dans une ligne électrique, et comment les limiter ?</b></p>" +
      "<p><b>Rappels :</b> loi d'Ohm U = R·I (V, Ω, A) · puissance P = U·I (W) · rendement η = \\frac{P_{utile}}{P_{absorbée}} · loi des mailles : la somme algébrique des tensions le long d'une maille est nulle.</p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-02 (puissance, rendements et pertes) · SI-MOD-13 (effort et flux dans un circuit : lois de Kirchhoff, résistance).</i></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "html", html: "<p class=\"ent-doc\">Documents fournis : le classeur <a href=\"../docs/TP_Joule_mesures.ods\" download>TP_Joule_mesures.ods</a> (partie 5) et la <a href=\"../docs/TP_Joule.pdf\" target=\"_blank\" rel=\"noopener\">version PDF</a> de ce TP.</p>" },

    { t: "bandeau", id: "s1", titre: "1 — Réaliser le montage et prévoir", duree: "10 min", comp: "SI-MOD-13", cr: "Protocole" },
    { t: "etapes", items: [
      "**Ouvrir** Tinkercad › Circuits et créer un circuit nommé « TP_Joule_NOM ».",
      "**Placer** l'alimentation (Power Supply) et la régler sur **12 V**.",
      "**Placer** deux résistances : R_{c} = 1 Ω (câble) et R_{ch} = 6 Ω (charge).",
      "**Placer** 3 multimètres : A en série (mode courant) ; V1 et V2 en dérivation (mode tension continue).",
      "**Câbler** comme sur la figure 1, puis **appeler le professeur** avant de lancer la simulation." ] },
    { t: "figure", id: "fig1", src: "../assets/img/tp_joule_montage.png", largeur: "640px", alt: "Montage : alimentation E = 12 V en série avec la résistance de câble Rc et la résistance de charge Rch = 6 Ω ; ampèremètre A en série, voltmètres V1 aux bornes de Rc et V2 aux bornes de Rch.", legende: "Figure 1 – Montage à réaliser (R_{c} = 0,5 Ω, 1 Ω ou 2 Ω)." },
    { t: "q", id: "Q1", lab: "Q1", cr: "Hypothèses",
      bac: "Avant de simuler, **prévoir par le calcul** (loi des mailles et loi d'Ohm), pour R_{c} = 1 Ω : le courant I, puis les tensions U_{c} et U_{ch}.",
      ref: "Sans lancer la simulation, pour R_{c} = 1 Ω : a) les deux résistances sont en série, donc le courant vaut I = \\frac{E}{R_{c} + R_{ch}} : **calcule** I. b) **Calcule** ensuite U_{c} = R_{c}·I et U_{ch} = R_{ch}·I (loi d'Ohm). Vérifie que U_{c} + U_{ch} = 12 V." },
    { t: "grille", q: "Q1", titre: "Prévision Q1", entetes: ["I (A)", "U_{c} (V)", "U_{ch} (V)"], lignes: [[{ champ: "Q1_I", num: true, ph: "I = …" }, { champ: "Q1_Uc", num: true, ph: "U_c = …" }, { champ: "Q1_Uch", num: true, ph: "U_ch = …" }]] },
    { t: "zone", q: "Q1", id: "Q1_calcul", label: "Détail du calcul (loi des mailles, loi d'Ohm)", lignes: 3, ph: "I = E / (R_c + R_ch) = …" },

    { t: "bandeau", id: "s2", titre: "2 — Mesurer", duree: "10 min", comp: "SI-MOD-13", cr: "Résultats" },
    { t: "html", html: "<p>**Lancer** la simulation. Pour **chaque valeur de R_{c}** (0,5 Ω, 1 Ω puis 2 Ω : modifier la résistance), **relever** I, U_{c} et U_{ch}. Lire l'unité affichée (mA ou A) et **convertir en A**.</p><p><b>Tableau 1 :</b> mesures (E = 12 V, R_{ch} = 6 Ω)</p>" },
    { t: "grille", q: "T1", titre: "Tableau 1 – mesures", entetes: ["R_{c} (Ω)", "I (A)", "U_{c} (V)", "U_{ch} (V)", "U_{c} + U_{ch} (V)"], lignes: [
      ["0,5", { champ: "T1_I_05", num: true }, { champ: "T1_Uc_05", num: true }, { champ: "T1_Uch_05", num: true }, { champ: "T1_S_05", num: true }],
      ["1", { champ: "T1_I_1", num: true }, { champ: "T1_Uc_1", num: true }, { champ: "T1_Uch_1", num: true }, { champ: "T1_S_1", num: true }],
      ["2", { champ: "T1_I_2", num: true }, { champ: "T1_Uc_2", num: true }, { champ: "T1_Uch_2", num: true }, { champ: "T1_S_2", num: true }] ] },
    { t: "q", id: "Q2", lab: "Q2", cr: "Analyse",
      bac: "**Comparer** les mesures de la ligne R_{c} = 1 Ω avec la prévision de la Q1. Que vaut U_{c} + U_{ch} ? Quelle loi est ainsi vérifiée ?",
      ref: "a) **Compare** la ligne R_{c} = 1 Ω du tableau 1 avec tes valeurs calculées en Q1 : sont-elles égales ? b) **Additionne** U_{c} et U_{ch} : à quelle tension du montage trouves-tu ce résultat ? c) **Nomme** la loi (voir les rappels) que cette égalité vérifie." },
    { t: "zone", q: "Q2", lignes: 3 },

    { t: "bandeau", id: "s3", titre: "3 — Calculer les pertes et le rendement", duree: "12 min", comp: "SI-ANA-02", cr: "Résultats" },
    { t: "q", id: "Q3", lab: "Q3",
      bac: "Le câble reçoit une tension U_{c} et il est traversé par I. **Établir** que sa puissance perdue vaut P_{J} = R_{c}·I^{2} (partir de P = U·I et de la loi d'Ohm).",
      ref: "**Pars** de la puissance reçue par le câble : P_{J} = U_{c} × I. **Remplace** U_{c} par son expression donnée par la loi d'Ohm (U_{c} = R_{c} × I). **Simplifie** pour montrer que P_{J} = R_{c} × I^{2}." },
    { t: "zone", q: "Q3", lignes: 3, ph: "P_J = U_c · I et U_c = … donc P_J = …" },
    { t: "html", html: "<p><b>Tableau 2 :</b> puissances (P_{s} fournie par la source, P_{ch} reçue par la charge, P_{J} perdue dans le câble) et rendement de la ligne η = \\frac{P_{ch}}{P_{s}}, arrondi à 0,1 %</p>" },
    { t: "grille", q: "T2", titre: "Tableau 2 – puissances", entetes: ["R_{c} (Ω)", "P_{J} = R_{c}·I^{2} (W)", "P_{J} = U_{c}·I (W)", "P_{ch} = U_{ch}·I (W)", "P_{s} = E·I (W)", "η = P_{ch} / P_{s} (%)"], lignes: [
      ["0,5", { champ: "T2_PJ_05", num: true }, { champ: "T2_PJb_05", num: true }, { champ: "T2_Pch_05", num: true }, { champ: "T2_Ps_05", num: true }, { champ: "T2_eta_05", num: true }],
      ["1", { champ: "T2_PJ_1", num: true }, { champ: "T2_PJb_1", num: true }, { champ: "T2_Pch_1", num: true }, { champ: "T2_Ps_1", num: true }, { champ: "T2_eta_1", num: true }],
      ["2", { champ: "T2_PJ_2", num: true }, { champ: "T2_PJb_2", num: true }, { champ: "T2_Pch_2", num: true }, { champ: "T2_Ps_2", num: true }, { champ: "T2_eta_2", num: true }] ] },
    { t: "q", id: "Q4", lab: "Q4", cr: "Analyse",
      bac: "**Vérifier** pour R_{c} = 2 Ω que P_{s} = P_{ch} + P_{J}. Quelle grandeur physique est ainsi conservée ?",
      ref: "Ligne R_{c} = 2 Ω du tableau 2 : **additionne** P_{ch} et P_{J} et **compare** à P_{s}. **Explique** ce que cette égalité signifie : ce que fournit la source se retrouve où ? Quelle grandeur se conserve ?" },
    { t: "zone", q: "Q4", lignes: 3 },
    { t: "q", id: "Q5", lab: "Q5", cr: "Analyse",
      bac: "R_{c} est multipliée par 4 (de 0,5 Ω à 2 Ω). P_{J} est-elle multipliée par 4 ? **Expliquer**. Que devient le rendement ? Sous quelle forme d'énergie la puissance P_{J} est-elle perdue ?",
      ref: "a) **Compare** P_{J} pour 0,5 Ω et pour 2 Ω : par combien est-elle multipliée ? Est-ce 4 ? b) Dans P_{J} = R_{c}·I^{2}, R_{c} augmente, mais que fait I (tableau 1) ? **Explique** avec ces deux grandeurs. c) **Compare** le rendement des deux lignes. d) **Indique** sous quelle forme (quel type d'énergie) la puissance perdue part du câble." },
    { t: "zone", q: "Q5", lignes: 5 },

    { t: "bandeau", id: "s4", titre: "4 — Doubler la tension à puissance de charge constante", duree: "8 min", comp: "SI-ANA-02 · SI-MOD-13", cr: "Résultats" },
    { t: "html", html: "<p>Une ligne de transport doit livrer <b>toujours la même puissance</b> à la charge, mais à une tension <b>double</b>. On garde R_{c} = 2 Ω et P_{ch} = 13,5 W (tableau 2), la charge étant alimentée sous <b>U_{ch}′ = 18 V</b> au lieu de 9 V.</p>" },
    { t: "q", id: "Q6", lab: "Q6",
      bac: "**Calculer** le nouveau courant I′ = \\frac{P_{ch}}{U_{ch}′}, puis la résistance de charge R_{ch}′ = \\frac{U_{ch}′}{I′} et la tension E′ à régler sur l'alimentation (loi des mailles : E′ = U_{ch}′ + R_{c}·I′).",
      ref: "Trois calculs dans l'ordre : a) I′ = \\frac{13,5}{18} ; b) R_{ch}′ = \\frac{18}{I′} ; c) E′ = 18 + 2 × I′ (la source doit fournir la tension de la charge **plus** la chute de tension dans le câble)." },
    { t: "grille", q: "Q6", titre: "Q6", entetes: ["I′ (A)", "R_{ch}′ (Ω)", "E′ (V)"], lignes: [[{ champ: "Q6_I", num: true }, { champ: "Q6_Rch", num: true }, { champ: "Q6_E", num: true }]] },
    { t: "q", id: "Q7", lab: "Q7",
      bac: "**Régler** E′ et R_{ch}′ dans Tinkercad, **relever** I′, puis **compléter** le tableau 3 (P_{ch} = U_{ch}·I ; P_{J} = R_{c}·I^{2} ; η = \\frac{P_{ch}}{E·I}).",
      ref: "Dans Tinkercad, **mets** l'alimentation à E′ et la charge à R_{ch}′ (valeurs de la Q6), **lis** I′ sur l'ampèremètre. Puis **calcule** P_{ch}, P_{J} et η comme dans la partie 3 et **remplis** la 2e ligne du tableau 3 (la 1re ligne reprend le tableau 2)." },
    { t: "html", html: "<p><b>Tableau 3 :</b> effet du doublement de la tension de charge (R_{c} = 2 Ω)</p>" },
    { t: "grille", q: "Q7", titre: "Tableau 3", entetes: ["Cas", "E (V)", "R_{ch} (Ω)", "I (A)", "P_{ch} (W)", "P_{J} (W)", "η (%)"], lignes: [
      [{ txt: "tension de charge 9 V (tableau 2)" }, { txt: "12" }, { txt: "6" }, { champ: "T3_I_9", num: true }, { champ: "T3_Pch_9", num: true }, { champ: "T3_PJ_9", num: true }, { champ: "T3_eta_9", num: true }],
      [{ txt: "tension de charge 18 V (doublée)" }, { champ: "T3_E_18", num: true }, { champ: "T3_Rch_18", num: true }, { champ: "T3_I_18", num: true }, { champ: "T3_Pch_18", num: true }, { champ: "T3_PJ_18", num: true }, { champ: "T3_eta_18", num: true }] ] },
    { t: "q", id: "Q8", lab: "Q8", cr: "Conclusion",
      bac: "**Conclure** : quand la tension double à puissance de charge constante, I est divisé par …, P_{J} est divisée par … et le rendement passe de … % à … %.",
      ref: "**Complète** les trous avec les valeurs des tableaux 2 et 3 : rapport des deux courants, rapport des deux puissances perdues, et les deux rendements." },
    { t: "trous", q: "Q8", label: "Q8", html: "Quand la tension double à puissance de charge constante, I est divisé par [[Q8_I|60]], P_{J} est divisée par [[Q8_PJ|60]] et le rendement passe de [[Q8_eta1|70]] % à [[Q8_eta2|70]] %." },

    { t: "bandeau", id: "s5", titre: "5 — Tracer P_{J} = f(I) sous LibreOffice Calc", duree: "10 min", comp: "SI-ANA-02", cr: "Résultats" },
    { t: "etapes", items: [
      "**Garder** R_{c} = 1 Ω et R_{ch} = 6 Ω. **Régler** E successivement sur **4 V, 8 V, 12 V, 16 V, 20 V** et **relever** I (en A).",
      "**Ouvrir** <a href=\"../docs/TP_Joule_mesures.ods\" download>TP_Joule_mesures.ods</a>, feuille « PJ_en_fonction_de_I » : **saisir** les valeurs de I dans la colonne B. La colonne C calcule P_{J} = R_{c}·I^{2} avec une formule.",
      "**Sélectionner** les cellules B3 à C8 (titres compris) › Insertion › Diagramme › **XY (dispersion)**, « points seulement ». **Ajouter** un titre et **nommer** les axes avec leurs unités. **Enregistrer** le classeur sous NOM_Joule.ods." ] },
    { t: "grille", q: "T5", titre: "Relevés pour la courbe", entetes: ["E (V)", "4", "8", "12", "16", "20"], lignes: [
      [{ txt: "I (A)" }, { champ: "T5_I_4", num: true }, { champ: "T5_I_8", num: true }, { champ: "T5_I_12", num: true }, { champ: "T5_I_16", num: true }, { champ: "T5_I_20", num: true }],
      [{ txt: "P_{J} (W)" }, { champ: "T5_PJ_4", num: true }, { champ: "T5_PJ_8", num: true }, { champ: "T5_PJ_12", num: true }, { champ: "T5_PJ_16", num: true }, { champ: "T5_PJ_20", num: true }] ] },
    { t: "q", id: "Q9", lab: "Q9", cr: "Analyse",
      bac: "Quelle est l'allure de la courbe ? Si I double (E de 4 V à 8 V), par combien P_{J} est-elle multipliée ? **Justifier** avec la formule.",
      ref: "a) **Décris** la forme de la courbe obtenue (droite ? courbe qui monte de plus en plus vite ? passe-t-elle par l'origine ?). b) **Compare** P_{J} pour E = 4 V et pour E = 8 V (I a doublé) : par combien P_{J} est-elle multipliée ? c) **Explique** ce résultat avec l'exposant de I dans P_{J} = R_{c}·I^{2}." },
    { t: "zone", q: "Q9", lignes: 4 },

    { t: "bandeau", id: "s6", titre: "6 — Application : le transport de l'énergie", duree: "8 min", comp: "SI-ANA-02", cr: "Analyse" },
    { t: "q", id: "Q10", lab: "Q10",
      bac: "Centrale de Porette de Nérone : les panneaux fournissent P_{PV} = 3 781 kW et les câbles perdent P_{J} = 38 kW. **Calculer** la part de puissance perdue dans les câbles, en %.",
      ref: "**Divise** la puissance perdue par la puissance fournie : \\frac{P_{J}}{P_{PV}}, puis **multiplie** par 100 pour avoir un pourcentage." },
    { t: "tableau3", titre: "Q10", lignes: [{ id: "Q10", lab: "Q10", grandeur: "Part de puissance perdue dans les câbles", sym: "\\frac{P_{J}}{P_{PV}}" }] },
    { t: "q", id: "Q11", lab: "Q11",
      bac: "Une ligne de résistance R = 0,10 Ω transporte P = 100 kW. On néglige la chute de tension devant U. **Compléter** le tableau 4 pour U = 400 V puis U = 20 kV.",
      ref: "Pour chaque tension : a) I = \\frac{P}{U} (attention : 100 kW = 100 000 W, 20 kV = 20 000 V) ; b) P_{J} = R·I^{2} ; c) part perdue = \\frac{P_{J}}{P} × 100." },
    { t: "html", html: "<p><b>Tableau 4 :</b> même puissance transportée sous deux tensions</p>" },
    { t: "grille", q: "Q11", titre: "Tableau 4", entetes: ["Tension U de la ligne", "I = P / U (A)", "P_{J} = R·I^{2} (W)", "P_{J} / P (%)"], lignes: [
      [{ txt: "400 V" }, { champ: "T4_I_400", num: true }, { champ: "T4_PJ_400", num: true }, { champ: "T4_pct_400", num: true }],
      [{ txt: "20 kV" }, { champ: "T4_I_20k", num: true }, { champ: "T4_PJ_20k", num: true }, { champ: "T4_pct_20k", num: true }] ] },
    { t: "q", id: "Q12", lab: "Q12", cr: "Conclusion",
      bac: "Pourquoi transporte-t-on l'énergie électrique **sous haute tension** ? **Répondre** en 2 ou 3 phrases avec les grandeurs I, U et P_{J}.",
      ref: "**Rédige** 2 ou 3 phrases : à puissance P = U·I fixée, que devient I quand U augmente ? Et comme P_{J} = R·I^{2}, que deviennent les pertes ? **Conclus** sur l'intérêt de la haute tension pour transporter l'énergie." },
    { t: "zone", q: "Q12", lignes: 4 },

    { t: "trous", q: "RET", id: "retenir", titre: "À retenir", cls: "cadre-ret", label: "À retenir", html: "Une ligne de résistance R traversée par un courant I perd la puissance P_{J} = [[RET_PJ|110]]. Elle est dissipée en [[RET_forme|110]]. À puissance transportée constante, doubler la tension divise I par [[RET_I|50]] et les pertes par [[RET_pertes|50]] : c'est pourquoi le transport se fait en [[RET_ht|130]]." }
  ]
};
