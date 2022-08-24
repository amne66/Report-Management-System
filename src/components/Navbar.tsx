import { signOut } from 'firebase/auth';
import { IoLogOutOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
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
   <div className='nav-con'>
   <Link to={'/groups'} className='no-line-nav' >Home </Link>
   <Link to={'/search'} className='no-line-nav' >Search </Link>
   </div>
   <div className="logout" ><IoLogOutOutline onClick={logout}  size={28}/></div>
    </nav>
    </>
}