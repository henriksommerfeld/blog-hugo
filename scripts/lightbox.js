// 'use strict';

// export default class LightBox {
//     constructor() {
//         const hasLightbox = document.querySelector('#lightbox-container');
//         if (!hasLightbox) return;

//         console.log('%c 🖼️ Lightbox module loaded', 'font-size:1.5em');

//         this.cancelShowImage = false;

//         this.addOpenEvent();
//         this.addCancelEvent();
//         this.addCloseOnEscEvent();
//     }

//     addCancelEvent() {
//         const cancel = event => {
//             this.cancelShowImage = true;
//             this.closeModal(event);
//         };
//         document.getElementById('lightbox-loading').addEventListener('click', cancel);
//         document.getElementById('lightbox-loading').addEventListener('touch', cancel, {passive: true});
//     }

//     addCloseOnEscEvent() {
//         document.addEventListener("keyup", e => {
//             if (e.key !== 'Escape') return;

//             const container = document.getElementById("lightbox-container");
//             if (!container.classList.contains("open")) return;
            
//             this.closeModal(e);            
//         });
//     }

//     addOpenEvent() {
//         const openLightbox = event => {
//             event.preventDefault();
//             this.cancelShowImage = false;
//             const imageElement = event.currentTarget.querySelector('img');
//             const imageUrl = event.currentTarget.href;
//             const topOffset = event.currentTarget.offsetTop + (imageElement.clientHeight / 2) - window.pageYOffset;
//             const leftOffset = imageElement.offsetLeft + (imageElement.clientWidth / 2);

//             const lightbox = document.getElementById('lightbox');
//             lightbox.style.cssText = `transform-origin: ${leftOffset}px ${topOffset}px`;
//             const container = document.getElementById('lightbox-container');
//             container.classList.remove('close');
//             container.classList.add('open');

//             const img = lightbox.querySelector('img');
//             if (!img || img.getAttribute('src') !== imageUrl) {
//                 img && img.remove();
//                 setTimeout(() => {
//                     if (lightbox.querySelectorAll('img').length === 0)
//                         document.getElementById('lightbox-loading-container').style.display = 'flex';
//                 }, 500);
//                 let downloadingImage = new Image();
//                 downloadingImage.onload = () => {
//                     if (!this.cancelShowImage) {
//                         document.getElementById('lightbox-loading-container').style.display = 'none';
//                         lightbox.append(downloadingImage);                        
//                         lightbox.classList.remove('close');
//                         lightbox.classList.add('open');
                                    
//                         downloadingImage.addEventListener('click', this.closeModal);
//                         downloadingImage.addEventListener('touchmove', this.closeModal);
//                     }
//                 };
//                 downloadingImage.src = imageUrl;                
//             }
//             else {
//                 lightbox.classList.remove('close');
//                 lightbox.classList.add('open');
//             }
//             document.querySelector('body').classList.add('modal-open');
//         };


//         const figureAnchors = document.querySelectorAll('figure > a');
//         figureAnchors.forEach(element => {
//             element.addEventListener('click', openLightbox);
//         });       
//     }

//     closeModal(e) {
//         document.getElementById('lightbox-loading-container').style.display = 'none';
//         const elements = document.querySelectorAll('#lightbox-container, #lightbox, #lightbox-loading');
//         elements.forEach(element => {
//             element.classList.remove('open');
//             element.classList.add('close');
//         })
//         document.querySelector('body').classList.remove('modal-open');
//         e.preventDefault();
//     }
// }