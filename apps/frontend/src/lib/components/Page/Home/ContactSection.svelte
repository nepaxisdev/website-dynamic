<script lang="ts">
	import { getContext, onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { SplitText } from 'gsap/SplitText';
	import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
	import Modal from '$lib/components/Modal/Modal.svelte';
	import type { SiteSetting } from '$backend/src/payload-types';

	const siteSettings = getContext<{ settings: SiteSetting }>('site-settings')
		.settings as SiteSetting;
	const siteInfo = $derived(siteSettings.basic_settings);
	const contacts = $derived(siteInfo.contact);

	type Validation = string | true;
	type ValidationFunction = (a: string) => Validation;
	const ACCESS_KEY = `5e3a9806-0470-49b0-ab74-d7109400cdc6`;

	gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, SplitText);

	let { element = $bindable() } = $props();

	function initTypePin() {
		if (!browser) return;

		document.fonts.ready.then(() => {
			const contact_title = document.querySelector('.contact__title');
			const contact_info = document.querySelector('.contact__info');
			const contact_section = document.querySelector('.contact__section');

			if (contact_title) {
				SplitText.create('.contact__title', {
					type: 'words,lines',
					autoSplit: true,
					onSplit: (self) => {
						gsap.set(self.words, { opacity: 0 });
						gsap.to(self.words, {
							duration: 1,
							opacity: 1,
							ease: 'none',
							scrambleText: {
								speed: 0.7,
								revealDelay: 0.35,
								text: '{original}',
								chars: 'upperCase'
							},
							scrollTrigger: {
								trigger: '.contact__title',
								start: 'top 70%',
								end: 'bottom 0%',
								toggleActions: 'play none none none'
							}
						});
					}
				});
			}

			const fg = gsap.utils.toArray(
				'.contact__section .form__group, .big__button-wrapper'
			) as HTMLElement[];

			fg.forEach((emt, index) => {
				gsap.from(emt, {
					opacity: 0,
					yPercent: 50,
					duration: 1,
					ease: 'power1.out',
					delay: index * 0.1,
					scrollTrigger: {
						trigger: emt,
						start: 'top 90%',
						end: 'bottom 0%',
						toggleActions: 'play none none none'
					}
				});
			});

			if (contact_info && contact_section) {
				const contactInfoTimeline = gsap
					.timeline({
						scrollTrigger: {
							trigger: '.contact__info',
							endTrigger: '.contact__section',
							toggleActions: 'play none none none'
						}
					})
					.addLabel('start');

				const info_titles = gsap.utils.toArray('.info__title') as HTMLElement[];
				if (info_titles.length) {
					gsap.set(info_titles, { opacity: 0 });
					contactInfoTimeline.to(
						info_titles,
						{
							opacity: 1,
							stagger: 0.2,
							ease: 'power1.out',
							duration: 0.8,
							scrambleText: {
								speed: 0.7,
								revealDelay: 0.35,
								text: '{original}',
								chars: 'upperCase'
							}
						},
						'start'
					);
				}

				const info_body_children = gsap.utils.toArray('.info__body > *') as HTMLElement[];
				if (info_body_children.length) {
					contactInfoTimeline.from(
						info_body_children,
						{
							opacity: 0,
							yPercent: 50,
							ease: 'power1.out',
							duration: 0.8,
							stagger: 0.05
						},
						'start+=0.7'
					);
				}
			}
		});
	}

	// Snapshot existing triggers before init so we only kill the ones we create
	let triggersBefore: ScrollTrigger[] = [];

	onMount(() => {
		triggersBefore = ScrollTrigger.getAll();
		initTypePin();

		return () => {
			// Kill only triggers that didn't exist before this component mounted
			ScrollTrigger.getAll()
				.filter((st) => !triggersBefore.includes(st))
				.forEach((st) => st.kill());
			triggersBefore = [];
		};
	});

	// --------------- Form logic (unchanged) ---------------

	function validateFullName(value: string): Validation {
		if (!value.trim() || value.trim().length <= 0) {
			return 'Full Name is required';
		}
		return true;
	}
	function validateCompanyName(value: string): Validation {
		if (value.trim() && value.trim().length < 2) {
			return 'Company Name must be at least 2 characters';
		}
		return true;
	}
	function validateEmail(value: string): Validation {
		if (!value.trim() || value.trim().length <= 0) {
			return 'Email is required';
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(value.trim())) {
				return 'Enter a valid email';
			}
		}
		return true;
	}
	function validatePhoneNumber(value: string): Validation {
		const phoneRegex = /^[0-9+\-\s()]{7,}$/;
		if (value.trim()) {
			if (!phoneRegex.test(value.trim())) {
				return 'Enter a valid phone number.';
			}
		}
		return true;
	}
	function validateMessage(value: string): Validation {
		if (value.trim() && value.trim().length <= 5) {
			return 'Message must be at least 5 characters.';
		} else if (value.trim() && value.trim().length > 500) {
			return 'Message must be at most 500 characters.';
		}
		return true;
	}

	class FormControl {
		value: string = $state('');
		error: boolean = $state(false);
		errorMessage: string = $state('');
		changed: boolean = $state(false);
		validationFunction: ValidationFunction = (): Validation => {
			return true;
		};

		constructor(config?: { value?: string; validate?: ValidationFunction } | undefined | null) {
			if (config && config.value) {
				this.value = config.value;
			}
			if (config && config.validate) {
				this.validationFunction = config.validate;
			}
			return this;
		}

		setValidation(fn: ValidationFunction) {
			this.validationFunction = fn;
		}

		validate() {
			const err = this.validationFunction.call(this, this.value);
			if (typeof err === 'string') {
				this.error = true;
				this.errorMessage = err;
			} else {
				this.error = false;
				this.errorMessage = '';
			}
			if (!this.changed) {
				this.changed = true;
			}
		}
	}

	let fullName = new FormControl({ validate: validateFullName });
	let companyName = new FormControl({ validate: validateCompanyName });
	let email = new FormControl({ validate: validateEmail });
	let phoneNumber = new FormControl({ validate: validatePhoneNumber });
	let message = new FormControl({ validate: validateMessage });

	const modal = {
		headerText: '',
		contentText: ''
	};

	const formData = $derived({
		phoneNumber: phoneNumber.value,
		fullName: fullName.value,
		companyName: companyName.value,
		email: email.value,
		message: message.value,
		access_key: ACCESS_KEY
	});
	let showModal = $state(false);
	let showErrorInModal = $state(false);
	let validity = $derived(
		(!fullName.changed || !fullName.error) &&
			(!companyName.changed || !companyName.error) &&
			(!email.changed || !email.error) &&
			(!phoneNumber.changed || !phoneNumber.error) &&
			(!message.changed || !message.error) &&
			fullName.changed &&
			email.changed
	);

	async function submitForm(event: SubmitEvent) {
		event.preventDefault();
		if (validity) {
			try {
				const res = await fetch('https://api.web3forms.com/submit', {
					method: 'post',
					body: JSON.stringify(formData),
					headers: {
						Accept: 'application/json',
						'Content-type': 'application/json'
					}
				});
				const json = await res.json();
				if (json.success) {
					modal.headerText = 'Your message has been submitted.';
					modal.contentText = "We've received your message and will get back to you very soon.";
					showModal = true;
					fullName.value = '';
					companyName.value = '';
					email.value = '';
					phoneNumber.value = '';
					message.value = '';
				} else {
					modal.headerText = `Error ${json.status}: ${json.message}`;
					modal.contentText = `${json.detail}`;
					showModal = true;
					showErrorInModal = true;
				}
			} catch (e: any) {
				console.error('Error:', e);
				modal.headerText = 'Network Error';
				modal.contentText = 'Unable to submit form. Please try again.';
				showModal = true;
			}
		}
	}
