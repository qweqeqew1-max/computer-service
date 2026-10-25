
"use strict";

// Автоматически обновляем год в подвале.
const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Мобильное меню.
const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Закрыть меню" : "Открыть меню"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // Закрываем меню после перехода по ссылке.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Открыть меню");
      menuToggle.textContent = "☰";
    });
  });
}

// Кнопки в карточках услуг выбирают услугу в форме.
const serviceButtons = document.querySelectorAll(".choose-service");
const serviceSelect = document.querySelector("#service");

serviceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedService = button.dataset.service;

    if (serviceSelect && selectedService) {
      serviceSelect.value = selectedService;
    }

    document.querySelector("#contacts")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    document.querySelector("#name")?.focus({
      preventScroll: true
    });
  });
});

// Демо-форма: создаём черновик письма.
// ЗАМЕНИ pcmaster@example.com на настоящий адрес.
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");

const CONTACT_EMAIL = "pcmaster@example.com";

if (contactForm && formNote) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = `Заявка PCMaster: ${service}`;

    const body = [
      `Имя: ${name}`,
      `Контакт: ${phone}`,
      `Услуга: ${service}`,
      "",
      "Описание проблемы:",
      message
    ].join("\n");

    const mailto =
      `mailto:${CONTACT_EMAIL}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    formNote.textContent =
      "Открываем почтовую программу. Проверьте адрес получателя и отправьте письмо вручную.";

    // Открывается почтовое приложение пользователя.
    // Само письмо без подтверждения пользователя не отправляется.
    window.location.href = mailto;
  });
}
