class RootApp extends HTMLElement {
  shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.setupRouting();
  }

  setupRouting() {
    window.addEventListener("popstate", () => this.route());
    this.shadow.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.hasAttribute("href")) {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href) {
          history.pushState({}, "", href);
          this.route();
        }
      }
    });

    this.addEventListener("route-change", (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.path) {
        history.pushState({}, "", detail.path);
        this.route();
      }
    });

    this.route(); // inicial
  }

  route() {
    const content = this.shadow.querySelector("#app-view");
    if (!content) return;

    const path = window.location.pathname;
    content.innerHTML = ""; // limpiar

    switch (path) {
      case "/":
        content.appendChild(document.createElement("main-page"));
        break;
      case "/login":
        content.appendChild(document.createElement("login-form"));
        break;
      case "/register":
        content.appendChild(document.createElement("register-form"));
        break;
      case "/tasks":
        content.appendChild(document.createElement("task-page"));
        break;
      default:
        content.appendChild(document.createElement("four-page"));
        break;
    }
  }

  render() {
    this.shadow.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Montserrat', sans-serif;
          background: #fafafa;
          color: #333;
        }

        .container {
          max-width: 960px;
          margin: 0 auto;
          padding: 20px;
        }
      </style>
      <div class="container">
        <div id="app-view"></div>
      </div>
    `;
  }
}

customElements.define("root-app", RootApp);
export default RootApp;