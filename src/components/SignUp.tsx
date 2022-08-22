import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebaseSetup";

export function SignUp(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async () => {    
        try {
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
         
        } catch (error) {
        console.log(error)
          return;
        }
      };
    return <div className="home-container">

    <div className="home-part1">
     <div className="login-card">
        <h1>Create account </h1>
        <div>
        <label>Full name</label><br />
        <input className="login-input" type="text" onChange={(e) => setName(e.target.value)}/>   
        </div>
        <div>    
        <label>Email</label><br />
        <input className="login-input" type="text" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label>Password</label><br />
        <input className="login-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        <div className="sign-in-btn" onClick={handleSubmit}>Sign up</div>
        <div className="row-flex">Already have an account ? <div className="sign-up-btn">Sign in</div></div>
     </div>

    </div>


    <div className="home-part2">< img className="gg" src="gg.png" alt="" /></div>
    </div>
}