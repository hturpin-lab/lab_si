/* TD — SysML du portail automatisé (Avidsen) — 1re SI, S1 Analyse fonctionnelle (25/08/2026)
   Énoncés repris du PDF (TD _ SysML (Portail automatisé)_copie.pdf, d'après le lycée Blaise Pascal, Clermont-Ferrand).
   Contenu ÉLÈVE uniquement : aucun corrigé. Le modèle SysML (Portail_SysML.html) et le dossier technique sont fournis en classe. */
window.ACTIVITE = {
  id: "td_sysml_portail", fichier: "TD_SysML_Portail", court: "TD SysML Portail · 1re SI", sequence: "s1",
  classe: "1re SI", seq: "S1 · Analyse fonctionnelle",
  titre: "SysML — Ouvre-portail automatisé",
  sous: "Analyse fonctionnelle des systèmes — lire et interpréter les principaux diagrammes SysML d'un système",
  blocs: [
    { t: "encadre", titre: "1. Problématique", html: "<p class=\"pb\"><b>Comment modéliser un système complexe sous tous ses aspects ?</b></p>" },
    { t: "cr", partie: "Problématique" },
    { t: "ligne", blocs: [
      { t: "encadre", titre: "2. Objectifs · 3. Matériel et documents", html:
        "<ul><li><b>Lire</b> et <b>interpréter</b> les principaux diagrammes SysML d'un système.</li></ul><p>Nous nous intéresserons plus particulièrement à la structure et aux fonctions des composants du portail.</p>" +
        "<ul><li>Un PC relié à Internet et au réseau pédagogique.</li><li>Modèle SysML et dossier technique du portail (fournis en classe : fichier <b>Portail_SysML.html</b>).</li></ul>" },
      { t: "figure", id: "fig-eclate", src: "../assets/img/s1_tdp_eclate.png", alt: "Vue éclatée de l'ouvre-portail : panneau solaire, feu, antenne, capot, couvercle de protection, réglage, batterie, équerre de fixation, moteur, système de déverrouillage, manivelle, réducteur, bielle, équerre vantail.", legende: "L'ouvre-portail et ses composants.", largeur: "300px" }
    ] },
    { t: "encadre", titre: "4. Présentation de l'ouvre-portail", html:
      "<p>La société Avidsen propose aux particuliers de disposer d'un ouvre-portail motorisé « écologique ». L'installation en site isolé est rendue possible grâce à son panneau photovoltaïque. Répondant aux normes de sécurité, ce produit de la domotique assure une installation rapide pour les particuliers souhaitant une ouverture à double vantaux.</p>" +
      "<p><b>4.1 Préparation.</b> <b>Ouvrir</b> le fichier « Portail_SysML.html ». <b>Cliquer</b> sur « Accueil » pour accéder aux différents diagrammes. Depuis les diagrammes, le retour direct à l'accueil est possible en double-cliquant sur le bouton d'accueil. <b>Visionner</b> les films de présentation. <b>Répondre</b> aux questions suivantes.</p>" },
    { t: "methode", html: "<b>Méthode :</b> chaque réponse se trouve dans un diagramme du modèle SysML (le nom du diagramme est donné dans la question). **Cite** les éléments avec leur nom exact. Les verbes d'action sont en gras." },

    { t: "bandeau", id: "p1", titre: "4.2 Expression du besoin", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "q", id: "Q1", lab: "Q1", bac: "À partir du « Diagramme de contexte », **lister** tous les éléments composant le contexte de l'ouvre-portail.", ref: "**Ouvre** le diagramme de contexte et **recopie** le nom de tout ce qui entoure l'ouvre-portail (personnes, objets, énergies, environnement)." },
    { t: "zone", q: "Q1", label: "Éléments du contexte", lignes: 4 },
    { t: "q", id: "Q2", lab: "Q2", bac: "À partir du « diagramme de cas d'utilisation », **donner** le cas principal d'utilisation de l'ouvre-portail, dans le contexte décrit ci-dessus.", ref: "**Ouvre** le diagramme des cas d'utilisation et **écris** le cas central (l'ovale principal, relié à l'utilisateur)." },
    { t: "zone", q: "Q2", label: "Cas principal d'utilisation", lignes: 2 },
    { t: "q", id: "Q3", lab: "Q3", bac: "**En déduire** les éléments du contexte de l'ouvre-portail constituant la matière d'œuvre sur laquelle il agit (ATTENTION : il y en a plusieurs !). **Expliquer**.", ref: "La <b>matière d'œuvre</b> est ce que le système transforme ou déplace. Parmi les éléments de la question 1, **trouve** ceux sur lesquels l'ouvre-portail agit (il y en a plusieurs) et **explique** pourquoi." },
    { t: "zone", q: "Q3", label: "Matière(s) d'œuvre et explication", lignes: 4 },

    { t: "bandeau", id: "p2", titre: "4.3 Analyse comportementale", comp: "SI-MOD-04", cr: "Résultats" },
    { t: "q", id: "Q4", lab: "Q4", bac: "De combien de temps l'utilisateur dispose-t-il pour franchir le portail ?", ref: "Dans les diagrammes de comportement (séquence ou états), **trouve** la durée pendant laquelle le portail reste ouvert avant de se refermer." },
    { t: "zone", q: "Q4", label: "Temps pour franchir le portail", lignes: 1 },
    { t: "q", id: "Q5", lab: "Q5", bac: "Comment le portail est-il remis en mouvement après un arrêt dû à un obstacle ?", ref: "**Explique** ce qui se passe quand le portail rencontre un obstacle et ce que doit faire l'utilisateur (ou le système) pour qu'il reparte." },
    { t: "zone", q: "Q5", label: "Remise en mouvement après un obstacle", lignes: 3 },

    { t: "bandeau", id: "p3", titre: "4.4 Cahier des charges", comp: "SI-ANA-01", cr: "Résultats" },
    { t: "html", html: "<p>En exploitant les diagrammes de la rubrique « Cahier des charges » :</p>" },
    { t: "q", id: "Q6", lab: "Q6", bac: "**Citer** les solutions retenues par l'industriel pour assurer une résistance au milieu ambiant.", ref: "Dans le diagramme d'exigences, **trouve** l'exigence sur la résistance au milieu (pluie, température, poussière…) et **cite** les solutions techniques choisies." },
    { t: "zone", q: "Q6", label: "Solutions pour la résistance au milieu ambiant", lignes: 3 },
    { t: "q", id: "Q7", lab: "Q7", bac: "**Citer** les exigences fixées par l'industriel permettant d'assurer l'autonomie énergétique du système (ATTENTION : il faut consulter plusieurs diagrammes !).", ref: "**Relève** toutes les exigences (Id et nom) qui parlent d'énergie : panneau solaire, batterie, consommation… Elles sont réparties sur plusieurs diagrammes d'exigences." },
    { t: "zone", q: "Q7", label: "Exigences d'autonomie énergétique (Id et nom)", lignes: 4 },
    { t: "q", id: "Q8", lab: "Q8", bac: "**Citer** la caractéristique principale du mécanisme du système permettant d'empêcher l'intrusion d'une personne non autorisée.", ref: "**Trouve** dans les exigences ce qui empêche d'ouvrir le portail à la main de l'extérieur (une propriété du mécanisme moteur-réducteur-bielle)." },
    { t: "zone", q: "Q8", label: "Caractéristique anti-intrusion du mécanisme", lignes: 2 },
    { t: "q", id: "Q9", lab: "Q9", bac: "**Expliquer** comment l'ouverture manuelle est assurée.", ref: "En cas de panne, comment ouvre-t-on le portail à la main ? **Explique** (pense au système de déverrouillage de la vue éclatée)." },
    { t: "zone", q: "Q9", label: "Ouverture manuelle", lignes: 3 },
    { t: "q", id: "Q10", lab: "Q10", bac: "**Donner** l'ensemble des exigences (Id et Nom) faisant intervenir les passants.", ref: "**Relève** les exigences (Id et nom) qui parlent des passants / piétons (sécurité, détection…)." },
    { t: "zone", q: "Q10", label: "Exigences concernant les passants (Id et nom)", lignes: 3 },

    { t: "bandeau", id: "p4", titre: "4.5 Description structurelle", comp: "SI-ANA-03", cr: "Résultats" },
    { t: "q", id: "Q11", lab: "Q11", bac: "En exploitant les différents diagrammes de définition de blocs, et le dossier technique, **lister** les éléments qui constituent l'ouvre-portail.", ref: "Dans les diagrammes de définition de blocs (bdd), **recopie** les noms des blocs qui composent l'ouvre-portail." },
    { t: "zone", q: "Q11", label: "Éléments constituant l'ouvre-portail", lignes: 5 },
    { t: "q", id: "Q12", lab: "Q12", bac: "À partir du diagramme d'exigences « chaîne fonctionnelle », **associer** les éléments avec les fonctions décrites dans ces chaînes.", ref: "**Complète** le tableau : pour chaque fonction, le ou les éléments qui la réalisent, ou pour chaque élément, sa fonction (les cases déjà remplies t'aident)." },
    { t: "grille", q: "Q12", titre: "Éléments et fonctions de la chaîne fonctionnelle", entetes: ["Élément", "Fonction"], lignes: [
      [{ champ: "Q12_distribuer" }, "DISTRIBUER"],
      ["Panneau photovoltaïque, moteur", { champ: "Q12_panneau_moteur" }],
      [{ champ: "Q12_adapter" }, "ADAPTER"],
      [{ champ: "Q12_traiter" }, "TRAITER"],
      ["Batterie", { champ: "Q12_batterie" }],
      [{ champ: "Q12_communiquer" }, "COMMUNIQUER"],
      [{ champ: "Q12_acquerir" }, "ACQUÉRIR"]
    ] },
    { t: "html", html: "<p>En exploitant le diagramme de blocs interne « Déplacer les vantaux », et le dossier technique :</p>" },
    { t: "q", id: "Q13", lab: "Q13", bac: "**Placer** chaque élément du contexte (identifiés à la question 1) sur les ports de flux donnant sur l'extérieur du système. Si certains éléments n'ont pas leur place et/ou si certains ports ne sont attribués à aucun élément, **expliquer** pourquoi.", ref: "Sur l'ibd « Déplacer les vantaux », les petits carrés sur le bord sont des <b>ports</b> : **écris** en face de chacun l'élément du contexte (question 1) qui s'y connecte. **Explique** les éléments ou les ports qui restent sans correspondance." },
    { t: "zone", q: "Q13", label: "Ports ↔ éléments du contexte, et explication", lignes: 6, ph: "Port … : élément …" },
    { t: "diagramme", q: "Q14", lab: "Q14", titre: "Flux sur le diagramme de blocs interne « Déplacer les vantaux »",
      bac: "**Représenter** : par un trait rouge le flux de l'énergie transmise, dans le cas d'une utilisation motorisée ; par un trait bleu le flux d'informations pour une commande d'ouverture par télécommande ; et par un trait vert celui par passage d'un piéton.",
      ref: "**Reproduis** (ou capture) l'ibd « Déplacer les vantaux » du modèle SysML, puis **trace** : en <span style=\"color:#C62828\"><b>rouge</b></span> le chemin de l'énergie quand le moteur déplace les vantaux ; en <span style=\"color:#1565C0\"><b>bleu</b></span> le chemin de l'information quand on appuie sur la télécommande ; en <span style=\"color:#2E7D32\"><b>vert</b></span> le chemin de l'information quand un piéton passe. **Colle** une capture.",
      consigne: "<p class=\"petit\">Le diagramme de blocs interne se trouve dans le modèle Portail_SysML.html (fourni en classe) : fais une capture d'écran, colle-la dans draw.io ou un logiciel de dessin pour tracer les flux, puis dépose l'image ici.</p>",
      drawio: "../docs/drawio/SysML_symboles_depart.drawio" },

    { t: "autoeval", items: [
      "trouver l'information demandée dans le bon diagramme SysML (contexte, cas d'utilisation, exigences, bdd, ibd)",
      "identifier la matière d'œuvre et les acteurs d'un système",
      "relier les exigences aux composants et aux fonctions (chaîne fonctionnelle)",
      "tracer les flux d'énergie et d'information sur un diagramme de blocs interne"
    ] }
  ]
};
