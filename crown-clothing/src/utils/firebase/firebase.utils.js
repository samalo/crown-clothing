import { async } from '@firebase/util';
import {initializeApp} from 'firebase/app';
import {
        getAuth,
        signInWithRedirect, 
        signInWithPopup,
        GoogleAuthProvider
        } from 'firebase/auth';
import {
           getFirestore,
           doc,
           getDoc,
           setDoc
        
        } from 'firebase/firestore'

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

  const provider  = new GoogleAuthProvider();

  provider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  //Instantiate Firestore
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
      const userDocRef = doc(db, 'users', userAuth.uid);
      console.log(userDocRef);

      const snapShot = await getDoc(userDocRef);
      console.log(snapShot);
      console.log(snapShot.exists());

      //Check if user data exists.
      if(!snapShot.exists()){
          const {displayName, email, } = userAuth;
          const createdAt = new Date();

          try{

              await setDoc(userDocRef, {
                  displayName,
                  email,
                  createdAt
              })

          }catch(error){
            console.log("Error creating the user", error.message);
          }
      }

      return userDocRef;
      //If data does not exist
      //The return userDocRef
  }

