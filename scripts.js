/* ==========================================================================
   Delivery Tools
   Polyfill: https://babeljs.io/en/repl
   Minify: https://www.minifier.org/
   ========================================================================== */

/* ==========================================================================
   Hero Image Slider
   ========================================================================== */
let $hero = document.querySelector("#background-fha");
if ($hero) {
	const changeSlides = _ => {
		let $fhaHero = document.querySelector("#background-fha");
		let $vaHero = document.querySelector("#background-va");
		let $fhaBlock = document.querySelector("#fha");
		let $vaBlock = document.querySelector("#va");

		setInterval(_ => {
			if ($fhaHero.classList.contains("fadeIn")) {
				$fhaHero.classList.remove("fadeIn");
				$fhaHero.classList.add("fadeOut");
			} else {
				$fhaHero.classList.remove("fadeOut");
				$fhaHero.classList.add("fadeIn");
				$fhaHero.style.cssText = `display: block`;
			}

			if ($vaHero.classList.contains("fadeIn")) {
				$vaHero.classList.remove("fadeIn");
				$vaHero.classList.add("fadeOut");
			} else {
				$vaHero.classList.remove("fadeOut");
				$vaHero.classList.add("fadeIn");
				$vaHero.style.cssText = `display: block`;
			}

			if ($fhaBlock.classList.contains("fadeIn")) {
				$fhaBlock.classList.remove("fadeIn");
				$fhaBlock.classList.add("fadeOut");
			} else {
				$fhaBlock.classList.remove("fadeOut");
				$fhaBlock.classList.add("fadeIn");
				$fhaBlock.style.cssText = `display: block`;
			}

			if ($vaBlock.classList.contains("fadeIn")) {
				$vaBlock.classList.remove("fadeIn");
				$vaBlock.classList.add("fadeOut");
			} else {
				$vaBlock.classList.remove("fadeOut");
				$vaBlock.classList.add("fadeIn");
				$vaBlock.style.cssText = `display: block`;
			}
		}, 4000);
	};

	changeSlides();
}

/* ==========================================================================
   Input Field Masking
   ========================================================================== */
const addMaskToInput = (inputElement, mask) => {
	inputElement = document.querySelector(`${inputElement}`);

	if (inputElement) {
		vanillaTextMask.maskInput({
			inputElement,
			mask
		});
	}
};

const phoneMask = [
	"(",
	/[1-9]/,
	/\d/,
	/\d/,
	")",
	" ",
	/\d/,
	/\d/,
	/\d/,
	"-",
	/\d/,
	/\d/,
	/\d/,
	/\d/
];

const currencyMask = textMaskAddons.createNumberMask({
	prefix: "$",
	includeThousandsSeparator: true
});

const rateMask = textMaskAddons.createNumberMask({
	prefix: "",
	suffix: "%",
	allowDecimal: true
});

addMaskToInput("#currency", currencyMask);
addMaskToInput("#rate", rateMask);

window.addEventListener("load", _ => {
	let $phone = document.querySelector("#phoneNumber");
	let $mPhone = document.querySelector("#m_phoneNumber");
	if ($phone) {
		addMaskToInput("#phoneNumber", phoneMask);
	}
	if ($mPhone) {
		addMaskToInput("#m_phoneNumber", phoneMask);
	}
});

/* ==========================================================================
   Typeahead Reviews Headline
   ========================================================================== */
let phrases = [" love us!", " trust us!", " rave about us!"];
let phraseIndex = 0;
let deleting = 1;
let $typing = document.querySelector("#typing");

if ($typing) {
	const changePhrase = _ => {
		phraseIndex = ++phraseIndex === phrases.length ? 0 : phraseIndex;
	};

	let backward = _ => {
		let phrase = $typing.textContent;
		phrase
			? ($typing.textContent = phrase.slice(0, phrase.length - 1))
			: switchDirection();
	};

	let forward = _ => {
		$typing.textContent.length !== phrases[phraseIndex].length
			? ($typing.textContent = phrases[phraseIndex].slice(
					0,
					$typing.textContent.length + 1
			  ))
			: switchDirection();
	};

	let $typingHeading = document.querySelector("#typing-heading");
	$typingHeading.setAttribute(
		`style`,
		`position: absolute; left: ${$typingHeading.offsetLeft}px;`
	);

	var forwardInterval,
		backwardInterval = setInterval(backward, 75);
	let switchDirection = () => {
		deleting = !deleting;
		if (!deleting) {
			changePhrase();
			clearInterval(backwardInterval);
			forwardInterval = setInterval(forward, 150);
		} else {
			clearInterval(forwardInterval);
			setTimeout(_ => {
				backwardInterval = setInterval(backward, 75);
			}, 2000);
		}
	};
}

