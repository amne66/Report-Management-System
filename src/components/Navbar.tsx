import { IoLogOutOutline, IoSearch } from 'react-icons/io5';

export function Navbar(){
    
    return<>
    <nav>
   <img className="logo" src="logo.png" alt="" />
   <div className="search-div">
    <input type="text" className="search-box" placeholder="Search"/>
    <IoSearch color='grey'/>
   </div>
   <div className="logout" ><IoLogOutOutline  size={28}  /></div>
    </nav>
    </>
}