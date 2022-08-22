import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseSetup";

export function SignIn(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            email,
           password
          );
          console.log(user);
        } catch (error:any) {
          console.log(error.message);
        }
      };

    return <div className="home-container">

    <div className="home-part1">
     <div className="login-card">
        <h1>Sign in</h1>
        <div>
        <label>Email</label><br />
        <input className="login-input" type="text" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label>Password</label><br />
        <input className="login-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="sign-in-btn" onClick={login}>Sign in</div>
        <div className="row-flex">Don't have an account ? <div className="sign-up-btn">Sign up</div></div>
     </div>

    </div>


    <div className="home-part2">< img className="gg" src="gg.png" alt="" /></div>
    </div>
}