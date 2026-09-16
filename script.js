const warning=document.getElementById("warning");
const site=document.getElementById("site");
const enterBtn=document.getElementById("enterBtn");
const ambience=document.getElementById("ambience");

enterBtn.addEventListener("click",()=>{
  warning.style.transition="opacity 900ms ease";
  warning.style.opacity="0";
  setTimeout(()=>{
    warning.style.display="none";
    site.style.display="block";
    window.scrollTo(0,0);
    if(ambience){
      ambience.volume=0.22;
      ambience.play().catch(()=>{});
    }
  },900);
});

const logo=document.querySelector(".logo");
setInterval(()=>{
  if(logo && Math.random()>0.78){
    logo.style.transform=`translate(${Math.random()*4-2}px,${Math.random()*2-1}px)`;
    setTimeout(()=>logo.style.transform="translate(0,0)",70);
  }
},600);

/* GALERÍA INTERACTIVA */
const galleryRoot=document.getElementById("gallery");
const lightbox=document.getElementById("lightbox");
const lightboxImage=document.getElementById("lightboxImage");
const lightboxCaption=document.getElementById("lightboxCaption");
const closeBtn=document.getElementById("lightboxClose");
const prevBtn=document.getElementById("lightboxPrev");
const nextBtn=document.getElementById("lightboxNext");
let availableItems=[];
let currentIndex=0;

function refreshGallery(){availableItems=[...document.querySelectorAll("#gallery figure")];}
function openLightbox(index){
  refreshGallery();
  if(!availableItems.length)return;
  currentIndex=index;
  const fig=availableItems[currentIndex], img=fig.querySelector("img"), cap=fig.querySelector("figcaption");
  lightboxImage.src=img.src;
  lightboxImage.alt=img.alt;
  lightboxCaption.textContent=cap?cap.textContent:"";
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden","false");
  document.body.style.overflow="hidden";
}
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
  lightboxImage.src="";
  document.body.style.overflow="";
}
function showNext(){refreshGallery();if(availableItems.length)openLightbox((currentIndex+1)%availableItems.length);}
function showPrev(){refreshGallery();if(availableItems.length)openLightbox((currentIndex-1+availableItems.length)%availableItems.length);}

document.querySelectorAll("#gallery figure").forEach(fig=>{
  const img=fig.querySelector("img");
  img.addEventListener("error",()=>{fig.remove();refreshGallery();});
  fig.addEventListener("click",()=>{refreshGallery();const i=availableItems.indexOf(fig);if(i!==-1)openLightbox(i);});
});
closeBtn.addEventListener("click",closeLightbox);
nextBtn.addEventListener("click",showNext);
prevBtn.addEventListener("click",showPrev);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{
  if(!lightbox.classList.contains("open"))return;
  if(e.key==="Escape")closeLightbox();
  if(e.key==="ArrowRight")showNext();
  if(e.key==="ArrowLeft")showPrev();
});
refreshGallery();
