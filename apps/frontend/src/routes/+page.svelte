<script lang="ts">
	import ASCII from '$lib/components/ASCII/ASCII.svelte';
	import ITLTime from '$lib/components/ITLTime/ITLTime.svelte';
	import Cube from '$lib/components/Cube/Cube.svelte';
	import { initAnimations } from '$lib/js/animations';
	import { afterNavigate } from '$app/navigation';
	import ContactSection from '$lib/components/Page/Home/ContactSection.svelte';

	afterNavigate(() => {
		initAnimations();
	});
</script>

<section
	class="hero__section full-width content-grid"
	style="--background: url(/images/hero-background.png)"
	data-section="dark"
	aria-labelledby="#home-title"
	id="home-section"
>
	<div class="fl-col jc-center al-center py-lg-9 h-full w-md-90 w-lg-80 w-xl-80 w-2xl-60 mx-auto">
		<div class="hero__logo mb-2 neutral-100">
			<svg
				width="69"
				height="19"
				viewBox="0 0 69 19"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M0 4.37154H2.01887V5.93349H2.3394C2.52625 5.51173 2.85892 5.11724 3.33895 4.7516C3.81899 4.38597 4.53144 4.20316 5.47783 4.20316C6.22371 4.20316 6.88754 4.37956 7.46783 4.73076C8.04812 5.08195 8.50386 5.57908 8.83805 6.21894C9.17074 6.85879 9.33784 7.63015 9.33784 8.52979V14.7776H7.27795V8.69818C7.27795 7.79853 7.06376 7.13302 6.63841 6.70324C6.21155 6.27346 5.62518 6.06018 4.87931 6.06018C4.02558 6.06018 3.34351 6.35525 2.83006 6.947C2.31661 7.53874 2.05989 8.39669 2.05989 9.52245V14.7776H0V4.37154Z"
					fill="currentColor"
				/>
				<path
					d="M16.0157 15.0727C15.0162 15.0727 14.1427 14.8514 13.3968 14.4072C12.6494 13.9646 12.0676 13.3375 11.6468 12.5293C11.2276 11.7211 11.0164 10.7813 11.0164 9.71168V9.4583C11.0164 8.37424 11.223 7.42809 11.6362 6.61985C12.0494 5.81161 12.6251 5.18459 13.3649 4.74198C14.1047 4.29938 14.9615 4.07647 15.9337 4.07647C16.9059 4.07647 17.7095 4.29777 18.4235 4.74198C19.1359 5.18459 19.6935 5.80039 20.093 6.58938C20.4925 7.37838 20.693 8.29887 20.693 9.35407V10.1767H13.1158C13.1416 11.0924 13.4318 11.8205 13.9862 12.3609C14.5392 12.9029 15.2289 13.174 16.0552 13.174C16.8285 13.174 17.4118 12.9911 17.8052 12.6255C18.1987 12.2599 18.501 11.8381 18.7152 11.3586L20.415 12.2871C20.2282 12.6816 19.9578 13.097 19.6053 13.5332C19.2514 13.9694 18.7881 14.335 18.2154 14.6301C17.6427 14.9251 16.909 15.0727 16.0157 15.0727ZM13.1371 8.50895H18.5952C18.542 7.72156 18.2746 7.10576 17.7961 6.66155C17.3161 6.21894 16.6887 5.99603 15.917 5.99603C15.1453 5.99603 14.5134 6.21734 14.0273 6.66155C13.5411 7.10415 13.2434 7.71995 13.1371 8.50895Z"
					fill="currentColor"
				/>
				<path
					d="M22.3731 4.37154H24.392V5.86934H24.7125C24.9662 5.40429 25.349 4.99055 25.8625 4.62331C26.3759 4.25768 27.1127 4.07486 28.0712 4.07486C28.8976 4.07486 29.6541 4.28655 30.3407 4.70831C31.0274 5.13006 31.5803 5.73945 31.9996 6.53486C32.4189 7.33027 32.63 8.29085 32.63 9.41661V9.73253C32.63 10.8583 32.4234 11.8189 32.0102 12.6143C31.597 13.4097 31.0441 14.0175 30.3514 14.4408C29.6587 14.8626 28.8976 15.0743 28.0727 15.0743C27.4332 15.0743 26.8924 14.9893 26.4534 14.8209C26.0129 14.6525 25.6604 14.4376 25.3931 14.1778C25.1257 13.918 24.913 13.647 24.7535 13.3648H24.433V19H22.3731V4.37154ZM27.4712 13.1723C28.3781 13.1723 29.1179 12.8693 29.6906 12.2647C30.2633 11.6601 30.5504 10.7941 30.5504 9.66838V9.47915C30.5504 8.36783 30.2602 7.50987 29.6799 6.9037C29.0996 6.29912 28.3629 5.99603 27.4712 5.99603C26.5795 5.99603 25.8609 6.29912 25.2822 6.9037C24.7019 7.50827 24.4117 8.36783 24.4117 9.47915V9.66838C24.4117 10.7941 24.7019 11.6601 25.2822 12.2647C25.8625 12.8693 26.5916 13.1723 27.4712 13.1723Z"
					fill="currentColor"
				/>
				<path
					d="M37.4486 15.0727C36.7422 15.0727 36.1118 14.946 35.5588 14.6926C35.0059 14.4392 34.5653 14.0672 34.2387 13.5733C33.9121 13.0809 33.7496 12.4828 33.7496 11.7788C33.7496 11.0748 33.9121 10.467 34.2387 9.99553C34.5653 9.52405 35.0119 9.16965 35.5786 8.9291C36.1452 8.69016 36.7877 8.56988 37.5078 8.56988H40.5065V7.89475C40.5065 7.29018 40.3333 6.80427 39.9869 6.43864C39.6406 6.07301 39.1074 5.89019 38.3873 5.89019C37.6673 5.89019 37.1402 6.06659 36.768 6.41779C36.3943 6.76899 36.1482 7.22763 36.0282 7.78891L34.1081 7.13462C34.2676 6.57174 34.5243 6.06178 34.8783 5.60474C35.2307 5.1477 35.7016 4.77887 36.288 4.49662C36.8743 4.21599 37.5807 4.07486 38.4071 4.07486C39.6862 4.07486 40.6933 4.41965 41.4255 5.10922C42.1592 5.79878 42.5253 6.77701 42.5253 8.04389V12.3288C42.5253 12.7506 42.7122 12.9623 43.0859 12.9623H43.9259V14.7776H42.3871C41.9207 14.7776 41.541 14.6509 41.2478 14.3975C40.9546 14.1442 40.8073 13.7994 40.8073 13.3632V13.299H40.508C40.4017 13.5107 40.2406 13.7561 40.028 14.0383C39.8138 14.3206 39.5008 14.5627 39.0876 14.7664C38.6745 14.97 38.1276 15.0727 37.4486 15.0727ZM37.7478 13.2782C38.5742 13.2782 39.2411 13.028 39.7469 12.5293C40.2528 12.0306 40.5065 11.3442 40.5065 10.4718V10.2601H37.6278C37.0809 10.2601 36.6419 10.3836 36.3077 10.629C35.975 10.8759 35.8079 11.2384 35.8079 11.7162C35.8079 12.1941 35.9811 12.5742 36.3275 12.8564C36.6738 13.1387 37.1478 13.2782 37.7463 13.2782H37.7478Z"
					fill="currentColor"
				/>
				<path
					d="M44.687 14.776L48.4467 9.52085L44.7675 4.36994H47.1874L49.7668 8.10643H50.0874L52.6668 4.36994H55.1064L51.4074 9.52085L55.1672 14.776H52.7078L50.0889 10.9561H49.7684L47.1494 14.776H44.687Z"
					fill="currentColor"
				/>
				<path
					d="M57.6235 2.95712C57.224 2.95712 56.8868 2.81921 56.6134 2.54499C56.3399 2.27076 56.2032 1.91475 56.2032 1.47856C56.2032 1.04237 56.3399 0.686361 56.6134 0.412137C56.8868 0.137914 57.2225 0 57.6235 0C58.0246 0 58.377 0.137914 58.6429 0.412137C58.9087 0.686361 59.0424 1.04237 59.0424 1.47856C59.0424 1.91475 58.9087 2.27076 58.6429 2.54499C58.3755 2.81921 58.0367 2.95712 57.6235 2.95712ZM56.5845 14.7776V4.37154H58.6444V14.7776H56.5845Z"
					fill="currentColor"
				/>
				<path
					d="M64.941 15.0727C63.6878 15.0727 62.6487 14.7776 61.8223 14.1859C60.9959 13.5941 60.4885 12.7009 60.3032 11.5046L62.2233 11.0187C62.3297 11.596 62.5105 12.053 62.7626 12.3914C63.0163 12.7297 63.3323 12.9687 63.7121 13.1082C64.0918 13.2493 64.502 13.3199 64.941 13.3199C65.5942 13.3199 66.097 13.1868 66.451 12.919C66.8034 12.6512 66.9811 12.3064 66.9811 11.8846C66.9811 11.4629 66.814 11.1534 66.4813 10.9561C66.1487 10.7589 65.655 10.5969 65.0018 10.4702L64.3212 10.3435C63.6543 10.2168 63.0482 10.034 62.5013 9.79507C61.9545 9.55613 61.5215 9.22578 61.2025 8.80241C60.882 8.38066 60.7225 7.83862 60.7225 7.17792C60.7225 6.19328 61.0688 5.42995 61.7615 4.88791C62.4543 4.34588 63.3748 4.07486 64.5202 4.07486C65.6656 4.07486 66.536 4.33947 67.25 4.86707C67.9625 5.39467 68.4258 6.10989 68.64 7.00954L66.7198 7.57883C66.5998 6.94539 66.3461 6.49958 65.9603 6.23818C65.5729 5.97839 65.0929 5.8485 64.5202 5.8485C63.9475 5.8485 63.5206 5.95755 63.2001 6.17564C62.8796 6.39374 62.7201 6.70003 62.7201 7.09453C62.7201 7.51629 62.8765 7.82579 63.1895 8.02304C63.5024 8.22029 63.9262 8.36783 64.4594 8.46565L65.1597 8.59234C65.8661 8.71902 66.5133 8.89542 67.0996 9.11994C67.686 9.34605 68.1493 9.66838 68.4896 10.0901C68.8299 10.5119 69 11.0748 69 11.7788C69 12.8212 68.6324 13.6294 67.9002 14.2067C67.1665 14.784 66.1806 15.0727 64.941 15.0727Z"
					fill="currentColor"
				/>
			</svg>
			<span class="sr-only">Nepaxis</span>
		</div>
		<h2 class="hero__title heading-1 text-center mb-3" id="home-title">
			<span class="visible-text"> Empowering your digital journey </span>
		</h2>
		<div class="fl-row fl-wrap fl-md-no-wrap jc-center al-center gap-2 gap-md-1 mx-lg-6">
			<a
				href="#services-section"
				data-scroll-to="#services-section"
				class="btn--outline btn--white order-1 order-md-0 hero__link"
			>
				<span class="btn__wrapper">
					<span class="btn__text">Services</span>
				</span>
			</a>
			<div class="neutral-400 uppercase text-center font-mono hero__subtitle order-0 order-md-1">
				<p>
					Our team offers expertise in software engineering, cloud computing, UI/UX design, DevOps,
					data analytics, system integrations and Marketing.
				</p>
			</div>
			<a
				href="#contact-section"
				data-scroll-to="#contact-section"
				class="btn--primary order-2 order-md-2 hero__link"
			>
				<span class="btn__wrapper">
					<span class="btn__text">Let's Talk</span>
				</span>
			</a>
		</div>
	</div>
	<div class="hero__base content-grid">
		<div class="fl-row jc-between al-end">
			<div class="hero__times font-mono regular-13 uppercase neutral-400 py-1 py-lg-3">
				<p>
					KTM →
					<ITLTime timezone="Asia/Kathmandu" />
				</p>
				<p>
					DXB →
					<ITLTime timezone="Asia/Dubai" />
				</p>
			</div>
			<div class="hero__scroll font-mono regular-16 uppercase" aria-hidden="true">Scroll</div>
		</div>
	</div>
