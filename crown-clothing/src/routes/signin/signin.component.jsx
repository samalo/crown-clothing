import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
const SignIn = () => {
 
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
       const userDocRef = await createUserDocumentFromAuth(user);
    }

    return(
         <div>
              <button onClick={logGoogleUser}>Sign In With Google PopUP</button>
         </div>
    );
}

export default SignIn;