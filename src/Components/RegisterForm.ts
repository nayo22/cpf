import { registerUser } from "../services/AuthService";

class RegisterForm extends HTMLElement {
  shadow: ShadowRoot;
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.shadow.querySelector("form")?.addEventListener("submit", this.handleSubmit.bind(this));
  }

  async handleSubmit(e: Event) {
    e.preventDefault();
    const email = (this.shadow.querySelector("#email") as HTMLInputElement).value;
    const password = (this.shadow.querySelector("#password") as HTMLInputElement).value;
    try {
      const user = await registerUser(email, password);
      this.dispatchEvent(new CustomEvent("user-registered", { detail: user.user.uid, bubbles: true, composed: true }));
    } catch (err: any) {
      this.shadow.querySelector("#error")!.textContent = err.message;
    }
  }

  render() {
    this.shadow.innerHTML = `
      <form>
        <input id="email" type="email" placeholder="Correo" />
        <input id="password" type="password" placeholder="Contraseña" />
        <button>Registrarse</button>
        <div id="error" style="color:red"></div>
      </form>
    `;
  }
}
customElements.define("register-form", RegisterForm);