</section>

<section
	class="about__section my-4 my-md-6 mt-xl-9 mb-xl-7 pt-4 pt-md-0"
	data-section="dark"
	id="about-section"
	aria-labelledby="#about-title"
>
	<div class="grid-md-row">
		<h2
			class="about__title font-mono bold-15 uppercase col-md-2 col-start-lg-5 col-end-lg-7 col-start-2xl-8 mb-2 mb-md-0"
			id="about-title"
		>
			About Us
		</h2>
		<div class="about__paragraph paragraph-wrapper col-md-8 col-lg-5 col-2xl-4 neutral-400">
			<p>
				Nepaxis Technologies LLC is a UAE-based global technology service provider specializing in
				high-performance engineering, enterprise system architecture, strategic digital
				transformation, and future-ready product development. We partner with businesses that demand
				scalable, secure, and intelligently designed technology infrastructure.
			</p>
			<p>
				We don’t just build digital products - we build long-term assets engineered for growth,
				performance, and operational excellence
			</p>
		</div>
	</div>
</section>

<section class="ascii__section full-width content-grid" data-section="dark" aria-hidden="true">
	<ASCII />
</section>
<section class="full-width fs-image relative" data-section="dark">
	<picture>
		<source srcset="/images/banner-1.png" media="(min-width:720px)" />
		<img src="/images/banner-1-m.png" class="work__image" alt="Our Work Images" />
	</picture>
