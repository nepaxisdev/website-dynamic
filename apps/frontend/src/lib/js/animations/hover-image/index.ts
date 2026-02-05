import gsap from 'gsap';

interface MousePosition {
	x: number;
	y: number;
}
interface AnimatableProperty {
	previous: number;
	current: number;
	amt: number;
}
interface AnimatableProperties {
	[key: string]: AnimatableProperty;
}

// --- Utils ---
const map = (x: number, a: number, b: number, c: number, d: number): number =>
	((x - a) * (d - c)) / (b - a) + c;
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;
const clamp = (num: number, min: number, max: number): number =>
	num <= min ? min : num >= max ? max : num;

/**
 * Main Initialization Function
 * @param containerSelector - The parent container of the menu items
 * @param itemSelector - The individual items trigger the hover
 */
export function initFloatingImages(
	containerSelector: string = '.capabilities__section',
	itemSelector: string = '.floating__image-wrapper'
) {
	const menuEl = document.querySelector(containerSelector) as HTMLElement;
	if (!menuEl) return;

	const menuItemsDOM = menuEl.querySelectorAll(itemSelector);
	let mousepos: MousePosition = { x: 0, y: 0 };
	let mousePosCache: MousePosition = { x: 0, y: 0 };
	let direction: MousePosition = { x: 0, y: 0 };

	// Update global mouse position for this instance
	const onMouseMove = (ev: MouseEvent) => {
		mousepos = { x: ev.clientX, y: ev.clientY };
	};
	window.addEventListener('mousemove', onMouseMove);

	class MenuItem {
		private dom: any = {};
		private animProps: AnimatableProperties;
		private bounds!: { el: DOMRect; reveal: DOMRect };
		private firstRAFCycle = false;
		private requestId?: number;
		private imageUrl: string;

		constructor(el: HTMLElement, imageUrl: string) {
			this.dom.el = el;
			this.imageUrl = imageUrl;
			this.dom.textInner = el.querySelector('.floating__image-text');

			// Unique properties per item to prevent shared state lag
			this.animProps = {
				tx: { previous: 0, current: 0, amt: 0.08 },
				ty: { previous: 0, current: 0, amt: 0.08 },
				rotation: { previous: 0, current: 0, amt: 0.08 },
				brightness: { previous: 1, current: 1, amt: 0.08 }
			};

			this.layout();
			this.initEvents();
		}

		private layout() {
			this.dom.reveal = document.createElement('div');
			this.dom.reveal.className = 'hover-reveal';
			this.dom.revealInner = document.createElement('div');
			this.dom.revealInner.className = 'hover-reveal__inner';
			this.dom.revealImage = document.createElement('div');
			this.dom.revealImage.className = 'hover-reveal__img';
			this.dom.revealImage.style.backgroundImage = `url(${this.imageUrl})`;

			this.dom.revealInner.appendChild(this.dom.revealImage);
			this.dom.reveal.appendChild(this.dom.revealInner);
			this.dom.el.appendChild(this.dom.reveal);
		}

		private initEvents() {
			this.dom.el.addEventListener('mouseenter', () => {
				this.firstRAFCycle = true;
				this.showImage();
				this.loopRender();
			});
			this.dom.el.addEventListener('mouseleave', () => {
				this.stopRendering();
				this.hideImage();
			});
		}

		private showImage() {
			gsap.killTweensOf([this.dom.revealInner, this.dom.revealImage]);
			const tl = gsap.timeline({
				onStart: () => {
					this.dom.reveal.style.opacity = '1';
					gsap.set(this.dom.el, { zIndex: 100 });
				}
			});
			tl.to(
				this.dom.revealInner,
				{
					duration: 0.2,
					ease: 'sine.out',
					startAt: { x: direction.x < 0 ? '-100%' : '100%' },
					x: '0%'
				},
				0
			).to(
				this.dom.revealImage,
				{
					duration: 0.2,
					ease: 'sine.out',
					startAt: { x: direction.x < 0 ? '100%' : '-100%' },
					x: '0%'
				},
				0
			);
		}

		private hideImage() {
			gsap.killTweensOf([this.dom.revealInner, this.dom.revealImage]);
			gsap
				.timeline({
					onStart: () => {
						gsap.set(this.dom.el, { zIndex: 1 });
					},
					onComplete: () => {
						gsap.set(this.dom.reveal, { opacity: 0 });
					}
				})
				.to(
					this.dom.revealInner,
					{ duration: 0.2, ease: 'sine.out', x: direction.x < 0 ? '100%' : '-100%' },
					0
				)
				.to(
					this.dom.revealImage,
					{ duration: 0.2, ease: 'sine.out', x: direction.x < 0 ? '-100%' : '100%' },
					0
				);
		}

		private loopRender() {
			if (!this.requestId) this.requestId = requestAnimationFrame(() => this.render());
		}

		private stopRendering() {
			if (this.requestId) {
				cancelAnimationFrame(this.requestId);
				this.requestId = undefined;
			}
		}

		private render() {
			this.requestId = undefined;
			if (this.firstRAFCycle)
				this.bounds = {
					el: this.dom.el.getBoundingClientRect(),
					reveal: this.dom.reveal.getBoundingClientRect()
				};

			const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
			direction = { x: mousePosCache.x - mousepos.x, y: mousePosCache.y - mousepos.y };
			mousePosCache = { ...mousepos };

			this.animProps.tx.current =
				Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.reveal.width / 2;
			this.animProps.ty.current =
				Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height / 2;
			this.animProps.rotation.current = this.firstRAFCycle
				? 0
				: map(mouseDistanceX, 0, 100, 0, direction.x < 0 ? 60 : -60);
			this.animProps.brightness.current = this.firstRAFCycle
				? 1
				: map(mouseDistanceX, 0, 100, 1, 2);

			for (const key in this.animProps) {
				this.animProps[key].previous = this.firstRAFCycle
					? this.animProps[key].current
					: lerp(
							this.animProps[key].previous,
							this.animProps[key].current,
							this.animProps[key].amt
						);
			}

			gsap.set(this.dom.reveal, {
				x: this.animProps.tx.previous,
				y: this.animProps.ty.previous,
				rotation: this.animProps.rotation.previous,
				filter: `brightness(${this.animProps.brightness.previous})`
			});

			this.firstRAFCycle = false;
			this.loopRender();
		}

		public getTextInner() {
			return this.dom.textInner;
		}
		public destroy() {
			this.stopRendering();
		}
	}

	// Initialize Items
	const items: MenuItem[] = [];
	menuItemsDOM.forEach((el) => {
		const url = (el as HTMLElement).getAttribute('data-img');
		if (url) items.push(new MenuItem(el as HTMLElement, url));
	});

	// Entrance Animation
	const textInners = items.map((i) => i.getTextInner()).filter(Boolean);
	gsap.to(textInners, {
		duration: 1.2,
		ease: 'expo.out',
		startAt: { y: '100%' },
		y: 0,
		delay: (i) => i * 0.06
	});

	// Return cleanup function
	return {
		destroy: () => {
			window.removeEventListener('mousemove', onMouseMove);
			items.forEach((item) => item.destroy());
		}
	};
}
