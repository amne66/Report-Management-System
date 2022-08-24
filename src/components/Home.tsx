import { group } from "console";
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IGroupProps } from "../data/group";
import { usersArr } from "../data/users";
import { db } from "../firebaseSetup";
import { Navbar } from "./Navbar";
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';


export function Home(){

  const params:any = useParams();
  let visibility ='';
  let iconsVisibility ='';
  const auth = getAuth();
  const user = auth.currentUser;
  const [group, setGroup] = useState([]);
  let navigate = useNavigate();


  const isadmin = usersArr.filter((elem) =>elem.id  === user?.uid);    
          if(isadmin[0].data.role === 'admin'){
            visibility = 'new-group-card';
            iconsVisibility ='display update';
          }else{
          visibility = 'hide';
          iconsVisibility = 'hide';
        }
        

  const groupRef = collection(db, "groups");
    useEffect(() => {
      onSnapshot(groupRef, (querySnapshot:any) => {
        setGroup(querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
          id: doc.id,
          data: doc.data() 
        })))
      })
    },[])

    const deleteGroup = async (id:any) => {
      const groupDoc = doc(db, "groups", id);
      await deleteDoc(groupDoc);
    };

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

  return<>
    <Navbar></Navbar>
    <h1 className="group-title">Groups</h1>
    <div className="group-container">
    <div className={visibility} onClick={() => {navigate("/create/group");}}  >
      <IoAddCircle color="#2E86C1" size={50} />
      <p>Create Group</p>
    </div>
    {group.map((groupItem : IGroupProps) => ( 
    <div className="group-card">
      <div className="group-item-icons">
      <MdOutlineModeEdit className={iconsVisibility} onClick={() => {navigate(`/update/group/${groupItem.id}`);}} />
      <RiDeleteBin6Line className={iconsVisibility} onClick={() => {
        deleteGroup(groupItem.id);
      }} /> 
      </div>  
    <div onClick={() => {users(groupItem.data.usersEdit, groupItem.data.usersView , groupItem.id);}}>
    {groupItem.data.name}
    </div>  
    </div>
    ))}
    </div>
    </>
}