</section>
<section
	class="capabilities__section bg-neutral-100 full-width content-grid py-7 py-md-8 py-lg-9"
	data-section="light"
	id="services-section"
	aria-labelledby="#services-title"
>
	<h2 class="heading-2 neutral-700 mb-2 mb-md-4 services__title" id="services-title">
		Capabilities
	</h2>
	<div class="grid-xl-row gap-3xl-9">
		<div class="col-xl-8">
			<table class="capabilities__table--sm regular-14 mb-4">
				<tbody>
					<tr>
						<th colspan="1" class="text-left uppercase bold-14 neutral-600">Design</th>
					</tr>
					<tr>
						<td class="single-column-description">
							<p class="neutral-500 regular-14">
								We create cohesive brand systems and intuitive digital experiences that elevate how
								your business is perceived across every touchpoint.
							</p>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Branding & Visual Identity
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								UI/UX Design
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Digital & Print Media
							</span>
						</td>
					</tr>

					<tr>
						<th colspan="1" class="text-left uppercase bold-14 neutral-600">Development</th>
					</tr>
					<tr>
						<td class="single-column-description">
							<p class="neutral-500 regular-14">
								Our engineering team builds high-performance digital products using modern
								frameworks, scalable architecture, and efficient development practices.
							</p>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Web Development
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Mobile App Development
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Software Development
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Tech Stack Expertise
							</span>
						</td>
					</tr>

					<tr>
						<th colspan="1" class="text-left uppercase bold-14 neutral-600"
							>Cloud & Data Services</th
						>
					</tr>
					<tr>
						<td class="single-column-description">
							<p class="neutral-500 regular-14">
								Our engineering team builds high-performance digital products using modern
								frameworks, scalable architecture, and efficient development practices.
							</p>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Cloud & AWS Services
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								DevOps & Infrastructure
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Data & Analytics
							</span>
						</td>
					</tr>

					<tr>
						<th colspan="1" class="text-left uppercase bold-14 neutral-600">Marketing & Growth</th>
					</tr>
					<tr>
						<td class="single-column-description">
							<p class="neutral-500 regular-14">
								We execute data-driven marketing strategies that improve visibility, accelerate
								acquisition, and enhance long-term customer engagement.
							</p>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Growth Hacking
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Search & Performance Marketing
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Social Media Marketing
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Content & Brand marketing
							</span>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Analytics & Reporting
							</span>
						</td>
					</tr>

					<tr>
						<th colspan="1" class="text-left uppercase bold-14 neutral-600">Expert Services</th>
					</tr>
					<tr>
						<td class="single-column-description">
							<p class="neutral-500 regular-14">
								Our strategic and operational support ensures that every digital initiative is
								planned, executed, and maintained with precision and clarity.
							</p>
						</td>
					</tr>
					<tr>
						<td class="single-column-service">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Consulting & Support
							</span>
						</td>
					</tr>
				</tbody>
			</table>
			<table class="capabilities__table--md regular-14 mb-md-4">
				<tbody>
					<tr>
						<th colspan="2" class="text-left uppercase bold-14 neutral-600">Design</th>
					</tr>
					<tr>
						<td rowspan="3">
							<p class="neutral-500 regular-14">
								We create cohesive brand systems and intuitive digital experiences that elevate how
								your business is perceived across every touchpoint.
							</p>
						</td>
						<td class="floating__image-wrapper" data-img="/images/service/branding-visual.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Branding & Visual Identity
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/ui-ux-design.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								UI/UX Design
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/digital-print-media.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Digital & Print Media
							</span>
						</td>
					</tr>
					<tr>
						<th colspan="2" class="text-left uppercase bold-14 neutral-600">Development</th>
					</tr>
					<tr>
						<td rowspan="4">
							<p class="neutral-500 regular-14">
								Our engineering team builds high-performance digital products using modern
								frameworks, scalable architecture, and efficient development practices.
							</p>
						</td>
						<td class="floating__image-wrapper" data-img="/images/service/web-development.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Web Development
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/mobile-development.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Mobile App Development
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/software-development.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Software Development
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/expert.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Tech Stack Expertise
							</span>
						</td>
					</tr>
					<tr>
						<th colspan="2" class="text-left uppercase bold-14 neutral-600"
							>Cloud & Data Services</th
						>
					</tr>
					<tr>
						<td rowspan="3">
							<p class="neutral-500 regular-14">
								Our engineering team builds high-performance digital products using modern
								frameworks, scalable architecture, and efficient development practices.
							</p>
						</td>
						<td class="floating__image-wrapper" data-img="/images/service/cloud.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Cloud & AWS Services
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/dev-ops.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								DevOps & Infrastructure
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/analytics.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Data & Analytics
							</span>
						</td>
					</tr>
					<tr>
						<th colspan="2" class="text-left uppercase bold-14 neutral-600">Marketing & Growth</th>
					</tr>
					<tr>
						<td rowspan="5">
							<p class="neutral-500 regular-14">
								We execute data-driven marketing strategies that improve visibility, accelerate
								acquisition, and enhance long-term customer engagement.
							</p>
						</td>
						<td class="floating__image-wrapper" data-img="/images/service/growth-hacking.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Growth Hacking
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/seo.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Search & Performance Marketing
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/social-media.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Social Media Marketing
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/content-marketing.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Content & Brand marketing
							</span>
						</td>
					</tr>
					<tr>
						<td class="floating__image-wrapper" data-img="/images/service/data-reporting.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Analytics & Reporting
							</span>
						</td>
					</tr>
					<tr>
						<th colspan="2" class="text-left uppercase bold-14 neutral-600">Expert Services</th>
					</tr>
					<tr>
						<td rowspan="3">
							<p class="neutral-500 regular-14">
								Our strategic and operational support ensures that every digital initiative is
								planned, executed, and maintained with precision and clarity.
							</p>
						</td>
						<td class="floating__image-wrapper" data-img="/images/service/support.png">
							<span class="font-mono neutral-600 uppercase regular-14 floating__image-text">
								Consulting & Support
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-xl-4">
			<div class="capabilities__aside">
				<div class="brochure__content">
					<div class="services__paragraph paragraph-wrapper neutral-500 tracking-tight pe-lg-4">
						<p>
							You can catch all the details of our servcies by downloading our service brochure
							below.
						</p>
					</div>
					<a
						href="https://drive.google.com/uc?export=download&id=1x1kVPoeZaI9VFPjU6xvle9SePYs8-nWH"
						class="btn--black services__button mb-4 mb-lg-5"
						target="_blank"
					>
						<span class="btn__wrapper">
							<span class="btn__text">Download Brochure</span>
							<span class="btn__icon">
								<svg
									width="13"
									height="13"
									viewBox="0 0 13 13"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1 10.2915V8.125C1 7.77982 1.27982 7.5 1.625 7.5C1.97018 7.5 2.25 7.77982 2.25 8.125V10.2915C2.25 10.4131 2.29832 10.5298 2.38428 10.6157C2.47023 10.7017 2.58694 10.75 2.7085 10.75H10.2915C10.4131 10.75 10.5298 10.7017 10.6157 10.6157C10.7017 10.5298 10.75 10.4131 10.75 10.2915V8.125C10.75 7.77982 11.0298 7.5 11.375 7.5C11.7202 7.5 12 7.77982 12 8.125V10.2915C12 10.7446 11.8199 11.1791 11.4995 11.4995C11.1791 11.8199 10.7446 12 10.2915 12H2.7085C2.25542 12 1.82086 11.8199 1.50049 11.4995C1.18011 11.1791 1 10.7446 1 10.2915ZM5.875 1.625C5.875 1.27982 6.15482 1 6.5 1C6.84518 1 7.125 1.27982 7.125 1.625V6.61621L8.7666 4.97461C9.01069 4.73069 9.40637 4.73059 9.65039 4.97461C9.89441 5.21863 9.89431 5.61431 9.65039 5.8584L6.94189 8.56689C6.69782 8.81097 6.30218 8.81097 6.05811 8.56689L3.34961 5.8584C3.10569 5.61431 3.10559 5.21863 3.34961 4.97461C3.59363 4.73059 3.98931 4.73069 4.2334 4.97461L5.875 6.61621V1.625Z"
										fill="currentColor"
									/>
								</svg>
							</span>
						</span>
					</a>
				</div>
				<Cube />
			</div>
		</div>
	</div>
