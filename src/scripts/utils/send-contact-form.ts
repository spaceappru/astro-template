const DOMAIN_URL = (import.meta.env.PUBLIC_DOMAIN_URL ?? "").trim();
const FORM_PATH = (import.meta.env.PUBLIC_FORM_PATH ?? "").trim();

type sendContactFormArgs = {
  /**
   * DOM-элемент формы
   */
  form: HTMLFormElement;
  /**
   * Обработчик успешного отправления формы
   */
  onSuccess: () => void;
  /**
   * Обработчик ошибки отправления формы
   */
  onError?: (error: unknown) => void;
};

/**
 * Отправка контактной формы
 */
export function sendContactForm({
  form,
  onSuccess,
  onError,
}: sendContactFormArgs) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      // проверка на валидность формы для WordPress
      const csrf_token = document
        .querySelector(`meta[name="csrf_token"]`)
        ?.getAttribute("content");

      let headers = new Headers();
      if (csrf_token) headers.append("Authorization", csrf_token);

      const requestOptions: RequestInit = {
        method: "POST",
        body: new FormData(form),
        headers,
      };

      const response = await fetch(DOMAIN_URL + FORM_PATH, requestOptions);
      if (response.ok) {
        // кастомный ивент, используемый для обработки успешной отправки формы во внешних скриптах
        // например, для отправки Яндекс.Метрики
        const successEvent = new CustomEvent("spaceAppFormSubmitSuccess", {
          bubbles: true,
          detail: {
            response: {
              //@ts-ignore
              success: response?.success,
              //@ts-ignore
              message: response?.message,
            },
            data: { id: form.id ?? "NO FORM ID PROVIDED" },
          },
        });
        form.dispatchEvent(successEvent);
        onSuccess();
      } else {
        const errorData = await response.json();
        throw new Error(errorData);
      }
    } catch (error) {
      onError?.(error);
    }
  });
}
