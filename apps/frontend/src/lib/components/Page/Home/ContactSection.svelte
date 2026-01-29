<script lang="ts">
	import Modal from '$lib/components/Modal/Modal.svelte';

	let fullName: string = $state('');
	let companyName: string = $state('');
	let email: string = $state('');
	let phoneNumber: string = $state('');
	let message: string = $state('');

	const modal = {
		headerText: '',
		contentText: ''
	};

	let isValid: boolean = $state(false);

	type Validation = string | false;

	function validateFullName(): Validation {
		if (!fullName.trim() || fullName.trim().length <= 0) {
			return 'Full Name is required';
		}
		return false;
	}
	function validateCompanyName(): Validation {
		if (companyName.trim() && companyName.trim().length < 2) {
			return 'Company Name must be at least 2 characters';
		}
		return false;
	}
	function validateEmail(): Validation {
		if (!email.trim() || email.trim().length <= 0) {
			return 'Email is required';
		} else {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email.trim())) {
				return 'Enter a valid email';
			}
		}
		return false;
	}
	function validatePhoneNumber(): Validation {
		const phoneRegex = /^[0-9+\-\s()]{7,}$/;
		if (phoneNumber.trim()) {
			if (!phoneRegex.test(phoneNumber.trim())) {
				return 'Enter a valid phone number.';
			}
		}
		return false;
	}
	function validateMessage(): Validation {
		if (message.trim() && message.trim().length < 5) {
			return 'Message must be at least 5 characters.';
		} else if (message.trim() && message.trim().length > 500) {
			return 'Message must be at most 500 characters.';
		}
		return false;
	}
	let errors = $derived({
		phoneNumber: validatePhoneNumber() ? true : false,
		fullName: validateFullName() ? true : false,
		companyName: validateCompanyName() ? true : false,
		email: validateEmail() ? true : false,
		message: validateMessage() ? true : false
	});
	const formData = $derived({
		phoneNumber: phoneNumber,
		fullName: fullName,
		companyName: companyName,
		email: email,
		message: message
	});
	let showModal = $state(false);
	let notifyError = $state(false);
	let showErrors: boolean = $state(false);
	const validity: boolean = $derived(
		!validateFullName() &&
			!validateCompanyName() &&
			!validateEmail() &&
			!validatePhoneNumber() &&
			!validateMessage()
	);
	$inspect(errors);

	async function submitForm(event: SubmitEvent) {
		event.preventDefault();
		if (!validity) {
			showErrors = true;
		} else {
			const res = await fetch('/api/submitContact', {
				method: 'post',
				body: JSON.stringify(formData),
				headers: {
					Accept: 'application/json',
					'Content-type': 'application/json'
				}
			});
			const json = await res.json();
			if (json.status === 200) {
				modal.headerText = 'Your message has been submitted.';
				modal.contentText = "We've received your message and will get back to you very soon.";
				showModal = true;
			} else {
				modal.headerText = `${json.status}: ${json.message}`;
				modal.contentText = `${json.description}`;
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
>
	<div class="content__wrapper relative z-1">
		<h2 class="heading-2 uppercase mb-4 contact__title" id="contact-title">Let's Talk</h2>
		<form id="contactForm" class="contact__form mb-lg-9 mb-6 mb-lg-8" onsubmit={submitForm}>
			<div class="grid-lg-row gap-lg-3 gap-xl-0">
				<div class="fl-col row-gap-3 col-gap-2 col-lg-10 col-xl-8 col-2xl-6 mb-3 mb-lg-0">
					<label for="fullName" class="form__group" class:error={errors.phoneNumber}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								My Name is &nbsp;
							</div>
							<div class="form__input form--required">
								<input
									type="text"
									class="form__control"
									name="fullName"
									bind:value={fullName}
									id="fullName"
									placeholder="Full Name"
									onchange={validateFullName}
									aria-required="true"
								/>
								<span class="error-message">
									{#if showErrors && errors.fullName !== false}
										{errors.fullName}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="companyName" class="form__group" class:error={!validateCompanyName}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								representing &nbsp;
							</div>
							<div class="form__input">
								<input
									type="text"
									class="form__control"
									name="companyName"
									bind:value={companyName}
									onchange={validateCompanyName}
									id="companyName"
									placeholder="Company Name"
								/>
								<span class="error-message">
									{#if showErrors && errors.companyName !== false}
										{errors.companyName}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="email" class="form__group" class:error={!validateEmail}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								You can contact me at &nbsp;
							</div>
							<div class="form__input form--required">
								<input
									type="email"
									class="form__control"
									bind:value={email}
									name="email"
									id="email"
									onchange={validateEmail}
									placeholder="Email Address"
									aria-required="true"
								/>
								<span class="error-message">
									{#if showErrors && errors.email !== false}
										{errors.email}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="phoneNumber" class="form__group" class:error={!validatePhoneNumber}>
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
									bind:value={phoneNumber}
									onchange={validatePhoneNumber}
									placeholder="Phone Number"
								/>
								<span class="error-message">
									{#if showErrors && errors.phoneNumber !== false}
										{errors.phoneNumber}
									{/if}
								</span>
							</div>
						</div>
					</label>
					<label for="message" class="form__group" class:error={!validateMessage}>
						<div class="form__line">
							<div class="form__description regular-25 tracking-4tight neutral-300">
								And I want to say:&nbsp;&nbsp;
							</div>
							<div class="form__input">
								<textarea
									name="message"
									id="message"
									bind:value={message}
									class="form__control"
									placeholder="Message"
									onchange={validateMessage}
									rows="4"
								></textarea>
								<span class="error-message">
									{#if showErrors && errors.message !== false}
										{errors.message}
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
				<div class="info__body">
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
			</div>
			<div class="info-wrapper--right col-md-5 ps-md-4 ps-lg-5">
				<div class="info--careers mb-4 mb-lg-4">
					<h4 class="medium-15 neutral-100 mb-2 mb-lg-3 uppercase info__title">Careers</h4>
					<div class="info__body">
						<p class="uppercase no-italics regular-13 neutral-200 mb-1">Join us</p>
						<div>
							<a class="link" href="mailto:hr@nepaxis.com">hr@nepaxis.com</a>
						</div>
					</div>
				</div>
				<div class="info--help">
					<h4 class="medium-15 neutral-100 mb-2 mb-lg-3 uppercase info__title">Help & Support</h4>
					<div class="info__body">
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
</section>

{#if showModal}
	<Modal bind:showModal>
		{#snippet header()}
			{modal.headerText}
		{/snippet}
		{#snippet content()}
			{modal.contentText}
			{#if notifyError}
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
