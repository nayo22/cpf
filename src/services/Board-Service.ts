import { db } from './firebaseconfig';
import { doc, setDoc, onSnapshot, collection } from 'firebase/firestore';

export function subscribeToBoard(callback: (cell: any) => void) {
  onSnapshot(collection(db, 'cells'), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      callback(change.doc.data());
    });
  });
}

export function claimCell(x: number, y: number, user: { color: string; letter: string }) {
  const ref = doc(db, 'cells', `${x}_${y}`);
  return setDoc(ref, {
    x, y,
    color: user.color,
    letter: user.letter
  });
}
