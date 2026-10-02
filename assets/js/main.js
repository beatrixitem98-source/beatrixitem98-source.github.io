(function () {
'use strict';
const menuButton=document.getElementById('menu-btn'),drawer=document.getElementById('drawer');
function menu(open,returnFocus){drawer.hidden=!open;menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close menu':'Open menu');if(returnFocus)menuButton.focus();}
if(menuButton&&drawer){menuButton.addEventListener('click',()=>menu(drawer.hidden));drawer.addEventListener('click',e=>{if(e.target.closest('a'))menu(false);});document.addEventListener('click',e=>{if(!drawer.hidden&&!e.target.closest('.site-header'))menu(false);});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!drawer.hidden)menu(false,true);});window.matchMedia('(min-width: 821px)').addEventListener('change',e=>{if(e.matches)menu(false);});}
const dialog=document.getElementById('lightbox');if(!dialog)return;
const image=dialog.querySelector('img'),pan=dialog.querySelector('.lightbox-pan');let trigger;
document.querySelectorAll('.proof-open').forEach(button=>button.addEventListener('click',()=>{trigger=button;const source=button.querySelector('img');image.src=source.src;image.alt=source.alt;pan.classList.toggle('wide',source.naturalWidth/source.naturalHeight>1.8);dialog.querySelector('#lightbox-title').textContent='Enlarged evidence';dialog.querySelector('.lightbox-caption').textContent=button.dataset.caption||'';document.body.classList.add('lightbox-open');dialog.showModal();pan.scrollLeft=0;pan.scrollTop=0;dialog.querySelector('.lightbox-close').focus();}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('lightbox-open');if(trigger)trigger.focus();});
})();
