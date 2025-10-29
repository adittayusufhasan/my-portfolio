/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*=============== SERVICES MODAL ===============*/
// Get the modal
const modalViews = document.querySelectorAll(".services__modal"),
  modalBtns = document.querySelectorAll(".services__button"),
  modalClose = document.querySelectorAll(".services__modal-close");

// When the user clicks on the button, open the modal
let modal = function (modalClick) {
  modalViews[modalClick].classList.add("active-modal");
};

modalBtns.forEach((mb, i) => {
  mb.addEventListener("click", () => {
    modal(i);
  });
});

modalClose.forEach((mc) => {
  mc.addEventListener("click", () => {
    modalViews.forEach((mv) => {
      mv.classList.remove("active-modal");
    });
  });
});

/*=============== MIXITUP FILTER PORTFOLIO ===============*/

let mixer = mixitup(".work__container", {
  selectors: {
    target: ".work__card",
  },
  animation: {
    duration: 300,
  },
});

/* Link active work */
const workLinks = document.querySelectorAll(".work__item");

function activeWork(workLink) {
  workLinks.forEach((wl) => {
    wl.classList.remove("active-work");
  });
  workLink.classList.add("active-work");
}

workLinks.forEach((wl) => {
  wl.addEventListener("click", () => {
    activeWork(wl);
  });
});

/*=============== SWIPER TESTIMONIAL ===============*/

let swiperTestimonial = new Swiper(".testimonial__container", {
  spaceBetween: 24,
  loop: true,
  grabCursor: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 48,
    },
  },
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== LIGHT DARK THEME ===============*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the light-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the light
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  reset: true,
});

sr.reveal(`.nav__menu`, {
  delay: 100,
  scale: 0.1,
  origin: "bottom",
  distance: "300px",
});

sr.reveal(`.home__data`);
sr.reveal(`.home__handle`, {
  delay: 100,
});

sr.reveal(`.home__social, .home__scroll`, {
  delay: 100,
  origin: "bottom",
});

sr.reveal(`.about__img`, {
  delay: 100,
  origin: "left",
  scale: 0.9,
  distance: "30px",
});

sr.reveal(`.about__data, .about__description, .about__button-contact`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.skills__content`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.services__title, services__button`, {
  delay: 100,
  scale: 0.9,
  origin: "top",
  distance: "30px",
});

sr.reveal(`.work__card`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.testimonial__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});

sr.reveal(`.contact__info, .contact__title-info`, {
  delay: 100,
  scale: 0.9,
  origin: "left",
  distance: "30px",
});

sr.reveal(`.contact__form, .contact__title-form`, {
  delay: 100,
  scale: 0.9,
  origin: "right",
  distance: "30px",
});

sr.reveal(`.footer, footer__container`, {
  delay: 100,
  scale: 0.9,
  origin: "bottom",
  distance: "30px",
});



document.addEventListener("DOMContentLoaded", () => {
  const skills = document.querySelectorAll(".skills__data");

  const animateSkill = (skill) => {
    const percent = skill.getAttribute("data-percent");
    const bar = skill.querySelector(".skills__percentage");
    const text = skill.querySelector(".skills__percent-text");

    // Reset animation
    bar.style.transition = "none";
    bar.style.width = "0";
    text.textContent = "0%";
    void bar.offsetWidth; // Force reflow
    bar.style.transition = "width 2s ease";

    // Animate progress bar
    setTimeout(() => {
      bar.style.width = percent + "%";
    }, 100);

    // Animate number
    let count = 0;
    const interval = setInterval(() => {
      if (count >= percent) clearInterval(interval);
      else text.textContent = ++count + "%";
    }, 20);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        const skill = entry.target;
        if (entry.isIntersecting) {
          skill.classList.add("visible");
          animateSkill(skill);
        } else {
          skill.classList.remove("visible");
        }
      });
    },
    { threshold: 0.5 }
  );

  skills.forEach(skill => observer.observe(skill));
});


















const cards = document.querySelectorAll(".services__card");

cards.forEach(card => {
  const modal = document.querySelector(".services__modal"); // single modal example
  const closeBtn = modal.querySelector(".services__modal-close");

  card.querySelector(".services__button").addEventListener("click", () => {
    modal.classList.add("active-modal");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active-modal");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) {
      modal.classList.remove("active-modal");
    }
  });
});




















document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("image-popup");
  const popupImg = popup.querySelector(".popup-image");
  const closeBtn = popup.querySelector(".close-popup");

  document.querySelectorAll(".testimonial__img").forEach(img => {
    img.addEventListener("click", () => {
      popupImg.src = img.src;
      popup.classList.add("active");
    });
  });

  // Close popup
  closeBtn.addEventListener("click", () => {
    popup.classList.remove("active");
    setTimeout(() => popup.style.display = "none", 400);
  });

  // Click outside the image to close
  popup.addEventListener("click", e => {
    if (e.target === popup) popup.classList.remove("active");
  });
});


























document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".services__card");

  cards.forEach(card => {
    const modal = card.querySelector(".services__modal");
    const closeBtn = card.querySelector(".services__modal-close");
    const videoWrapper = card.querySelector(".services__video-wrapper");
    const videoUrl = card.dataset.video;

    // Open modal
    card.querySelector(".services__button").addEventListener("click", () => {
      modal.classList.add("active-modal");
      // Embed iframe
      videoWrapper.innerHTML = `<iframe src="${videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    });

    // Close modal
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active-modal");
      // Remove iframe to stop video
      videoWrapper.innerHTML = "";
    });

    // Optional: Close modal by clicking outside content
    modal.addEventListener("click", e => {
      if (e.target === modal) {
        modal.classList.remove("active-modal");
        videoWrapper.innerHTML = "";
      }
    });
  });
});



















