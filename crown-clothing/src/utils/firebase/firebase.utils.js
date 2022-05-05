
import { initializeApp } from 'firebase/app';
import {
        getAuth,
        signInWithRedirect, 
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword
        } from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc

} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPzASxFYy6uFEYq8CLLdqy9wCP7uM_09w",
    authDomain: "crown-clothing-db-eee52.firebaseapp.com",
    projectId: "crown-clothing-db-eee52",
    storageBucket: "crown-clothing-db-eee52.appspot.com",
    messagingSenderId: "757904399400",
    appId: "1:757904399400:web:57aa6aa166863a8570291d"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: "select_account"
  })

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {

      if(!userAuth) return;

     const userDocRef = doc(db, 'users', userAuth.uid);
     console.log(userDocRef);

     const userSnapShot = await getDoc(userDocRef);

     console.log(userSnapShot.exists());

     if(!userSnapShot.exists()){
         const { displayName, email,  } = userAuth;
         const createdAt = new Date();

         try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
         }catch(error){
             console.log("An error has occured", error.message);
         }
     }

     return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword =  async (email, password) => {

      if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  }

  export const signInAuthUserWithEmailAndPassword =  async (email, password) => {

    if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}


  