</script>

<section
	class="contact__section pt-8 pt-md-9 pt-xl-10 pb-4 pb-md-8 py-2xl-9 relative"
	id="contact-section"
	data-section="dark"
	aria-labelledby="#contact-title"
	bind:this={element}
>
	<div class="content__wrapper relative z-1">
		<h2 class="heading-2 uppercase mb-4 contact__title" id="contact-title">Let's Talk</h2>
		<form id="contactForm" class="contact__form mb-lg-9 mb-6 mb-lg-8" onsubmit={submitForm}>
			<div class="grid-lg-row gap-lg-3 gap-xl-0">
				<div class="fl-col row-gap-3 col-gap-2 col-lg-10 col-xl-8 col-2xl-6 mb-3 mb-lg-0">
					<label for="fullName" class="form__group" class:error={fullName.error}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								My Name is &nbsp;
							</div>
							<div class="form__input form--required">
								<input
									type="text"
									class="form__control"
									name="fullName"
									oninput={() => {
										fullName.validate();
									}}
									bind:value={fullName.value}
									id="fullName"
									placeholder="Full Name"
									aria-required="true"
								/>
								<span class="error-message">
									{#if fullName.changed && fullName.error}
										{fullName.errorMessage}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="companyName" class="form__group" class:error={companyName.error}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								representing &nbsp;
							</div>
							<div class="form__input">
								<input
									type="text"
									class="form__control"
									name="companyName"
									bind:value={companyName.value}
									oninput={() => {
										companyName.validate();
									}}
									id="companyName"
									placeholder="Company Name"
								/>
								<span class="error-message">
									{#if companyName.changed && companyName.error}
										{companyName.errorMessage}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="email" class="form__group" class:error={email.error}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								You can contact me at &nbsp;
							</div>
							<div class="form__input form--required">
								<input
									type="email"
									class="form__control"
									bind:value={email.value}
									oninput={() => {
										email.validate();
									}}
									name="email"
									id="email"
									placeholder="Email Address"
									aria-required="true"
								/>
								<span class="error-message">
									{#if email.changed && email.error}
										{email.errorMessage}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="phoneNumber" class="form__group" class:error={phoneNumber.error}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								or call us on &nbsp;&nbsp;
							</div>
							<div class="form__input">
								<input
									type="tel"
									class="form__control"
									name="phoneNumber"
									id="phoneNumber"
									bind:value={phoneNumber.value}
									oninput={() => {
										phoneNumber.validate();
									}}
									placeholder="Phone Number"
								/>
								<span class="error-message">
									{#if phoneNumber.changed && phoneNumber.error !== true}
										{phoneNumber.errorMessage}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="message" class="form__group" class:error={message.error}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								And I want to say:&nbsp;&nbsp;
							</div>
							<div class="form__input">
								<textarea
									name="message"
									id="message"
									bind:value={message.value}
									class="form__control"
									oninput={() => {
										message.validate();
									}}
									placeholder="Message"
									rows="4"
								></textarea>
								<span class="error-message">
									{#if message.changed && message.error !== true}
										{message.errorMessage}
									{/if}
								</span>
							</div>
						</div>
					</label>
				</div>
				<div
					class="big__button-wrapper fl-col jc-end w-100 col-lg-4 col-start-xl-9 col-start-2xl-8 col-end-xl-13"
				>
					<button class="btn--primary w-100 btn--full" type="submit" class:disabled={!validity}>
						<span class="btn__wrapper"><span class="btn__text">Send Message</span></span>
					</button>
				</div>
			</div>
		</form>
		<div class="grid-md-row contact__info">
			<div class="info-wrapper--left col-md-6 col-lg-7 mb-4 mb-lg-0">
				<h4 class="medium-15 neutral-100 mb-2 mb-lg-3 uppercase info__title">Business</h4>
				{#if contacts}
					<div class="info__body">
						<div class="mb-2">
							<a
								class="link"
								href="/cdn-cgi/l/email-protection#1368707c7d67727067603d707c7d677270674c767e727a7f6e"
								>{contacts.contact_email}</a
							>
						</div>
						<div class="mb-2">
							<a class="link" href="tel:{contacts.phone_number_1}">{contacts.phone_number_1}</a>, {#if contacts?.phone_number_2}
								<a class="link" href="tel:{contacts?.phone_number_2}">{contacts?.phone_number_2}</a
								>{/if}
						</div>
						{#if contacts?.address?.address_line_1}
							<address class="uppercase no-italics regular-13 neutral-200">
								{contacts?.address?.address_line_1}
								{#if contacts?.address?.address_line_2}<br />
									{contacts.address.address_line_2}{/if}
								{#if contacts?.address?.address_line_3}<br />
									{contacts.address.address_line_3}{/if}
							</address>
						{/if}
					</div>
				{/if}
			</div>
			<div class="info-wrapper--right col-md-5 ps-md-4 ps-lg-5">
				{#if contacts}
					{#if contacts?.career_email}
						<div class="info--careers mb-4 mb-lg-4">
							<h4 class="medium-15 neutral-100 mb-2 mb-lg-3 uppercase info__title">Careers</h4>
							<div class="info__body">
								<p class="uppercase no-italics regular-13 neutral-200 mb-1">Join us</p>
								<div>
									<a
										class="link"
										href="/cdn-cgi/l/email-protection#4b302824253f2a283f3865282a392e2e39142e262a222736"
										>{contacts.career_email}</a
									>
								</div>
							</div>
						</div>
					{/if}
					{#if contacts?.support_email}
						<div class="info--help">
							<h4 class="medium-15 neutral-100 mb-2 mb-lg-3 uppercase info__title">
								Help & Support
							</h4>
							<div class="info__body">
								<p class="uppercase no-italics regular-13 neutral-200 mb-1">
									Do you have a request / Query?
								</p>
								<div>
									<a
										class="link"
										href="/cdn-cgi/l/email-protection#b1cad2dedfc5d0d2c5c29fc2c4c1c1dec3c5eed4dcd0d8ddcc"
										>{contacts.support_email}</a
									>
								</div>
							</div>
						</div>
					{/if}
				{/if}
			</div>
		</div>
	</div>
</section>

{#if showModal}
	<Modal bind:showModal>
		{#snippet header()}
			{modal.headerText}
		{/snippet}
		{#snippet content()}
			{modal.contentText}
			{#if showErrorInModal}
				<div>
					If it persists after some time, please email us at: <a
						class="link"
						href="mailto:support@nepaxis.com">support@nepaxis.com</a
					>
				</div>
			{/if}
		{/snippet}
	</Modal>
{/if}
