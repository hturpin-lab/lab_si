/* Activité — Berceuse MOBY CREA — 1re SI, S1 Analyse fonctionnelle (01/09/2026)
   Énoncés repris du PDF d'Henri (Act_AF_berceuse.pdf). Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
  id: "act_af_berceuse", fichier: "Act_AF_Berceuse", court: "Berceuse MOBY CREA · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "Activité : Berceuse MOBY CREA",
  sous: "Analyser les systèmes pluri-technologiques — besoin, énergie, exigences, flux et comportement d'un transat berceur",
  blocs: [
    { t: "ligne", blocs: [
      { t: "encadre", titre: "Présentation du système", html:
        "<p>Le transat berceur autonome répond à un besoin exprimé par de nombreux parents : il permet des bercements dans le respect du confort et de la sécurité de bébé. Il est utilisable de la naissance jusqu'aux sept mois de l'enfant. Différentes trajectoires et différentes vitesses sont sélectionnables sur le transat.</p>" +
        "<p>Le cahier des charges impose, pour préserver la sécurité de bébé, une accélération latérale maximale à ne pas franchir pour éviter au mieux tout phénomène de secousse de la tête, l'accélération verticale pouvant être cependant plus forte, dans une plage qui restera raisonnable pour garantir le confort de l'enfant.</p>" +
        "<p>Le rôle des ingénieurs, pour ce genre de produit, est de proposer un concept capable de présenter d'une part le plus de similitudes possibles avec un geste naturel, et d'éviter d'autre part un sentiment de lassitude chez l'enfant, en offrant la possibilité de varier les modes de bercements, mais aussi en rendant l'objet si possible rassurant et divertissant pour tous.</p>" },
      { t: "figure", id: "fig-photo", src: "../assets/img/s1_ber_photo.jpg", alt: "Transat berceur MOBY CREA : nacelle bleue sur son socle.", legende: "Le transat berceur du laboratoire.", largeur: "240px" }
    ] },
    { t: "methode", html: "<b>Méthode :</b> les diagrammes à compléter se font avec le fichier draw.io de départ (ou sur papier) puis tu **colles** une capture ; les réponses rédigées se tapent directement. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "Analyse du besoin", comp: "SI-ANA-01", cr: "Problématique" },
    { t: "diagramme", q: "Q1", lab: "Q1", titre: "Diagramme des cas d'utilisation à compléter",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Parent, bébé, bercer le bébé, diffuser de la musique, include, extend, énergie électrique</i>.",
      ref: "**Place** chaque mot de la liste dans une case vide du diagramme : les <b>acteurs</b> (parent, bébé, énergie électrique), les <b>cas d'utilisation</b> (bercer le bébé, diffuser de la musique) et le type des flèches en pointillés (<b>include</b> = obligatoire, <b>extend</b> = optionnel).",
      figure: { src: "../assets/img/s1_ber_ucd_eleve.png", alt: "Diagramme des cas d'utilisation du transat berceur : cas Choisir la trajectoire, Choisir la vitesse, avec des acteurs et des ovales vides ; un acteur Smartphone.", legende: "Diagramme des cas d'utilisation à compléter.", largeur: "520px" },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "ligne", blocs: [
      { t: "html", html: "<p>➜ <b>Mettre</b> en route le système pour observer comment les différents mouvements sont générés.</p>" },
      { t: "figure", id: "fig-mouv", src: "../assets/img/s1_ber_mouvements.png", alt: "Les cinq mouvements du transat : car ride, kangaroo, tree swing, rock a bye, ocean.", legende: "Les mouvements sélectionnables.", largeur: "420px" }
    ] },

    { t: "bandeau", id: "p2", titre: "Analyse de la source d'énergie et du fonctionnement", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "q", id: "Q2", lab: "Q2", bac: "D'après vous, quels types d'énergie sont fournis au système pour qu'il fonctionne ?", ref: "**Indique** le ou les types d'énergie qui arrivent au transat (regarde comment il est branché)." },
    { t: "zone", q: "Q2", label: "Types d'énergie fournis au système", lignes: 2 },
    { t: "ligne", blocs: [
      { t: "html", html: "<p>On donne ci-contre la photo du système de mise en mouvement horizontal de la nacelle.</p>" },
      { t: "figure", id: "fig-meca", src: "../assets/img/s1_ber_mecanisme.jpg", alt: "Photo du mécanisme : grande roue dentée blanche, bielle, et un ensemble entouré en pointillés verts (petit moteur et vis sans fin).", legende: "Mécanisme de mise en mouvement horizontal de la nacelle.", largeur: "420px" }
    ] },
    { t: "q", id: "Q3", lab: "Q3", bac: "Quel est le composant situé sur la photo ci-contre, qui permet de convertir une énergie électrique en énergie mécanique de rotation ? (Entourez-le en rouge.)", ref: "Sur la photo, **nomme** le composant qui transforme l'électricité en rotation et **décris** où il se trouve (en version en ligne, tu peux aussi coller une capture de la photo avec le composant entouré dans la question 7)." },
    { t: "zone", q: "Q3", label: "Composant convertisseur et sa position sur la photo", lignes: 2 },
    { t: "q", id: "Q4", lab: "Q4", bac: "**Indiquer** le nom du système entouré en pointillés verts. **Préciser** sa fonction.", ref: "**Nomme** l'ensemble entouré en pointillés verts sur la photo (un engrenage particulier : une vis qui entraîne une roue) et **explique** à quoi il sert (réduire la vitesse ? changer la direction de l'axe ?)." },
    { t: "zone", q: "Q4", label: "Nom du système entouré en vert et sa fonction", lignes: 3 },

    { t: "bandeau", id: "p3", titre: "Identification de composants réalisant certaines exigences", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "figure", id: "fig-req-arbre", src: "../assets/img/s1_ber_req_arbre.png", alt: "Diagramme d'exigences du transat berceur : Bercer de façon autonome, Générer un mouvement horizontal, Alimenter en énergie électrique, Distribuer l'énergie électrique, Convertir l'énergie électrique en énergie mécanique, Adapter l'énergie mécanique de rotation, Convertir l'énergie mécanique de rotation en translation, avec des cases satisfy vides.", legende: "Diagramme d'exigences (req) à compléter." },
    { t: "diagramme", q: "Q5", lab: "Q5", titre: "Composants satisfaisant les exigences",
      bac: "**Identifier** les éléments manquants à l'aide de la liste ci-dessous : <i>Carte de puissance, système bielle-manivelle, carte de commande, moteur, réducteur, prise électrique avec adaptateur</i>.",
      ref: "**Associe** chaque composant de la liste à l'exigence qu'il réalise (flèche « satisfy ») : les cases vides du diagramme ci-dessus et les photos ci-dessous. **Écris** les noms dans les cases, puis **colle** une capture (ou **liste** les associations dans la zone de la question 7).",
      figure: { src: "../assets/img/s1_ber_req_eleve.jpg", alt: "Photos des composants du transat (mécanisme, moteur et vis sans fin, carte électronique) avec des ovales vides à compléter.", legende: "Composants à identifier." },
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },

    { t: "bandeau", id: "p4", titre: "Analyse des flux", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "diagramme", q: "Q6", lab: "Q6", titre: "Diagramme de blocs (chaîne d'énergie) à compléter",
      bac: "**Compléter** le diagramme de blocs suivant avec les éléments suivants : <i>Système bielle/manivelle, système roue/vis sans fin, moteur, énergie mécanique de rotation, énergie électrique, énergie mécanique de rotation adaptée, énergie mécanique de translation</i>.",
      ref: "**Place** les composants dans les blocs (moteur, roue/vis sans fin, bielle/manivelle) et les énergies sur les flèches (électrique → rotation → rotation adaptée → translation). **Colle** une capture.",
      figure: { src: "../assets/img/s1_ber_ibd_eleve.png", alt: "Diagramme de blocs interne coloré de la berceuse avec chaîne d'information (bleu et jaune) et chaîne d'énergie (vert et rouge) et des cases vides.", legende: "Diagramme de blocs à compléter (questions 6 et 7)." },
      drawio: "../docs/drawio/Chaine_energie_information_depart.drawio" },
    { t: "diagramme", q: "Q7", lab: "Q7", titre: "Diagramme de blocs interne : flux et fonctions",
      bac: "**Compléter** le diagramme de blocs interne suivant : **repasser** en vert le flux d'information, en rouge le flux d'énergie électrique, en bleu le flux d'énergie mécanique ; **donner** la fonction de chacun des éléments figurant sur le diagramme.",
      ref: "Sur le même diagramme, **colorie** les liaisons (<span style=\"color:#2E7D32\"><b>vert</b></span> = information, <span style=\"color:#C62828\"><b>rouge</b></span> = énergie électrique, <span style=\"color:#1565C0\"><b>bleu</b></span> = énergie mécanique) et **colle** une capture ; puis **écris** la fonction de chaque élément dans la zone ci-dessous.",
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },
    { t: "zone", q: "Q7", id: "Q7_fonctions", label: "Fonction de chaque élément du diagramme", lignes: 8, ph: "Carte de commande : …\nMoteur : …" },

    { t: "bandeau", id: "p5", titre: "Analyse comportementale", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "figure", id: "fig-stm", src: "../assets/img/s1_ber_stm.png", alt: "Diagramme d'états de la berceuse : Attente bouton On, Affichage menu, réglages de vitesse et de trajectoire, nouvelle trajectoire, marche et arrêt des moteurs, avertissement.", legende: "Diagramme d'états de la berceuse.", largeur: "600px" },
    { t: "q", id: "Q8", lab: "Q8", bac: "**Donner** une description du diagramme d'états suivant, sous forme d'algorithme.", ref: "**Décris** en algorithme ce que fait la berceuse : au départ (attente du bouton On), puis l'affichage du menu, les réglages (boutons + et −), le lancement et l'arrêt des moteurs, l'avertissement. Une ligne par état ou transition." },
    { t: "zone", q: "Q8", label: "Description du diagramme d'états sous forme d'algorithme", lignes: 12, ph: "// Début\n…" },

    { t: "autoeval", items: [
      "compléter un diagramme des cas d'utilisation (acteurs, cas, include / extend)",
      "identifier sur un système réel le moteur et le réducteur (roue / vis sans fin)",
      "associer des composants aux exigences (satisfy)",
      "compléter une chaîne d'énergie et colorier les flux",
      "décrire un diagramme d'états sous forme d'algorithme"
    ] }
  ]
};
