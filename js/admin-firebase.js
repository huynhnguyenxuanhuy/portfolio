// admin-firebase.js
window.firebaseReady = new Promise((resolve) => {
  const waitFirebase = setInterval(() => {
    if (window.firebasePortfolio) {
      clearInterval(waitFirebase);
      resolve(window.firebasePortfolio);
    }
  }, 100);
});

window.loadFirebaseData = async function () {
  const fb = await window.firebaseReady;
  const snap = await fb.getDoc(fb.dataRef);

  if (snap.exists()) {
    return snap.data();
  }

  return null;
};

window.saveFirebaseData = async function (data) {
  const fb = await window.firebaseReady;
  await fb.setDoc(fb.dataRef, JSON.parse(JSON.stringify(data)));
};
