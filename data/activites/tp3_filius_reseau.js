/* Réseau local : protocoles et encapsulation — 1re SI, S4 « Acquérir et transmettre l'information »
   Généré par Sequence_S4_Information/sources/build_td.py depuis contenu_td.py. Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
 "id": "tp3_filius_reseau",
 "fichier": "TP3_Filius_Reseau",
 "court": "TP3 Réseau local (Filius) · 1re SI",
 "sequence": "s4",
 "classe": "1re SI",
 "seq": "S4 · TP3",
 "titre": "Réseau local : protocoles et encapsulation",
 "sous": "Simulation avec Filius : adresses IP, commutateur, routeur, ping, échanges de données, couches",
 "blocs": [
  {
   "t": "encadre",
   "titre": "Situation",
   "html": "<p>Le télescope du TD3 envoie ses images par Wi-Fi à un smartphone : les deux appareils font partie d'un <b>réseau local</b> et respectent des <b>protocoles</b> communs. On construit et on observe un réseau avec le simulateur <b>Filius</b> (installé sur les postes).</p><p>Filius a trois modes : <b>conception</b> (marteau) pour poser et relier les machines, <b>simulation</b> (flèche verte) pour les faire fonctionner, <b>documentation</b> (crayon). Un double-clic sur une machine ouvre sa configuration (en mode conception) ou son bureau (en mode simulation). Selon la langue installée, les menus sont en français ou en anglais : les deux noms sont donnés.</p><p class=\"pb\"><b>Problématique : quelles règles et quelles adresses permettent à deux machines d'échanger des données ?</b></p>",
   "cls": ""
  },
  {
   "t": "bandeau",
   "id": "p1",
   "titre": "1 — Deux ordinateurs reliés directement",
   "comp": "SI-ANA-09 · SI-EXP-07"
  },
  {
   "t": "encadre",
   "titre": "À faire",
   "html": "<ul><li>Mode conception : **poser** deux ordinateurs portables, les **relier** par un câble.</li><li>**Configurer** M1 : nom M1, adresse IP 192.168.0.10, masque 255.255.255.0 ; M2 : nom M2, 192.168.0.11.</li><li>Mode simulation : sur M1, **ouvrir** « Installation de logiciels » (Software Installation) et **installer** la « Ligne de commande » (Command Line).</li><li>Dans la ligne de commande de M1 : <b>ipconfig</b>, puis <b>ping 192.168.0.11</b>.</li><li>Clic droit sur M1 → « Afficher les échanges de données » (Show data exchange).</li></ul>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q1",
   "lab": "Q1",
   "bac": "**Relever** l'adresse IP et l'adresse physique (MAC) de M1 données par <b>ipconfig</b>, puis **indiquer** le rôle de chacune.",
   "ref": "**Recopie** les deux adresses affichées par ipconfig. L'une identifie la carte réseau (fixée à la fabrication), l'autre identifie la machine dans le réseau (choisie par toi) : **dis** laquelle est laquelle."
  },
  {
   "t": "grille",
   "q": "Q1",
   "titre": "Adresses de M1",
   "entetes": [
    "Adresse",
    "Valeur relevée",
    "Rôle"
   ],
   "lignes": [
    [
     "IP",
     {
      "champ": "Q1_ip"
     },
     {
      "champ": "Q1_rip"
     }
    ],
    [
     "MAC (physique)",
     {
      "champ": "Q1_mac"
     },
     {
      "champ": "Q1_rmac"
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q2",
   "lab": "Q2",
   "bac": "Dans la fenêtre des échanges de données après le <b>ping</b>, **identifier** les deux protocoles utilisés et **indiquer** le rôle de chacun.",
   "ref": "**Regarde** la colonne « Protocole » : le premier échange sert à trouver l'adresse MAC de M2 à partir de son adresse IP, les suivants sont les messages du ping. **Écris** le nom de chaque protocole et son rôle."
  },
  {
   "t": "zone",
   "q": "Q2",
   "lignes": 3
  },
  {
   "t": "bandeau",
   "id": "p2",
   "titre": "2 — Un commutateur et un serveur",
   "comp": "SI-ANA-09 · SI-MOD-09"
  },
  {
   "t": "encadre",
   "titre": "À faire",
   "html": "<ul><li>**Ajouter** M3 (192.168.0.12) et un <b>commutateur</b> (switch) ; **relier** M1, M2 et M3 au commutateur.</li><li>Sur M3 : **installer** le « Serveur d'écho » (Echo Server), port <b>55555</b>, puis **cliquer** sur « Démarrer ».</li><li>Sur M1 : **installer** le « Client générique » (Generic Client), **se connecter** à 192.168.0.12 port 55555 et **envoyer** le message <b>Bonjour</b>.</li><li>**Afficher** les échanges de données de M1.</li></ul>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q3",
   "lab": "Q3",
   "bac": "**Relever** dans les échanges de données les couches et les protocoles mis en jeu par l'envoi de « Bonjour », et **expliquer** pourquoi la couche transport apparaît maintenant.",
   "ref": "Chaque ligne indique une couche (réseau, internet, transport, application) et un protocole. **Remplis** le tableau de la couche la plus haute à la plus basse, puis **explique** ce qu'apporte TCP par rapport au ping."
  },
  {
   "t": "grille",
   "q": "Q3",
   "titre": "Couches observées",
   "entetes": [
    "Couche",
    "Protocole",
    "Adresses ou numéros utilisés"
   ],
   "lignes": [
    [
     "Application",
     {
      "champ": "Q3_p1"
     },
     {
      "champ": "Q3_a1"
     }
    ],
    [
     "Transport",
     {
      "champ": "Q3_p2"
     },
     {
      "champ": "Q3_a2"
     }
    ],
    [
     "Internet (réseau)",
     {
      "champ": "Q3_p3"
     },
     {
      "champ": "Q3_a3"
     }
    ],
    [
     "Accès réseau (liaison)",
     {
      "champ": "Q3_p4"
     },
     {
      "champ": "Q3_a4"
     }
    ]
   ]
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
   "bac": "**Compléter** le schéma d'encapsulation du message « Bonjour » envoyé par M1 : **indiquer** ce que chaque couche ajoute devant les données.",
   "ref": "En partant des données « Bonjour », chaque couche ajoute son en-tête devant : d'abord TCP (ports), puis IP (adresses IP), puis Ethernet (adresses MAC). **Écris** dans chaque case l'en-tête ajouté."
  },
  {
   "t": "grille",
   "q": "Q4",
   "titre": "Encapsulation de « Bonjour »",
   "entetes": [
    "Couche",
    "Ce qui est envoyé"
   ],
   "lignes": [
    [
     "Application",
     {
      "txt": "« Bonjour »"
     }
    ],
    [
     "Transport",
     {
      "champ": "Q4_t"
     }
    ],
    [
     "Internet",
     {
      "champ": "Q4_i"
     }
    ],
    [
     "Accès réseau",
     {
      "champ": "Q4_r"
     }
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q5",
   "lab": "Q5",
   "bac": "**Expliquer** le rôle du commutateur dans ce réseau.",
   "ref": "Quand M1 écrit à M3, M2 reçoit-il le message ? Le commutateur lit une adresse dans la trame : **laquelle** ? **Rédige** ta réponse."
  },
  {
   "t": "zone",
   "q": "Q5",
   "lignes": 2
  },
  {
   "t": "bandeau",
   "id": "p3",
   "titre": "3 — Deux réseaux reliés par un routeur",
   "comp": "SI-ANA-09"
  },
  {
   "t": "encadre",
   "titre": "À faire",
   "html": "<ul><li>**Créer** un second réseau : M4, M5, M6 (192.168.1.10 à 192.168.1.12) reliés à un second commutateur.</li><li>**Relier** les deux commutateurs par un <b>routeur</b> à 2 interfaces : 192.168.0.1 et 192.168.1.1.</li><li>**Tester** <b>ping 192.168.1.10</b> depuis M1, puis **indiquer** la passerelle de chaque machine (192.168.0.1 à gauche, 192.168.1.1 à droite) et **recommencer** ; **tester** <b>traceroute 192.168.1.10</b>.</li></ul>",
   "cls": ""
  },
  {
   "t": "q",
   "id": "Q6",
   "lab": "Q6",
   "bac": "**Expliquer** pourquoi le premier ping échoue et le second réussit, puis **indiquer** le rôle du routeur.",
   "ref": "Les deux réseaux n'ont pas le même début d'adresse (192.168.0 et 192.168.1). Pour sortir de son réseau, M1 doit envoyer le message à une machine précise : **laquelle** ? **Explique**."
  },
  {
   "t": "zone",
   "q": "Q6",
   "lignes": 3
  },
  {
   "t": "retenir",
   "items": [
    [
     "Protocole",
     "ret_proto",
     "règles communes à l'émetteur et au récepteur"
    ],
    [
     "Adresse IP",
     "ret_ip",
     "identifie une machine dans un réseau (logique)"
    ],
    [
     "Adresse MAC",
     "ret_mac",
     "identifie une carte réseau (physique)"
    ],
    [
     "Encapsulation",
     "ret_enc",
     "chaque couche ajoute son en-tête aux données"
    ],
    [
     "Commutateur (switch)",
     "ret_sw",
     "relie les machines d'un réseau local (adresses MAC)"
    ],
    [
     "Routeur",
     "ret_rt",
     "relie des réseaux différents (adresses IP)"
    ]
   ]
  },
  {
   "t": "autoeval",
   "items": [
    "configurer une adresse IP",
    "reconnaître ARP, ICMP, TCP et IP",
    "décrire l'encapsulation d'un message",
    "distinguer commutateur et routeur"
   ]
  }
 ]
};
