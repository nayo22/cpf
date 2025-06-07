import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebaseconfig';
import { getUserData } from '../utils/localStorage';
import { renderBoard } from '../components/boardgrid';
import { renderLoginForm } from '../components/LoginForm';
import { renderRegisterForm } from '../components/RegisterForm';
import { renderNameSelector } from '../components/NameSelector';
import { renderLetterSelector } from '../components/LetterSelector';
import { renderColorSelector } from '../components/ColorSelector';

function showScreen(id: string) {
  ['auth-screen', 'onboarding-screen', 'game-screen'].forEach((screenId) => {
    const el = document.getElementById(screenId);
    if (el) el.style.display = screenId === id ? 'block' : 'none';
  });
}

function showOnboarding() {
  showScreen('onboarding-screen');
  renderNameSelector('name-selector');
  renderLetterSelector('letter-selector');
  renderColorSelector('color-selector');

  const startBtn = document.getElementById('start-game-btn');
  if (startBtn) {
    startBtn.onclick = () => {
      const userData = getUserData();
      if (userData && userData.name && userData.letter && userData.color) {
        showBoard();
      } else {
        alert('Completa todos los pasos del onboarding');
      }
    };
  }
}

function showAuth() {
  showScreen('auth-screen');
  renderLoginForm('login-form');
  renderRegisterForm('register-form');
}

function showBoard() {
  showScreen('game-screen');
  renderBoard('board-container');
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    showAuth();
    return;
  }

  const userData = getUserData();
  if (!userData || !userData.name || !userData.letter || !userData.color) {
    showOnboarding();
  } else {
    showBoard();
  }
});
