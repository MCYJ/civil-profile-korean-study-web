"use strict";
(() => {
 const cases=[[[0,100],[50,101],[100,102]],[[0,100],[50,102],[100,100]],[[0,100],[20,101],[100,102]]];
 const select=document.getElementById("example-select");if(!select)return;
 const fmt=value=>(value>0?"+":"")+value.toFixed(4)+"%";
 function update(){
  const n=Number(select.value);if(!Number.isInteger(n)||!cases[n])return;
  const p=cases[n],g=(a,b)=>(b[1]-a[1])/(b[0]-a[0])*100;
  document.getElementById("segment-grades").textContent=fmt(g(p[0],p[1]))+" / "+fmt(g(p[1],p[2]));
  document.getElementById("overall-grade").textContent=fmt(g(p[0],p[2]));
  const min=Math.min(...p.map(x=>x[1])),max=Math.max(...p.map(x=>x[1])),scale=Math.min(510/(p[2][0]-p[0][0]),200/((max-min)*5||1));
  const left=45+(510-(p[2][0]-p[0][0])*scale)/2,bottom=30+(200+(max-min)*5*scale)/2;
  const xy=p.map(x=>[left+(x[0]-p[0][0])*scale,bottom-(x[1]-min)*5*scale]);
  document.getElementById("profile-line").setAttribute("d",xy.map((x,i)=>(i?"L":"M")+x[0]+" "+x[1]).join(""));
  const ns="http://www.w3.org/2000/svg",group=document.getElementById("profile-points");group.replaceChildren();
  xy.forEach((v,i)=>{const c=document.createElementNS(ns,"circle");c.setAttribute("cx",v[0]);c.setAttribute("cy",v[1]);c.setAttribute("r",6);group.append(c);const t=document.createElementNS(ns,"text");t.setAttribute("x",v[0]);t.setAttribute("y",v[1]-16);t.setAttribute("text-anchor","middle");t.textContent="ABC"[i];group.append(t)});
  const tbody=document.getElementById("station-values");tbody.replaceChildren();
  p.forEach((v,i)=>{const tr=document.createElement("tr");["ABC"[i],v[0].toFixed(2),v[1].toFixed(2)].forEach(x=>{const td=document.createElement("td");td.textContent=x;tr.append(td)});tbody.append(tr)});
 }
 select.addEventListener("change",update);update();
})();