import { claimCell, subscribeToBoard } from '../services/Board-Service';
import { getUserData } from '../Utils/Localstorage';

const GRID_SIZE = 500;

export function renderBoard(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';

  for (let y = 0; y < GRID_SIZE; y++) {
    const row = document.createElement('div');
    row.className = 'board-row';

    for (let x = 0; x < GRID_SIZE; x++) {
      const cell = document.createElement('div');
      cell.className = 'board-cell';
      cell.id = `cell-${x}-${y}`;
      cell.dataset.x = String(x);
      cell.dataset.y = String(y);
      row.appendChild(cell);
    }

    container.appendChild(row);
  }

  container.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('board-cell')) return;

    const x = parseInt(target.dataset.x || '', 10);
    const y = parseInt(target.dataset.y || '', 10);
    const user = getUserData();
    if (!user) return;

    claimCell(x, y, { color: user.color, letter: user.letter });
  });

  subscribeToBoard((cellData) => {
    const { x, y, color, letter } = cellData;
    const cell = document.getElementById(`cell-${x}-${y}`);
    if (cell) {
      cell.style.backgroundColor = color;
      cell.textContent = letter;
    }
  });
}
