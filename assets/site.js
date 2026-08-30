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

/* Google Reviews placeholder component
   TODO: Google Review Widget / Trustindex integrieren
   TODO: Rating und Anzahl durch echte Daten ersetzen
   TODO: Platzhalter-Rezensionen durch echte Rezensionen ersetzen
*/
(()=>{
  const slider=document.querySelector('[data-reviews-slider]');
  if(!slider) return;

  // Placeholder data; replace this array with normalized Trustindex / Elfsight / Google Places data later.
  const reviews=[
    {
      quote:'Ein Abend wie in Italien. Herzlich, unkompliziert und mit richtig gutem Essen.',
      author:'Name des Gastes'
    },
    {
      quote:'Seit Jahren eine unserer Lieblingsadressen in München.',
      author:'Name des Gastes'
    },
    {
      quote:'Wunderbare Atmosphäre, sehr gutes Essen und Gastgeber mit Herz.',
      author:'Name des Gastes'
    }
  ];

  const quote=slider.querySelector('[data-review-quote]');
  const author=slider.querySelector('[data-review-author]');
  const counter=slider.querySelector('[data-review-index]');
  const prev=slider.querySelector('[data-review-prev]');
  const next=slider.querySelector('[data-review-next]');
  const stage=slider.querySelector('.review-stage');
  let index=0;
  let startX=null;
  let animating=false;

  const render=(nextIndex)=>{
    if(animating) return;
    animating=true;
    stage.classList.add('is-leaving');

    window.setTimeout(()=>{
      index=(nextIndex+reviews.length)%reviews.length;
      quote.textContent='„'+reviews[index].quote+'“';
      author.textContent=reviews[index].author;
      counter.textContent=String(index+1).padStart(2,'0')+' / '+String(reviews.length).padStart(2,'0');
      stage.classList.remove('is-leaving');
      window.setTimeout(()=>{animating=false},260);
    },180);
  };

  prev.addEventListener('click',()=>render(index-1));
  next.addEventListener('click',()=>render(index+1));

  slider.addEventListener('pointerdown',e=>{
    if(e.pointerType==='mouse') return;
    startX=e.clientX;
  });
  slider.addEventListener('pointerup',e=>{
    if(startX===null) return;
    const dx=e.clientX-startX;
    startX=null;
    if(Math.abs(dx)<45) return;
    render(dx<0?index+1:index-1);
  });
  slider.addEventListener('pointercancel',()=>{startX=null});
})();