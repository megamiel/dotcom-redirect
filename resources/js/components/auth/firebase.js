import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCporOZip2QQwWjNLRYag5ocZ_v8-ozNmg",
  authDomain: "dotcom-redirect.firebaseapp.com",
  projectId: "dotcom-redirect",
  storageBucket: "dotcom-redirect.appspot.com",
  messagingSenderId: "567857367343",
  appId: "1:567857367343:web:6b5a401eae70a3c68f39da",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const setUser = async () => {
  const authData = localStorage.getItem("authData");
  if (authData == null) {
    const user = await signInWithPopup(auth, provider).then((result) => {
      const user = result.user;
      return user;
    });
    localStorage.setItem("authData",JSON.stringify(user));
  }
};

function generateToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const tokenLength = 32;
  let token = "";

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters[randomIndex];
  }

  return token;
}

const storage = getStorage(app);

export const uploadImage = (fileName, file, thenCallBack) => {
  const storageRef = ref(storage, fileName);
  uploadBytes(storageRef, file).then((snapshot) => {
    if (thenCallBack != null) {
      thenCallBack(snapshot);
    }
  });
};

export const getImageUrl = (fileName, thenCallBack) => {
  getDownloadURL(ref(storage, fileName)).then((url) => {
    if (thenCallBack != null) {
      thenCallBack(url);
    }
  });
};

export const authData = await setUser();

// export { auth, provider};