/* ==========================================================================
   Sticky Header and Sticky CTA Button
   ========================================================================== */
function offset(el) {
	let rect = el.getBoundingClientRect(),
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return rect.top + scrollTop - 70 + 36;
}

window.addEventListener("scroll", _ => {
	let $header = document.querySelector("header");
	let $mobileHeading = document.querySelector("#mobile-quote-heading");
	let $cta = document.querySelector("#mobile-quote");

	if (window.scrollY === 0) {
		$header.classList.remove("bg-white");
	} else {
		$header.classList.add("bg-white");
	}

	let $form = document.querySelector("#mobile-lead-form");
	if ($form && $form.classList.contains("slideInDown")) return;

	if ($mobileHeading) {
		if ($mobileHeading.offsetWidth > 0 && $mobileHeading.offsetHeight > 0) {
			if (offset($mobileHeading) <= window.scrollY) {
				$cta.classList.add("sticky");
				setTimeout(_ => {
					$cta.classList.add("expand");
				}, 0);
			} else {
				$cta.classList.remove("expand");
				setTimeout(_ => {
					$cta.classList.remove("sticky");
				}, 0);
			}
		}
	}
});

window.addEventListener("load", _ => {
	setTimeout(_ => {
		let $form = document.querySelector("#mobile-lead-form");
		if ($form) {
			$form.style = "opacity: 1";
		}
	}, 1000);
});

let $mobileQuote = document.querySelector("#mobile-quote");
if ($mobileQuote) {
	$mobileQuote.addEventListener("click", _ => {
		let $button = document.querySelector("#mobile-quote");

		if ($button) {
			if (!$button.classList.contains("sticky")) {
				$button.classList.add("sticky");
				setTimeout(_ => {
					$button.classList.add("expand");
				}, 0);
			}
			let $form = document.querySelector("#mobile-lead-form");
			$form.classList.remove("slideOutUp");
			$form.classList.add("slideInDown");
			setTimeout(_ => {
				$button.classList.add("open");
				document.querySelector("body").classList.add("blur");
				setTimeout(_ => {
					$form.classList.remove("d-none");
				}, 0);
			}, 0);
		}
	});
}

let $close = document.querySelector("#close");
if ($close) {
	$close.addEventListener("click", _ => {
		let $button = document.querySelector("#mobile-quote");
		if ($button) {
			setTimeout(_ => {
				let $form = document.querySelector("#mobile-lead-form");
				$form.classList.remove("slideInDown");
				$button.classList.remove("open");
				$button.classList.add("expand");
				setTimeout(_ => {
					$button.classList.add("sticky");
					$form.classList.add("slideOutUp");
					setTimeout(_ => {
						$form.classList.add("d-none");
						window.scrollTo(window.scrollX, window.scrollY + 1);
						document.querySelector("body").classList.remove("blur");
					}, 300);
				}, 0);
			}, 0);
		}
	});
}

/* ==========================================================================
   Calculator
   ========================================================================== */
const calculatePayment = _ => {
	let $amount = document.querySelector("#currency");
	let $rate = document.querySelector("#rate");
	let $term = document.querySelector("#term");
	let $payment = document.querySelector("#payment");

	if (
		$amount &&
		$amount.value &&
		($rate && $rate.value) &&
		($term && $term.value)
	) {
		let amount = $amount.value
			.slice(1)
			.split(",")
			.join("");

		let apr = $rate.value.slice(0, -1) / 1200;

		let term = $term.value * 12;

		let calc =
			(amount * (apr * Math.pow(1 + apr, term))) /
			(Math.pow(1 + apr, term) - 1);
		$payment.textContent = "$" + calc.toFixed(0);
	} else {
		$payment.textContent = "Error";
	}
};

let $calculatorButton = document.querySelector("#calculator .btn-primary");
if ($calculatorButton) {
	$calculatorButton.addEventListener("click", calculatePayment);

	document
		.querySelector("#calculator input:last-of-type")
		.addEventListener("keyup", _ =>
			_.code === "Enter" ? calculatePayment() : null
		);

	document.querySelector("#clear").addEventListener("click", _ => {
		let $amount = document.querySelector("#currency");
		let $rate = document.querySelector("#rate");
		let $term = document.querySelector("#term");
		let $payment = document.querySelector("#payment");

		$amount.value = "";
		$rate.value = "";
		$term.value = "";
		$payment.textContent = "";
	});
}

