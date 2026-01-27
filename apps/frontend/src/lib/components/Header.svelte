<script lang="ts">
	import { Logo } from './Logo';
	// import { handleSingleShuffle } from '$lib/js/animations/shuffle';
	let navToggled = $state<boolean>(false);
	const buttonText = $derived<string>(navToggled ? 'Close' : 'Menu');
	let navText = $state<HTMLElement>();
	let navCard = $state<HTMLElement>();

	function toggleNavBar(e: Event) {
		e.stopPropagation();
		navToggled = !navToggled;
		// if (navToggled) {
		// 	handleSingleShuffle({ el: navText, newText: buttonText });
		// }
	}

	function documentClickHandler(e: MouseEvent): void {
		if (navCard && !navCard.contains(e.target as Node)) {
			navToggled = false;
			// handleSingleShuffle({ el: navText, newText: buttonText });
		}
	}

	function documentKeyDownHandler(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			navToggled = false;
			// handleSingleShuffle({ el: navText, newText: buttonText });
		}
	}

	// $effect(() => {
	// 	handleSingleShuffle({ el: navText });
	// });
</script>

<svelte:document onkeydown={documentKeyDownHandler} onclick={documentClickHandler} />

<header
	class="nav__main content-grid py-2 py-md-3 {navToggled ? 'nav--toggled' : ''}"
	id="headerNav"
	data-logo-active="light"
>
	<div class="nav__modal content-grid">
		<div class="nav__card gap-4" bind:this={navCard}>
			<ul class="nav__list strip-style">
				<li class="nav__list-item">
					<a href="#home-section" class="nav__list-link" data-scroll-to="#home-section">
						<div class="nav__list-label">Home</div>
					</a>
				</li>
				<li class="nav__list-item">
					<a href="#about-section" class="nav__list-link" data-scroll-to="#about-section">
						<div class="nav__list-label">About Us</div>
					</a>
				</li>
				<li class="nav__list-item">
					<a href="#services-section" class="nav__list-link" data-scroll-to="#services-section">
						<div class="nav__list-label">Services</div>
					</a>
				</li>
				<li class="nav__list-item">
					<a href="#approach-section" class="nav__list-link" data-scroll-to="#approach-section">
						<div class="nav__list-label">Our Approach</div>
					</a>
				</li>

				<li class="nav__list-item">
					<a href="#contact-section" class="nav__list-link" data-scroll-to="#contact-section">
						<div class="nav__list-label">Contact</div>
					</a>
				</li>
			</ul>
			<div>
				<div class="fl-lg-row jc-between al-center mb-4">
					<div class="social__link-wrapper fl-row gap-2 gap-lg-3">
						<a
							href="https://www.linkedin.com/company/nepaxis/"
							class="social--linkedin social--light"
							target="_blank"
						>
							<div class="sr-only">Linked In</div>
						</a>
						<a href="https://x.com/nepaxis" class="social--x social--light" target="_blank">
							<div class="sr-only">X</div>
						</a>
						<a
							href="https://www.facebook.com/profile.php?id=61583287982556"
							class="social--facebook social--light"
							target="_blank"
						>
							<div class="sr-only">Facebook</div>
						</a>
						<a
							href="https://wa.me/971561448979"
							class="social--whatsapp social--light"
							target="_blank"
						>
							<div class="sr-only">Whatsapp</div>
						</a>
						<a
							href="https://www.instagram.com/nepaxis"
							class="social--instagram social--light"
							target="_blank"
						>
							<div class="sr-only">Instagram</div>
						</a>
					</div>
				</div>
				<div class="grid-lg-row">
					<div class="info-wrapper--left col-lg-6 mb-3">
						<p class="medium-15 neutral-100 mb-1 mb-md-2 uppercase">Business</p>
						<div class="mb-2">
							<a class="link" href="mailto:hi@nepaxis.com">hi@nepaxis.com</a>
						</div>
						<div class="mb-2">
							<a class="link" href="tel:+971 56 144 8979">+971 56 144 8979</a>
						</div>
						<address class="uppercase no-italics regular-13 neutral-200">
							RAG Global Business Hun. <br />
							Al Qusais 2, 102-36 <br />
							Dubai, United Arab Emirates <br />
						</address>
					</div>
					<div class="info-wrapper--right col-lg-6 ps-lg-5">
						<div class="info--careers mb-3 mb-lg-4">
							<p class="medium-15 neutral-100 mb-1 mb-md-2 uppercase">Careers</p>
							<p class="uppercase no-italics regular-13 neutral-200 mb-1">Join us</p>
							<div>
								<a class="link" href="mailto:hr@nepaxis.com">hr@nepaxis.com</a>
							</div>
						</div>
						<div class="info--help">
							<p class="medium-15 neutral-100 mb-1 mb-md-2 uppercase">Help & Support</p>
							<p class="uppercase no-italics regular-13 neutral-200 mb-1">
								Do you have a request / Query?
							</p>
							<div>
								<a class="link" href="mailto:support@nepaxis.com">support@nepaxis.com</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<nav class="fl-row jc-between al-center">
		<h1 class="relative">
			<a href="#home-section" class="nav__logo" data-scroll-to="#home-section">
				<Logo fill="currentColor" />

				<span class="sr-only">Nepaxis</span>
			</a>
		</h1>
		<button
			class="menu__btn btn--outline btn--white btn--narrow btn--primary"
			aria-label="Open Menu"
			onclick={toggleNavBar}
		>
			<span class="btn__wrapper">
				<span class="btn__text" bind:this={navText}>{buttonText}</span>
				<span class="btn__icon">
					<svg
						width="14"
						height="7"
						viewBox="0 0 14 7"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M0 0H7V1.16667H0V0Z" fill="currentColor" />
						<path d="M7 0.583333H14V1.45833H7V0.583333Z" fill="currentColor" />
						<path d="M0 5.54167H7V6.41667H0V5.54167Z" fill="currentColor" />
						<path d="M7 5.83333H14V7H7V5.83333Z" fill="currentColor" />
					</svg>
				</span>
			</span>
		</button>
	</nav>
</header>
