/* Numériser une mesure : CAN et numération — 1re SI, S4 « Acquérir et transmettre l'information »
   Généré par Sequence_S4_Information/sources/build_td.py depuis contenu_td.py. Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
 "id": "td2_can_numeration",
 "fichier": "TD2_CAN_Numeration",
 "court": "TD2 CAN et numération · 1re SI",
 "sequence": "s4",
 "classe": "1re SI",
 "seq": "S4 · TD2",
 "titre": "Numériser une mesure : CAN et numération",
 "sous": "Bases 2, 10 et 16 ; quantum, résolution ; numérisation de l'inclinomètre du robot anti-incendie",
 "blocs": [
  {
   "t": "encadre",
   "titre": "Situation",
   "html": "<p>Le microcontrôleur ne traite que des <b>nombres binaires</b>. Le <b>CAN</b> (convertisseur analogique-numérique) transforme la tension délivrée par le capteur en un nombre N codé sur n bits.</p><p class=\"pb\"><b>Problématique : la numérisation de l'inclinomètre du robot anti-incendie (TD1) permet-elle de connaître l'angle à mieux que 0,1° près, comme l'exige le cahier des charges ?</b></p>",
   "cls": ""
  },
  {
   "t": "encadre",
   "titre": "Méthode : changer de base",
   "html": "<ul><li><b>Base 2 → base 10</b> : additionner les poids des bits à 1 (… 128, 64, 32, 16, 8, 4, 2, 1). Ex. : (1011)_{2} = 8 + 2 + 1 = 11.</li><li><b>Base 10 → base 2</b> : divisions successives par 2 (on lit les restes de bas en haut), ou soustraction des puissances de 2.</li><li><b>Base 16</b> : chiffres 0 à 9 puis A = 10, B = 11, C = 12, D = 13, E = 14, F = 15. Poids : 1, 16, 256, 4 096. <b>1 chiffre hexadécimal = 4 bits</b> : (B6)_{16} = (1011 0110)_{2}.</li></ul>",
   "cls": "pouce"
  },
  {
   "t": "bandeau",
   "id": "p1",
   "titre": "1 — Numération",
   "comp": "SI-MOD-09"
  },
  {
   "t": "q",
   "id": "Q1",
   "lab": "Q1",
   "bac": "**Convertir** les nombres suivants dans la base demandée en **détaillant** les calculs.",
   "ref": "Pour chaque ligne, **utilise** la méthode ci-dessus et **écris** le calcul dans la colonne « Calcul détaillé » avant le résultat."
  },
  {
   "t": "grille",
   "q": "Q1",
   "titre": "Conversions",
   "entetes": [
    "Nombre",
    "Base d'arrivée",
    "Calcul détaillé",
    "Résultat"
   ],
   "lignes": [
    [
     "(110101)_{2}",
     "base 10",
     {
      "champ": "Q1_c1"
     },
     {
      "champ": "Q1_r1"
     }
    ],
    [
     "(120)_{10}",
     "base 2",
     {
      "champ": "Q1_c2"
     },
     {
      "champ": "Q1_r2"
     }
    ],
    [
     "(89)_{16}",
     "base 10",
     {
      "champ": "Q1_c3"
     },
     {
      "champ": "Q1_r3"
     }
    ],
    [
     "(749)_{10}",
     "base 16",
     {
      "champ": "Q1_c4"
     },
     {
      "champ": "Q1_r4"
     }
    ],
    [
     "(567)_{10}",
     "base 16",
     {
      "champ": "Q1_c5"
     },
     {
      "champ": "Q1_r5"
     }
    ],
    [
     "(4C1)_{16}",
     "base 2",
     {
      "champ": "Q1_c6"
     },
     {
      "champ": "Q1_r6"
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q2",
   "lab": "Q2",
   "bac": "**Déterminer** le nombre de valeurs différentes que l'on peut coder sur n bits et la plus grande valeur codable, pour n = 3, 8, 10 et 16.",
   "ref": "Avec n bits, on peut écrire 2^{n} nombres différents, de 0 à 2^{n} − 1. **Calcule** pour chaque ligne, puis **écris** la valeur maximale en hexadécimal (rappel : 4 bits = 1 chiffre hexadécimal)."
  },
  {
   "t": "grille",
   "q": "Q2",
   "titre": "Valeurs codables",
   "entetes": [
    "n (bits)",
    "Nombre de valeurs 2^{n}",
    "Valeur maximale 2^{n} − 1",
    "Valeur maximale en hexadécimal"
   ],
   "lignes": [
    [
     "3",
     {
      "champ": "Q2_v3",
      "num": true
     },
     {
      "champ": "Q2_m3",
      "num": true
     },
     {
      "champ": "Q2_h3"
     }
    ],
    [
     "8",
     {
      "champ": "Q2_v8",
      "num": true
     },
     {
      "champ": "Q2_m8",
      "num": true
     },
     {
      "champ": "Q2_h8"
     }
    ],
    [
     "10",
     {
      "champ": "Q2_v10",
      "num": true
     },
     {
      "champ": "Q2_m10",
      "num": true
     },
     {
      "champ": "Q2_h10"
     }
    ],
    [
     "16",
     {
      "champ": "Q2_v16",
      "num": true
     },
     {
      "champ": "Q2_m16",
      "num": true
     },
     {
      "champ": "Q2_h16"
     }
    ]
   ]
  },
  {
   "t": "bandeau",
   "id": "p2",
   "titre": "2 — Le CAN : quantum et code de sortie",
   "comp": "SI-MOD-09"
  },
  {
   "t": "encadre",
   "titre": "Un CAN de 3 bits",
   "html": "<p>On étudie d'abord un CAN de <b>n = 3 bits</b> dont la tension d'entrée U_{e} varie de <b>0 à 5 V</b> (plage = 5 V). Le <b>quantum</b> q est la plus petite variation de tension qui fait changer le code : q = \\frac{plage}{2^{n}}. Le code délivré est la partie entière : N = E(\\frac{U_{e}}{q}).</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q3",
   "lab": "Q3",
   "bac": "**Calculer** le quantum q de ce CAN.",
   "ref": "**Applique** q = \\frac{plage}{2^{n}} avec une plage de 5 V et n = 3 bits (2^{3} = 8)."
  },
  {
   "t": "tableau3",
   "titre": "Q3",
   "lignes": [
    {
     "id": "Q3",
     "lab": "Q3",
     "grandeur": "Quantum du CAN 3 bits",
     "sym": "q"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q4",
   "lab": "Q4",
   "bac": "**Compléter** le tableau : pour chaque code N, **donner** son écriture binaire b_{2} b_{1} b_{0} et la plus petite tension U_{e} qui donne ce code.",
   "ref": "Pour chaque ligne, **écris** N en binaire sur 3 bits, puis **calcule** U_{e} = N × q (avec q trouvé en Q3). La première ligne est faite."
  },
  {
   "t": "grille",
   "q": "Q4",
   "titre": "Codes du CAN 3 bits",
   "entetes": [
    "N (décimal)",
    "Binaire b_{2} b_{1} b_{0}",
    "Plus petite tension U_{e} (V)"
   ],
   "lignes": [
    [
     "0",
     {
      "txt": "000"
     },
     {
      "txt": "0"
     }
    ],
    [
     "1",
     {
      "champ": "Q4_b1"
     },
     {
      "champ": "Q4_u1",
      "num": true
     }
    ],
    [
     "2",
     {
      "champ": "Q4_b2"
     },
     {
      "champ": "Q4_u2",
      "num": true
     }
    ],
    [
     "3",
     {
      "champ": "Q4_b3"
     },
     {
      "champ": "Q4_u3",
      "num": true
     }
    ],
    [
     "4",
     {
      "champ": "Q4_b4"
     },
     {
      "champ": "Q4_u4",
      "num": true
     }
    ],
    [
     "5",
     {
      "champ": "Q4_b5"
     },
     {
      "champ": "Q4_u5",
      "num": true
     }
    ],
    [
     "6",
     {
      "champ": "Q4_b6"
     },
     {
      "champ": "Q4_u6",
      "num": true
     }
    ],
    [
     "7",
     {
      "champ": "Q4_b7"
     },
     {
      "champ": "Q4_u7",
      "num": true
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q5",
   "lab": "Q5",
   "bac": "**Déterminer** le code N délivré pour U_{e} = 2,2 V. **Indiquer** l'écart maximal possible entre la tension réelle et la tension N × q « vue » par le microcontrôleur.",
   "ref": "**Calcule** \\frac{2,2}{q} et **garde** la partie entière : c'est N. **Écris**-le en binaire. Puis **réfléchis** : entre deux marches de l'escalier, de combien la tension peut-elle varier sans que N change ?"
  },
  {
   "t": "tableau3",
   "titre": "Q5",
   "lignes": [
    {
     "id": "Q5",
     "lab": "Q5",
     "grandeur": "Code pour U_{e} = 2,2 V",
     "sym": "N"
    }
   ]
  },
  {
   "t": "zone",
   "q": "Q5",
   "lignes": 2
  },
  {
   "t": "bandeau",
   "id": "p3",
   "titre": "3 — CAN de deux appareils réels",
   "comp": "SI-MOD-09 · SI-EXP-07"
  },
  {
   "t": "q",
   "id": "Q6",
   "lab": "Q6",
   "bac": "Un multimètre numérique contient un CAN de 16 bits utilisé sur la gamme −20 V / +20 V. **Donner** la valeur numérique maximale de sortie (en base 10 et en base 2), puis **calculer** le quantum.",
   "ref": "Valeur maximale sur 16 bits : 2^{16} − 1 (Q2). La plage va de −20 V à +20 V : elle vaut donc 40 V. **Calcule** q = \\frac{40}{2^{16}} et **donne**-le en mV."
  },
  {
   "t": "tableau3",
   "titre": "Q6",
   "lignes": [
    {
     "id": "Q6a",
     "lab": "Q6 a",
     "grandeur": "Valeur maximale de sortie",
     "sym": "N_{max}",
     "q": "Q6"
    },
    {
     "id": "Q6b",
     "lab": "Q6 b",
     "grandeur": "Quantum sur la gamme ±20 V",
     "sym": "q",
     "q": "Q6"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q7",
   "lab": "Q7",
   "bac": "La carte Arduino possède un CAN de 10 bits, de plage 0 à 5 V. **Calculer** son quantum, la tension d'entrée correspondant à N = 317, puis le code N obtenu pour U_{e} = 2,22 V.",
   "ref": "a) q = \\frac{5}{2^{10}} (2^{10} = 1 024). b) Tension : U_{e} = N × q. c) Code : N = E(\\frac{U_{e}}{q}), on garde la partie entière."
  },
  {
   "t": "tableau3",
   "titre": "Q7",
   "lignes": [
    {
     "id": "Q7a",
     "lab": "Q7 a",
     "grandeur": "Quantum du CAN de l'Arduino",
     "sym": "q",
     "q": "Q7"
    },
    {
     "id": "Q7b",
     "lab": "Q7 b",
     "grandeur": "Tension pour N = 317",
     "sym": "U_{e}",
     "q": "Q7"
    },
    {
     "id": "Q7c",
     "lab": "Q7 c",
     "grandeur": "Code pour U_{e} = 2,22 V",
     "sym": "N",
     "q": "Q7"
    }
   ]
  },
  {
   "t": "bandeau",
   "id": "p4",
   "titre": "4 — Retour à la problématique : l'inclinomètre numérisé",
   "comp": "SI-MOD-09"
  },
  {
   "t": "encadre",
   "titre": "Données",
   "html": "<p>L'inclinomètre du TD1 (U_{S} = 2,5 + S × θ, avec S = 55,6 mV/°, pour θ de −45° à +45°) est relié à l'entrée A0 de l'Arduino (CAN 10 bits, 0 à 5 V, q = 4,88 mV). <b>Cahier des charges</b> : connaître l'angle à mieux que <b>0,1°</b> près.</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q8",
   "lab": "Q8",
   "bac": "**Calculer** la résolution angulaire Δθ de la mesure, c'est-à-dire la variation d'angle qui correspond à un quantum.",
   "ref": "Un quantum q = 4,88 mV correspond à une variation d'angle Δθ = \\frac{q}{S}. **Attention** aux unités : q et S doivent être tous les deux en mV (ou en V)."
  },
  {
   "t": "tableau3",
   "titre": "Q8",
   "lignes": [
    {
     "id": "Q8",
     "lab": "Q8",
     "grandeur": "Résolution angulaire",
     "sym": "Δθ"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q9",
   "lab": "Q9",
   "bac": "**Calculer** le code N transmis au microcontrôleur pour θ = +20° (U_{S} = 3,61 V, TD1), puis l'**écrire** en binaire et en hexadécimal.",
   "ref": "N = E(\\frac{U_{S}}{q}) avec U_{S} = 3,611 V et q = 0,004 883 V. Puis **convertis** N en binaire (10 bits) et en hexadécimal (groupes de 4 bits en partant de la droite)."
  },
  {
   "t": "grille",
   "q": "Q9",
   "titre": "Code pour θ = +20°",
   "entetes": [
    "Calcul de N",
    "N (décimal)",
    "N (binaire, 10 bits)",
    "N (hexadécimal)"
   ],
   "lignes": [
    [
     {
      "champ": "Q9_calc"
     },
     {
      "champ": "Q9_dec",
      "num": true
     },
     {
      "champ": "Q9_bin"
     },
     {
      "champ": "Q9_hex"
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q10",
   "lab": "Q10",
   "bac": "**Conclure** : le cahier des charges est-il respecté ? **Calculer** la résolution angulaire qu'on obtiendrait avec un CAN de 8 bits et **conclure** sur le nombre de bits nécessaire.",
   "ref": "**Compare** Δθ (Q8) à 0,1°. Puis **refais** le calcul avec 8 bits : q = \\frac{5}{256}, Δθ = \\frac{q}{S}. **Rédige** ta conclusion."
  },
  {
   "t": "zone",
   "q": "Q10",
   "lignes": 3
  },
  {
   "t": "retenir",
   "items": [
    [
     "Nombre de valeurs codables sur n bits",
     "ret_nb",
     "2^{n} (de 0 à 2^{n} − 1)"
    ],
    [
     "Quantum d'un CAN",
     "ret_q",
     "q = \\frac{plage}{2^{n}}"
    ],
    [
     "Code délivré par le CAN",
     "ret_N",
     "N = E(\\frac{U_{e}}{q})"
    ],
    [
     "Tension correspondant au code N",
     "ret_U",
     "U = N × q"
    ],
    [
     "1 chiffre hexadécimal",
     "ret_hex",
     "4 bits"
    ],
    [
     "Résolution d'une mesure (capteur + CAN)",
     "ret_res",
     "\\frac{q}{S}"
    ]
   ]
  },
  {
   "t": "autoeval",
   "items": [
    "convertir entre les bases 2, 10 et 16",
    "calculer le quantum d'un CAN",
    "trouver le code N d'une tension",
    "relier quantum, sensibilité et précision"
   ]
  }
 ]
};
