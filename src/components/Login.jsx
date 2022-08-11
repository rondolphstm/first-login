import {useState} from 'react';
import {initializeApp} from 'firebase/app';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth'


    const firebaseConfig = {
        apiKey: "AIzaSyAl0aYxGm_2WgHwQ7EpQ94bTxMsrFgZXx8",
        authDomain: "first-login-rstm.firebaseapp.com",
        projectId: "first-login-rstm",
        storageBucket: "first-login-rstm.appspot.com",
        messagingSenderId: "537615033852",
        appId: "1:537615033852:web:fcf565b9764e4141437e79"
      };


export default function  Login ({setIsloginIn}){
    const  [email, setEmail]=useState('')
    const [password, setPassword] = useState()

    const handleSignUp = async() => {
        // conect to our firebase project
        const app = initializeApp(firebaseConfig);
        // connect to Auth
        const auth = getAuth(app);
        // send email and password to firebase auth
        const user = await createUserWithEmailAndPassword(auth, email, password)
        .catch((err)=> alert(err.message))
        // if all ok
        if (user) setIsloginIn(true)
        // if error 
        //   popup error 

    }
return(
    <form onSubmit ={(e)=> e.preventDefault}>
        <label for ='email'>
            Email:
            <input value={email} onClick={e =>setEmail(e.target.value)} name ='email' type ='email' placeholder="you@there.com"/>
        </label><br/>
        <label for ='password'>
            Password:
            <input value ={password} onClick={e =>setPassword(e.target.value)} name ='password' type ='password'/>
        </label><br/>
        <button onClick={handleSignUp}>Sign up</button>
    </form>
)

}

