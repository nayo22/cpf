import { UserData } from '../types/UserData';

const KEY = 'polloc-user';

export function saveUserData(user: UserData) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getUserData(): UserData | null {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}
