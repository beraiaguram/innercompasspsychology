async function loadJSON(path){const r=await fetch(path,{cache:"no-store"});if(!r.ok)throw new Error("Failed "+path);return r.json();}
function get(obj, path){return path.split(".").reduce((o,k)=>o&&o[k], obj);}
function bindScalar(root, data, name, fn){root.querySelectorAll(`[data-${name}]`).forEach(el=>{const v=get(data, el.dataset[name]); if(v!=null) fn(el,v);});}
function renderRepeats(root, data){
  root.querySelectorAll("[data-repeat]").forEach(container=>{
    const list=get(data, container.dataset.repeat) || [];
    const tpl = container.querySelector("[data-template]");
    if(!tpl) return;
    container.innerHTML="";
    list.forEach(item=>{
      const frag = tpl.content ? tpl.content.cloneNode(true) : tpl.cloneNode(true);
      const wrap = document.createElement("div"); wrap.appendChild(frag);
      bindScalar(wrap, item, "text", (el,v)=>el.textContent=v);
      bindScalar(wrap, item, "html", (el,v)=>el.innerHTML=v);
      bindScalar(wrap, item, "src", (el,v)=>el.setAttribute("src", v));
      container.append(...wrap.childNodes);
    });
  });
}
async function loadContent(map){
  const data = {};
  await Promise.all(Object.entries(map).map(async([k,p])=>{data[k]=await loadJSON(p);}));
  const root=document;
  bindScalar(root, data, "text", (el,v)=>el.textContent=v);
  bindScalar(root, data, "html", (el,v)=>el.innerHTML=v);
  bindScalar(root, data, "src", (el,v)=>el.setAttribute("src", v));
  renderRepeats(root, data);
}
