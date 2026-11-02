/* Activité — Diagramme d'états sous Simulink (Stateflow) — 1re SI, S2 Comportement (séance 3, 24/09/2026)
   Énoncés repris du PDF d'Henri (Act_Modélisation_diagramme Etat.pdf). Contenu ÉLÈVE uniquement : aucun corrigé.
   Les simulations se font en salle (MATLAB R2024) ; les réponses écrites et les diagrammes se rendent ici. */
window.ACTIVITE = {
  id: "act_diagramme_etats_simulink", fichier: "Act_Diagramme_Etats_Simulink", court: "Activité Simulink · 1re SI", sequence: "s2",
  classe: "1re SI", seq: "S2 · Comportement séquentiel",
  titre: "Diagramme d'états sous Simulink (Stateflow)",
  sous: "Modéliser les systèmes pluri-technologiques — saisir une machine d'états, la simuler, écrire l'algorithme",
  blocs: [
    { t: "encadre", titre: "1. Mise en route de Simulink", html:
      "<ul><li>Lancement du logiciel <b>MATLAB R2024</b> sur le Bureau.</li>" +
      "<li>Un dossier « MATLAB » sera créé automatiquement dans votre répertoire « Perso ».</li>" +
      "<li><b>Récupérer</b> les documents sur le drive, et <b>enregistrez</b>-les dans le répertoire MATLAB.</li>" +
      "<li>Après le lancement de MATLAB, vous devez <b>sélectionner le répertoire de travail</b> dans lequel tous les fichiers utiles à l'étude seront présents, et les nouveaux fichiers seront enregistrés. Le répertoire doit permettre l'écriture.</li>" +
      "<li><b>Cliquez</b> sur Simulink et <b>lancer</b> une recherche de « Chart », <b>cliquez</b> sur « créer le modèle ». Le diagramme « Stateflow : Blank Chart » arrive avec aucune entrée / sortie ; nous allons les ajouter après.</li></ul>" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-chart", src: "../assets/img/s2_sim_nouveau_chart.png", alt: "Fenêtre Simulink Start Page : recherche « chart », modèle Stateflow « Blank Chart ».", legende: "Simulink › New › recherche « chart » › Blank Chart." },
      { t: "figure", id: "fig-symboles", src: "../assets/img/s2_sim_symboles_voyant.png", alt: "Fenêtre Symbols du Chart : ajout d'une sortie Voyant, scope output, port 1.", legende: "Dans le Chart, panneau Symbols : ajouter la sortie <b>Voyant</b> (scope : output, port : 1)." }
    ] },
    { t: "encadre", titre: "Dans la page « untitled »", html:
      "<ul><li><b>Double-cliquez</b> sur la page et <b>effectuer</b> une recherche pour ouvrir les composants suivants : <b>Lamp</b>, <b>Scope</b>.</li>" +
      "<li><b>Reliez</b> le « chart » au « scope » puis <b>rajouter</b> les connexions pour les « lamp » (Connect : Chart 1).</li></ul>" },
    { t: "figure", id: "fig-lamp", src: "../assets/img/s2_sim_chart_lamp_scope.png", alt: "Modèle Simulink : le bloc Chart (sortie Voyant) relié à un Scope, et une Lamp connectée (Connect : Chart 1).", legende: "Chart relié au Scope et à la Lamp.", largeur: "520px" },
    { t: "methode", html: "<b>Méthode :</b> pour chaque exercice, tu **réalises** le modèle dans Simulink et tu le **simules** en salle ; ici tu **rédiges** l'algorithme et tu **colles** une capture du diagramme d'états que tu as saisi dans le Chart (ou que tu as dessiné avec draw.io). Les verbes d'action sont en gras." },

    { t: "bandeau", id: "exA", titre: "A — Exercice 1 : « Faire clignoter une LED »", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "figure", id: "fig-ex1", src: "../assets/img/s2_sim_ex1_stm.png", alt: "Machine d'états : état Allume (en : Voyant = 1) ; transition after(1, sec) vers Eteint (en : Voyant = 0) ; transition after(0.5, sec) retour vers Allume.", legende: "Machine d'états à saisir dans le Chart : Allume (en : Voyant = 1) ⇄ Eteint (en : Voyant = 0), transitions after(1, sec) et after(0.5, sec).", largeur: "480px" },
    { t: "q", id: "Q1", lab: "Q1", bac: "Dans « Chart », **utiliser** Stateflow pour saisir la machine d'états décrite ci-dessus. **Donner** l'algorithme de fonctionnement.", ref: "**Saisis** dans le Chart les deux états Allume et Eteint avec leurs transitions, puis **écris** l'algorithme : ce que vaut Voyant dans chaque état et combien de temps on y reste (1 s allumé, 0,5 s éteint), en boucle." },
    { t: "zone", q: "Q1", label: "Algorithme de fonctionnement (LED clignotante)", lignes: 6, ph: "// Début\n…" },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Lancer** la simulation et **appeler** le professeur.", ref: "**Lance** la simulation (bouton Run). **Note** ce que tu observes sur la Lamp et sur le Scope, puis **appelle** le professeur pour valider." },
    { t: "zone", q: "Q2", label: "Ce que j'observe à la simulation (Lamp, Scope) — validation du professeur", lignes: 2, ph: "La LED… ; le Scope montre…" },

    { t: "bandeau", id: "exB", titre: "B — Exercice 2 : interrupteur de commande", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-ex2", src: "../assets/img/s2_sim_ex2_modele.png", alt: "Modèle Simulink : deux constantes 0 et 21 reliées à un Manual Switch, entrée capt du Chart, sortie LED vers une Lamp et un Display. Algorithme : if capt >= 20 then LED = 1 else LED = 0.", legende: "Modèle à réaliser. Algorithme : <code>if capt &gt;= 20 : LED = 1 ; else LED = 0 ; end</code>" },
      { t: "html", html: "<p><b>Réalisez</b> le modèle ci-contre. <b>Rajoutez</b> les entrées / sorties suivantes : <b>Manual Switch</b>, <b>Constant</b>, <b>Display</b>, <b>Scope</b>.</p>" }
    ] },
    { t: "q", id: "Q3", lab: "Q3", bac: "Quelle est la différence entre « Display » et « Scope » ?", ref: "**Explique** en une phrase ce que montre le bloc <b>Display</b> et ce que montre le bloc <b>Scope</b> : lequel affiche une valeur, lequel trace une courbe en fonction du temps ?" },
    { t: "zone", q: "Q3", label: "Différence entre Display et Scope", lignes: 2 },
    { t: "diagramme", q: "Q4", lab: "Q4", titre: "Diagramme d'états correspondant",
      bac: "**Réalisez** le diagramme d'états dans Chart correspondant à l'algorithme, puis **simuler** dans MATLAB.",
      ref: "**Dessine** le diagramme d'états qui traduit l'algorithme (deux états : LED éteinte / LED allumée, avec les conditions [capt >= 20] et [capt < 20]) dans le Chart, **simule**, puis **colle** une capture du diagramme ci-dessous.",
      drawio: "../docs/drawio/Diagramme_etats_depart.drawio" },

    { t: "bandeau", id: "exC", titre: "C — Exercice 3 : radar de recul", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-ex3", src: "../assets/img/s2_sim_ex3_modele.png", alt: "Modèle Simulink : un Knob relié à une constante, entrée capt du Chart, sortie LED vers une Lamp ; un Circular Gauge affiche la valeur.", legende: "Modèle à réaliser (Knob, Constant, Circular Gauge)." },
      { t: "html", html: "<p><b>Réalisez</b> le modèle ci-contre. <b>Rajoutez</b> les entrées / sorties suivantes : <b>Knob</b>, <b>Constant</b>, <b>Circular Gauge</b>.</p><p><b>Réalisez</b> le modèle, en y apportant quelques modifications.</p>" }
    ] },
    { t: "q", id: "Q5", lab: "Q5", bac: "Quelle est la différence entre Knob et Circular Gauge ?", ref: "**Explique** : lequel des deux blocs sert à <b>régler</b> une valeur à la main (entrée) et lequel sert à <b>afficher</b> une valeur (sortie) ?" },
    { t: "zone", q: "Q5", label: "Différence entre Knob et Circular Gauge", lignes: 2 },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Définir** les distances de détection pour l'allumage des LED.", ref: "**Choisis** une distance (ou une plage de distances) pour chaque zone : à partir de quelle distance la LED rouge s'allume (très proche), la jaune, la verte (loin). **Remplis** le tableau." },
    { t: "grille", q: "Q6", titre: "Distances de détection", entetes: ["Zone", "Distance"], lignes: [
      ["ROUGE", { champ: "Q6_rouge", ph: "ex. moins de … cm" }],
      ["JAUNE", { champ: "Q6_jaune", ph: "de … à … cm" }],
      ["VERTE", { champ: "Q6_verte", ph: "plus de … cm" }]
    ] },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Donner** l'algorithme de fonctionnement, ainsi que le diagramme d'états correspondant.", ref: "**Écris** l'algorithme du radar : Si la distance est inférieure à … Alors LED rouge = 1 … Sinon si … (une ligne par zone)." },
    { t: "zone", q: "Q7", label: "Algorithme du radar de recul", lignes: 8, ph: "// Début\nSi distance < … Alors …" },
    { t: "diagramme", q: "Q8", lab: "Q8", titre: "Diagramme d'états du radar de recul",
      bac: "**Donner** le diagramme d'états correspondant.",
      ref: "**Dessine** le diagramme d'états du radar : un état par zone (rouge, jaune, verte, rien) avec les conditions sur la distance sur les transitions. **Colle** une capture ci-dessous.",
      drawio: "../docs/drawio/Diagramme_etats_depart.drawio" },

    { t: "bandeau", id: "exD", titre: "D — Exercice 4 : 4 LED", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "encadre", titre: "Cahier des charges", html: "<p>Un client souhaite alimenter 4 LED selon les conditions suivantes :</p><ul><li>Bouton B1 actionne L1 et L3 ;</li><li>Bouton B2 actionne L2 et L4 ;</li><li>Si les deux boutons sont actionnés alors aucune LED ne s'allume ;</li><li>Si aucun bouton n'est actionné alors aucune LED ne s'allume.</li></ul>" },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Donner** l'algorithme correspondant.", ref: "**Écris** l'algorithme avec des Si … Alors … : B1 seul → L1 = 1 et L3 = 1 ; B2 seul → L2 = 1 et L4 = 1 ; les deux ou aucun → toutes les LED à 0." },
    { t: "zone", q: "Q9", label: "Algorithme (4 LED)", lignes: 8, ph: "// Début\nSi B1 = 1 et B2 = 0 Alors …" },
    { t: "diagramme", q: "Q10", lab: "Q10", titre: "Diagramme d'états (4 LED)",
      bac: "**Donner** le diagramme d'états correspondant.",
      ref: "**Dessine** le diagramme d'états : un état « tout éteint », un état « L1 et L3 allumées », un état « L2 et L4 allumées », avec les conditions sur B1 et B2 (syntaxe [B1 && !B2], etc.). **Colle** une capture ci-dessous.",
      drawio: "../docs/drawio/Diagramme_etats_depart.drawio" },

    { t: "bandeau", id: "exE", titre: "E — Exercice 5 : le feu tricolore", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "ligne", blocs: [
      { t: "html", html: "<p>On souhaite commander 3 LED (Rouge / Orange / Vert). Les durées d'allumage sont fixées comme suit :</p><ul><li>Rouge : 8 secondes</li><li>Orange : 2 secondes</li><li>Vert : 6 secondes</li></ul><p>Début : feu rouge allumé.</p>" },
      { t: "figure", id: "fig-feu", src: "../assets/img/s2_sim_ex5_feu.png", alt: "Feu tricolore : rouge, orange, vert.", legende: "Feu tricolore.", largeur: "90px" }
    ] },
    { t: "q", id: "Q11", lab: "Q11", bac: "**Donner** l'algorithme et le diagramme d'états correspondant.", ref: "**Écris** l'algorithme du feu : rouge allumé pendant 8 s, puis vert 6 s, puis orange 2 s, et on recommence (ordre d'un vrai feu : rouge → vert → orange → rouge)." },
    { t: "zone", q: "Q11", label: "Algorithme du feu tricolore", lignes: 8, ph: "// Début : feu rouge allumé\n…" },
    { t: "diagramme", q: "Q12", lab: "Q12", titre: "Diagramme d'états du feu tricolore",
      bac: "**Donner** le diagramme d'états correspondant.",
      ref: "**Dessine** trois états (Rouge, Vert, Orange) reliés en boucle, avec sur chaque transition la durée : after(8, sec), after(6, sec), after(2, sec). **Colle** une capture ci-dessous.",
      drawio: "../docs/drawio/Diagramme_etats_depart.drawio" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-carrefour", src: "../assets/img/s2_sim_ex5_carrefour.jpg", alt: "Carrefour avec deux feux tricolores, un passage piétons et la ligne des feux.", legende: "Deux feux tricolores à un carrefour.", largeur: "300px" },
      { t: "html", html: "<p><b>Apporter</b> les modifications nécessaires pour commander <b>2 feux tricolores</b>.</p>" }
    ] },
    { t: "q", id: "Q13", lab: "Q13", bac: "**Apporter** les modifications nécessaires pour commander 2 feux tricolores.", ref: "Au carrefour, quand le feu 1 est vert, le feu 2 doit être rouge (et inversement). **Explique** ce que tu changes dans l'algorithme et dans le diagramme (sorties supplémentaires, états avec les deux feux, durées), puis **colle** si possible une capture du nouveau diagramme dans la zone Q12." },
    { t: "zone", q: "Q13", label: "Modifications pour 2 feux tricolores", lignes: 6 },

    { t: "autoeval", items: [
      "créer un Chart Stateflow avec ses entrées / sorties et le relier aux blocs Simulink",
      "saisir des états avec leurs actions (en : …) et des transitions avec conditions ou durées",
      "lancer une simulation et interpréter la Lamp, le Scope, le Display",
      "écrire l'algorithme correspondant à un diagramme d'états (et l'inverse)"
    ] }
  ]
};
