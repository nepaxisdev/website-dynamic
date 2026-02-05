import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initLazyLoadImages } from './lazy-load';
import { initShuffleButtonHover } from './shuffle';


gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
	initLazyLoadImages();
	initShuffleButtonHover();
}
