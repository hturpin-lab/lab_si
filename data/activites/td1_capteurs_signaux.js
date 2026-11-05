/* Capteurs et signaux — 1re SI, S4 « Acquérir et transmettre l'information »
   Généré par Sequence_S4_Information/sources/build_td.py depuis contenu_td.py. Contenu ÉLÈVE uniquement : aucun corrigé. */
window.ACTIVITE = {
 "id": "td1_capteurs_signaux",
 "fichier": "TD1_Capteurs_Signaux",
 "court": "TD1 Capteurs et signaux · 1re SI",
 "sequence": "s4",
 "classe": "1re SI",
 "seq": "S4 · TD1",
 "titre": "Capteurs et signaux",
 "sous": "Capteur, caractéristique, sensibilité ; période, fréquence, rapport cyclique, valeur moyenne",
 "blocs": [
  {
   "t": "encadre",
   "titre": "Situation",
   "html": "<p>Un robot anti-incendie mesure son <b>inclinaison</b> pour ne pas se renverser, un moteur est piloté par une tension <b>MLI</b> (modulation de largeur d'impulsion, en anglais PWM), un drone mesure son <b>altitude</b> par ultrasons. Dans les trois cas, une grandeur physique est transformée en <b>signal électrique</b> que le microcontrôleur doit interpréter.</p><p class=\"pb\"><b>Problématique : comment lire et exploiter le signal délivré par un capteur ?</b></p>",
   "cls": ""
  },
  {
   "t": "methode",
   "html": "<b>Méthode :</b> chaque calcul se fait en 3 temps : <b>relation littérale → application numérique → résultat avec unité</b>. Calculatrice autorisée."
  },
  {
   "t": "bandeau",
   "id": "p1",
   "titre": "1 — Capteurs : nature du signal, caractéristique, sensibilité",
   "comp": "SI-MOD-09 · capteurs"
  },
  {
   "t": "q",
   "id": "Q1",
   "lab": "Q1",
   "bac": "**Compléter** le tableau : pour chaque capteur, **indiquer** la grandeur physique mesurée et la nature du signal de sortie (logique, analogique ou numérique).",
   "ref": "Pour chaque ligne, **écris** ce que le capteur mesure (une température, une distance…), puis **choisis** la nature du signal : <b>logique</b> = 2 états seulement (0 ou 1) ; <b>analogique</b> = la tension peut prendre toutes les valeurs ; <b>numérique</b> = le capteur envoie un nombre codé en binaire."
  },
  {
   "t": "grille",
   "q": "Q1",
   "titre": "Nature des signaux",
   "entetes": [
    "Capteur",
    "Signal délivré",
    "Grandeur physique mesurée",
    "Nature du signal"
   ],
   "lignes": [
    [
     "Fin de course d'un portail",
     "contact ouvert ou fermé",
     {
      "champ": "Q1_g1"
     },
     {
      "champ": "Q1_n1"
     }
    ],
    [
     "Inclinomètre du robot",
     "tension de 0 à 5 V proportionnelle à l'angle",
     {
      "champ": "Q1_g2"
     },
     {
      "champ": "Q1_n2"
     }
    ],
    [
     "Thermomètre DS18B20",
     "mesure codée sur 12 bits, envoyée par un bus",
     {
      "champ": "Q1_g3"
     },
     {
      "champ": "Q1_n3"
     }
    ],
    [
     "Capteur à ultrasons du drone",
     "impulsion dont la durée dépend de la distance",
     {
      "champ": "Q1_g4"
     },
     {
      "champ": "Q1_n4"
     }
    ]
   ]
  },
  {
   "t": "ligne",
   "blocs": [
    {
     "t": "figure",
     "id": "fig1",
     "src": "../assets/img/s4_td1_inclinometre.png",
     "alt": "Caractéristique de l'inclinomètre : droite passant par 0 V à −45° et 5 V à +45°.",
     "legende": "Figure 1 – Caractéristique de l'inclinomètre du robot anti-incendie."
    },
    {
     "t": "html",
     "html": "<p>L'inclinomètre délivre une tension U_{S} qui dépend de l'angle θ (figure 1). Le microcontrôleur lit cette tension pour connaître l'inclinaison du robot.</p><p>Le robot ne doit pas dépasser <b>30° en descente</b> (θ = −30°).</p>"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q2",
   "lab": "Q2",
   "bac": "**Relever** l'étendue de mesure de l'inclinomètre ainsi que les tensions délivrées aux deux extrémités de cette étendue.",
   "ref": "Sur la figure 1, **lis** le plus petit et le plus grand angle que le capteur peut mesurer : l'étendue de mesure va de … à …. **Lis** aussi la tension U_{S} pour chacun de ces deux angles."
  },
  {
   "t": "zone",
   "q": "Q2",
   "lignes": 2
  },
  {
   "t": "q",
   "id": "Q3",
   "lab": "Q3",
   "bac": "**Calculer** la sensibilité S de l'inclinomètre, en mV/°.",
   "ref": "La sensibilité est la <b>pente</b> de la droite : S = \\frac{ΔU_{S}}{Δθ}. **Prends** les deux points extrêmes de la Q2, **calcule**, puis **convertis** en mV/° (1 V = 1 000 mV)."
  },
  {
   "t": "q",
   "id": "Q4",
   "lab": "Q4",
   "bac": "**Justifier** que U_{S} = 2,5 + S × θ (θ en degrés), puis **calculer** U_{S} pour θ = +20° et pour θ = −30°.",
   "ref": "Pour θ = 0°, la figure 1 donne U_{S} = 2,5 V ; à chaque degré en plus, U_{S} augmente de S. **Calcule** U_{S} = 2,5 + 0,0556 × θ pour θ = +20°, puis pour θ = −30° (attention au signe −)."
  },
  {
   "t": "tableau3",
   "titre": "Q3 et Q4",
   "lignes": [
    {
     "id": "Q3",
     "lab": "Q3",
     "grandeur": "Sensibilité de l'inclinomètre",
     "sym": "S"
    },
    {
     "id": "Q4a",
     "lab": "Q4 a",
     "grandeur": "Tension pour θ = +20°",
     "sym": "U_{S}",
     "q": "Q4"
    },
    {
     "id": "Q4b",
     "lab": "Q4 b",
     "grandeur": "Tension pour θ = −30°",
     "sym": "U_{S}",
     "q": "Q4"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q4c",
   "lab": "Q4 c",
   "bac": "**Justifier** que ce capteur convient pour surveiller la limite de 30° en descente.",
   "ref": "Les angles à surveiller (jusqu'à −30°) sont-ils compris dans l'étendue de mesure trouvée en Q2 ? **Réponds** par une phrase."
  },
  {
   "t": "zone",
   "q": "Q4c",
   "lignes": 2
  },
  {
   "t": "encadre",
   "titre": "Coups de pouce",
   "html": "<p><b>CP1</b> — 1 ms = 0,001 s. Pour f = \\frac{1}{T}, T doit être en secondes : f est alors en hertz (Hz).</p><p><b>CP2</b> — Logique = 2 états ; analogique = toutes les valeurs possibles dans une plage ; numérique = un nombre binaire.</p><p><b>CP3</b> — Aller-retour : l'onde parcourt deux fois la distance d.</p>",
   "cls": "pouce"
  },
  {
   "t": "bandeau",
   "id": "p2",
   "titre": "2 — Caractéristiques d'un signal périodique",
   "comp": "SI-EXP-07 · SI-MOD-09"
  },
  {
   "t": "ligne",
   "blocs": [
    {
     "t": "figure",
     "id": "fig2",
     "src": "../assets/img/s4_td1_oscillo_sinus.png",
     "alt": "Oscillogramme de deux tensions sinusoïdales : voie 1 en trait plein, voie 2 en pointillés.",
     "legende": "Figure 2 – Deux tensions sinusoïdales relevées à l'oscilloscope."
    },
    {
     "t": "html",
     "html": "<p><b>Lecture à l'oscilloscope</b> : une valeur = <b>nombre de carreaux × calibre</b>.</p><p>Horizontalement, le calibre est la base de temps (en ms/div) ; verticalement, c'est la sensibilité de la voie (en V/div).</p>"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q5",
   "lab": "Q5",
   "bac": "**Déterminer**, pour chaque voie, la période T, la fréquence f et la valeur maximale U_{max} des tensions de la figure 2.",
   "ref": "a) Période : **compte** les carreaux horizontaux d'un motif complet, puis **multiplie** par 0,5 ms. b) f = \\frac{1}{T} avec T en secondes. c) U_{max} : **compte** les carreaux verticaux entre 0 et le sommet, puis **multiplie** par le calibre de la voie."
  },
  {
   "t": "tableau3",
   "titre": "Q5",
   "lignes": [
    {
     "id": "Q5a",
     "lab": "Q5 a",
     "grandeur": "Période de la voie 1",
     "sym": "T_{1}",
     "q": "Q5"
    },
    {
     "id": "Q5b",
     "lab": "Q5 b",
     "grandeur": "Fréquence de la voie 1",
     "sym": "f_{1}",
     "q": "Q5"
    },
    {
     "id": "Q5c",
     "lab": "Q5 c",
     "grandeur": "Valeur maximale de la voie 1",
     "sym": "U_{max1}",
     "q": "Q5"
    },
    {
     "id": "Q5d",
     "lab": "Q5 d",
     "grandeur": "Période de la voie 2",
     "sym": "T_{2}",
     "q": "Q5"
    },
    {
     "id": "Q5e",
     "lab": "Q5 e",
     "grandeur": "Fréquence de la voie 2",
     "sym": "f_{2}",
     "q": "Q5"
    },
    {
     "id": "Q5f",
     "lab": "Q5 f",
     "grandeur": "Valeur maximale de la voie 2",
     "sym": "U_{max2}",
     "q": "Q5"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q6",
   "lab": "Q6",
   "bac": "**En déduire** la valeur efficace de chacune des deux tensions.",
   "ref": "Pour une tension <b>sinusoïdale</b> : U_{eff} = \\frac{U_{max}}{\\sqrt{2}}. **Calcule** pour la voie 1, puis pour la voie 2."
  },
  {
   "t": "tableau3",
   "titre": "Q6",
   "lignes": [
    {
     "id": "Q6a",
     "lab": "Q6 a",
     "grandeur": "Valeur efficace de la voie 1",
     "sym": "U_{eff1}",
     "q": "Q6"
    },
    {
     "id": "Q6b",
     "lab": "Q6 b",
     "grandeur": "Valeur efficace de la voie 2",
     "sym": "U_{eff2}",
     "q": "Q6"
    }
   ]
  },
  {
   "t": "figure",
   "id": "fig3",
   "src": "../assets/img/s4_td1_pwm.png",
   "alt": "Tension MLI rectangulaire de 0 à 18 V : état haut pendant 2 carreaux, période de 5 carreaux, 1 carreau = 2 ms.",
   "legende": "Figure 3 – Tension u_{C} aux bornes d'un moteur commandé en MLI (U_{b} = 18 V).",
   "largeur": "60%"
  },
  {
   "t": "q",
   "id": "Q7",
   "lab": "Q7",
   "bac": "**Relever** la durée t_{H} de l'état haut et la période T de la tension u_{C} (figure 3), puis **calculer** sa fréquence f et son rapport cyclique α.",
   "ref": "1 carreau horizontal = 2 ms. **Compte** les carreaux de l'état haut (t_{H}), puis ceux d'un motif complet (T). **Calcule** f = \\frac{1}{T} et α = \\frac{t_{H}}{T} (α n'a pas d'unité : c'est un nombre entre 0 et 1)."
  },
  {
   "t": "q",
   "id": "Q8",
   "lab": "Q8",
   "bac": "**Calculer** la valeur moyenne U_{moy} de u_{C}. **Déterminer** ensuite la durée t_{H} qui donnerait U_{moy} = 12 V, la période restant la même.",
   "ref": "Pour un signal rectangulaire entre 0 et U_{b} : U_{moy} = α × U_{b}. Pour 12 V : **calcule** d'abord le rapport cyclique nécessaire α = \\frac{12}{18}, puis t_{H} = α × T."
  },
  {
   "t": "tableau3",
   "titre": "Q7 et Q8",
   "lignes": [
    {
     "id": "Q7a",
     "lab": "Q7 a",
     "grandeur": "Durée de l'état haut",
     "sym": "t_{H}",
     "q": "Q7"
    },
    {
     "id": "Q7b",
     "lab": "Q7 b",
     "grandeur": "Période",
     "sym": "T",
     "q": "Q7"
    },
    {
     "id": "Q7c",
     "lab": "Q7 c",
     "grandeur": "Fréquence",
     "sym": "f",
     "q": "Q7"
    },
    {
     "id": "Q7d",
     "lab": "Q7 d",
     "grandeur": "Rapport cyclique",
     "sym": "α",
     "q": "Q7"
    },
    {
     "id": "Q8a",
     "lab": "Q8 a",
     "grandeur": "Valeur moyenne de u_{C}",
     "sym": "U_{moy}",
     "q": "Q8"
    },
    {
     "id": "Q8b",
     "lab": "Q8 b",
     "grandeur": "Durée t_{H} pour U_{moy} = 12 V",
     "sym": "t_{H}",
     "q": "Q8"
    }
   ]
  },
  {
   "t": "bandeau",
   "id": "p3",
   "titre": "3 — Synthèse : l'altimètre à ultrasons d'un drone",
   "comp": "SI-MOD-09 · SI-EXP-07"
  },
  {
   "t": "encadre",
   "titre": "Le capteur d'altitude du drone",
   "html": "<p>Un drone quadricoptère mesure sa hauteur au-dessus du sol avec un capteur à ultrasons : l'émetteur envoie une salve d'ondes vers le sol, le récepteur capte l'écho. Le capteur délivre alors une <b>impulsion</b> (niveau haut) dont la durée t est égale à la durée de l'aller-retour de l'onde.</p>",
   "cls": ""
  },
  {
   "t": "donnees",
   "lignes": [
    [
     "Tension d'alimentation",
     "3,2 à 5,2 V"
    ],
    [
     "Fréquence ultrasonore",
     "40 kHz"
    ],
    [
     "Plage de mesure",
     "2 à 350 cm"
    ],
    [
     "Résolution",
     "1 cm"
    ],
    [
     "Type de sortie",
     "impulsion (durée t)"
    ],
    [
     "Vitesse du son",
     "v = 340,29 m/s"
    ]
   ]
  },
  {
   "t": "q",
   "id": "Q9",
   "lab": "Q9",
   "bac": "**Justifier** la relation d = \\frac{v × t}{2} entre l'altitude d du drone et la durée t de l'impulsion.",
   "ref": "L'onde part du drone, rebondit sur le sol et revient au drone. Pendant la durée t, quelle distance l'onde a-t-elle parcourue (en fonction de d) ? **Rédige** une phrase avec la relation distance = vitesse × durée."
  },
  {
   "t": "zone",
   "q": "Q9",
   "lignes": 2
  },
  {
   "t": "q",
   "id": "Q10",
   "lab": "Q10",
   "bac": "**Calculer** la durée t de l'impulsion pour une altitude de 0,90 m puis de 2,75 m.",
   "ref": "De d = \\frac{v × t}{2} on tire t = \\frac{2 × d}{v}. **Calcule** t pour d = 0,90 m, puis pour d = 2,75 m, et **donne** le résultat en ms (× 1 000)."
  },
  {
   "t": "tableau3",
   "titre": "Q10",
   "lignes": [
    {
     "id": "Q10a",
     "lab": "Q10 a",
     "grandeur": "Durée pour d = 0,90 m",
     "sym": "t",
     "q": "Q10"
    },
    {
     "id": "Q10b",
     "lab": "Q10 b",
     "grandeur": "Durée pour d = 2,75 m",
     "sym": "t",
     "q": "Q10"
    }
   ]
  },
  {
   "t": "ligne",
   "blocs": [
    {
     "t": "figure",
     "id": "fig4",
     "src": "../assets/img/s4_td1_drone.png",
     "alt": "Oscillogramme de la sortie du capteur : impulsions de 1 carreau de large, répétées tous les 5 carreaux, hauteur 2,5 carreaux.",
     "legende": "Figure 4 – Sortie du capteur relevée en vol."
    },
    {
     "t": "html",
     "html": "<p>Pendant le vol, on relève la sortie du capteur à l'oscilloscope (figure 4) : 10 ms par carreau horizontalement, 2 V par carreau verticalement.</p>"
    }
   ]
  },
  {
   "t": "q",
   "id": "Q11",
   "lab": "Q11",
   "bac": "À partir de la figure 4, **déterminer** la durée t de l'impulsion, la période T, l'amplitude U_{max}, le rapport cyclique α et la valeur moyenne U_{moy} du signal.",
   "ref": "**Compte** les carreaux : largeur d'une impulsion (t), distance entre deux fronts montants (T), hauteur de l'impulsion (U_{max}). Puis α = \\frac{t}{T} et U_{moy} = α × U_{max}."
  },
  {
   "t": "q",
   "id": "Q12",
   "lab": "Q12",
   "bac": "**En déduire** l'altitude d du drone et **vérifier** qu'elle est dans la plage de mesure du capteur.",
   "ref": "**Calcule** d = \\frac{v × t}{2} avec t en secondes (10 ms = 0,010 s). La plage du capteur va de 2 cm à 350 cm : **compare**."
  },
  {
   "t": "tableau3",
   "titre": "Q11 et Q12",
   "lignes": [
    {
     "id": "Q11a",
     "lab": "Q11 a",
     "grandeur": "Durée de l'impulsion",
     "sym": "t",
     "q": "Q11"
    },
    {
     "id": "Q11b",
     "lab": "Q11 b",
     "grandeur": "Période",
     "sym": "T",
     "q": "Q11"
    },
    {
     "id": "Q11c",
     "lab": "Q11 c",
     "grandeur": "Amplitude",
     "sym": "U_{max}",
     "q": "Q11"
    },
    {
     "id": "Q11d",
     "lab": "Q11 d",
     "grandeur": "Rapport cyclique",
     "sym": "α",
     "q": "Q11"
    },
    {
     "id": "Q11e",
     "lab": "Q11 e",
     "grandeur": "Valeur moyenne",
     "sym": "U_{moy}",
     "q": "Q11"
    },
    {
     "id": "Q12",
     "lab": "Q12",
     "grandeur": "Altitude du drone",
     "sym": "d"
    }
   ]
  },
  {
   "t": "zone",
   "q": "Q12",
   "lignes": 1,
   "ph": "Vérification : …"
  },
  {
   "t": "retenir",
   "items": [
    [
     "Fréquence",
     "ret_f",
     "f = \\frac{1}{T} (f en Hz, T en s)"
    ],
    [
     "Valeur efficace d'une tension sinusoïdale",
     "ret_eff",
     "U_{eff} = \\frac{U_{max}}{\\sqrt{2}}"
    ],
    [
     "Rapport cyclique",
     "ret_alpha",
     "α = \\frac{t_{H}}{T}"
    ],
    [
     "Valeur moyenne d'un signal rectangulaire 0 / U_{max}",
     "ret_moy",
     "U_{moy} = α × U_{max}"
    ],
    [
     "Sensibilité d'un capteur",
     "ret_S",
     "S = \\frac{Δs}{Δe}"
    ],
    [
     "Mesure à l'oscilloscope",
     "ret_osc",
     "nombre de carreaux × calibre"
    ]
   ]
  },
  {
   "t": "autoeval",
   "imprime": false,
   "items": [
    "reconnaître la nature du signal d'un capteur",
    "calculer la sensibilité d'un capteur",
    "lire T, f et U_{max} à l'oscilloscope",
    "calculer un rapport cyclique et une valeur moyenne"
   ]
  }
 ]
};
