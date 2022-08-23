import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import {  setDoc , doc} from "firebase/firestore";
import {  auth, db } from "../firebaseSetup";
import { Link, useNavigate } from "react-router-dom";


export function SignUp(){


  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erorr, seterorr] = useState("");


    const handleSubmit = async () => {    
        try {
          if(name.length === 0){
            throw new Error('           Full name is required');
          }
          const result = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          ).then(async cred =>{
            await setDoc(doc(db, "users", cred.user.uid), {
              name: name,
              role:'user',
              email:email,
            });
            
          });
          
          navigate("/create/group");
        } catch (error : any) {
          const errorMessage = error.message.substring(10);
          seterorr(errorMessage)
          console.log(error.message)
        }
      };
    return <div className="home-container">

    <div className="home-part1">
     <div className="login-card">
        <h1 className="our-blue">Create account </h1>
        <div>
        <p className="red">{erorr}</p>
        
        <label>Full name</label><br />
        <input className="login-input" type="text" onChange={(e) => setName(e.target.value)}/>   
        </div>
        <div>    
        <label>Email</label><br />
        <input className="login-input" type="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label>Password</label><br />
        <input className="login-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        
        <div className="sign-in-btn" onClick={handleSubmit}>Sign up</div>
        <Link to={"/create/group"}> </Link>
        <div className="row-flex">Already have an account ?<Link to={"/signin"} className="no-line" > <div className="sign-up-btn">Sign in</div></Link> </div>
     </div>

    </div>


    <div className="home-part2">< img className="gg" src="gg.png" alt="" /></div>
    </div>
}