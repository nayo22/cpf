import { getUserData, saveUserData } from '../Utils/localStorage';

export function renderNameSelector(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const user = getUserData() || { name: '', letter: '', color: '' };

  container.innerHTML = `
    <label>Nombre:</label>
    <input type="text" id="name-input" value="${user.name || ''}" placeholder="Tu nombre" />
    <button id="save-name-btn">Guardar nombre</button>
  `;

  const input = document.getElementById('name-input') as HTMLInputElement;
  const button = document.getElementById('save-name-btn') as HTMLButtonElement;

  button.onclick = () => {
    user.name = input.value.trim();
    if (!user.name) {
      alert('Ingresa un nombre válido');
      return;
    }
    saveUserData(user);
    alert('Nombre guardado');
  };
}