</section>
<section
	class="window__section full-width"
	data-section="dark"
	style="background: url(/images/desktop-background.png)"
>
	<div class="window-wrapper">
		<div class="window window--1">
			<img src="/images/container/hotel-manager.png" alt="Hotel Manager Window" />
		</div>

		<div class="window window--2">
			<img src="/images/container/asset-flow.png" alt="Asset Flow Window" />
		</div>
	</div>
</section>
<section
	class="approach__section my-8 mt-md-8 mt-xl-9"
	data-section="dark"
	id="approach-section"
	aria-labelledby="#approach-title"
>
	<div class="grid-lg-row mb-2 mb-md-4 mb-md-6">
		<div class="subtitle__wrapper col-lg-4 col-start-8 order-1">
			<h2
				class="bold-15 font-mono uppercase neutral-200 text-right approach__title mb-2 mb-md-0"
				id="approach-title"
			>
				Our Approach
			</h2>
		</div>
		<div class="title__wrapper col-lg-8 order-0 mb-4 mb-md-0">
			<h3 class="heading-xl approach__text">
				A Strategic Partner for Modern Digital Transformation
			</h3>
		</div>
	</div>
	<div class="approach__list-wrapper">
		<p class="neutral-400 uppercase mb-3 mb-lg-3 approach__subtitle">
			We follow Agile driven workflows that prioritize:
		</p>
		<ul
			class="approach__list grid grid-template-col-2 grid-template-col-ms-3 grid-template-col-lg-6 gap-1 gap-md-2 gap-lg-1 col-gap-2xl-1 grid-2xl-row strip-style"
		>
			<li class="approach__item col-2xl-2">
				<div class="uppercase neutral-100 approach__item-text">Continuous delivery</div>
				<img
					src="/images/approach/CD.svg"
					class="approach__image"
					alt="Continuous Delivery Illustration"
				/>
			</li>
			<li class="approach__item col-2xl-2">
				<div class="uppercase neutral-100 approach__item-text">Scalable architecture</div>
				<img
					src="/images/approach/SA.png"
					class="approach__image"
					alt="Continuous Delivery Illustration"
				/>
			</li>
			<li class="approach__item col-2xl-2">
				<div class="uppercase neutral-100 approach__item-text">Security-by-design</div>
				<img
					src="/images/approach/SBD.png"
					class="approach__image"
					alt="Continuous Delivery Illustration"
				/>
			</li>
			<li class="approach__item col-2xl-2">
				<div class="uppercase neutral-100 approach__item-text">Transparent collaboration</div>
				<img
					src="/images/approach/TC.png"
					class="approach__image"
					alt="Continuous Delivery Illustration"
				/>
			</li>
			<li class="approach__item col-2xl-2">
				<div class="uppercase neutral-100 approach__item-text">Data-informed iterations</div>
				<img
					src="/images/approach/DII.png"
					class="approach__image"
					alt="Continuous Delivery Illustration"
				/>
			</li>
			<li class="approach__item col-2xl-2">
				<div class="uppercase neutral-100 approach__item-text">Long-term maintainability</div>
				<img
					src="/images/approach/LTM.png"
					class="approach__image"
					alt="Continuous Delivery Illustration"
				/>
			</li>
		</ul>
	</div>
</section>
<section class="full-width mb-0 mb-3xl-4 mb-3xl-9 mt-md-6 mt-xl-9 fs-image" data-section="light">
	<picture>
		<img src="/images/bottom-image.png" class="h-full object-cover w-100" alt="Our Work Images" />
	</picture>
</section>

<ContactSection />
