import { useState } from "react"
import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAl0aYxGm_2WgHwQ7EpQ94bTxMsrFgZXx8",
  authDomain: "first-login-rstm.firebaseapp.com",
  projectId: "first-login-rstm",
  storageBucket: "first-login-rstm.appspot.com",
  messagingSenderId: "537615033852",
  appId: "1:537615033852:web:fcf565b9764e4141437e79",
}

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const connectAuth = () => {
    // conect to our firebase project
    const app = initializeApp(firebaseConfig)
    // connect to Auth
    return getAuth(app)
  }

  const handleLogin = async () => {
    const auth = await connectAuth()
    const user = await signInWithEmailAndPassword(auth, email, password).catch(
      (err) => alert(err.message)
    )
    if (user) {
      console.log(user.user)
      setIsLoggedIn(true)
    }
  }


const handleGoogleLogin = async () =>{
    const auth = await connectAuth()
    const provider = new GoogleAuthProvider
    const user = await signInWithPopup(auth,provider)
    .catch(err=> alert(err.message))
    if(user){
        console.log(user.user)
        setIsLoggedIn(true)
    }
}


  const handleSignUp = async () => {
    const auth = await connectAuth()
    // send email and password to firebase auth
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).catch((err) => alert(err.message))
    // if all ok
    if (user) setIsLoggedIn(true)
    // if error
    //   popup error
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="email">Email: </label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        id="email"
        name="email"
        type="email"
        placeholder="you@there.com"
      />
      <br />
      <label htmlFor="password">Password: </label>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id="password"
        name="password"
        type="password"
      />
      <br />
      <button onClick={handleLogin}>Login</button>&nbsp;
      <button onClick={handleSignUp}>Sign up</button>
      <br/>
      <button onClick={handleGoogleLogin}>Login with Google</button>
    </form>
  )
}
