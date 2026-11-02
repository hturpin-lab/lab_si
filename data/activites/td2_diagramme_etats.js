/* TD 2 — Diagramme d'états — 1re SI, S2 Comportement (séance 2, 22/09/2026)
   Énoncés repris du PDF d'Henri (TD2_algorithme_Diagramme_etat.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "td2_diagramme_etats", fichier: "TD2_Diagramme_Etats", court: "TD 2 Diagramme d'états · 1re SI", sequence: "s2",
  classe: "1re SI", seq: "S2 · Comportement séquentiel",
  titre: "TD 2 — Diagramme d'états",
  sous: "Modéliser les systèmes pluri-technologiques — lire un diagramme d'états et le traduire en algorithme",
  blocs: [
    { t: "encadre", titre: "Le diagramme d'états", html:
      "<p>C'est aussi une représentation graphique de l'algorithme (plus évoluée). Le diagramme d'états décrit les <b>transitions</b> entre les <b>états</b> et les <b>actions</b> que le système ou ses parties réalisent en réponse à un <b>événement</b>.</p>" +
      "<p><b>Activités et actions.</b> À un état, on peut principalement rattacher une activité, une action d'entrée et/ou une action de sortie. Le lancement des actions et activités à l'intérieur de l'état actif est organisé selon des mots réservés :</p>" +
      "<ul><li><b>Entry/</b> est suivi des actions exécutées lorsque l'état devient actif ;</li><li><b>Do/</b> est suivi d'une ou plusieurs activités exécutées dans l'ordre de leur écriture, à partir de l'instant où l'action entry/ est terminée ;</li><li><b>Exit/</b> est suivi des actions qui se déroulent lorsque l'état se désactive.</li></ul>" +
      "<p>La différence entre activité et action : une <b>activité</b> prend du temps et peut être interrompue ; une <b>action</b> est instantanée et ne peut pas être interrompue.</p>" +
      "<p>Une action peut être : un ordre de mise à « 1 » d'une sortie (syntaxe <b>SORTIE = 1</b>) ; un ordre de mise à « 0 » d'une sortie (<b>SORTIE = 0</b>) ; une modification d'une variable numérique interne, par exemple un compteur C : <b>C = C + 1</b> pour incrémenter la valeur du compteur C de 1.</p>" +
      "<p><b>Les transitions.</b> Le passage d'un état à l'autre se fait par une transition qui se matérialise par une liaison orientée entre un état source et un état pointé. La transition est caractérisée par une <b>étiquette</b> qui décrit les circonstances ou les conditions de passage d'un état à un autre. L'étiquette contient le plus souvent une <b>condition</b> (écrite entre crochets) ou un <b>opérateur temporel</b>.</p>" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-operateurs", src: "../assets/img/s2_td2_operateurs.png", alt: "Opérateurs logiques : a = 0 ? s'écrit [!a] ; a = 1 ? s'écrit [a] ; a et b = 1 ? s'écrit [a && b] ; a ou b = 1 ? s'écrit [a || b]. Opérateurs relationnels : égal [a == b], différent [a != b] ou [a <> b], inférieur [a < b], inférieur ou égal [a <= b], supérieur [a > b], supérieur ou égal [a >= b].", legende: "Syntaxe Stateflow des opérateurs logiques et relationnels." },
      { t: "html", html: "<p><b>Exemple : la borne de recharge.</b> Après la mise sous tension, la borne doit être en attente d'un événement. Le premier état est donc un état d'attente. L'événement pour quitter cet état est la lecture d'un badge RFID. Si ce badge est autorisé, la borne passe à l'état <b>badge OK</b> sinon elle passe à l'état <b>badge NOK</b>. Pendant l'état d'attente, le voyant vert « Disponible » est allumé. Pendant l'état badge OK, le voyant « charge » clignote. Pendant l'état badge NOK, le voyant « défaut » clignote.</p>" }
    ] },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-borne", src: "../assets/img/s2_td2_exemple_borne.png", alt: "Diagramme d'états de la borne : état initial, état Attente (entry / voyant disponible = 1), transitions Badge présent = 1 et Badge valide = 1 vers Badge OK (do / clignotement voyant charge) puis BP charge = 1 vers l'état final ; Badge présent = 1 et Badge valide = 0 vers Badge NOK (do / clignotement voyant défaut, lancer temporisation) puis temporisation = 8 s retour à Attente. Les légendes nomment : état initial, nom d'état, action d'entrée, transition à événement (condition), activité, état final.", legende: "Diagramme d'états de la borne (exemple du cours) et ses éléments." },
      { t: "figure", id: "fig-borne-algo", src: "../assets/img/s2_td2_exemple_algo.png", alt: "Algorithme de fonctionnement de la borne : Début ; Mise en attente : Voyant disponible := 1 ; Tant que (Badge présent := 1 && Badge valide := 0) : Badge NOK : Faire clignotement voyant défaut, lancer temporisation, attendre 8 s ; Fin tant que ; Mise en attente ; Badge OK : Si (Badge présent := 1 && Badge valide := 1) Alors Faire clignotement voyant charge jusqu'à BP charge := 1 ; Fin si ; Fin.", legende: "Algorithme de fonctionnement correspondant (exemple du cours).", largeur: "340px" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> pour écrire l'algorithme à partir d'un diagramme d'états, **pars** de l'état initial, **écris** ce que fait chaque état (entry/, do/) puis la condition qui permet d'en sortir (Si …, Tant que …, Attendre …). Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "1 — Analyse comportementale : barrière SYMPACT", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "ligne", blocs: [
      { t: "html", html: "<p><b>Extrait — présentation du système.</b> Le télépéage (lecture d'un badge placé dans le véhicule par un équipement fixe installé sur une des voies du poste de péage) a été introduit il y a une dizaine d'années comme l'un des moyens de paiement. Il représente 36 millions de transactions. Les utilisateurs sont abonnés au service, ils payent leurs consommations soit par débit d'une réserve, soit par prélèvement bancaire. Le principal avantage du service est le gain de temps : le passage est accéléré, et on n'a pas à faire la queue.</p><p>La solution de commande par variateur de vitesse et par capteur de position pour connaître instantanément la position de la lisse permet une inversion de sens du mouvement de la lisse en cours de mouvement, permettant un gain de temps pour un cycle complet, et permet le réglage de vitesses et accélérations distinctes entre les mouvements de montée et de descente.</p>" },
      { t: "figure", id: "fig-barriere", src: "../assets/img/s2_td2_barriere_photo.jpg", alt: "Barrière de péage Sympact du laboratoire.", legende: "Barrière SYMPACT.", largeur: "200px" }
    ] },
    { t: "figure", id: "fig-barriere-stm", src: "../assets/img/s2_td2_barriere_stm.png", alt: "Diagramme d'états de la barrière : état initial, Barrière ouverte (barrière verticale) ; transition Véhicule passé vers Fermeture barrière (do / piloter le variateur pour fermer en suivant un profil de vitesse) ; transition Barrière horizontale vers Barrière fermée (do / piloter le variateur pour maintenir le couple) ; transition Véhicule autorisé à passer vers Ouverture barrière (do / piloter le variateur pour ouvrir en suivant un profil de vitesse) ; retour à Barrière ouverte.", legende: "Diagramme d'états de la barrière SYMPACT." },
    { t: "q", id: "Q1", lab: "Q1", bac: "**Donner** l'algorithme de fonctionnement de la barrière.", ref: "**Écris** l'algorithme de la barrière : commence par « // Début », puis, pour chaque état du diagramme, **écris** ce que fait le variateur (do/) et la condition qui fait passer à l'état suivant (véhicule passé, barrière horizontale, véhicule autorisé, barrière verticale). Le cycle recommence : utilise « Tant que » ou « Répéter »." },
    { t: "zone", q: "Q1", label: "Algorithme de fonctionnement de la barrière", lignes: 10, ph: "// Début\n…" },

    { t: "bandeau", id: "p2", titre: "2 — Analyse comportementale : pilote de bateau", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "ligne", blocs: [
      { t: "figure", id: "fig-pilote", src: "../assets/img/s2_td2_pilote_photo.jpg", alt: "Pilote automatique de bateau : vérin électrique monté sur la barre.", legende: "Pilote automatique du laboratoire.", largeur: "320px" },
      { t: "figure", id: "fig-pilote-stm", src: "../assets/img/s2_td2_pilote_stm.png", alt: "Diagramme d'états du pilote : état initial vers mode manu ; dans mode manu : repos, rotation gauche (bouton bâbord appuyé / bouton bâbord relâché), rotation droite (bouton tribord appuyé / bouton tribord relâché) ; transition appui bouton Auto/Stby vers mode automatique et retour par appui bouton Auto/Stby.", legende: "Diagramme d'états du pilote automatique." }
    ] },
    { t: "q", id: "Q2", lab: "Q2", bac: "**Donner** l'algorithme de fonctionnement du pilote automatique.", ref: "**Écris** l'algorithme du pilote : « // Début », « // Démarrage en mode Manu », puis ce qui se passe quand on appuie sur le bouton bâbord, sur le bouton tribord, et quand on appuie sur Auto/Stby (passage en mode automatique, puis retour en mode manu)." },
    { t: "zone", q: "Q2", label: "Algorithme de fonctionnement du pilote", lignes: 10, ph: "// Début\n// Démarrage en mode Manu\n…" },

    { t: "bandeau", id: "p3", titre: "3 — Analyse comportementale : HEMOMIXER", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "figure", id: "fig-hemo-stm", src: "../assets/img/s2_td2_hemomixer_stm.png", alt: "Deux diagrammes d'états de l'Hemomixer côte à côte (machine principale et détail du cycle d'agitation du plateau).", legende: "Diagrammes d'états de l'HEMOMIXER." },
    { t: "figure", id: "fig-hemo-cycle", src: "../assets/img/s2_td2_hemomixer_cycle.png", alt: "Chronogramme d'un cycle d'agitation du plateau.", legende: "Un cycle d'agitation du plateau." },
    { t: "q", id: "Q3", lab: "Q3", bac: "**Donner** l'algorithme correspondant aux diagrammes d'états ci-dessus.", ref: "**Écris** l'algorithme de l'Hemomixer en suivant les deux diagrammes : d'abord les grandes étapes (machine de gauche), puis le détail de l'agitation du plateau (machine de droite) avec ses temporisations." },
    { t: "zone", q: "Q3", label: "Algorithme de fonctionnement de l'Hemomixer", lignes: 10, ph: "// Début\n…" },
    { t: "diagramme", q: "Q4", lab: "Q4", titre: "Algorigramme correspondant",
      bac: "**Donner** l'algorigramme correspondant aux diagrammes d'états.",
      ref: "**Dessine** l'algorigramme de l'Hemomixer (ovale Début, rectangles pour les actions, losanges pour les tests de temporisation) avec le fichier draw.io de départ ou sur papier, puis **colle** une capture ci-dessous.",
      drawio: "../docs/drawio/Algorigramme_depart.drawio" },

    { t: "bandeau", id: "p4", titre: "4 — Analyse comportementale de la berceuse", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "figure", id: "fig-berceuse-stm", src: "../assets/img/s2_td2_berceuse_stm.png", alt: "Diagramme d'états de la berceuse : Attente bouton On, Affichage menu, puis des régions en parallèle : augmenter / diminuer vitesse, augmenter / diminuer trajectoire, nouvelle trajectoire, marche moteurs, arrêt moteurs, et un état Avertissement.", legende: "Diagramme d'états de la berceuse.", largeur: "640px" },
    { t: "q", id: "Q5", lab: "Q5", bac: "**Donner** une description du diagramme d'états ci-dessus, sous forme d'algorithme.", ref: "**Décris** en algorithme ce que fait la berceuse : au départ (attente du bouton On), puis l'affichage du menu, les réglages de vitesse et de trajectoire (boutons + et −), le lancement et l'arrêt des moteurs, et l'avertissement. Une ligne par état ou transition." },
    { t: "zone", q: "Q5", label: "Description du fonctionnement de la berceuse (algorithme)", lignes: 12, ph: "// Début\n…" },

    { t: "retenir", q: "RET", titre: "À retenir", aide: "Écris le mot qui manque.", items: [
      ["Mot réservé des actions exécutées quand l'état devient actif", "ret_entry"],
      ["Mot réservé de l'activité qui dure pendant l'état", "ret_do"],
      ["Ce qui est écrit entre crochets sur une transition", "ret_condition"],
      ["Symbole de l'état initial (rond plein) / de l'état final (rond cerclé) : lequel n'a pas de transition sortante ?", "ret_final"]
    ] },
    { t: "autoeval", items: [
      "repérer sur un diagramme d'états : état initial, états, transitions, conditions",
      "lire une étiquette de transition ([condition], after (durée))",
      "traduire un diagramme d'états en algorithme",
      "dessiner un algorigramme équivalent"
    ] }
  ]
};
