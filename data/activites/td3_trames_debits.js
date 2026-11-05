/* Trames et débits : le télescope connecté — 1re SI, S4 « Acquérir et transmettre l'information »
   Généré par Sequence_S4_Information/sources/build_td.py depuis contenu_td.py. Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
 "id": "td3_trames_debits",
 "fichier": "TD3_Trames_Debits",
 "court": "TD3 Trames et débits · 1re SI",
 "sequence": "s4",
 "classe": "1re SI",
 "seq": "S4 · TD3",
 "titre": "Trames et débits : le télescope connecté",
 "sous": "Liaison série UART, parité, supports, encapsulation, débit maximal et débit utile, Wi-Fi / Bluetooth / LoRa",
 "blocs": [
  {
   "t": "encadre",
   "titre": "Situation",
   "html": "<p>Un télescope connecté (inspiré du sujet E3C SI-N°01-02) photographie le ciel et envoie les images au smartphone de l'utilisateur. À l'intérieur, le processeur dialogue avec ses modules radio par des <b>liaisons série</b> (figure 1).</p><p class=\"pb\"><b>Problématique : quelle liaison choisir pour transmettre une image en moins de 1 s, comme l'exige le cahier des charges ?</b></p>",
   "cls": ""
  },
  {
   "t": "figure",
   "id": "fig1",
   "src": "../assets/img/s4_td3_telescope.png",
   "alt": "Schéma : capteur d'image, processeur, modules Wi-Fi, Bluetooth et LoRa reliés par fil au processeur, liaisons radio vers le smartphone et la passerelle LoRa.",
   "legende": "Figure 1 – Chaîne d'information du télescope connecté.",
   "largeur": "96%"
  },
  {
   "t": "methode",
   "html": "<b>Méthode :</b> chaque calcul se fait en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Calculatrice autorisée."
  },
  {
   "t": "bandeau",
   "id": "pA",
   "titre": "A — Décoder une trame série UART",
   "comp": "SI-EXP-07 · SI-MOD-09"
  },
  {
   "t": "ligne",
   "blocs": [
    {
     "t": "encadre",
     "titre": "Format de la liaison UART",
     "html": "<ul><li>Débit : <b>9 600 bit/s</b> ; au repos, la ligne est au niveau 1.</li><li><b>1 bit de start</b> (0), puis <b>8 bits de données</b>, le bit de poids faible b_{0} en premier.</li><li><b>1 bit de parité paire</b> P : le nombre total de 1 (données + P) est pair.</li><li><b>1 bit de stop</b> (1).</li></ul>",
     "cls": ""
    },
    {
     "t": "html",
     "html": "<p><b>Extrait de la table ASCII</b></p><div class=\"tab-wrap\"><table class=\"grille ascii\"><thead><tr><th>Hexa</th><th>43</th><th>47</th><th>49</th><th>4B</th><th>4F</th><th>53</th><th>54</th><th>57</th></tr></thead><tbody><tr><td class=\"fixe\">Caractère</td><td>C</td><td>G</td><td>I</td><td>K</td><td>O</td><td>S</td><td>T</td><td>W</td></tr></tbody></table></div>"
    }
   ]
  },
  {
   "t": "figure",
   "id": "fig2",
   "src": "../assets/img/s4_td3_trames_uart.png",
   "alt": "Chronogrammes de deux trames UART : niveau 1 au repos, bit de start à 0, 8 bits de données, bit de parité, bit de stop.",
   "legende": "Figure 2 – Deux trames relevées entre le processeur et le module Wi-Fi.",
   "largeur": "90%"
  },
  {
   "t": "q",
   "id": "Q1",
   "lab": "Q1",
   "bac": "**Repérer** sur chaque trame de la figure 2 le bit de start, les 8 bits de données, le bit de parité et le bit de stop, puis **relever** la valeur de chaque bit.",
   "ref": "Après le repos (niveau 1), le premier 0 est le <b>start</b>. Viennent ensuite b_{0}, b_{1} … b_{7}, puis la parité P, puis le stop (1). Chaque colonne de la figure dure un bit. **Écris** 0 ou 1 dans chaque case du tableau."
  },
  {
   "t": "grille",
   "q": "Q1",
   "titre": "Bits des deux trames",
   "entetes": [
    "Trame",
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
     "Trame 1",
     {
      "champ": "Q1_1_0"
     },
     {
      "champ": "Q1_1_1"
     },
     {
      "champ": "Q1_1_2"
     },
     {
      "champ": "Q1_1_3"
     },
     {
      "champ": "Q1_1_4"
     },
     {
      "champ": "Q1_1_5"
     },
     {
      "champ": "Q1_1_6"
     },
     {
      "champ": "Q1_1_7"
     },
     {
      "champ": "Q1_1_8"
     },
     {
      "champ": "Q1_1_9"
     },
     {
      "champ": "Q1_1_10"
     }
    ],
    [
     "Trame 2",
     {
      "champ": "Q1_2_0"
     },
     {
      "champ": "Q1_2_1"
     },
     {
      "champ": "Q1_2_2"
     },
     {
      "champ": "Q1_2_3"
     },
     {
      "champ": "Q1_2_4"
     },
     {
      "champ": "Q1_2_5"
     },
     {
      "champ": "Q1_2_6"
     },
     {
      "champ": "Q1_2_7"
     },
     {
      "champ": "Q1_2_8"
     },
     {
      "champ": "Q1_2_9"
     },
     {
      "champ": "Q1_2_10"
     }
    ]
   ],
   "larg": "bits"
  },
  {
   "t": "q",
   "id": "Q2",
   "lab": "Q2",
   "bac": "**Écrire** l'octet de chaque trame en binaire (poids fort b_{7} à gauche) puis en hexadécimal, et **identifier** le caractère ASCII transmis.",
   "ref": "Attention : b_{0} arrive en premier mais s'écrit <b>à droite</b>. **Recopie** b_{7} b_{6} … b_{0}, **coupe** en deux groupes de 4 bits, **convertis** chaque groupe en un chiffre hexadécimal, puis **cherche** le caractère dans la table ASCII."
  },
  {
   "t": "grille",
   "q": "Q2",
   "titre": "Octets transmis",
   "entetes": [
    "Trame",
    "Octet b_{7} … b_{0}",
    "Hexadécimal",
    "Caractère"
   ],
   "lignes": [
    [
     "Trame 1",
     {
      "champ": "Q2_b1"
     },
     {
      "champ": "Q2_h1"
     },
     {
      "champ": "Q2_c1"
     }
    ],
    [
     "Trame 2",
     {
      "champ": "Q2_b2"
     },
     {
      "champ": "Q2_h2"
     },
     {
      "champ": "Q2_c2"
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q3",
   "lab": "Q3",
   "bac": "**Vérifier** que le bit de parité de chaque trame est correct.",
   "ref": "**Compte** les 1 parmi les 8 bits de données. Parité paire : si ce nombre est pair, P doit valoir 0 ; s'il est impair, P doit valoir 1. **Compare** avec le P relevé en Q1."
  },
  {
   "t": "zone",
   "q": "Q3",
   "lignes": 2
  },
  {
   "t": "q",
   "id": "Q4",
   "lab": "Q4",
   "bac": "**Calculer** la durée T_{bit} d'un bit, la durée de transmission d'un caractère, puis le débit utile de la liaison.",
   "ref": "T_{bit} = \\frac{1}{D} avec D = 9 600 bit/s. Un caractère occupe 1 + 8 + 1 + 1 = 11 bits, mais seuls 8 sont des données : D_{utile} = D × \\frac{8}{11}."
  },
  {
   "t": "tableau3",
   "titre": "Q4",
   "lignes": [
    {
     "id": "Q4a",
     "lab": "Q4 a",
     "grandeur": "Durée d'un bit",
     "sym": "T_{bit}",
     "q": "Q4"
    },
    {
     "id": "Q4b",
     "lab": "Q4 b",
     "grandeur": "Durée d'un caractère (11 bits)",
     "sym": "t",
     "q": "Q4"
    },
    {
     "id": "Q4c",
     "lab": "Q4 c",
     "grandeur": "Débit utile de la liaison",
     "sym": "D_{utile}",
     "q": "Q4"
    }
   ]
  },
  {
   "t": "bandeau",
   "id": "pB",
   "titre": "B — Supports, protocoles, encapsulation",
   "comp": "SI-ANA-09"
  },
  {
   "t": "q",
   "id": "Q5",
   "lab": "Q5",
   "bac": "**Classer** les liaisons du télescope (figure 1) selon leur support, puis **citer** un avantage et un inconvénient de chaque type de support.",
   "ref": "Un support <b>filaire</b> utilise des fils ou des pistes ; un support <b>sans fil</b> utilise des ondes radio. **Complète** le tableau, puis **écris** un avantage et un inconvénient de chaque type."
  },
  {
   "t": "grille",
   "q": "Q5",
   "titre": "Supports des liaisons",
   "entetes": [
    "Liaison",
    "Support (filaire ou sans fil)"
   ],
   "lignes": [
    [
     "Processeur → module Wi-Fi (UART)",
     {
      "champ": "Q5_s1"
     }
    ],
    [
     "Télescope → smartphone (Wi-Fi ou Bluetooth)",
     {
      "champ": "Q5_s2"
     }
    ],
    [
     "Capteur d'image → processeur",
     {
      "champ": "Q5_s3"
     }
    ],
    [
     "Module LoRa → passerelle",
     {
      "champ": "Q5_s4"
     }
    ]
   ]
  },
  {
   "t": "zone",
   "q": "Q5",
   "lignes": 3
  },
  {
   "t": "q",
   "id": "Q6",
   "lab": "Q6",
   "bac": "**Définir** ce qu'est un protocole de communication.",
   "ref": "Pour que le télescope et le smartphone se comprennent, ils doivent suivre les mêmes règles. **Écris** une définition et **cite** deux de ces règles (pense à la liaison UART de la partie A)."
  },
  {
   "t": "zone",
   "q": "Q6",
   "lignes": 2
  },
  {
   "t": "encadre",
   "titre": "Encapsulation",
   "html": "<p>En Wi-Fi, l'image est découpée en paquets. Chaque couche ajoute son en-tête (TCP, puis IP, puis Wi-Fi) : c'est l'<b>encapsulation</b>. Une trame Wi-Fi transporte <b>1 460 octets de données utiles</b> et <b>82 octets</b> d'en-têtes et de contrôle (TCP 20, IP 20, LLC 8, MAC 30, contrôle FCS 4).</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q7",
   "lab": "Q7",
   "bac": "**Calculer** la part des données utiles dans une trame Wi-Fi, puis le nombre de trames nécessaires pour une image de 3,5 Mo (1 Mo = 10^{6} octets).",
   "ref": "a) Part utile = \\frac{octets utiles}{octets de la trame} avec 1 460 + 82 octets dans la trame : **donne**-la en %. b) Nombre de trames = \\frac{3 500 000}{1 460}, **arrondi** à l'entier supérieur."
  },
  {
   "t": "tableau3",
   "titre": "Q7",
   "lignes": [
    {
     "id": "Q7a",
     "lab": "Q7 a",
     "grandeur": "Part des données utiles",
     "sym": "η",
     "q": "Q7"
    },
    {
     "id": "Q7b",
     "lab": "Q7 b",
     "grandeur": "Nombre de trames pour l'image",
     "sym": "n",
     "q": "Q7"
    }
   ]
  },
  {
   "t": "bandeau",
   "id": "pC",
   "titre": "C — Choisir une liaison (étude de cas type E3C)",
   "comp": "SI-MOD-09 · SI-ANA-09"
  },
  {
   "t": "encadre",
   "titre": "Données",
   "html": "<p>Capteur d'image : <b>3 096 × 2 080 pixels</b>, <b>3 octets par pixel</b>. Image compressée au format JPEG : <b>3,5 Mo</b> (1 Mo = 10^{6} octets ; 1 octet = 8 bits). <b>Cahier des charges</b> : une image JPEG transmise au smartphone en <b>moins de 1 s</b>.</p>",
   "cls": ""
  },
  {
   "t": "html",
   "html": "<div class=\"tab-wrap\"><table class=\"grille\"><thead><tr><th>Liaison</th><th>Débit maximal</th><th>Débit utile mesuré</th><th>Portée</th><th>Consommation</th></tr></thead><tbody><tr><td class=\"fixe\">Bluetooth 4.1</td><td>3 Mbit/s</td><td>2,1 Mbit/s</td><td>10 m</td><td>faible</td></tr><tr><td class=\"fixe\">Wi-Fi 802.11n</td><td>72,2 Mbit/s</td><td>40 Mbit/s</td><td>50 m (intérieur)</td><td>élevée</td></tr><tr><td class=\"fixe\">LoRa (SF7, 125 kHz)</td><td>5,47 kbit/s</td><td>5,47 kbit/s</td><td>2 à 15 km</td><td>très faible</td></tr></tbody></table></div>"
  },
  {
   "t": "q",
   "id": "Q8",
   "lab": "Q8",
   "bac": "**Calculer** la taille de l'image brute (non compressée) en octets puis en Mbit, ainsi que la taille de l'image JPEG en Mbit.",
   "ref": "Image brute : nombre de pixels × 3 octets. Pour passer en bits : × 8. 1 Mbit = 10^{6} bits. Image JPEG : 3,5 × 10^{6} octets × 8."
  },
  {
   "t": "tableau3",
   "titre": "Q8",
   "lignes": [
    {
     "id": "Q8a",
     "lab": "Q8 a",
     "grandeur": "Taille de l'image brute",
     "sym": "T_{brute}",
     "q": "Q8"
    },
    {
     "id": "Q8b",
     "lab": "Q8 b",
     "grandeur": "Taille de l'image brute en Mbit",
     "sym": "T_{brute}",
     "q": "Q8"
    },
    {
     "id": "Q8c",
     "lab": "Q8 c",
     "grandeur": "Taille de l'image JPEG en Mbit",
     "sym": "T_{JPEG}",
     "q": "Q8"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q9",
   "lab": "Q9",
   "bac": "**Calculer** la durée de transmission de l'image JPEG avec chacune des trois liaisons, en utilisant le débit utile.",
   "ref": "Durée = \\frac{taille en bits}{débit utile en bit/s}. **Attention** : 28 Mbit = 28 000 000 bits ; 2,1 Mbit/s = 2 100 000 bit/s ; 5,47 kbit/s = 5 470 bit/s."
  },
  {
   "t": "tableau3",
   "titre": "Q9",
   "lignes": [
    {
     "id": "Q9a",
     "lab": "Q9 a",
     "grandeur": "Durée en Bluetooth",
     "sym": "t_{BT}",
     "q": "Q9"
    },
    {
     "id": "Q9b",
     "lab": "Q9 b",
     "grandeur": "Durée en Wi-Fi",
     "sym": "t_{Wi-Fi}",
     "q": "Q9"
    },
    {
     "id": "Q9c",
     "lab": "Q9 c",
     "grandeur": "Durée en LoRa",
     "sym": "t_{LoRa}",
     "q": "Q9"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q10",
   "lab": "Q10",
   "bac": "**Expliquer** pourquoi le calcul utilise le débit utile et non le débit maximal.",
   "ref": "Le débit maximal compte tous les bits envoyés. Sont-ils tous des bits de l'image ? **Pense** aux en-têtes de la partie B et aux temps d'attente entre deux trames."
  },
  {
   "t": "zone",
   "q": "Q10",
   "lignes": 2
  },
  {
   "t": "q",
   "id": "Q11",
   "lab": "Q11",
   "bac": "**Conclure** : quelle liaison respecte le cahier des charges pour l'image ? Le télescope doit aussi envoyer, toutes les 10 min, un message d'état de 25 octets (12 octets de mesures + 13 octets d'en-tête et de contrôle) à une passerelle située à 3 km. **Choisir**, en le **justifiant**, la liaison adaptée à ce message.",
   "ref": "a) **Compare** les trois durées de la Q9 à 1 s. b) Pour le message d'état, **regarde** la portée (3 km), la consommation et **calcule** sa durée en LoRa : t = \\frac{25 × 8}{5 470}."
  },
  {
   "t": "zone",
   "q": "Q11",
   "lignes": 4
  },
  {
   "t": "retenir",
   "items": [
    [
     "Trame",
     "ret_trame",
     "en-tête + données utiles + contrôle"
    ],
    [
     "Durée d'un bit",
     "ret_tb",
     "T_{bit} = \\frac{1}{D}"
    ],
    [
     "Durée de transmission",
     "ret_t",
     "t = \\frac{taille (bits)}{D_{utile} (bit/s)}"
    ],
    [
     "Débit utile d'une trame série",
     "ret_du",
     "D_{utile} = D × \\frac{bits de données}{bits de la trame}"
    ],
    [
     "Parité paire",
     "ret_par",
     "nombre de 1 (données + P) pair"
    ],
    [
     "1 octet",
     "ret_oct",
     "8 bits"
    ]
   ]
  },
  {
   "t": "autoeval",
   "items": [
    "décoder une trame UART (start, données, parité, stop)",
    "convertir un octet en hexadécimal et en caractère ASCII",
    "calculer une durée de transmission et un débit utile",
    "choisir un support selon le débit, la portée et la consommation"
   ]
  }
 ]
};
