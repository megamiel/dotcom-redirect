import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCporOZip2QQwWjNLRYag5ocZ_v8-ozNmg",
  authDomain: "dotcom-redirect.firebaseapp.com",
  projectId: "dotcom-redirect",
  storageBucket: "dotcom-redirect.appspot.com",
  messagingSenderId: "567857367343",
  appId: "1:567857367343:web:6b5a401eae70a3c68f39da",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// localStorageにユーザ情報がない場合、Firestoreから該当ユーザ情報のドキュメントを読み込む必要がある
export const setUser = async () => {
  let user;
  const email = localStorage.getItem("email");
  const userData = localStorage.getItem("user");
  if (email == null) {
    user = await signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      return user;
    });
    localStorage.setItem("email", user.email);
    const docRef = doc(db, "users", user.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // ユーザ名を入力させるページを用意するのもありだね
      const userName = prompt("ユーザ名を入力してください");
      const userData = {
        name: userName,
        am1: {},
        am2: {},
        recent: [],
      };
      localStorage.setItem("user", JSON.stringify(userData));
      await setDoc(doc(db, "users", user.email), userData);
    }
    window.location = "./home";
  } else {
    user = JSON.parse(userData);
  }
  return user;
};

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

export const user = await setUser();
