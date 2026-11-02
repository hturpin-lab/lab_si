/* Exercice Centrale photovoltaïque : pertes et rendement global — 1re SI, S3 Énergie, séance 2 (29/10/2026)
   Contenu ÉLÈVE uniquement (repris du générateur exercice.js). Aucune valeur de corrigé ici. */
window.ACTIVITE = {
  id: "exo_centrale_pv", fichier: "Exercice_Centrale_PV", court: "Exercice Centrale PV · 1re SI", sequence: "s3",
  classe: "1re SI", seq: "S3 · Exercice · 35 min",
  titre: "Centrale photovoltaïque : pertes et rendement global",
  sous: "D'après le DS Vacances « Centrale photovoltaïque de Porette de Nérone »",
  blocs: [
    { t: "encadre", titre: "Mise en situation", html:
      "<p>La centrale photovoltaïque de <b>Porette de Nérone</b> (Corse) couvre 7,8 ha et produit près de 5 700 MWh par an. Les panneaux, répartis en 9 zones, sont reliés au local onduleurs par des <b>câbles</b> ; les <b>onduleurs</b> convertissent le courant continu en courant alternatif, puis des <b>postes de transformation</b> élèvent la tension avant l'injection sur le réseau.</p>" +
      "<p><b>Lien avec le TP Joule :</b> un câble de résistance R traversé par un courant I perd P_{J} = R·I^{2} ; à puissance transportée égale, doubler la tension divise I par 2 et les pertes par 4. On applique ici ces résultats à une vraie centrale.</p>" +
      "<p class=\"pb\"><b>Problématique : où se perd la puissance entre le Soleil et le réseau, et pourquoi élever la tension ?</b></p>" +
      "<p class=\"ent-doc\"><i>Compétences : SI-ANA-02 (puissance, rendements et pertes) · SI-MOD-13 (courant et tension dans un circuit : lois de Kirchhoff, résistance).</i></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Données (ensoleillement 1 000 W/m², cellules à 25 °C)", cls: "pouce", html:
        "<p><b>Champ</b> : 101 blocs ; un bloc = <b>9 chaînes en parallèle</b> de <b>13 modules en série</b> (figure 2), soit 11 817 modules de 320 W.</p>" +
        "<p><b>Module</b> en fonctionnement normal : 54,7 V ; 5,86 A.</p>" +
        "<p>Puissance solaire reçue par les panneaux : <b>P_{E} = 19 270 kW</b>.</p>" +
        "<p>Puissance électrique fournie par les panneaux : <b>P = 3 781,44 kW</b>.</p>" +
        "<p>Pertes Joule de l'ensemble des câbles panneaux → onduleurs : <b>P_{J} = 38 kW</b>.</p>" +
        "<p>Rendement des onduleurs : <b>η_{OND} = 98 %</b> ; des postes de transformation (315 V → 15 kV) : <b>η_{PT} = 96 %</b>.</p>" },
      { t: "figure", id: "fig2", src: "../assets/img/centrale_bloc.png", alt: "Constitution d'un bloc : 9 chaînes en parallèle de 13 modules en série.", legende: "Figure 2 – Constitution d'un bloc." }
    ] },
    { t: "figure", id: "fig1", src: "../assets/img/centrale_chaine.png", alt: "Chaîne de puissance de la centrale : rayonnement P_E = 19 270 kW → panneaux solaires (η_PV = ?) → P = 3 781,44 kW → liaisons câbles (η_L = ?, pertes P_J = 38 kW) → P_L → onduleurs (η_OND = 98 %) → P_OND → postes de transformation (η_PT = 96 %) → P_S → réseau.", legende: "Figure 1 – Chaîne de puissance de la centrale (d'après le DRS3 du DS) : les puissances P_{L}, P_{OND} et P_{S} sont à calculer (Q1)." },
    { t: "methode", html: "<b>Méthode :</b> chaque calcul en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Calculatrice autorisée." },

    { t: "bandeau", id: "s1", titre: "Questions", duree: "35 min", comp: "SI-ANA-02 · SI-MOD-13", cr: "Résultats" },
    { t: "q", id: "Q1", lab: "Q1",
      bac: "Les câbles perdent P_{J} = 38 kW. **Calculer** la puissance P_{L} en sortie des liaisons, puis P_{OND} et P_{S} à l'aide des rendements. **Reporter** les valeurs sur la figure 1. <i>(d'après le DS, Q2.13)</i>",
      ref: "Suis la chaîne de la figure 1 de gauche à droite : a) P_{L} = P − P_{J} (ce qui sort des câbles = ce qui entre moins ce qui est perdu) ; b) P_{OND} = η_{OND} × P_{L} ; c) P_{S} = η_{PT} × P_{OND}. **Écris** les trois résultats en kW." },
    { t: "tableau3", titre: "Q1", lignes: [
      { id: "Q1a", q: "Q1", lab: "Q1 a", grandeur: "Puissance en sortie des liaisons", sym: "P_{L}" },
      { id: "Q1b", q: "Q1", lab: "Q1 b", grandeur: "Puissance en sortie des onduleurs", sym: "P_{OND}" },
      { id: "Q1c", q: "Q1", lab: "Q1 c", grandeur: "Puissance injectée sur le réseau", sym: "P_{S}" } ] },
    { t: "q", id: "Q2", lab: "Q2", cr: "Analyse",
      bac: "**Calculer** η_{PV} = \\frac{P}{P_{E}} et η_{L} = \\frac{P_{L}}{P} (figure 1), puis le rendement global η_{G} = \\frac{P_{S}}{P_{E}}. **Vérifier** que η_{G} = η_{PV} × η_{L} × η_{OND} × η_{PT}. Quel groupe de constituants a le plus faible rendement ? <i>(d'après le DS, Q2.14)</i>",
      ref: "a) **Calcule** le rendement des panneaux η_{PV} = \\frac{P}{P_{E}} et celui des câbles η_{L} = \\frac{P_{L}}{P} (résultats sans unité, ou en %). b) **Calcule** le rendement global η_{G} = \\frac{P_{S}}{P_{E}}. c) **Multiplie** les quatre rendements de la chaîne et **compare** à η_{G}. d) **Indique** quel bloc de la figure 1 a le plus petit rendement." },
    { t: "tableau3", titre: "Q2", lignes: [
      { id: "Q2a", q: "Q2", lab: "Q2 a", grandeur: "Rendement des panneaux", sym: "η_{PV}" },
      { id: "Q2b", q: "Q2", lab: "Q2 b", grandeur: "Rendement des liaisons", sym: "η_{L}" },
      { id: "Q2c", q: "Q2", lab: "Q2 c", grandeur: "Rendement global", sym: "η_{G}" } ] },
    { t: "zone", q: "Q2", id: "Q2_reponse", label: "Vérification du produit des rendements et constituant le moins performant", lignes: 3 },
    { t: "q", id: "Q3", lab: "Q3",
      bac: "À l'aide de la figure 2, **calculer** la tension U_{bloc} et le courant I_{bloc} en sortie d'un bloc. **Nommer** la loi utilisée pour chacun. **Vérifier** que U_{bloc} × I_{bloc} ≈ 117 × 320 W. <i>(d'après le DS, Q1.14)</i>",
      ref: "Un bloc = 9 chaînes en parallèle, chaque chaîne = 13 modules en série (54,7 V ; 5,86 A chacun). a) En série, les tensions s'additionnent : U_{bloc} = 13 × 54,7 V (loi des mailles). b) En parallèle, les courants s'additionnent : I_{bloc} = 9 × 5,86 A (loi des nœuds). c) **Multiplie** U_{bloc} × I_{bloc} et **compare** à 117 modules × 320 W." },
    { t: "tableau3", titre: "Q3", lignes: [
      { id: "Q3a", q: "Q3", lab: "Q3 a", grandeur: "Tension en sortie d'un bloc (loi : …)", sym: "U_{bloc}" },
      { id: "Q3b", q: "Q3", lab: "Q3 b", grandeur: "Courant en sortie d'un bloc (loi : …)", sym: "I_{bloc}" },
      { id: "Q3c", q: "Q3", lab: "Q3 c", grandeur: "Puissance d'un bloc U_{bloc} × I_{bloc}", sym: "P_{bloc}" } ] },
    { t: "zone", q: "Q3", id: "Q3_lois", label: "Lois utilisées et comparaison avec 117 × 320 W", lignes: 2 },
    { t: "q", id: "Q4", lab: "Q4",
      bac: "Chaque bloc est relié au local onduleurs par sa propre liaison (aller + retour) de résistance r ; les 101 liaisons sont identiques. Comme au TP Joule, P_{J} = r·I^{2}. **Calculer** la puissance perdue dans **une** liaison, puis r. <i>(prolongement du TP Joule)</i>",
      ref: "a) Les 38 kW de pertes se répartissent sur 101 liaisons identiques : P_{J1} = \\frac{38 000}{101} (en W). b) Comme P_{J1} = r × I_{bloc}^{2}, **isole** r = \\frac{P_{J1}}{I_{bloc}^{2}} avec I_{bloc} de la Q3." },
    { t: "tableau3", titre: "Q4", lignes: [
      { id: "Q4a", q: "Q4", lab: "Q4 a", grandeur: "Puissance perdue dans une liaison", sym: "P_{J1}" },
      { id: "Q4b", q: "Q4", lab: "Q4 b", grandeur: "Résistance d'une liaison", sym: "r" } ] },
    { t: "q", id: "Q5", lab: "Q5", cr: "Conclusion",
      bac: "Les blocs auraient pu être câblés pour fournir la même puissance sous une tension **deux fois plus faible** (≈ 356 V), avec les mêmes câbles. Que deviendraient I_{bloc}, P_{J} et η_{L} ? **Conclure** : pourquoi les postes élèvent-ils la tension de 315 V à 15 kV avant d'injecter sur le réseau ? <i>(prolongement du TP Joule)</i>",
      ref: "Même puissance sous une tension divisée par 2 : a) I_{bloc}′ est multiplié par … (P = U × I) ; b) P_{J}′ = r × I′^{2} est multipliée par … ; c) **recalcule** η_{L}′ = \\frac{P − P_{J}′}{P}. d) **Explique** avec P_{J} = R·I^{2} pourquoi on transporte sous haute tension (15 kV)." },
    { t: "tableau3", titre: "Q5", lignes: [
      { id: "Q5a", q: "Q5", lab: "Q5 a", grandeur: "Nouveau courant de bloc", sym: "I_{bloc}′" },
      { id: "Q5b", q: "Q5", lab: "Q5 b", grandeur: "Nouvelles pertes Joule totales", sym: "P_{J}′" },
      { id: "Q5c", q: "Q5", lab: "Q5 c", grandeur: "Nouveau rendement des liaisons", sym: "η_{L}′" } ] },
    { t: "zone", q: "Q5", id: "Q5_conclusion", label: "Conclusion : pourquoi élever la tension avant le réseau ?", lignes: 4 },

    { t: "trous", q: "RET", id: "retenir", titre: "À retenir", cls: "cadre-ret", label: "À retenir", html: "Le rendement global d'une chaîne est le [[RET_produit|90]] des rendements. Les pertes Joule d'une ligne valent P_{J} = [[RET_PJ|80]] : à puissance égale, transporter sous une tension plus [[RET_elevee|90]] réduit I et divise les pertes par le [[RET_carre|80]] du rapport des tensions." }
  ]
};
