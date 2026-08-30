const b=document.querySelector('.menu-toggle');
const n=document.querySelector('.nav-links');
if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o))})}

(()=>{
  const normalize=p=>{
    if(!p) return '/';
    p=p.split('?')[0].split('#')[0];
    if(!p.endsWith('/')) p+='/';
    return p.replace(/\/+/g,'/');
  };
  const path=normalize(location.pathname);
  const isIt=path.startsWith('/it/');
  const pages=isIt?[
    {href:'/it/',label:'Home'},
    {href:'/it/menu/',label:'Menu'},
    {href:'/it/ristorante-giardino/',label:'Ristorante & giardino'},
    {href:'/it/eventi/',label:'Eventi'},
    {href:'/it/musica-dal-vivo/',label:'Musica dal vivo'},
    {href:'/it/chi-siamo/',label:'Chi siamo'},
    {href:'/it/prenotazioni/',label:'Prenotazioni'}
  ]:[
    {href:'/',label:'Start'},
    {href:'/speisekarte/',label:'Speisekarte'},
    {href:'/restaurant-biergarten/',label:'Restaurant & Biergarten'},
    {href:'/feiern/',label:'Feiern'},
    {href:'/live-musik/',label:'Live-Musik'},
    {href:'/ueber-uns/',label:'Über uns'},
    {href:'/reservierung/',label:'Reservierung'}
  ];

  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=normalize(new URL(a.href,location.origin).pathname);
    if(href===path){
      a.classList.add('is-active');
      a.setAttribute('aria-current','page');
    }
  });

  const idx=pages.findIndex(p=>normalize(p.href)===path);
  if(idx<0) return;
  const prev=pages[(idx-1+pages.length)%pages.length];
  const next=pages[(idx+1)%pages.length];
  const rail=document.createElement('nav');
  rail.className='page-nav-rail';
  rail.setAttribute('aria-label',isIt?'Navigazione pagina':'Seitennavigation');
  rail.innerHTML=
    '<a href="'+prev.href+'" aria-label="'+(isIt?'Pagina precedente: ':'Vorherige Seite: ')+prev.label+'" title="'+(isIt?'Precedente: ':'Zurück: ')+prev.label+'">↑</a>'+
    '<a href="'+next.href+'" aria-label="'+(isIt?'Pagina successiva: ':'Nächste Seite: ')+next.label+'" title="'+(isIt?'Successiva: ':'Weiter: ')+next.label+'">↓</a>';
  document.body.appendChild(rail);
})();