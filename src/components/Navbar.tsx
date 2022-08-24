import { signOut } from 'firebase/auth';
import { IoLogOutOutline, IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseSetup';

export function Navbar(){
    
    let navigate = useNavigate();

    const logout = async () => {
        await signOut(auth);
        navigate("/signin");
      };

    return<>
    <nav>
   <img className="logo" src="https://i.ibb.co/mzyhp8R/logo.png" alt="" />
   <div className="search-div">
    <input type="text" className="search-box" placeholder="Search"/>
    <IoSearch color='grey'/>
   </div>
   <div className="logout" ><IoLogOutOutline onClick={logout}  size={28}/></div>
    </nav>
    </>
}