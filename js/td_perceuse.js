/* TD Perceuse interactif — logique (extraite du fichier généré par build_td_perceuse_interactif.py, sans modification de fond) */

"use strict";
(function(){
var CLE="labrio-td-perceuse-1si-v1", APP="labrio-td-perceuse", NUAGE="https://nuage07.apps.education.fr/index.php/s/tXLpRtew8nFFq7p";
var ITEMS=["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q9e", "Q9f", "Q9g", "RET", "Q10a", "Q10b"], NOMQ={"Q1": "Q1", "Q2": "Q2", "Q3": "Q3", "Q4": "Q4", "Q5": "Q5", "Q6": "Q6", "Q7": "Q7", "Q8": "Q8", "Q9": "Q9 a–d", "Q9e": "Q9 e)", "Q9f": "Q9 f)", "Q9g": "Q9 g)", "RET": "À retenir", "Q10a": "Q10 a)", "Q10b": "Q10 b)"};
var $=function(s,r){return (r||document).querySelector(s);}, $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s));};
var champs=$$(".rep"), eleves=$$(".rep-e"), questions=$$(".q");
var stockage=true, minuteur=null;

function aujourdhui(){var d=new Date(),m=String(d.getMonth()+1).padStart(2,"0"),j=String(d.getDate()).padStart(2,"0");return d.getFullYear()+"-"+m+"-"+j;}
function dateFr(v){var m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(v||"");return m?m[3]+"/"+m[2]+"/"+m[1]:(v||"");}
function sansAccents(s){return String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"");}
function nomFichier(){
  var n=sansAccents($("#e_nom").value).toUpperCase().trim().replace(/\s+/g,"-").replace(/[^A-Z0-9-]/g,"");
  var p=sansAccents($("#e_prenom").value).trim().replace(/\s+/g,"-").replace(/[^A-Za-z0-9-]/g,"");
  if(p)p=p.charAt(0).toUpperCase()+p.slice(1);
  return (n||"NOM")+"_"+(p||"Prenom")+"_TD_Perceuse";
}
var stylePied=document.createElement("style");document.head.appendChild(stylePied);
function majPiedImp(){var el=(($("#e_nom")||{value:""}).value.trim().toUpperCase()+" "+($("#e_prenom")||{value:""}).value.trim()).trim();var t=("TD_Perceuse · © Henri Turpin · Lycée Jean-Claude Fruteau"+(el?" · "+el:"")).replace(/\\/g,"\\\\").replace(/"/g,'\\"');stylePied.textContent='@page{@bottom-center{content:"'+t+'";font-family:"IBM Plex Sans",Arial,sans-serif;font-size:7.5pt;color:#56677A}}';}
function majTitre(){document.title=nomFichier();majPiedImp();}

/* ---- miroirs pour l'impression ---- */
function creerMiroirs(){
  champs.concat(eleves).forEach(function(el){
    var s=document.createElement("span");s.className="imp"+(el.tagName==="TEXTAREA"?" bloc":"");s.setAttribute("aria-hidden","true");
    el.parentNode.insertBefore(s,el.nextSibling);el._imp=s;
  });
}
function majMiroir(el){
  if(!el._imp)return;
  var v=el.value;
  if(el.type==="date")v=dateFr(v);
  if(el.classList.contains("maj"))v=v.toUpperCase();
  el._imp.textContent=v;el._imp.classList.toggle("vide",!v.trim());
}
function autoTaille(t){t.style.height="auto";t.style.height=(t.scrollHeight+2)+"px";}

/* ---- versions ---- */
function poserVersion(q,v){
  q.dataset.m=v;
  $$(".bascule button",q).forEach(function(b){b.setAttribute("aria-pressed",String(b.dataset.v===v));});
}
function majVersionGlobale(){
  var vs=questions.map(function(q){return q.dataset.m;});
  var tousBac=vs.every(function(v){return v==="bac";}), tousRef=vs.every(function(v){return v==="ref";});
  $$("#seg-version button").forEach(function(b){b.setAttribute("aria-pressed",String((b.dataset.v==="bac"&&tousBac)||(b.dataset.v==="ref"&&tousRef)));});
  $("#vlib").textContent=tousBac?"type bac":tousRef?"reformulée":"mixte (type bac ou reformulée selon les questions)";
}

/* ---- état ---- */
function lireEtat(){
  var e={app:APP,version:1,enregistre:new Date().toISOString(),eleve:{},versions:{},reponses:{}};
  eleves.forEach(function(el){e.eleve[el.dataset.eleve]=el.value;});
  questions.forEach(function(q){e.versions[q.dataset.qid]=q.dataset.m;});
  champs.forEach(function(el){if(el.value)e.reponses[el.dataset.champ]=el.value;});
  return e;
}
function appliquerEtat(e){
  e=e||{};var el=e.eleve||{},r=e.reponses||{},v=e.versions||{};
  eleves.forEach(function(x){var k=x.dataset.eleve;x.value=(typeof el[k]==="string")?el[k]:(k==="classe"?"1SI":k==="date"?aujourdhui():"");});
  questions.forEach(function(q){poserVersion(q,v[q.dataset.qid]==="ref"?"ref":"bac");});
  champs.forEach(function(x){x.value=(typeof r[x.dataset.champ]==="string")?r[x.dataset.champ]:"";});
  toutRafraichir();
}
function toutRafraichir(){
  champs.concat(eleves).forEach(function(x){majMiroir(x);if(x.tagName==="TEXTAREA")autoTaille(x);if(x.classList.contains("num"))verifNombre(x);});
  majVersionGlobale();majProgression();majTitre();
}
function sauver(){
  if(!stockage)return;
  try{localStorage.setItem(CLE,JSON.stringify(lireEtat()));
    var d=new Date();etat("Sauvegarde automatique · "+String(d.getHours()).padStart(2,"0")+" h "+String(d.getMinutes()).padStart(2,"0"));}
  catch(err){stockage=false;etat("Sauvegarde automatique indisponible : pense à « Enregistrer mon travail (.json) ».");}
}
function sauverBientot(){clearTimeout(minuteur);minuteur=setTimeout(sauver,400);}
function etat(t){$("#etat").textContent=t;}

/* ---- contrôle léger des nombres ---- */
function verifNombre(el){
  var v=el.value.trim(), ok=!v||/^[-−]?\s*\d[\d\s  ]*([.,]\d+)?$/.test(v);
  el.classList.toggle("a-verifier",!ok);
  el.setAttribute("aria-invalid",String(!ok));
  el.title=ok?"":"Écris seulement le nombre (ex. 12,5) ; l'unité va dans la case d'à côté.";
}

/* ---- progression ---- */
function majProgression(){
  var fait=0;
  ITEMS.forEach(function(q){
    var cs=champs.filter(function(c){return c.dataset.q===q;});
    var n=cs.filter(function(c){return c.value.trim()!=="";}).length;
    var st=n===0?"vide":n===cs.length?"complet":"partiel";
    if(st==="complet")fait++;
    $$('[data-etat-q="'+q+'"]').forEach(function(a){a.dataset.etat=st;a.title=NOMQ[q]+" : "+(st==="vide"?"non commencée":st==="complet"?"remplie":"en cours ("+n+"/"+cs.length+" cases)");});
  });
  var pc=Math.round(100*fait/ITEMS.length);
  $$(".piste i,.prog i").forEach(function(i){i.style.width=pc+"%";});
  $$(".prog-n").forEach(function(s){s.textContent=fait+" / "+ITEMS.length;});
  var p=$("#prog-barre");if(p){p.setAttribute("aria-valuenow",String(fait));}
}

/* ---- fichiers ---- */
function telecharger(){
  var e=lireEtat(), b=new Blob([JSON.stringify(e,null,2)],{type:"application/json"}), a=document.createElement("a");
  a.href=URL.createObjectURL(b);a.download=nomFichier()+".json";document.body.appendChild(a);a.click();
  setTimeout(function(){URL.revokeObjectURL(a.href);a.remove();},1500);
  message("Fichier « "+a.download+" » enregistré (dossier Téléchargements).");
}
function ouvrirFichier(f){
  if(!f)return;
  var lr=new FileReader();
  lr.onload=function(){
    try{var e=JSON.parse(lr.result);if(!e||e.app!==APP)throw new Error("format");
      appliquerEtat(e);sauver();
      message("Travail repris : "+((e.eleve&&((e.eleve.nom||"")+" "+(e.eleve.prenom||"")).trim())||"sans nom")+".");}
    catch(err){message("Ce fichier n'est pas un travail « TD Perceuse » enregistré avec cet outil.");}
  };
  lr.onerror=function(){message("Lecture du fichier impossible.");};
  lr.readAsText(f);
}

/* ---- boîtes maison ---- */
var dernierFocus=null;
function ouvrirBoite(id){dernierFocus=document.activeElement;var m=$(id);m.hidden=false;var b=$("[data-defaut]",m);if(b)b.focus();}
function fermerBoite(id){$(id).hidden=true;if(dernierFocus&&dernierFocus.focus)dernierFocus.focus();}
var tm=null;
function message(t){var m=$("#toast");m.textContent=t;m.hidden=false;clearTimeout(tm);tm=setTimeout(function(){m.hidden=true;},4200);}
function toutEffacer(){
  try{localStorage.removeItem(CLE);}catch(err){}
  appliquerEtat({eleve:{classe:"1SI",date:aujourdhui()}});
  fermerBoite("#boite-effacer");message("Tout a été effacé.");window.scrollTo(0,0);
}
function lancerPdf(){
  if(!$("#e_nom").value.trim()||!$("#e_prenom").value.trim()){
    message("Écris d'abord ton NOM et ton prénom dans le cartouche.");$((!$("#e_nom").value.trim())?"#e_nom":"#e_prenom").focus();return;}
  $("#pdf-nom").textContent=nomFichier()+".pdf";ouvrirBoite("#boite-pdf");
}
function imprimer(){fermerBoite("#boite-pdf");sauver();majTitre();toutRafraichir();setTimeout(function(){window.print();},60);}

/* ---- branchements ---- */
creerMiroirs();
champs.concat(eleves).forEach(function(el){
  el.addEventListener("input",function(){majMiroir(el);if(el.tagName==="TEXTAREA")autoTaille(el);if(el.classList.contains("num"))verifNombre(el);
    if(el.classList.contains("rep-e"))majTitre();majProgression();sauverBientot();});
  el.addEventListener("change",function(){majMiroir(el);sauverBientot();});
});
questions.forEach(function(q){$$(".bascule button",q).forEach(function(b){b.addEventListener("click",function(){poserVersion(q,b.dataset.v);majVersionGlobale();sauverBientot();});});});
$$("#seg-version button").forEach(function(b){b.addEventListener("click",function(){questions.forEach(function(q){poserVersion(q,b.dataset.v);});majVersionGlobale();toutRafraichir();sauverBientot();});});
$$('[data-action="pdf"]').forEach(function(b){b.addEventListener("click",lancerPdf);});
$("#btn-json").addEventListener("click",telecharger);
$("#btn-reprendre").addEventListener("click",function(){$("#fichier").click();});
$("#fichier").addEventListener("change",function(){ouvrirFichier(this.files[0]);this.value="";});
$("#btn-effacer").addEventListener("click",function(){ouvrirBoite("#boite-effacer");});
$("#eff-non").addEventListener("click",function(){fermerBoite("#boite-effacer");});
$("#eff-oui").addEventListener("click",toutEffacer);
$("#pdf-non").addEventListener("click",function(){fermerBoite("#boite-pdf");});
$("#pdf-oui").addEventListener("click",imprimer);
document.addEventListener("keydown",function(ev){if(ev.key==="Escape"){["#boite-effacer","#boite-pdf"].forEach(function(id){if(!$(id).hidden)fermerBoite(id);});}});
$$(".modal-fond,.aide-pdf").forEach(function(f){f.addEventListener("click",function(ev){if(ev.target===f)fermerBoite("#"+f.id);});});
window.addEventListener("beforeprint",function(){majTitre();champs.concat(eleves).forEach(majMiroir);});
window.addEventListener("resize",function(){clearTimeout(window._rt);window._rt=setTimeout(function(){$$("textarea.rep").forEach(autoTaille);},150);});

/* ---- démarrage : reprise automatique ---- */
var e0=null;
try{var brut=localStorage.getItem(CLE);if(brut)e0=JSON.parse(brut);}catch(err){stockage=false;}
if(e0&&e0.app===APP){appliquerEtat(e0);etat("Travail repris automatiquement (sauvegarde de ce navigateur).");}
else{appliquerEtat({eleve:{classe:"1SI",date:aujourdhui()}});etat(stockage?"Sauvegarde automatique activée.":"Sauvegarde automatique indisponible : pense à « Enregistrer mon travail (.json) ».");}
try{if(window.matchMedia&&window.matchMedia("(max-width:860px)").matches)$("#som-det").open=false;}catch(err){}
if(!$("#e_date").value){$("#e_date").value=aujourdhui();majMiroir($("#e_date"));}
})();
