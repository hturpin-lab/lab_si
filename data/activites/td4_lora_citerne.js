/* Une citerne connectée en LoRaWAN — 1re SI, S4 « Acquérir et transmettre l'information »
   Généré par Sequence_S4_Information/sources/build_td.py depuis contenu_td.py. Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
 "id": "td4_lora_citerne",
 "fichier": "TD4_LoRa_Citerne",
 "court": "TD4 Objet connecté LoRa · 1re SI",
 "sequence": "s4",
 "classe": "1re SI",
 "seq": "S4 · TD4",
 "titre": "Une citerne connectée en LoRaWAN",
 "sous": "Objet connecté : chaîne d'information, décodage des données utiles, durée d'émission, débit utile, règle des 1 %",
 "blocs": [
  {
   "t": "encadre",
   "titre": "Situation",
   "html": "<p>Dans une exploitation agricole de l'Est de La Réunion, une citerne de récupération d'eau de pluie alimente l'irrigation. Un <b>capteur connecté</b>, alimenté par pile, mesure le niveau d'eau toutes les 10 minutes et l'envoie par radio <b>LoRa</b> à une passerelle située à 3 km ; l'agriculteur consulte les mesures sur son téléphone.</p><p class=\"pb\"><b>Problématique : comment un objet sur pile peut-il transmettre ses mesures à plusieurs kilomètres, et que contient chaque message ?</b></p>",
   "cls": ""
  },
  {
   "t": "figure",
   "id": "fig1",
   "src": "../assets/img/s4_c2_lora.png",
   "alt": "Architecture LoRaWAN : objets, passerelle, serveur de réseau, application.",
   "legende": "Figure 1 – Architecture d'un réseau LoRaWAN.",
   "largeur": "96%"
  },
  {
   "t": "bandeau",
   "id": "p1",
   "titre": "1 — La liaison LoRa",
   "comp": "SI-ANA-09 · SI-MOD-09"
  },
  {
   "t": "q",
   "id": "Q1",
   "lab": "Q1",
   "bac": "**Préciser** la nature du support entre le capteur et la passerelle, puis **justifier** le choix de LoRa plutôt que du Wi-Fi pour cette application (deux arguments).",
   "ref": "Le capteur et la passerelle sont-ils reliés par un câble ? **Compare** ensuite LoRa et Wi-Fi sur la <b>portée</b> (3 km à couvrir) et la <b>consommation</b> (le capteur est sur pile) : cours C2."
  },
  {
   "t": "zone",
   "q": "Q1",
   "lignes": 3
  },
  {
   "t": "bandeau",
   "id": "p2",
   "titre": "2 — Lire la console du réseau",
   "comp": "SI-MOD-09 · SI-EXP-07"
  },
  {
   "t": "html",
   "html": "<p><b>Console du serveur de réseau</b> (messages reçus de la citerne). Chaque message contient <b>6 octets de données utiles</b> : niveau d'eau en cm (2 octets), température × 10 en °C (2 octets), tension de la pile en mV (2 octets), poids fort en premier.</p><div class=\"tab-wrap\"><table class=\"grille console\"><thead><tr><th>Heure</th><th>Compteur</th><th>Données utiles (hexadécimal)</th><th>SF</th><th>RSSI (dBm)</th><th>SNR (dB)</th><th>Durée d'émission</th></tr></thead><tbody><tr><td>06:00</td><td>1201</td><td class=\"mono\">00 98 00 EA 0E 10</td><td>7</td><td>-97</td><td>7,5</td><td>51,5 ms</td></tr><tr><td>06:10</td><td>1202</td><td class=\"mono\">00 97 00 EC 0E 0E</td><td>7</td><td>-98</td><td>7,0</td><td>51,5 ms</td></tr><tr><td>06:20</td><td>1203</td><td class=\"mono\">00 95 00 F1 0E 0D</td><td>7</td><td>-99</td><td>6,5</td><td>51,5 ms</td></tr><tr><td>06:30</td><td>1204</td><td class=\"mono\">00 57 00 F5 0E 0C</td><td>7</td><td>-100</td><td>6,0</td><td>51,5 ms</td></tr></tbody></table></div><p class=\"petit\"><i>Exemple fabriqué pour le TD (données et clés fictives) : appareil « citerne-ferme-01 », identifiant DevEUI 0A1B2C3D4E5F6071, clé AppKey ●●●●●●●● (masquée).</i></p>"
  },
  {
   "t": "q",
   "id": "Q2",
   "lab": "Q2",
   "bac": "**Décoder** les données utiles du message de 06:00 : **convertir** chaque champ en décimal et **en déduire** la valeur physique avec son unité.",
   "ref": "**Coupe** les 6 octets en 3 champs de 2 octets. **Convertis** chaque champ (4 chiffres hexadécimaux) en décimal : poids 4 096, 256, 16, 1. **Divise** la température par 10."
  },
  {
   "t": "grille",
   "q": "Q2",
   "titre": "Décodage du message de 06:00",
   "entetes": [
    "Champ",
    "Octets (hexadécimal)",
    "Valeur décimale",
    "Valeur physique"
   ],
   "lignes": [
    [
     "Niveau d'eau",
     {
      "champ": "Q2_h1"
     },
     {
      "champ": "Q2_d1",
      "num": true
     },
     {
      "champ": "Q2_v1"
     }
    ],
    [
     "Température × 10",
     {
      "champ": "Q2_h2"
     },
     {
      "champ": "Q2_d2",
      "num": true
     },
     {
      "champ": "Q2_v2"
     }
    ],
    [
     "Tension de la pile",
     {
      "champ": "Q2_h3"
     },
     {
      "champ": "Q2_d3",
      "num": true
     },
     {
      "champ": "Q2_v3"
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q3",
   "lab": "Q3",
   "bac": "**Décoder** le niveau d'eau du message de 06:30 et **proposer** une explication à son évolution.",
   "ref": "**Convertis** les deux premiers octets du message de 06:30 en décimal. **Compare** avec 06:00 : que s'est-il passé ?"
  },
  {
   "t": "zone",
   "q": "Q3",
   "lignes": 2
  },
  {
   "t": "bandeau",
   "id": "p3",
   "titre": "3 — Trame, durée d'émission et débit utile",
   "comp": "SI-MOD-09 · SI-ANA-09"
  },
  {
   "t": "encadre",
   "titre": "Données",
   "html": "<p>Une trame LoRaWAN contient les 6 octets utiles et <b>13 octets</b> d'en-tête et de contrôle (MHDR 1 octet, FHDR 7, FPort 1, code d'intégrité MIC 4). La console indique la durée d'émission de chaque message. Débit maximal de LoRa avec ces réglages (SF7, 125 kHz) : 5,47 kbit/s.</p>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q4",
   "lab": "Q4",
   "bac": "**Calculer** la taille de la trame et la part des données utiles, puis le débit utile réel de la liaison (données utiles transmises pendant la durée d'émission).",
   "ref": "Taille = 6 + 13 octets. Part utile = \\frac{6}{19}. Débit utile = \\frac{bits utiles}{durée d'émission} avec 6 × 8 = 48 bits et la durée en secondes (51,5 ms = 0,0515 s)."
  },
  {
   "t": "tableau3",
   "titre": "Q4",
   "lignes": [
    {
     "id": "Q4a",
     "lab": "Q4 a",
     "grandeur": "Taille de la trame",
     "sym": "n",
     "q": "Q4"
    },
    {
     "id": "Q4b",
     "lab": "Q4 b",
     "grandeur": "Part des données utiles",
     "sym": "η",
     "q": "Q4"
    },
    {
     "id": "Q4c",
     "lab": "Q4 c",
     "grandeur": "Débit utile réel",
     "sym": "D_{utile}",
     "q": "Q4"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q5",
   "lab": "Q5",
   "bac": "**Expliquer** pourquoi le débit utile est bien plus faible que le débit maximal de 5,47 kbit/s.",
   "ref": "Pendant les 51,5 ms d'émission, le module n'envoie pas que les 6 octets utiles : **cite** ce qu'il envoie en plus (pense à la question Q4 et au cours C2)."
  },
  {
   "t": "zone",
   "q": "Q5",
   "lignes": 2
  },
  {
   "t": "q",
   "id": "Q6",
   "lab": "Q6",
   "bac": "Dans la bande 868 MHz, chaque objet ne doit pas émettre plus de 1 % du temps. **Calculer** l'intervalle minimal entre deux messages, puis **vérifier** que la citerne respecte cette règle.",
   "ref": "1 % du temps : la durée d'émission (0,0515 s) doit représenter au plus 1 % de l'intervalle. Intervalle minimal = \\frac{durée d'émission}{0,01}. **Compare** à 10 min = 600 s."
  },
  {
   "t": "tableau3",
   "titre": "Q6",
   "lignes": [
    {
     "id": "Q6",
     "lab": "Q6",
     "grandeur": "Intervalle minimal entre deux messages",
     "sym": "Δt_{min}"
    }
   ]
  },
  {
   "t": "zone",
   "q": "Q6",
   "lignes": 1
  },
  {
   "t": "encadre",
   "titre": "Pour aller plus loin : décoder en Python (Thonny ou EduPython)",
   "html": "<pre class=\"code\">donnees = \"009800EA0E10\"          # message de 06:00\nniveau = int(donnees[0:4], 16)      # 4 premiers chiffres hexadécimaux\ntemperature = int(donnees[4:8], 16) / 10\npile = int(donnees[8:12], 16) / 1000\nprint(niveau, \"cm\", temperature, \"°C\", pile, \"V\")</pre><p>Copie ce programme, exécute-le, puis modifie-le pour décoder les quatre messages de la console.</p>",
   "cls": "pouce"
  },
  {
   "t": "retenir",
   "items": [
    [
     "LoRa",
     "ret_lora",
     "longue portée, faible débit, très faible consommation"
    ],
    [
     "Trame LoRaWAN",
     "ret_tr",
     "en-tête + données utiles + code d'intégrité"
    ],
    [
     "Débit utile",
     "ret_du",
     "\\frac{bits utiles}{durée d'émission}"
    ],
    [
     "Règle des 1 %",
     "ret_1",
     "durée d'émission ≤ 1 % de l'intervalle"
    ]
   ]
  },
  {
   "t": "autoeval",
   "items": [
    "justifier le choix d'une liaison LoRa",
    "décoder des données hexadécimales",
    "calculer un débit utile",
    "vérifier la règle des 1 %"
   ]
  }
 ]
};
