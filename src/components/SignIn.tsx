import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersArr } from "../data/users";
import { auth } from "../firebaseSetup";

export function SignIn(){

 
  
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erorr, seterorr] = useState("");

    const login = async () => {
        try {
          const user = await signInWithEmailAndPassword(
            auth,
            email,
           password
          );
          const isadmin = usersArr.filter((elem) =>elem.id  === user.user.uid);    
          if(isadmin[0].data.role === 'admin'){
            navigate("/create/group");
          }else{
          navigate("/groups");}
        } catch (error:any) {
          const errorMessage = error.message.substring(10);
          seterorr(errorMessage)
        }
      };

    return <div className="home-container">

    <div className="home-part1">
     <div className="login-card">
        <h1 className="our-blue">Sign in</h1>
        <div>
          <p className="red">{erorr}</p>
        <label>Email</label><br />
        <input className="login-input" type="email" onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label>Password</label><br />
        <input className="login-input" type="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="sign-in-btn" onClick={login}>Sign in</div>
        <div className="row-flex">Don't have an account  ?<Link className="no-line" to={"/"}> <div className="sign-up-btn">Sign up</div></Link> </div>

     </div>

    </div>


    <div className="home-part2">< img className="gg" src="gg.png" alt="" /></div>
    </div>
}