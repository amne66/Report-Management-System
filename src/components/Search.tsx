import { getAuth } from 'firebase/auth';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { groupArr } from '../data/group';
import { usersArr } from '../data/users';
import { Navbar } from './Navbar';

export function Search(){
     
   const [searchText, setSearchText] = useState("");
   let navigate = useNavigate(); 
   const auth = getAuth();
   const user = auth.currentUser;
   const searchIndex = groupArr.find((group) => group.data.name === searchText); 
      let name = '' ;
      let id = '';
      let usersEdit:any = []
      let usersView:any = []
      const isadmin = usersArr.filter((elem) =>elem.id  === user?.uid);    

     if(searchIndex){
        id = searchIndex.id;
        name = searchIndex.data.name;
        usersEdit = searchIndex.data.usersEdit;
        usersView = searchIndex.data.usersView;
    }
    
    function users(usersEdit:any , usersView:any , groupID:string){
        const isEditor = usersEdit.find((elm:any) => elm.value === user?.uid);
        const isviwer = usersView.find((elm:any) => elm.value === user?.uid);
      if(isEditor || isadmin[0].data.role === 'admin' ){
        navigate(`/reports/${groupID}/${'edit'}`);
      }else if(isviwer){
        navigate(`/reports/${groupID}/${'view'}`);
      }else{
        navigate('/permission');
      }
      }
   

   return <>
    <Navbar/>
    <div className='search-container'>
    <div className="search-div">
    <input type="text" className="search-box" placeholder="Search by group..." onChange={(e) => setSearchText(e.target.value)}/>
    <IoSearch color='grey' />
    </div>
    <div className="group-card">
    <div onClick={() => {users(usersEdit, usersView , id);}}>
    {name}
    </div>  
    </div>   
    </div>

    </>
}