/* ==========================================================================
   Stepped App
   ========================================================================== */
let $steppedApp = document.querySelector("#stepped-app");
if ($steppedApp) {
	addMaskToInput("#phoneNumber", phoneMask);
	let data = { optIn: "Yes" };
	let steps = ["step-one", "step-two", "step-three", "step-four", "step-five"];
	Array.from(document.querySelectorAll("[data-next]")).forEach(button => {
		button.addEventListener("click", _ => {
			let showErrors = false;
			let $nextStep = _.target.getAttribute("data-next");
			let nextIndex = steps.indexOf($nextStep);
			let currentIndex = nextIndex - 1;
			let key = _.target.getAttribute("data-key");

			// Assign data key value pair on button click
			if (key !== "continue") {
				let value = _.target.getAttribute("data-value");

				// If they're not in the military skip service branch step
				if (key === "isMilitary" && value === "No") {
					$nextStep = steps[++nextIndex];
					Object.assign(data, {
						[`${key}`]: value,
						serviceBranch: null
					});
				} else {
					data = Object.assign(data, { [`${key}`]: value });
				}
			} else {
				// Find input fields and assign their key value pair
				let parent = _.target.parentElement;
				let $inputs = parent.getElementsByClassName("form-control");
				Array.from($inputs).forEach(input => {
					// If any of the input fields are empty show error styles and
					// flip boolean to prevent submission or further data manipulation
					if (!input.value) {
						showErrors = true;
						input.classList.add("error");
					}
					data = Object.assign(data, {
						[`${input.getAttribute("data-key")}`]: input.value
					});
				});
			}

			if (showErrors) return;

			if (nextIndex === -1) {
				/* ==========================================================================
                   Submit Stepped Application
                   ========================================================================== */
				console.log("Submit data: ", data);
			} else {
				// Run animation to go to next step
				let $currentElement = document.querySelector(`#${steps[currentIndex]}`);
				let $nextElement = document.querySelector(`#${steps[nextIndex]}`);

				$currentElement.classList.remove("fadeIn");
				$nextElement.classList.add("fadeIn");

				setTimeout(_ => {
					$currentElement.classList.add("d-none");
					setTimeout(_ => {
						$nextElement.classList.remove("d-none");
						$nextElement.classList.remove("fadeOut");
					}, 100);
				}, 100);
			}
		});
	});

	// Run animation to go to previous step
	Array.from(document.querySelectorAll("button.back")).forEach(button => {
		button.addEventListener("click", _ => {
			let $prevStep = _.target.getAttribute("data-prev");
			let prevIndex = steps.indexOf($prevStep);
			let $currentElement = document.querySelector(`#${steps[prevIndex + 1]}`);
			let $prevElement = document.querySelector(`#${steps[prevIndex]}`);

			$currentElement.classList.remove("fadeIn");
			$prevElement.classList.add("fadeIn");

			setTimeout(_ => {
				$currentElement.classList.add("d-none");
				setTimeout(_ => {
					$prevElement.classList.remove("d-none");
					$prevElement.classList.remove("fadeOut");
				}, 100);
			}, 100);
		});
	});

	// Simulate continue click when enter pressed on input fields
	Array.from(document.querySelectorAll("input")).forEach(input => {
		input.addEventListener("keyup", _ => {
			if (_.code !== "Enter") return;
			let parent = _.target.closest(".form");
			let $buttons = parent.getElementsByClassName("btn");
			Array.from($buttons).forEach(button => {
				if (button.getAttribute("data-key") === "continue") button.click();
			});
		});
	});
}

/* ==========================================================================
   Form Submission Handling
   ========================================================================== */
Array.from(document.querySelectorAll("form")).forEach(form => {
	form.addEventListener("submit", _ => {
		_.preventDefault();
		let thankYou = `
			<div class="thank-you text-center mx-auto">
				<h5 class="subheading mb-0 my-lg-2">Thank You!</h5>
				<p class="phone mb-lg-0">
					Have questions? Give us a call!<br />
					<a class="d-lg-block my-2" href="tel:1-866-808-0377">1-866-808-0377</a>
				</p>
				<small class="d-block d-lg-none mt-5 text-muted font-italic"
					>Click "X" in the top-right corner to close.</small
				>
			</div>
        `;
		_.target.innerHTML = thankYou;
		Array.from(document.querySelectorAll(".form-text")).forEach(disclaimer =>
			disclaimer.classList.add("d-none")
		);
		Array.from(document.querySelectorAll(".form-container h3.heading")).forEach(
			heading => heading.classList.add("d-none")
		);
	});
});
