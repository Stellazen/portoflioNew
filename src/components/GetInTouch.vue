<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'GetInTouch',
  setup() {
    const formRef = ref<HTMLFormElement | null>(null);
    const buttonRef = ref<HTMLButtonElement | null>(null);

    class FormSubmit {
      settings: { success: string; error: string };
      form: HTMLFormElement | null;
      formButton: HTMLButtonElement | null;
      url: string | null;

      constructor(form: HTMLFormElement | null, formButton: HTMLButtonElement | null, settings: { success: string; error: string }) {
        this.settings = settings;
        this.form = form;
        this.formButton = formButton;
        this.url = this.form ? this.form.getAttribute('action') : null;
      }

      displaySuccess() {
        if (this.form) {
          this.form.innerHTML = this.settings.success;
        }
      }

      displayError() {
        if (this.form) {
          this.form.innerHTML = this.settings.error;
        }
      }

      getFormObject() {
        const formObject: { [key: string]: string } = {};
        const fields = this.form?.querySelectorAll('[name]');
        fields?.forEach((field) => {
          formObject[(field as HTMLInputElement).name] = (field as HTMLInputElement).value;
        });
        return formObject;
      }

      onSubmission(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLButtonElement;
        target.disabled = true;
        target.innerText = 'Enviando...';
      }

      async sendForm(event: Event) {
        try {
          this.onSubmission(event);
          await fetch(this.url!, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(this.getFormObject()),
          });
          this.displaySuccess();
        } catch (error) {
          this.displayError();
          console.error(error);
        }
      }

      init() {
        if (this.form && this.formButton) {
          this.formButton.addEventListener('click', (event) => this.sendForm(event));
        }
      }
    }

    onMounted(() => {
      const formSubmit = new FormSubmit(
        formRef.value,
        buttonRef.value,
        {
          success: "<p class='success'>Mensagem enviada!</p>",
          error: "<p class='error'>Não foi possível enviar sua mensagem.</p>"
        }
      );
      formSubmit.init();
    });

    return {
      formRef,
      buttonRef,
    };
  },
});
</script>

<template>
  <div class="contact">
    <h2 class="contact__title">Entre em Contato</h2>

    <form ref="formRef" class="contact__form" 
      action="https://formsubmit.co/c16eec4c55cc767ae24ded1b38224f83" 
      method="POST"
      data-form>
      <label class="contact__form__label" for="nome">Nome:</label>
      <input class="contact__form__input" type="text" name="nome" id="nome" required />
      <label class="contact__form__label" for="email">Email:</label>
      <input class="contact__form__input" type="email" name="email" id="email" required />
      <label class="contact__form__label" for="mensagem">Mensagem:</label>
      <textarea class="contact__form__text" name="mensagem" id="mensagem" required></textarea>
      <button ref="buttonRef" class="contact__form__button" type="submit" data-button>
        Enviar
      </button>
    </form>

    <div class="contact__links">
      <a class="contact__link" href="mailto:stellazen.xd@gmail.com">
        <img class="contact__link__img" src="../assets/images/icon-mail.png" alt="">
      </a>
      <a class="contact__link" href="https://wa.me/5541996538820">
        <img class="contact__link__img" src="../assets/images/icon-wwp.png" alt="">
      </a>
    </div>
  </div>
  <div class="contact__footer"></div>
</template>

<style scoped>
.contact {
  margin: 100px 0 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact__title {
  font-size: 2em;
  font-family: var(--font-title);
  text-align: center;
  color: var(--white);
  margin: 20px 0 20px 0;
  text-decoration: underline var(--soft_orange);
}
.contact__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  color:white;
}
.contact__form__label {
  color: var(--white);
  align-self: flex-start;
  margin-top: 15px;
}
.contact__form__input {
  background-color: var(--black);
  border: none;
  height: 35px;
  width: 400px;
  border-radius: 10px;
  color: var(--white);
  font-family: var(--fonte_texto);
  padding: 5px;
}
.contact__form__text {
  background-color: var(--black);
  border: none;
  border-radius: 10px;
  width: 400px;
  height: 200px;
  color: var(--white);
  font-family: var(--fonte_texto);
  padding: 10px;
}
.contact__form__button {
  background-color: var(--black);
  border: none;
  border-radius: 10px;
  margin: 15px;
  width: 100px;
  height: 40px;
  font-family: var(--fonte_texto);
  color: var(--white);
  cursor: pointer;
}
.contact__form__button:hover {
  border: 2px solid var(--soft_orange);
  color: var(--soft_orange);
}
.contact__links {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin-top: 20px;
}
.contact__link {
  background-color: var(--black);
  padding: 10px;
  border-radius: 50%;
  text-decoration: none;
  width: 70px;
  height: 70px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.contact__link__img {
  width: 40px;
}
.contact__link:hover {
  border: 1px solid var(--soft_orange);
}
.contact__footer {
  background-color: black;
  height: 100px;
}

.success{
  color: white;

}


@media (max-width: 480px) {
  .contact__form__input {
    width: 280px;
  }
  .contact__form__text {
    width: 280px;
  }
}
</style>
