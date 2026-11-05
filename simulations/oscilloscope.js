/* ============================================================
   S.I — Oscilloscope virtuel (1re SI, séquence S4)
   2 voies, calibres V/div, position, base de temps, position horizontale,
   déclenchement (source, niveau, front), curseurs temps / tension.
   Générateurs : sinus, carré, MLI, capteur à ultrasons, trame UART.
   Signaux « mystère » (paramètres masqués) pour les TP : ?signal=m1 … m4.
   Aucune donnée n'est envoyée ; tout est calculé dans le navigateur.
   API de test : window.OSC
   ============================================================ */
"use strict";
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var VDIV = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20];
  var TDIV = [1e-6, 2e-6, 5e-6, 1e-5, 2e-5, 5e-5, 1e-4, 2e-4, 5e-4, 1e-3, 2e-3, 5e-3, 1e-2, 2e-2, 5e-2, 0.1, 0.2, 0.5];
  var V_SON = 340;   /* m/s */
  var TYPES = { aucun: "aucun signal", sinus: "sinusoïdal", carre: "carré (±U)", mli: "MLI / PWM (0 ou U)", ultrason: "capteur à ultrasons", uart: "trame série UART" };
  var CHAMPS = {
    sinus: [["U", "Amplitude U_max", "V", 0.1], ["f", "Fréquence", "Hz", 1], ["dc", "Décalage", "V", 0.1]],
    carre: [["U", "Amplitude", "V", 0.1], ["f", "Fréquence", "Hz", 1]],
    mli: [["U", "Tension haute U_b", "V", 0.1], ["f", "Fréquence", "Hz", 1], ["a", "Rapport cyclique", "%", 1]],
    ultrason: [["d", "Distance de l'obstacle", "cm", 1], ["Tm", "Période de mesure", "ms", 1]],
    uart: [["txt", "Texte envoyé", "", 0], ["baud", "Débit", "bit/s", 0], ["parite", "Parité", "", 0], ["stop", "Bits de stop", "", 0]]
  };
  var PRESETS = {
    libre: { nom: "Mode libre : je règle les générateurs", cache: false, g1: { type: "sinus", U: 2, f: 1000, dc: 0 }, g2: { type: "mli", U: 5, f: 500, a: 25 }, r: { ch2: false, v1: 1, v2: 2, t: 2e-4, niv: 0.5 } },
    td1: { nom: "TD1 — figure 2 : deux tensions sinusoïdales", cache: false, g1: { type: "sinus", U: 6, f: 250, dc: 0 }, g2: { type: "sinus", U: 2.5, f: 500, dc: 0 }, r: { ch2: true, v1: 2, v2: 1, t: 5e-4, niv: 0.1, h: 0 } },
    m1: { nom: "Signal 1 — tension sinusoïdale (mystère)", cache: true, g1: { type: "sinus", U: 4, f: 1000, dc: 0 }, g2: { type: "aucun" }, r: { ch2: false, v1: 5, v2: 1, t: 5e-3, niv: 0.5 } },
    m2: { nom: "Signal 2 — commande MLI d'un moteur (mystère)", cache: true, g1: { type: "mli", U: 12, f: 500, a: 30 }, g2: { type: "aucun" }, r: { ch2: false, v1: 10, v2: 1, t: 1e-2, niv: 1 } },
    m3: { nom: "Signal 3 — sortie d'un capteur à ultrasons (mystère)", cache: true, g1: { type: "ultrason", d: 85, Tm: 60 }, g2: { type: "aucun" }, r: { ch2: false, v1: 5, v2: 1, t: 1e-3, niv: 2.5 } },
    m4: { nom: "Signal 4 — trame série UART (mystère)", cache: true, g1: { type: "uart", txt: "OK", baud: 4800, parite: "paire", stop: 1 }, g2: { type: "aucun" }, r: { ch2: false, v1: 2, v2: 1, t: 1e-3, niv: 2.5, front: "descendant" } }
  };
  var S = { g: { 1: null, 2: null }, cache: false, preset: "libre" };

  /* ---------- formats ---------- */
  function nb(x, d) { return x.toLocaleString("fr-FR", { maximumFractionDigits: d, minimumFractionDigits: 0 }); }
  function sig(x, n) { if (x === 0 || !isFinite(x)) return "0"; var d = Math.max(0, n - 1 - Math.floor(Math.log10(Math.abs(x)))); return nb(Number(x.toFixed(Math.min(d, 9))), Math.min(d, 9)); }
  function fT(t) { var a = Math.abs(t); return a >= 1 ? sig(t, 4) + " s" : a >= 1e-3 ? sig(t * 1e3, 4) + " ms" : sig(t * 1e6, 4) + " µs"; }
  function fF(f) { var a = Math.abs(f); return a >= 1e3 ? sig(f / 1e3, 4) + " kHz" : sig(f, 4) + " Hz"; }
  function fV(v) { return Math.abs(v) < 1 && v !== 0 ? sig(v * 1e3, 4) + " mV" : sig(v, 4) + " V"; }
  function fVdiv(v) { return v < 1 ? nb(v * 1e3, 0) + " mV/div" : nb(v, 0) + " V/div"; }
  function fTdiv(t) { return t < 1e-3 ? nb(t * 1e6, 0) + " µs/div" : t < 1 ? nb(t * 1e3, 0) + " ms/div" : nb(t, 1) + " s/div"; }

  /* ---------- générateurs ---------- */
  function bitsUart(g) {
    var b = [], k, j, c, n1, gap = 12;
    for (k = 0; k < gap; k++) b.push(1);
    var txt = String(g.txt || "").slice(0, 8) || " ";
    for (k = 0; k < txt.length; k++) {
      c = txt.charCodeAt(k) & 255; b.push(0); n1 = 0;
      for (j = 0; j < 8; j++) { var x = (c >> j) & 1; b.push(x); n1 += x; }
      if (g.parite === "paire") b.push(n1 % 2); else if (g.parite === "impaire") b.push(1 - n1 % 2);
      for (j = 0; j < (+g.stop || 1); j++) b.push(1);
    }
    for (k = 0; k < gap; k++) b.push(1);
    return b;
  }
  function periode(g) {
    if (!g) return 1;
    switch (g.type) {
      case "sinus": case "carre": case "mli": return 1 / Math.max(+g.f, 1e-3);
      case "ultrason": return +g.Tm / 1000;
      case "uart": return bitsUart(g).length / +g.baud;
    } return 1;
  }
  function valeur(g, t) {
    if (!g || g.type === "aucun") return 0;
    var T = periode(g), ph = ((t % T) + T) % T, x = ph / T;
    switch (g.type) {
      case "sinus": return +g.dc + +g.U * Math.sin(2 * Math.PI * x);
      case "carre": return x < 0.5 ? +g.U : -g.U;
      case "mli": return x < +g.a / 100 ? +g.U : 0;
      case "ultrason": var deb = 0.001, larg = 2 * (+g.d / 100) / V_SON; return (ph >= deb && ph < deb + larg) ? 5 : 0;
      case "uart": if (!g._b) g._b = bitsUart(g); var i = Math.floor(ph * +g.baud); return 5 * g._b[Math.min(i, g._b.length - 1)];
    } return 0;
  }

  /* ---------- état des réglages ---------- */
  function lireReglages() {
    return {
      on: { 1: $("ch1-on").checked, 2: $("ch2-on").checked },
      vdiv: { 1: +$("ch1-vdiv").value, 2: +$("ch2-vdiv").value },
      pos: { 1: +$("ch1-pos").value || 0, 2: +$("ch2-pos").value || 0 },
      tdiv: +$("tdiv").value, hpos: Math.max(0, Math.min(9, +$("hpos").value || 0)),
      src: +$("trig-src").value, niv: +$("trig-niv").value || 0, front: $("trig-front").value,
      cur: $("cur-mode").value, curVoie: +$("cur-voie").value, a: +$("cur-a").value, b: +$("cur-b").value
    };
  }
  /* déclenchement : 1er passage du niveau (front choisi) après t = 0 */
  function declenchement(R) {
    var g = S.g[R.src]; if (!g || g.type === "aucun") return { t0: 0, ok: false };
    var T = periode(g), fen = 10 * R.tdiv, fin = 2 * T + fen, pas = Math.min(T / 4000, fen / 4000), t, a, b, v0 = valeur(g, 0), v1;
    var montant = R.front === "montant";
    for (t = pas; t <= fin; t += pas) {
      v1 = valeur(g, t);
      if (montant ? (v0 < R.niv && v1 >= R.niv) : (v0 > R.niv && v1 <= R.niv)) {
        a = t - pas; b = t;
        for (var k = 0; k < 40; k++) { var m = (a + b) / 2, vm = valeur(g, m); if (montant ? vm < R.niv : vm > R.niv) a = m; else b = m; }
        return { t0: b, ok: true };
      }
      v0 = v1;
      if (t / pas > 2e6) break;
    }
    return { t0: 0, ok: false };
  }

  /* ---------- dessin ---------- */
  var cv = $("ecran"), cx = cv.getContext("2d"), W = 1000, H = 800, DX = W / 10, DY = H / 8;
  var DERNIER = { traces: {}, ts: 0, t0: 0, R: null };
  function dessiner() {
    var R = lireReglages(), d = declenchement(R), ts = d.t0 - R.hpos * R.tdiv, N = 2000;
    DERNIER = { traces: {}, ts: ts, t0: d.t0, R: R, trig: d.ok };
    cx.clearRect(0, 0, W, H); cx.fillStyle = "#F7FAFD"; cx.fillRect(0, 0, W, H);
    cx.strokeStyle = "#B8C6D8"; cx.lineWidth = 1; cx.setLineDash([4, 6]);
    for (var i = 1; i < 10; i++) { cx.beginPath(); cx.moveTo(i * DX, 0); cx.lineTo(i * DX, H); cx.stroke(); }
    for (i = 1; i < 8; i++) { cx.beginPath(); cx.moveTo(0, i * DY); cx.lineTo(W, i * DY); cx.stroke(); }
    cx.setLineDash([]); cx.strokeStyle = "#56677A"; cx.lineWidth = 1.5;
    cx.beginPath(); cx.moveTo(0, H / 2); cx.lineTo(W, H / 2); cx.moveTo(W / 2, 0); cx.lineTo(W / 2, H); cx.stroke();
    for (i = 0; i <= 50; i++) { cx.beginPath(); cx.moveTo(i * DX / 5, H / 2 - 6); cx.lineTo(i * DX / 5, H / 2 + 6); cx.stroke(); }
    for (i = 0; i <= 40; i++) { cx.beginPath(); cx.moveTo(W / 2 - 6, i * DY / 5); cx.lineTo(W / 2 + 6, i * DY / 5); cx.stroke(); }
    [1, 2].forEach(function (ch) {
      if (!R.on[ch] || !S.g[ch] || S.g[ch].type === "aucun") return;
      var pts = [], g = S.g[ch];
      cx.beginPath(); cx.strokeStyle = ch === 1 ? "#1B4F8C" : "#13263F"; cx.lineWidth = ch === 1 ? 3 : 2.4; cx.setLineDash(ch === 1 ? [] : [12, 7]);
      for (var k = 0; k <= N; k++) {
        var t = ts + k / N * 10 * R.tdiv, v = valeur(g, t), y = H / 2 - (R.pos[ch] + v / R.vdiv[ch]) * DY;
        pts.push([t - d.t0, v]); y = Math.max(-2, Math.min(H + 2, y));
        if (k === 0) cx.moveTo(k / N * W, y); else cx.lineTo(k / N * W, y);
      }
      cx.stroke(); cx.setLineDash([]); DERNIER.traces[ch] = pts;
      /* repère de masse (0 V) de la voie */
      var y0 = H / 2 - R.pos[ch] * DY; cx.fillStyle = ch === 1 ? "#1B4F8C" : "#13263F";
      cx.beginPath(); cx.moveTo(0, y0 - 9); cx.lineTo(14, y0); cx.lineTo(0, y0 + 9); cx.fill();
      cx.font = "bold 16px IBM Plex Sans, sans-serif"; cx.fillText(String(ch), 16, y0 + 6);
    });
    /* repère de déclenchement */
    var xt = R.hpos * DX; cx.fillStyle = "#B45309"; cx.beginPath(); cx.moveTo(xt - 9, 0); cx.lineTo(xt + 9, 0); cx.lineTo(xt, 13); cx.fill();
    /* curseurs */
    if (R.cur !== "off") {
      cx.strokeStyle = "#B45309"; cx.lineWidth = 2; cx.setLineDash([10, 5]); cx.font = "bold 18px IBM Plex Sans, sans-serif"; cx.fillStyle = "#B45309";
      [["A", R.a], ["B", R.b]].forEach(function (c) {
        cx.beginPath();
        if (R.cur === "t") { var x = c[1] * DX; cx.moveTo(x, 0); cx.lineTo(x, H); cx.stroke(); cx.fillText(c[0], x + 5, H - 10); }
        else { var y = H / 2 - c[1] * DY; cx.moveTo(0, y); cx.lineTo(W, y); cx.stroke(); cx.fillText(c[0], W - 24, y - 6); }
      });
      cx.setLineDash([]);
    }
    afficherInfos(R, d); afficherLecture(R);
  }
  function afficherInfos(R, d) {
    var h = "<span>CH1 " + fVdiv(R.vdiv[1]) + "</span><span>CH2 " + fVdiv(R.vdiv[2]) + "</span><span>" + fTdiv(R.tdiv) + "</span><span>Décl. CH" + R.src + " " + (R.front === "montant" ? "↗" : "↘") + " " + nb(R.niv, 2) + " V" + (d.ok ? "" : " (non trouvé : affichage libre)") + "</span>";
    $("infos").innerHTML = h;
  }
  function lectureTexte(R) {
    if (R.cur === "t") {
      var ta = (R.a - R.hpos) * R.tdiv, tb = (R.b - R.hpos) * R.tdiv, dt = tb - ta;
      return { txt: "<b>Curseurs temps</b> · A : " + fT(ta) + " · B : " + fT(tb) + " · <b>Δt = " + fT(Math.abs(dt)) + "</b>" + (dt !== 0 ? " · <b>1/Δt = " + fF(1 / Math.abs(dt)) + "</b>" : ""), dt: Math.abs(dt) };
    }
    if (R.cur === "v") {
      var ch = R.curVoie, va = (R.a - R.pos[ch]) * R.vdiv[ch], vb = (R.b - R.pos[ch]) * R.vdiv[ch];
      return { txt: "<b>Curseurs tension (CH" + ch + ")</b> · A : " + fV(va) + " · B : " + fV(vb) + " · <b>ΔU = " + fV(Math.abs(vb - va)) + "</b>", dv: Math.abs(vb - va) };
    }
    return { txt: "Curseurs désactivés : compte les carreaux, ou choisis un mode de curseurs." };
  }
  function afficherLecture(R) { $("lecture").innerHTML = lectureTexte(R).txt; }

  /* ---------- interface ---------- */
  function remplir(sel, liste, f, val) { sel.innerHTML = liste.map(function (v) { return '<option value="' + v + '"' + (v === val ? " selected" : "") + ">" + f(v) + "</option>"; }).join(""); }
  function proche(liste, v) { var m = liste[0]; liste.forEach(function (x) { if (Math.abs(Math.log(x / v)) < Math.abs(Math.log(m / v))) m = x; }); return m; }
  function construireGen(ch) {
    var z = $("gen" + ch), g = S.g[ch];
    if (S.cache) { z.innerHTML = '<span class="titre">Générateur : ' + (g.type === "aucun" ? "aucun signal" : "signal mystère — paramètres masqués : mesure-les !") + "</span>"; return; }
    var h = '<span class="titre">Générateur de la voie ' + ch + '</span><label>Type <select data-g="type">' + Object.keys(TYPES).map(function (k) { return '<option value="' + k + '"' + (k === g.type ? " selected" : "") + ">" + TYPES[k] + "</option>"; }).join("") + "</select></label>";
    (CHAMPS[g.type] || []).forEach(function (c) {
      var k = c[0], v = g[k];
      if (k === "txt") h += '<label>' + c[1] + ' <input type="text" maxlength="8" data-g="txt" value="' + String(v).replace(/"/g, "&quot;") + '"></label>';
      else if (k === "baud") h += '<label>' + c[1] + ' <select data-g="baud">' + [1200, 2400, 4800, 9600, 19200, 38400, 115200].map(function (b) { return '<option value="' + b + '"' + (b === +v ? " selected" : "") + ">" + nb(b, 0) + " bit/s</option>"; }).join("") + "</select></label>";
      else if (k === "parite") h += '<label>' + c[1] + ' <select data-g="parite">' + ["aucune", "paire", "impaire"].map(function (p) { return '<option' + (p === v ? " selected" : "") + ">" + p + "</option>"; }).join("") + "</select></label>";
      else if (k === "stop") h += '<label>' + c[1] + ' <select data-g="stop"><option' + (+v === 1 ? " selected" : "") + '>1</option><option' + (+v === 2 ? " selected" : "") + ">2</option></select></label>";
      else h += '<label>' + c[1] + ' <input type="number" data-g="' + k + '" step="' + c[3] + '" value="' + v + '"> ' + c[2] + "</label>";
    });
    z.innerHTML = h;
  }
  var DEFAUTS = { aucun: {}, sinus: { U: 2, f: 1000, dc: 0 }, carre: { U: 2, f: 1000 }, mli: { U: 5, f: 500, a: 25 }, ultrason: { d: 50, Tm: 60 }, uart: { txt: "A", baud: 9600, parite: "aucune", stop: 1 } };
  function surGen(ch, ev) {
    var k = ev.target.getAttribute("data-g"); if (!k) return;
    var g = S.g[ch];
    if (k === "type") { S.g[ch] = Object.assign({ type: ev.target.value }, DEFAUTS[ev.target.value]); construireGen(ch); }
    else { g[k] = (k === "txt" || k === "parite") ? ev.target.value : +ev.target.value; delete g._b; }
    dessiner();
  }
  function appliquerPreset(id) {
    var p = PRESETS[id] || PRESETS.libre; S.preset = PRESETS[id] ? id : "libre"; S.cache = p.cache;
    S.g[1] = JSON.parse(JSON.stringify(p.g1)); S.g[2] = JSON.parse(JSON.stringify(p.g2));
    var r = p.r || {};
    $("ch1-on").checked = true; $("ch2-on").checked = !!r.ch2;
    $("ch1-vdiv").value = String(r.v1 || 1); $("ch2-vdiv").value = String(r.v2 || 1);
    $("ch1-pos").value = 0; $("ch2-pos").value = 0;
    $("tdiv").value = String(r.t || 1e-3); $("hpos").value = r.h !== undefined ? r.h : 1;
    $("trig-src").value = "1"; $("trig-niv").value = r.niv !== undefined ? r.niv : 0.5; $("trig-front").value = r.front || "montant";
    $("preset").value = S.preset;
    $("preset-info").textContent = p.cache ? "Les réglages de départ ne sont pas les bons : choisis le calibre et la base de temps pour bien voir le signal, puis mesure." : "Tu peux modifier les générateurs de chaque voie.";
    construireGen(1); construireGen(2); dessiner();
  }

  /* ---------- curseurs à la souris / au doigt ---------- */
  var glisse = null;
  function posDiv(ev) { var r = cv.getBoundingClientRect(); return { x: (ev.clientX - r.left) / r.width * 10, y: 4 - (ev.clientY - r.top) / r.height * 8 }; }
  cv.addEventListener("pointerdown", function (ev) {
    var R = lireReglages(); if (R.cur === "off") return;
    var p = posDiv(ev), v = R.cur === "t" ? p.x : p.y;
    glisse = Math.abs(v - R.a) <= Math.abs(v - R.b) ? "cur-a" : "cur-b";
    $(glisse).value = Math.round(v * 100) / 100; cv.setPointerCapture(ev.pointerId); dessiner();
  });
  cv.addEventListener("pointermove", function (ev) { if (!glisse) return; var R = lireReglages(), p = posDiv(ev); $(glisse).value = Math.round((R.cur === "t" ? Math.max(0, Math.min(10, p.x)) : Math.max(-4, Math.min(4, p.y))) * 100) / 100; dessiner(); });
  cv.addEventListener("pointerup", function () { glisse = null; });

  /* ---------- démarrage ---------- */
  remplir($("ch1-vdiv"), VDIV, fVdiv, 1); remplir($("ch2-vdiv"), VDIV, fVdiv, 1); remplir($("tdiv"), TDIV, fTdiv, 1e-3);
  $("preset").innerHTML = Object.keys(PRESETS).map(function (k) { return '<option value="' + k + '">' + PRESETS[k].nom + "</option>"; }).join("");
  $("preset").addEventListener("change", function () { appliquerPreset($("preset").value); });
  ["ch1-on", "ch2-on", "ch1-vdiv", "ch2-vdiv", "ch1-pos", "ch2-pos", "tdiv", "hpos", "trig-src", "trig-niv", "trig-front", "cur-voie", "cur-a", "cur-b"].forEach(function (id) { $(id).addEventListener("input", dessiner); $(id).addEventListener("change", dessiner); });
  $("cur-mode").addEventListener("change", function () { if ($("cur-mode").value === "v") { $("cur-a").value = -1; $("cur-b").value = 1; } else if ($("cur-mode").value === "t") { $("cur-a").value = 2; $("cur-b").value = 6; } dessiner(); });
  $("gen1").addEventListener("change", function (e) { surGen(1, e); }); $("gen2").addEventListener("change", function (e) { surGen(2, e); });
  var q = /[?&]signal=([a-z0-9]+)/.exec(location.search);
  appliquerPreset(q ? q[1] : "libre");

  /* ---------- API (tests automatiques) ---------- */
  window.OSC = {
    regler: function (o) { Object.keys(o).forEach(function (k) { var e = $(k); if (!e) return; if (e.type === "checkbox") e.checked = !!o[k]; else e.value = String(o[k]); }); dessiner(); },
    generateur: function (ch, g) { S.cache = false; S.g[ch] = Object.assign({}, g); construireGen(ch); dessiner(); },
    preset: appliquerPreset,
    trace: function (ch) { return DERNIER.traces[ch] || []; },
    etat: function () { return { t0: DERNIER.t0, declenche: DERNIER.trig, ts: DERNIER.ts }; },
    lecture: function () { return $("lecture").textContent; },
    valeur: function (ch, t) { return valeur(S.g[ch], t); },
    periode: function (ch) { return periode(S.g[ch]); }
  };
})();
