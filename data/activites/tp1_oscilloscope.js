/* Mesurer des signaux à l'oscilloscope — 1re SI, S4 « Acquérir et transmettre l'information »
   Généré par Sequence_S4_Information/sources/build_td.py depuis contenu_td.py. Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
 "id": "tp1_oscilloscope",
 "oscilloscope": "m1",
 "fichier": "TP1_Oscilloscope_Virtuel",
 "court": "TP1 Oscilloscope virtuel · 1re SI",
 "sequence": "s4",
 "classe": "1re SI",
 "seq": "S4 · TP1",
 "titre": "Mesurer des signaux à l'oscilloscope",
 "sous": "Calibre, base de temps, déclenchement, curseurs : sinus, MLI, capteur à ultrasons, trame série",
 "blocs": [
  {
   "t": "encadre",
   "titre": "Situation",
   "html": "<p>L'oscilloscope est l'appareil qui permet de <b>voir</b> une tension qui varie dans le temps et de mesurer ses caractéristiques. On utilise l'<b>oscilloscope virtuel</b> du site SI : il se règle comme un vrai (calibre en V/div, base de temps en s/div, déclenchement, curseurs).</p><p>Ouvre-le depuis le site SI (séquence S4, onglet Activités, « Oscilloscope virtuel ») : <a href=\"../simulations/oscilloscope.html?signal=m1\" target=\"_blank\" rel=\"noopener\">ouvrir l'oscilloscope virtuel</a>. Le menu <b>Signal étudié</b> propose quatre signaux « mystère » dont les réglages sont cachés : à toi de les mesurer.</p><p class=\"pb\"><b>Problématique : comment régler un oscilloscope pour mesurer précisément les caractéristiques d'un signal ?</b></p>",
   "cls": ""
  },
  {
   "t": "encadre",
   "titre": "Méthode de réglage",
   "html": "<ul><li><b>Calibre</b> (V/div) : le signal doit occuper le plus de hauteur possible sans sortir de l'écran (8 carreaux).</li><li><b>Base de temps</b> (s/div) : afficher 1 à 3 motifs complets sur les 10 carreaux.</li><li><b>Déclenchement</b> : le niveau doit être compris entre le minimum et le maximum du signal, sinon l'image n'est pas stable.</li><li><b>Curseurs</b> : mode « temps » pour Δt (période, durée), mode « tension » pour ΔU.</li></ul>",
   "cls": "pouce"
  },
  {
   "t": "bandeau",
   "id": "p1",
   "titre": "1 — Signal 1 : tension sinusoïdale",
   "comp": "SI-EXP-07 · SI-MOD-09"
  },
  {
   "t": "q",
   "id": "Q1",
   "lab": "Q1",
   "bac": "Dans le menu « Signal étudié », **choisir** le signal 1. **Régler** le calibre de la voie 1 et la base de temps pour afficher deux périodes sur la plus grande hauteur possible. **Noter** les réglages retenus.",
   "ref": "**Choisis** « Signal 1 ». **Change** le calibre de la voie 1 jusqu'à ce que la courbe soit grande sans sortir de l'écran. **Change** la base de temps jusqu'à voir 2 motifs complets. **Écris** les deux réglages."
  },
  {
   "t": "grille",
   "q": "Q1",
   "titre": "Réglages retenus",
   "entetes": [
    "Calibre de la voie 1 (V/div)",
    "Base de temps (ms/div)"
   ],
   "lignes": [
    [
     {
      "champ": "Q1_cal"
     },
     {
      "champ": "Q1_bt"
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q2",
   "lab": "Q2",
   "bac": "**Mesurer** la période T avec les curseurs « temps », puis la valeur maximale U_{max} avec les curseurs « tension ». **En déduire** la fréquence f et la valeur efficace U_{eff}.",
   "ref": "a) Mode « temps » : **place** le curseur A sur le début d'un motif et B sur le début du suivant : Δt = T. b) Mode « tension » : A sur 0 V, B sur le sommet : ΔU = U_{max}. c) **Calcule** f = \\frac{1}{T} et U_{eff} = \\frac{U_{max}}{\\sqrt{2}}."
  },
  {
   "t": "tableau3",
   "titre": "Q2",
   "lignes": [
    {
     "id": "Q2a",
     "lab": "Q2 a",
     "grandeur": "Période (curseurs)",
     "sym": "T",
     "q": "Q2"
    },
    {
     "id": "Q2b",
     "lab": "Q2 b",
     "grandeur": "Valeur maximale (curseurs)",
     "sym": "U_{max}",
     "q": "Q2"
    },
    {
     "id": "Q2c",
     "lab": "Q2 c",
     "grandeur": "Fréquence",
     "sym": "f",
     "q": "Q2"
    },
    {
     "id": "Q2d",
     "lab": "Q2 d",
     "grandeur": "Valeur efficace",
     "sym": "U_{eff}",
     "q": "Q2"
    }
   ]
  },
  {
   "t": "bandeau",
   "id": "p2",
   "titre": "2 — Signal 2 : commande MLI d'un moteur",
   "comp": "SI-EXP-07 · SI-MOD-09"
  },
  {
   "t": "q",
   "id": "Q3",
   "lab": "Q3",
   "bac": "**Choisir** le signal 2 et **régler** l'oscilloscope. **Mesurer** la période T, la durée t_{H} de l'état haut et la tension haute U. **Calculer** f, le rapport cyclique α et la valeur moyenne U_{moy}.",
   "ref": "**Règle** calibre et base de temps pour voir 2 à 3 créneaux. Curseurs « temps » : T (d'un front montant au suivant) puis t_{H} (largeur d'un créneau). Curseurs « tension » : U. Puis f = \\frac{1}{T}, α = \\frac{t_{H}}{T}, U_{moy} = α × U."
  },
  {
   "t": "tableau3",
   "titre": "Q3",
   "lignes": [
    {
     "id": "Q3a",
     "lab": "Q3 a",
     "grandeur": "Période",
     "sym": "T",
     "q": "Q3"
    },
    {
     "id": "Q3b",
     "lab": "Q3 b",
     "grandeur": "Durée de l'état haut",
     "sym": "t_{H}",
     "q": "Q3"
    },
    {
     "id": "Q3c",
     "lab": "Q3 c",
     "grandeur": "Tension haute",
     "sym": "U",
     "q": "Q3"
    },
    {
     "id": "Q3d",
     "lab": "Q3 d",
     "grandeur": "Fréquence",
     "sym": "f",
     "q": "Q3"
    },
    {
     "id": "Q3e",
     "lab": "Q3 e",
     "grandeur": "Rapport cyclique",
     "sym": "α",
     "q": "Q3"
    },
    {
     "id": "Q3f",
     "lab": "Q3 f",
     "grandeur": "Valeur moyenne",
     "sym": "U_{moy}",
     "q": "Q3"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q4",
   "lab": "Q4",
   "bac": "La vitesse du moteur augmente avec la valeur moyenne de sa tension. **Indiquer** comment modifier le signal MLI pour que le moteur tourne plus vite, sans changer U.",
   "ref": "U_{moy} = α × U : si U ne change pas, quelle grandeur faut-il augmenter ? **Dis**-le avec les mots « état haut » et « période »."
  },
  {
   "t": "zone",
   "q": "Q4",
   "lignes": 2
  },
  {
   "t": "bandeau",
   "id": "p3",
   "titre": "3 — Signal 3 : sortie d'un capteur à ultrasons",
   "comp": "SI-MOD-09 · capteurs"
  },
  {
   "t": "encadre",
   "titre": "Rappel",
   "html": "<p>Le capteur à ultrasons délivre une impulsion dont la durée t est celle de l'aller-retour de l'onde : d = \\frac{v × t}{2}, avec v = 340 m/s.</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q5",
   "lab": "Q5",
   "bac": "**Choisir** le signal 3. **Mesurer** la durée t de l'impulsion et la période de mesure T. **En déduire** la distance d de l'obstacle.",
   "ref": "**Règle** la base de temps pour voir au moins 2 impulsions, puis **zoome** (base de temps plus petite) pour mesurer t précisément avec les curseurs. **Calcule** d = \\frac{340 × t}{2} avec t en secondes."
  },
  {
   "t": "tableau3",
   "titre": "Q5",
   "lignes": [
    {
     "id": "Q5a",
     "lab": "Q5 a",
     "grandeur": "Durée de l'impulsion",
     "sym": "t",
     "q": "Q5"
    },
    {
     "id": "Q5b",
     "lab": "Q5 b",
     "grandeur": "Période de mesure",
     "sym": "T",
     "q": "Q5"
    },
    {
     "id": "Q5c",
     "lab": "Q5 c",
     "grandeur": "Distance de l'obstacle",
     "sym": "d",
     "q": "Q5"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q6",
   "lab": "Q6",
   "bac": "**Passer** en mode libre, **choisir** pour la voie 1 un générateur « capteur à ultrasons » et **régler** une distance de 30 cm (seuil d'alerte d'un radar de recul). **Mesurer** la durée de l'impulsion et **vérifier** qu'elle est conforme à la relation d = \\frac{v × t}{2}.",
   "ref": "Mode libre → voie 1 → type « capteur à ultrasons » → distance 30 cm. **Mesure** t avec les curseurs, puis **calcule** t = \\frac{2 × d}{v} = \\frac{2 × 0,30}{340} et **compare**."
  },
  {
   "t": "zone",
   "q": "Q6",
   "lignes": 2
  },
  {
   "t": "bandeau",
   "id": "p4",
   "titre": "4 — Signal 4 : une trame série UART",
   "comp": "SI-EXP-07 · SI-MOD-09"
  },
  {
   "t": "encadre",
   "titre": "Format de la trame",
   "html": "<p>Au repos, la ligne est à 5 V (niveau 1). Chaque caractère : 1 bit de start (0), 8 bits de données (b_{0} en premier), 1 bit de parité paire, 1 bit de stop (1). Le déclenchement est réglé sur le <b>front descendant</b> du bit de start.</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q7",
   "lab": "Q7",
   "bac": "**Choisir** le signal 4. **Mesurer** la durée T_{bit} d'un bit et **en déduire** le débit D de la liaison en bit/s.",
   "ref": "**Règle** la base de temps pour bien séparer les bits. Curseurs « temps » sur le bit le plus court (un seul bit). D = \\frac{1}{T_{bit}} avec T_{bit} en secondes."
  },
  {
   "t": "tableau3",
   "titre": "Q7",
   "lignes": [
    {
     "id": "Q7a",
     "lab": "Q7 a",
     "grandeur": "Durée d'un bit",
     "sym": "T_{bit}",
     "q": "Q7"
    },
    {
     "id": "Q7b",
     "lab": "Q7 b",
     "grandeur": "Débit de la liaison",
     "sym": "D",
     "q": "Q7"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q8",
   "lab": "Q8",
   "bac": "**Relever** les 11 bits du premier caractère (à partir du start), **écrire** l'octet en hexadécimal et **identifier** le caractère (0x4B = K, 0x4F = O, 0x53 = S).",
   "ref": "À partir du front descendant (curseur A), **lis** un bit par durée T_{bit} : start, b_{0} … b_{7}, parité, stop. **Remets** b_{7} … b_{0} dans l'ordre, puis **convertis** en hexadécimal."
  },
  {
   "t": "grille",
   "q": "Q8",
   "titre": "Premier caractère",
   "entetes": [
    "Start",
    "b_{0}",
    "b_{1}",
    "b_{2}",
    "b_{3}",
    "b_{4}",
    "b_{5}",
    "b_{6}",
    "b_{7}",
    "P",
    "Stop"
   ],
   "lignes": [
    [
     {
      "champ": "Q8_b0"
     },
     {
      "champ": "Q8_b1"
     },
     {
      "champ": "Q8_b2"
     },
     {
      "champ": "Q8_b3"
     },
     {
      "champ": "Q8_b4"
     },
     {
      "champ": "Q8_b5"
     },
     {
      "champ": "Q8_b6"
     },
     {
      "champ": "Q8_b7"
     },
     {
      "champ": "Q8_b8"
     },
     {
      "champ": "Q8_b9"
     },
     {
      "champ": "Q8_b10"
     }
    ]
   ],
   "larg": "bits"
  },
  {
   "t": "zone",
   "q": "Q8",
   "lignes": 1
  },
  {
   "t": "q",
   "id": "Q9",
   "lab": "Q9",
   "bac": "**Calculer** le débit utile de cette liaison (seuls les 8 bits de données sont utiles).",
   "ref": "Sur 11 bits envoyés, 8 sont utiles : D_{utile} = D × \\frac{8}{11}."
  },
  {
   "t": "tableau3",
   "titre": "Q9",
   "lignes": [
    {
     "id": "Q9",
     "lab": "Q9",
     "grandeur": "Débit utile",
     "sym": "D_{utile}"
    }
   ]
  },
  {
   "t": "retenir",
   "items": [
    [
     "Choix du calibre",
     "ret_cal",
     "signal le plus haut possible sans sortir de l'écran"
    ],
    [
     "Choix de la base de temps",
     "ret_bt",
     "1 à 3 motifs sur l'écran"
    ],
    [
     "Niveau de déclenchement",
     "ret_dec",
     "entre le minimum et le maximum du signal"
    ],
    [
     "Débit d'une liaison série",
     "ret_D",
     "D = \\frac{1}{T_{bit}}"
    ]
   ]
  },
  {
   "t": "autoeval",
   "items": [
    "choisir un calibre et une base de temps",
    "mesurer une durée et une tension avec les curseurs",
    "calculer f, α et U_{moy}",
    "relever les bits d'une trame et son débit"
   ]
  }
 ]
};
