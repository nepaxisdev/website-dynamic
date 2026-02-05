// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
// import { goto } from "$app/navigation";

// gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// export function initSmoothScroll() {
// 	if (window.outerWidth > 991) {
// 		const smooth: ScrollSmoother = ScrollSmoother.create({
// 			smooth: 1,
// 			effects: true,
// 			smoothTouch: 0,
// 		});
// 		const internalLinks = document.querySelectorAll("a[data-scroll-to]");
// 		internalLinks.forEach((link) => {
// 			link.addEventListener("click", (e) => {
// 				e.preventDefault();
// 				const linkAddress = link.getAttribute("href");
// 				if (linkAddress) {
// 					if (linkAddress.split("#")[0] === "") {
// 						smooth.scrollTo(linkAddress, true, "top 100px");
// 					} else {
// 						goto(linkAddress);
// 					}
// 				}
// 			});
// 		});
// 	}

// 	requestAnimationFrame(() => {
// 		ScrollTrigger.refresh();
// 	});
// }
