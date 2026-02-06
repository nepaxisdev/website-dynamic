import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initASCIIAnimations } from './ascii_animations';


export function initAsciiTimeline(art: HTMLElement, card: HTMLElement) {

	initASCIIAnimations(art);

	const asciiTimeline = gsap
		.timeline({
			trigger: '.ascii__section',
			start: 'top 80%',
			toggleActions: 'play none none none'
		})
		.addLabel('start');


	asciiTimeline.to(card, {
		scale: 1.15,
		rotationX: -10,
		rotateY: -10,
		transformOrigin: 'top center',
		filter: 'blur(0.1rem)',
		ease: 'power2.out',
		backgroundColor: 'var(--clr-neutral-1000)',
		scrollTrigger: {
			trigger: card,
			start: 'top 0%',
			end: 'bottom 5%',
			endTrigger: '.ascii__section',
			scrub: true,
			pin: ".ascii__section",
			pinSpacing: false,
			onEnter: () => {
				initASCIIAnimations(art);
				art.style.pointerEvents = 'auto';
			},
			onLeave: () => {
				// destroyASCIIAnimation();
				art.style.pointerEvents = 'none';
			},
			onEnterBack: () => {
				initASCIIAnimations(art);
				art.style.pointerEvents = 'auto';
			},
			onLeaveBack: () => {
				// destroyASCIIAnimation();
				art.style.pointerEvents = 'none';
			},
		}
	})

	// asciiTimeline.scrollTrigger?.disable(true);
}
