import { useState } from 'react';
import {
        createAuthUserWithEmailAndPassword,
        signInWithGooglePopup,
        createUserDocumentFromAuth,
        signInAuthUserWithEmailAndPassword
    } 
    from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {  email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
        
    }

    const handleChange = (event) => {
       const {name, value} = event.target;
       setFormFields({...formFields, [name]: value});
    }

    const handleSubmit = async (event) => {
       event.preventDefault();


       try{
          const {user}= await signInAuthUserWithEmailAndPassword(
              email, password);
         
          resetFormFields();

       }catch(error){
           switch(error.code){
               case 'auth/wrong-password': 
                 alert('Incorect password forr the user!');
                 break;
               case 'auth/user-not-found':
                   alert('No user associated with this email!');
                   break;
                default:
                   console.log(error);

           }
           
       }

       
    }

    return (
       <div className="sign-up-container">
           <h2>Already have an account?</h2>
           <span>Sign In With Email and Password</span>
           <form onSubmit={handleSubmit}>
            

               <FormInput 
               label="Email"
               type="email" 
               name="email" 
               required 
               onChange={handleChange}
                value={email}/>

               <FormInput 
               label="Password"
               type="password"
                name="password"
                 required 
                 onChange={handleChange} 
                 value={password}/>

             <div className="buttons-container">
               <Button type="submit">Sign In</Button>
               <Button type="button" buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google Sign In</Button>
             </div>
               
               
           </form>
       </div>
    );
}

export default SignInForm;