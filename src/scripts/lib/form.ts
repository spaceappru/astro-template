import { sendContactForm } from "@utils/send-contact-form";

// пример отправки контактной формы
const contactForm = document.querySelector("#contact-form");
if (contactForm instanceof HTMLFormElement) {
  sendContactForm({
    form: contactForm,
    onSuccess: () => {
      // вызов модального окна или другой логики после успешной отправки формы
      console.log("Форма успешно отправлена");
    },
    onError: (error) => {
      // обработка ошибки отправки формы
      console.error(error);
    },
  });
}
