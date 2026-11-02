/* ============================================================
   DONNÉES DES SÉQUENCES (1re SI, 2026-2027)
   Un seul fichier JS (pas de JSON à télécharger : le site marche
   aussi en ouvrant index.html directement).

   Pour chaque document :
     - "ligne" : page de l'activité en ligne (vide = pas encore convertie)
     - "pdf"   : copie PDF hébergée sur le site (dossier docs/)
     - "drive" : lien Google Drive du PDF (vide par défaut ; à remplir
                 quand les PDF seront déposés sur le Drive)
   ============================================================ */
window.SI_SEQUENCES = [
  { id: "s1", num: "S1", court: "Analyse fonctionnelle", titre: "Analyser le besoin et l'organisation d'un produit",
    debut: "2026-08-20", fin: "2026-09-10", etat: "fait", competences: ["SI-ANA-01", "SI-ANA-03"],
    cours: [], seances: [], evaluations: [] },
  { id: "s2", num: "S2", court: "Comportement", titre: "Traduire un comportement séquentiel",
    debut: "2026-09-17", fin: "2026-10-08", etat: "fait", competences: ["SI-MOD-04"],
    cours: [], seances: [], evaluations: [] },
  { id: "s3", num: "S3", court: "Énergie", titre: "Énergie, puissance, rendement",
    debut: "2026-10-27", fin: "2026-11-19", etat: "en-ligne",
    competences: ["SI-ANA-02", "SI-ANA-03", "SI-MOD-02", "SI-MOD-03", "SI-MOD-13"],
    cours: [
      { id: "fiche_formules", titre: "Fiche Formules de l'énergie", sous: "Puissance, énergie, batterie, moteur à courant continu — à garder dans le classeur", pdf: "docs/Fiche_Formules_Energie.pdf", drive: "" },
      { id: "fiche_effort_flux", titre: "Fiche Synthèse Effort / Flux", sous: "Effort et flux dans chaque domaine, chaîne de puissance, pertes", pdf: "docs/Fiche_Synthese_Effort_Flux.pdf", drive: "" }
    ],
    seances: [
      { n: 1, date: "2026-10-27", titre: "Formes d'énergie et stockage", activites: [
        { id: "act_types_energie", titre: "Activité — Formes d'énergie", sous: "Chaîne de puissance, convertisseurs", duree: "40 min", ligne: "activites/act_types_energie.html", pdf: "docs/Act_Types_Energie.pdf", drive: "" },
        { id: "td_solaire", titre: "TD Solaire", sous: "Pompage autonome : panneau, batteries, autonomie", duree: "", ligne: "activites/td_solaire.html", pdf: "docs/TD_Solaire.pdf", drive: "" },
        { id: "td4_stocker", titre: "TD 4 — Stocker l'énergie", sous: "Batteries, capacité, énergie massique", duree: "", ligne: "activites/td4_stocker.html", pdf: "docs/TD4_Stocker_Energie.pdf", drive: "" }
      ] },
      { n: 2, date: "2026-10-29", titre: "Pertes par effet Joule", activites: [
        { id: "tp_joule", titre: "TP — Pertes par effet Joule", sous: "Simulation Tinkercad + classeur Calc", duree: "60 min", ligne: "activites/tp_joule.html", pdf: "docs/TP_Joule.pdf", drive: "",
          ressources: [{ titre: "Classeur TP_Joule_mesures.ods", fichier: "docs/TP_Joule_mesures.ods" }] },
        { id: "exo_centrale_pv", titre: "Exercice — Centrale photovoltaïque", sous: "Porette de Nérone : puissance, pertes, rendement", duree: "", ligne: "activites/exo_centrale_pv.html", pdf: "docs/Exercice_Centrale_PV.pdf", drive: "" }
      ] },
      { n: 3, date: "2026-11-03", titre: "Perceuse-visseuse : de la batterie au foret", activites: [
        { id: "td_perceuse", titre: "TD Perceuse-visseuse", sous: "Puissance, rendement, vitesse, couple, pertes Joule", duree: "55 min", ligne: "activites/td_perceuse.html", pdf: "docs/TD_Perceuse.pdf", drive: "" }
      ] },
      { n: 4, date: "2026-11-05", titre: "Transmettre le mouvement : rapport de réduction", activites: [
        { id: "td_servomoteur", titre: "TD Servomoteur", sous: "Train d'engrenages en cascade d'une voiture RC", duree: "25 min", ligne: "activites/td_servomoteur.html", pdf: "docs/TD_Servomoteur.pdf", drive: "" },
        { id: "td_perceuse_transmission", titre: "TD Perceuse — Transmission", sous: "Motoréducteur à deux étages", duree: "", ligne: "activites/td_perceuse_transmission.html", pdf: "docs/TD_Perceuse_Transmission.pdf", drive: "",
          ressources: [{ titre: "Partie C (PDF)", fichier: "docs/TD_Perceuse_Transmission_PartieC.pdf" }] },
        { id: "td2_transmission", titre: "TD 2 — Transmission", sous: "Rovio, télescope, Velux : trains d'engrenages", duree: "", ligne: "activites/td2_transmission.html", pdf: "docs/TD2_Transmission.pdf", drive: "" }
      ] },
      { n: 5, date: "2026-11-10", titre: "Chaînes de puissance de robots", activites: [
        { id: "td_rovio", titre: "TD ROVIO", sous: "Robot mobile : chaîne de puissance", duree: "", ligne: "activites/td_rovio.html", pdf: "docs/TD_ROVIO.pdf", drive: "" },
        { id: "td_bras_robot", titre: "TD Bras robot à vérin", sous: "Vérin, effort, puissance", duree: "", ligne: "activites/td_bras_robot.html", pdf: "docs/TD_Bras_Robot_Verin.pdf", drive: "" }
      ] },
      { n: 6, date: "2026-11-12", titre: "Portail automatique", activites: [
        { id: "td_portail_set", titre: "TD Portail SET", sous: "Motorisation d'un portail coulissant", duree: "", ligne: "activites/td_portail_set.html", pdf: "docs/TD_Portail_SET.pdf", drive: "" }
      ] },
      { n: 7, date: "2026-11-17", titre: "Synthèse et entraînement", activites: [
        { id: "exos_tondeuse", titre: "Exercices — Tondeuse et pilote automatique", sous: "Entraînement avant la sommative", duree: "", ligne: "activites/exos_tondeuse.html", pdf: "docs/Exercices_Tondeuse_Pilote.pdf", drive: "" },
        { id: "td_eolien", titre: "TD Éolien", sous: "Chaîne de puissance d'une éolienne", duree: "", ligne: "activites/td_eolien.html", pdf: "docs/TD_Eolien.pdf", drive: "" },
        { id: "carte_mentale", titre: "Carte mentale S3", sous: "Synthèse de la séquence à compléter (PDF, ou fichier draw.io modifiable)", duree: "", ligne: "", pdf: "docs/Carte_Mentale_S3.pdf", drive: "",
          ressources: [{ titre: "Fichier draw.io", fichier: "docs/Carte_Mentale_S3.drawio" }] }
      ] },
      { n: 8, date: "2026-11-19", titre: "Évaluation sommative", activites: [] }
    ],
    evaluations: [
      { type: "P", titre: "Prérequis", date: "2026-10-27", duree: "15 min", info: "Au début de la séquence : lois d'Ohm, puissance, unités. Pas de note, un repère pour toi et pour moi.", competences: ["SI-ANA-02", "SI-MOD-13"] },
      { type: "F", titre: "Formative", date: "2026-11-03", duree: "30 min", info: "QCM sur la plateforme de la classe (en salle, 2e heure). Sert à te situer avant la sommative : ton niveau par compétence est repris dans le bonus de progression.", competences: ["SI-ANA-02", "SI-MOD-02", "SI-MOD-03"] },
      { type: "S", titre: "Sommative", date: "2026-11-19", duree: "1 h", info: "Sur table. Note /20 sur Pronote + niveau par compétence (0, 1/3, 2/3, 3/3) + bonus de progression formative → sommative. Sujet non publié ici.", competences: ["SI-ANA-02", "SI-ANA-03", "SI-MOD-02", "SI-MOD-03", "SI-MOD-13"] }
    ] },
  { id: "s4", num: "S4", court: "Information", titre: "Acquérir et transmettre l'information", debut: "2026-11-24", fin: "2026-12-15", etat: "bientot", competences: ["SI-MOD-09", "SI-ANA-09", "SI-EXP-07"], cours: [], seances: [], evaluations: [] },
  { id: "s5", num: "S5", court: "Chaîne de puissance", titre: "Chaîne de puissance électromécanique", debut: "2027-02-02", fin: "2027-02-18", etat: "bientot", competences: ["SI-MOD-03", "SI-ANA-13"], cours: [], seances: [], evaluations: [] },
  { id: "s6", num: "S6", court: "Mouvements", titre: "Modéliser les mouvements", debut: "2027-02-23", fin: "2027-03-16", etat: "bientot", competences: ["SI-MOD-06", "SI-MOD-07", "SI-MOD-15"], cours: [], seances: [], evaluations: [] },
  { id: "s7", num: "S7", court: "Transmission", titre: "Transmettre la puissance mécanique", debut: "2027-04-01", fin: "2027-04-29", etat: "bientot", competences: ["SI-MOD-02", "SI-MOD-03", "SI-ANA-02"], cours: [], seances: [], evaluations: [] },
  { id: "s8", num: "S8", court: "Actions mécaniques", titre: "Modéliser les actions mécaniques", debut: "2027-05-20", fin: "2027-06-01", etat: "bientot", competences: ["SI-MOD-01", "SI-MOD-08"], cours: [], seances: [], evaluations: [] }
];
