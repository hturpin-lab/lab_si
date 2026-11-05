/* Radar de recul : capteur à ultrasons et CAN — 1re SI, S4 « Acquérir et transmettre l'information »
   Généré par Sequence_S4_Information/sources/build_td.py depuis contenu_td.py. Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
 "id": "tp2_radar_recul",
 "fichier": "TP2_Radar_Recul",
 "court": "TP2 Radar de recul · 1re SI",
 "sequence": "s4",
 "classe": "1re SI",
 "seq": "S4 · TP2",
 "titre": "Radar de recul : capteur à ultrasons et CAN",
 "sous": "Simulation Arduino sous Tinkercad : temps de vol, distance, seuils d'alerte, numérisation d'une température",
 "blocs": [
  {
   "t": "encadre",
   "titre": "Situation",
   "html": "<p>Le radar de recul d'une voiture mesure la distance aux obstacles avec des capteurs à <b>ultrasons</b> et prévient le conducteur : bips de plus en plus rapides, puis son continu en dessous de 30 cm. On le simule avec une carte Arduino dans <b>Tinkercad Circuits</b>.</p><p>Ouvre le circuit « Radar de recul » de la classe Tinkercad (lien donné par le professeur). Le circuit est déjà câblé : capteur HC-SR04 (TRIG sur 9, ECHO sur 10), buzzer sur 8, LED verte, jaune et rouge sur 5, 6 et 7, capteur de température TMP36 sur A0.</p><p class=\"pb\"><b>Problématique : comment le radar transforme-t-il un temps de vol en distance, puis en alerte pour le conducteur ?</b></p>",
   "cls": ""
  },
  {
   "t": "bandeau",
   "id": "pA",
   "titre": "A — Acquérir la distance",
   "comp": "SI-MOD-09 · capteurs"
  },
  {
   "t": "q",
   "id": "Q1",
   "lab": "Q1",
   "bac": "**Compléter** le tableau en associant chaque composant du circuit à la fonction qu'il réalise dans la chaîne d'information (acquérir, traiter, communiquer).",
   "ref": "Acquérir = mesurer une grandeur physique ; traiter = calculer, décider ; communiquer = informer l'utilisateur ou un autre système. **Écris** la fonction de chaque composant."
  },
  {
   "t": "grille",
   "q": "Q1",
   "titre": "Chaîne d'information du radar",
   "entetes": [
    "Composant",
    "Fonction (acquérir, traiter, communiquer)"
   ],
   "lignes": [
    [
     "Capteur à ultrasons HC-SR04",
     {
      "champ": "Q1_f1"
     }
    ],
    [
     "Carte Arduino Uno",
     {
      "champ": "Q1_f2"
     }
    ],
    [
     "Buzzer et LED",
     {
      "champ": "Q1_f3"
     }
    ],
    [
     "Moniteur série",
     {
      "champ": "Q1_f4"
     }
    ]
   ]
  },
  {
   "t": "encadre",
   "titre": "Le programme de départ",
   "html": "<pre class=\"code\">// Radar de recul - 1re SI (S4) - code de départ\nconst int TRIG = 9, ECHO = 10, BUZZER = 8;\nconst int LED_V = 5, LED_J = 6, LED_R = 7;\n\nvoid setup() {\n  Serial.begin(9600);\n  pinMode(TRIG, OUTPUT);  pinMode(ECHO, INPUT);\n  pinMode(BUZZER, OUTPUT);\n  pinMode(LED_V, OUTPUT); pinMode(LED_J, OUTPUT); pinMode(LED_R, OUTPUT);\n}\n\nvoid loop() {\n  // 1. Déclencher une mesure : impulsion de 10 µs sur TRIG\n  digitalWrite(TRIG, LOW);  delayMicroseconds(2);\n  digitalWrite(TRIG, HIGH); delayMicroseconds(10);\n  digitalWrite(TRIG, LOW);\n  // 2. Mesurer la durée t de l'écho, en microsecondes\n  unsigned long t = pulseIn(ECHO, HIGH);\n  // 3. Calculer la distance d en cm (A COMPLETER, partie A)\n  float d = 0;\n  Serial.print(\"t = \"); Serial.print(t);\n  Serial.print(\" us   d = \"); Serial.print(d); Serial.println(\" cm\");\n  // 4. Alerter le conducteur (A COMPLETER, partie B)\n\n  delay(100);\n}</pre>",
   "cls": "code-encadre"
  },
  {
   "t": "q",
   "id": "Q2",
   "lab": "Q2",
   "bac": "La vitesse du son vaut v = 340 m/s. **Convertir** cette vitesse en cm/µs, puis **exprimer** la distance d (en cm) en fonction de la durée t de l'écho (en µs).",
   "ref": "340 m/s = 34 000 cm par seconde, et 1 s = 1 000 000 µs. **Divise** pour obtenir des cm/µs. L'onde fait un aller-retour : d = \\frac{v × t}{2}."
  },
  {
   "t": "tableau3",
   "titre": "Q2",
   "lignes": [
    {
     "id": "Q2a",
     "lab": "Q2 a",
     "grandeur": "Vitesse du son en cm/µs",
     "sym": "v",
     "q": "Q2"
    },
    {
     "id": "Q2b",
     "lab": "Q2 b",
     "grandeur": "Distance en fonction de t",
     "sym": "d",
     "q": "Q2"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q3",
   "lab": "Q3",
   "bac": "**Compléter** la ligne <b>float d = …</b> du programme, **lancer** la simulation puis **placer** l'obstacle à 50 cm, 100 cm et 200 cm. **Relever** t et d dans le moniteur série et **comparer** à la durée théorique.",
   "ref": "**Remplace** <b>float d = 0;</b> par <b>float d = t * 0.034 / 2;</b>. **Démarre** la simulation, **clique** sur le capteur et **déplace** le rond (l'obstacle). **Ouvre** le moniteur série et **note** t et d. Durée théorique : t = \\frac{2 × d}{0,034}."
  },
  {
   "t": "grille",
   "q": "Q3",
   "titre": "Mesures dans le moniteur série",
   "entetes": [
    "Obstacle (cm)",
    "t lu (µs)",
    "d affichée (cm)",
    "t théorique (µs)"
   ],
   "lignes": [
    [
     "50",
     {
      "champ": "Q3_t50",
      "num": true
     },
     {
      "champ": "Q3_d50",
      "num": true
     },
     {
      "champ": "Q3_th50",
      "num": true
     }
    ],
    [
     "100",
     {
      "champ": "Q3_t100",
      "num": true
     },
     {
      "champ": "Q3_d100",
      "num": true
     },
     {
      "champ": "Q3_th100",
      "num": true
     }
    ],
    [
     "200",
     {
      "champ": "Q3_t200",
      "num": true
     },
     {
      "champ": "Q3_d200",
      "num": true
     },
     {
      "champ": "Q3_th200",
      "num": true
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q4",
   "lab": "Q4",
   "bac": "La documentation du HC-SR04 donne une étendue de mesure de 2 cm à 400 cm. **Calculer** la durée de l'écho pour ces deux limites.",
   "ref": "t = \\frac{2 × d}{v} avec v = 0,034 cm/µs : **calcule** pour d = 2 cm puis pour d = 400 cm."
  },
  {
   "t": "tableau3",
   "titre": "Q4",
   "lignes": [
    {
     "id": "Q4a",
     "lab": "Q4 a",
     "grandeur": "Écho pour d = 2 cm",
     "sym": "t",
     "q": "Q4"
    },
    {
     "id": "Q4b",
     "lab": "Q4 b",
     "grandeur": "Écho pour d = 400 cm",
     "sym": "t",
     "q": "Q4"
    }
   ]
  },
  {
   "t": "bandeau",
   "id": "pB",
   "titre": "B — Traiter et alerter",
   "comp": "SI-MOD-09"
  },
  {
   "t": "encadre",
   "titre": "Cahier des charges de l'alerte",
   "html": "<ul><li>d ≥ 100 cm : LED verte allumée, buzzer muet.</li><li>30 cm ≤ d &lt; 100 cm : LED jaune allumée, bip court (buzzer 100 ms) à chaque mesure.</li><li>d &lt; 30 cm : LED rouge allumée, son continu.</li></ul><p>Instructions utiles : <b>digitalWrite(LED_V, HIGH);</b> allume la LED verte ; <b>tone(BUZZER, 1000);</b> fait sonner le buzzer à 1 000 Hz ; <b>noTone(BUZZER);</b> l'arrête.</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q5",
   "lab": "Q5",
   "bac": "**Compléter** la partie 4 du programme pour respecter le cahier des charges, puis **tester** les trois zones en déplaçant l'obstacle. **Recopier** ton code ci-dessous.",
   "ref": "**Utilise** une structure <b>if … else if … else</b> sur d. Dans chaque cas : **éteins** les deux autres LED, **allume** la bonne, puis **commande** le buzzer. **Teste** à 150 cm, 60 cm et 20 cm."
  },
  {
   "t": "zone",
   "q": "Q5",
   "lignes": 9,
   "ph": "if (d >= 100) { … }"
  },
  {
   "t": "q",
   "id": "Q6",
   "lab": "Q6",
   "bac": "**Indiquer** la nature (logique ou analogique) de chaque signal et **préciser** où se trouve l'information pour le signal ECHO.",
   "ref": "Logique = 2 niveaux seulement (0 V ou 5 V). Pour ECHO, l'information (la distance) n'est pas dans la tension : **dis** dans quoi elle se trouve."
  },
  {
   "t": "grille",
   "q": "Q6",
   "titre": "Nature des signaux",
   "entetes": [
    "Signal",
    "Nature",
    "Où est l'information ?"
   ],
   "lignes": [
    [
     "TRIG (broche 9)",
     {
      "champ": "Q6_n1"
     },
     {
      "champ": "Q6_i1"
     }
    ],
    [
     "ECHO (broche 10)",
     {
      "champ": "Q6_n2"
     },
     {
      "champ": "Q6_i2"
     }
    ],
    [
     "Sortie du TMP36 (A0)",
     {
      "champ": "Q6_n3"
     },
     {
      "champ": "Q6_i3"
     }
    ]
   ]
  },
  {
   "t": "bandeau",
   "id": "pC",
   "titre": "C — Numériser une température : le CAN de l'Arduino",
   "comp": "SI-MOD-09"
  },
  {
   "t": "encadre",
   "titre": "Le capteur TMP36",
   "html": "<p>Le TMP36 délivre U = 0,5 + 0,01 × T (U en V, T en °C). L'Arduino le lit sur A0 avec son CAN de <b>10 bits</b>, plage 0 à 5 V : <b>N = analogRead(A0);</b> donne un nombre entier de 0 à 1 023.</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q7",
   "lab": "Q7",
   "bac": "**Ajouter** au programme l'affichage de N = analogRead(A0) dans le moniteur série. **Régler** le TMP36 sur 25 °C, **relever** N et **comparer** à la valeur attendue.",
   "ref": "**Ajoute** : <b>int N = analogRead(A0); Serial.println(N);</b>. **Clique** sur le TMP36 et **règle** 25 °C. Valeur attendue : U = 0,5 + 0,01 × 25, puis N = E(\\frac{U}{q}) avec q = \\frac{5}{1 024}."
  },
  {
   "t": "tableau3",
   "titre": "Q7",
   "lignes": [
    {
     "id": "Q7a",
     "lab": "Q7 a",
     "grandeur": "Tension du capteur à 25 °C",
     "sym": "U",
     "q": "Q7"
    },
    {
     "id": "Q7b",
     "lab": "Q7 b",
     "grandeur": "Code N attendu",
     "sym": "N",
     "q": "Q7"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q8",
   "lab": "Q8",
   "bac": "**Calculer** la température que l'Arduino peut retrouver à partir de N = 153, puis la plus petite variation de température qu'il peut détecter (résolution).",
   "ref": "U = N × q, puis T = \\frac{U − 0,5}{0,01}. Résolution : un quantum q correspond à \\frac{q}{0,01} °C."
  },
  {
   "t": "tableau3",
   "titre": "Q8",
   "lignes": [
    {
     "id": "Q8a",
     "lab": "Q8 a",
     "grandeur": "Température retrouvée",
     "sym": "T",
     "q": "Q8"
    },
    {
     "id": "Q8b",
     "lab": "Q8 b",
     "grandeur": "Résolution en température",
     "sym": "ΔT",
     "q": "Q8"
    }
   ]
  },
  {
   "t": "retenir",
   "items": [
    [
     "Distance mesurée par ultrasons",
     "ret_d",
     "d = \\frac{v × t}{2}"
    ],
    [
     "Vitesse du son",
     "ret_v",
     "340 m/s = 0,034 cm/µs"
    ],
    [
     "Code du CAN de l'Arduino",
     "ret_N",
     "N = E(\\frac{U}{q}), q = \\frac{5}{1 024} ≈ 4,88 mV"
    ],
    [
     "Signal ECHO",
     "ret_echo",
     "logique : l'information est dans la durée"
    ]
   ]
  },
  {
   "t": "autoeval",
   "items": [
    "relier temps de vol et distance",
    "compléter un programme Arduino",
    "tester un cahier des charges",
    "relier N, U et la grandeur mesurée"
   ]
  }
 ]
};
