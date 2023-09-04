// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// import firebase from "firebase/app";
import firebase from "firebase/app";
// import { getFirestore } from "@firebase/firestore/lite";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
// import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDW82-SZ8kubthvZ2JSg0MdlDvISK4NFho",
  // authDomain: "ecommerce-913ce.firebaseapp.com",
  authDomain: "app.spontstore.com",
  projectId: "ecommerce-913ce",
  storageBucket: "ecommerce-913ce.appspot.com",
  messagingSenderId: "778740172841",
  appId: "1:778740172841:web:f1004c1591fec9e18af438",
  measurementId: "G-PFYTQ44J88",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// const db = getFirestore(firebaseApp);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export const firestore = firebase.firestore();
export { firebase };
// export const firestore = getFirestore(firebaseApp);

//const messaging = firebase.messaging();

export const createUserDocument = async (user) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  // console.log(user.email);

  if (!snapshot.exists) {
    const email = user.email;
    const name = user.displayName;
    const photo = user.photoURL;
    const uid = user.uid;
    const phoneNumber = user.phoneNumber;

    try {
      userRef.set({
        email,
        name,
        photo,
        uid,
        phoneNumber,
        createdAt: new Date(),
      });
      console.log("User Successfully Saved!");
    } catch (error) {
      console.log("Error while creating user", error);
    }
  }
};

/* export const getToken = (setTokenFound) => {
  return messaging
    .getToken({
      vapidKey:
        "AAAAtVCICCk:APA91bHQsorrArOflWAvxVMaSZzYzWCMTnaKTq03xa5Ofgod4lu0ugPwwNhDM73z_q8108h-N2nwCnUhQRQkaxbGgP_KgRTTKb5TUe9tnaR9GsIShVlVXJ1LSuozzlaTYALrJI0spPGb",
    })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
}; */

export { auth, provider, storage };

export default db;

/*  */
