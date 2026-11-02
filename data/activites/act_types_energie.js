/* Activité — Les formes d'énergie et leurs convertisseurs — 1re SI, S3 Énergie, séance 1 (27/10/2026)
   Contenu ÉLÈVE uniquement (repris du générateur act.js : cases grisées = données, cases blanches = à compléter). */
window.ACTIVITE = {
  id: "act_types_energie", fichier: "Act_Types_Energie", court: "Formes d'énergie · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · Activité · 40 min",
  titre: "Les formes d'énergie et leurs convertisseurs",
  sous: "Effort, flux et applications — séance du 27/10",
  blocs: [
    { t: "encadre", titre: "Objectif", html:
      "<p>**Reconnaître**, dans des systèmes réels (<b>centrale photovoltaïque, barrage, éolienne, véhicule électrique</b>, pompage solaire), les <b>formes d'énergie</b>, les <b>convertisseurs</b> qui passent de l'une à l'autre et les grandeurs dont le produit est la <b>puissance</b>.</p>" +
      "<p><b>À retenir :</b> dans les domaines étudiés (électrique, mécanique, hydraulique), la puissance échangée est le produit d'une grandeur d'<b>effort</b> par une grandeur de <b>flux</b> : P = e × f.</p>" +
      "<p><b>Banque de mots.</b> Formes : électrique · mécanique de rotation · mécanique de translation · hydraulique · chimique · lumineuse. Convertisseurs : turbine · alternateur · batterie · moteur électrique · roue · pompe · panneau photovoltaïque · rotor d'éolienne. Grandeurs : U (V) · I (A) · C (N·m) · ω (rad/s) · F (N) · v (m/s) · p (Pa) · Q_{v} (m³/s).</p>" +
      "<p class=\"ent-doc\"><i>Cases grisées : données. Cases blanches : à compléter. Compétence : SI-ANA-02 (savoirs SI-SAV-ANA-02-a, -b et -c).</i></p>" },

    { t: "bandeau", id: "s1", titre: "1 — Le tableau des conversions d'énergie", duree: "25 min", comp: "SI-ANA-02", cr: "Résultats" },
    { t: "q", id: "T1", lab: "Tableau 1", nom: "Tableau 1",
      bac: "**Compléter** le tableau 1 : de la source à l'application. Chaque ligne décrit un convertisseur ; la forme d'énergie indiquée est celle qu'il **fournit en sortie**.",
      ref: "Chaque ligne = un convertisseur. **Remplis** les cases blanches à l'aide de la banque de mots : la forme d'énergie **de sortie**, la source, le nom du convertisseur, puis l'effort, le flux et la formule de la puissance qui vont avec cette forme d'énergie (par exemple électrique → U, I, P = U·I)." },
    { t: "grille", q: "T1", titre: "Tableau 1 – conversions d'énergie", entetes: ["Forme d'énergie (en sortie)", "Source (énergie d'entrée)", "Convertisseur", "Grandeur d'effort", "Grandeur de flux", "Puissance et unité", "Exemple d'application"], lignes: [
      [{ txt: "Électrique", cls: "fixe g" }, { txt: "Rayonnement solaire (énergie lumineuse)", cls: "fixe g" }, { txt: "Panneau photovoltaïque", cls: "fixe g" }, { txt: "Tension U (V)", cls: "fixe g" }, { txt: "Intensité I (A)", cls: "fixe g" }, { txt: "P = U·I (W)", cls: "fixe g" }, { txt: "Centrale photovoltaïque : fermes solaires et toitures de l'île", cls: "fixe g" }],
      [{ txt: "Mécanique de rotation", cls: "fixe g" }, { txt: "Eau retenue en altitude (énergie hydraulique)", cls: "fixe g" }, { champ: "T1_2_conv", multi: true }, { champ: "T1_2_effort", multi: true }, { champ: "T1_2_flux", multi: true }, { txt: "P = C·ω (W)", cls: "fixe g" }, { txt: "Barrage : centrale hydroélectrique de Takamaka (Rivière des Marsouins)", cls: "fixe g" }],
      [{ txt: "Mécanique de rotation", cls: "fixe g" }, { champ: "T1_3_source", multi: true }, { txt: "Pales et rotor d'éolienne", cls: "fixe g" }, { champ: "T1_3_effort", multi: true }, { champ: "T1_3_flux", multi: true }, { champ: "T1_3_puiss", multi: true }, { txt: "Éolienne : parc de La Perrière (Sainte-Suzanne)", cls: "fixe g" }],
      [{ champ: "T1_4_forme", multi: true }, { txt: "Mécanique de rotation (turbine, rotor)", cls: "fixe g" }, { champ: "T1_4_conv", multi: true }, { champ: "T1_4_effort", multi: true }, { champ: "T1_4_flux", multi: true }, { champ: "T1_4_puiss", multi: true }, { txt: "Barrage et éolienne : l'alternateur est entraîné par la turbine ou le rotor", cls: "fixe g" }],
      [{ champ: "T1_5_forme", multi: true }, { champ: "T1_5_source", multi: true }, { txt: "Batterie (accumulateur)", cls: "fixe g" }, { champ: "T1_5_effort", multi: true }, { champ: "T1_5_flux", multi: true }, { champ: "T1_5_puiss", multi: true }, { txt: "Véhicule électrique ; batteries du pompage solaire", cls: "fixe g" }],
      [{ champ: "T1_6_forme", multi: true }, { txt: "Électrique (batterie)", cls: "fixe g" }, { txt: "Moteur électrique", cls: "fixe g" }, { champ: "T1_6_effort", multi: true }, { champ: "T1_6_flux", multi: true }, { champ: "T1_6_puiss", multi: true }, { txt: "Véhicule électrique : moteur de traction", cls: "fixe g" }],
      [{ txt: "Mécanique de translation", cls: "fixe g" }, { champ: "T1_7_source", multi: true }, { champ: "T1_7_conv", multi: true }, { champ: "T1_7_effort", multi: true }, { champ: "T1_7_flux", multi: true }, { champ: "T1_7_puiss", multi: true }, { txt: "Véhicule électrique qui roule sur la route", cls: "fixe g" }],
      [{ champ: "T1_8_forme", multi: true }, { champ: "T1_8_source", multi: true }, { txt: "Pompe hydraulique", cls: "fixe g" }, { champ: "T1_8_effort", multi: true }, { champ: "T1_8_flux", multi: true }, { champ: "T1_8_puiss", multi: true }, { txt: "Pompage solaire (partie 2)", cls: "fixe g" }] ] },
    { t: "q", id: "Q1", lab: "Q1", cr: "Analyse", bac: "**Comparer** les lignes 2 et 3 : les sources (eau, vent) sont différentes. Que remarque-t-on pour l'effort et le flux ?", ref: "**Regarde** les colonnes effort et flux des lignes 2 (barrage) et 3 (éolienne). Sont-elles identiques ou différentes alors que les sources changent ? **Explique** de quoi dépendent l'effort et le flux : de la source ou de la forme d'énergie ?" },
    { t: "zone", q: "Q1", lignes: 2 },
    { t: "q", id: "Q2", lab: "Q2", bac: "Quelle est l'unité de toutes les puissances ? **Vérifier** que 1 W = 1 V·A = 1 N·m·rad/s = 1 N·m/s = 1 Pa·m³/s (indice : 1 Pa = 1 N/m², 1 rad est sans dimension).", ref: "a) **Donne** l'unité commune à toutes les puissances du tableau. b) **Montre** que chaque produit effort × flux redonne cette unité : remplace Pa par N/m² et supprime le radian (sans dimension), puis simplifie." },
    { t: "zone", q: "Q2", lignes: 3 },
    { t: "q", id: "Q3", lab: "Q3", cr: "Analyse", bac: "Une conversion est-elle parfaite ? Que devient la puissance qui n'arrive pas à la sortie du convertisseur ?", ref: "a) La puissance de sortie d'un convertisseur est-elle égale, plus grande ou plus petite que celle d'entrée ? b) **Indique** sous quelle forme part la différence (pense à un moteur qui tourne longtemps)." },
    { t: "zone", q: "Q3", lignes: 2 },

    { t: "bandeau", id: "s2", titre: "2 — Chaîne d'énergie du pompage solaire", duree: "15 min", comp: "SI-ANA-02", cr: "Résultats" },
    { t: "html", html: "<p>Une cuve récupère l'eau de pluie d'un bâtiment et une pompe l'envoie vers les toilettes. La pompe est alimentée par des <b>panneaux photovoltaïques</b>. L'énergie passe par un <b>régulateur de charge</b> (il protège les batteries), est stockée dans des <b>batteries 24 V</b> (7 jours d'autonomie) puis adaptée par un <b>onduleur</b> (24 V continu → 230 V alternatif) avant d'arriver au <b>moteur</b> de la <b>pompe</b>.</p>" },
    { t: "figure", id: "fig1", src: "../assets/img/act_chaine_pompage.png", alt: "Chaîne d'énergie du pompage solaire à compléter : rayonnement solaire → panneaux photovoltaïques → bloc 2 → batteries 24 V (stockage) → bloc 4 → moteur électrique → bloc 6 → eau pompée. Chaque bloc a une case fonction ; chaque lien a une case forme d'énergie, un effort et un flux.", legende: "Figure 1 – Chaîne d'énergie du pompage solaire (à compléter avec les tableaux 2 et 3)." },
    { t: "q", id: "CH", lab: "Chaîne", nom: "Chaîne",
      bac: "**Compléter** la chaîne : (a) le nom des blocs vides ; (b) la **fonction** de chaque bloc : ALIMENTER (fournir ou stocker l'énergie), DISTRIBUER (adapter l'énergie : tension, nature du courant), CONVERTIR (changer de forme d'énergie), AGIR (agir sur la matière d'œuvre : l'eau) ; (c) la **forme d'énergie** de chaque lien ; (d) l'effort et le flux des liens vides. La demi-flèche est un lien de puissance : effort au-dessus, flux au-dessous.",
      ref: "Les blocs sont numérotés de 1 à 6 dans le sens de la flèche (panneaux = 1, … , pompe = 6). Tableau 2 : **nomme** les blocs 2, 4 et 6 d'après le texte au-dessus de la figure, et **choisis** une fonction pour chacun des 6 blocs. Tableau 3 : pour chaque lien entre deux blocs, **écris** la forme d'énergie (banque de mots) puis l'effort et le flux quand ils ne sont pas déjà donnés." },
    { t: "html", html: "<p><b>Tableau 2 :</b> les blocs</p>" },
    { t: "grille", q: "CH", titre: "Tableau 2 – blocs", entetes: ["Bloc", "Nom", "Fonction"], lignes: [
      [{ txt: "1" }, { txt: "Panneaux photovoltaïques", cls: "fixe g" }, { champ: "CH_b1_fn", ph: "ALIMENTER / DISTRIBUER / CONVERTIR / AGIR" }],
      [{ txt: "2" }, { champ: "CH_b2_nom" }, { champ: "CH_b2_fn" }],
      [{ txt: "3" }, { txt: "Batteries 24 V (stockage)", cls: "fixe g" }, { champ: "CH_b3_fn" }],
      [{ txt: "4" }, { champ: "CH_b4_nom" }, { champ: "CH_b4_fn" }],
      [{ txt: "5" }, { txt: "Moteur électrique", cls: "fixe g" }, { champ: "CH_b5_fn" }],
      [{ txt: "6" }, { champ: "CH_b6_nom" }, { champ: "CH_b6_fn" }] ] },
    { t: "html", html: "<p><b>Tableau 3 :</b> les liens de puissance</p>" },
    { t: "grille", q: "CH", titre: "Tableau 3 – liens", entetes: ["Lien", "Forme d'énergie", "Effort", "Flux"], lignes: [
      [{ txt: "1 → 2" }, { champ: "CH_l12_forme" }, { txt: "U (V)", cls: "fixe g" }, { txt: "I (A)", cls: "fixe g" }],
      [{ txt: "2 → 3" }, { champ: "CH_l23_forme" }, { txt: "U (V)", cls: "fixe g" }, { txt: "I (A)", cls: "fixe g" }],
      [{ txt: "3 → 4" }, { champ: "CH_l34_forme" }, { txt: "U (V)", cls: "fixe g" }, { txt: "I (A)", cls: "fixe g" }],
      [{ txt: "4 → 5" }, { champ: "CH_l45_forme" }, { champ: "CH_l45_effort" }, { champ: "CH_l45_flux" }],
      [{ txt: "5 → 6" }, { champ: "CH_l56_forme" }, { champ: "CH_l56_effort" }, { champ: "CH_l56_flux" }],
      [{ txt: "6 → eau pompée" }, { champ: "CH_l6s_forme" }, { champ: "CH_l6s_effort" }, { champ: "CH_l6s_flux" }] ] },
    { t: "q", id: "Q4", lab: "Q4", cr: "Analyse", bac: "Quels blocs **convertissent** l'énergie d'une forme à une autre ? Lesquels l'**adaptent** seulement ?", ref: "**Compare**, pour chaque bloc, la forme d'énergie du lien qui entre et celle du lien qui sort (tableau 3). Si elle change : le bloc convertit. Si elle reste électrique mais avec une autre tension ou un autre type de courant : le bloc adapte seulement. **Classe** les 6 blocs." },
    { t: "zone", q: "Q4", lignes: 3 },
    { t: "q", id: "Q5", lab: "Q5",
      bac: "Rendement global : η_{panneaux} = 20 %, η_{régulateur} = 95 %, η_{batteries} = 85 %, η_{onduleur} = 98 %, η_{moteur+pompe} = 64 % (valeurs indicatives). **Calculer** le rendement global de la chaîne, puis la puissance hydraulique obtenue pour 1 m² de panneau recevant 1 000 W.",
      ref: "a) Le rendement global d'une chaîne est le **produit** des rendements : **multiplie** 0,20 × 0,95 × 0,85 × 0,98 × 0,64. b) **Multiplie** ce rendement par 1 000 W pour obtenir la puissance hydraulique en sortie." },
    { t: "tableau3", titre: "Q5", lignes: [
      { id: "Q5a", q: "Q5", lab: "Q5 a", grandeur: "Rendement global de la chaîne", sym: "η" },
      { id: "Q5b", q: "Q5", lab: "Q5 b", grandeur: "Puissance hydraulique pour 1 m² (1 000 W reçus)", sym: "P_{hydraulique}" } ] },

    { t: "trous", q: "RET", id: "retenir", titre: "À retenir", cls: "cadre-ret", label: "À retenir", html: "Toute puissance est le produit d'un [[RET_effort|80]] par un [[RET_flux|80]] : U·I, [[RET_rot|70]], F·v, [[RET_hyd|70]]. Dans une chaîne d'énergie, à chaque bloc une part de la puissance est perdue sous forme de [[RET_chaleur|90]] ; le rendement global est le [[RET_produit|90]] des rendements de chaque bloc." }
  ]
};
