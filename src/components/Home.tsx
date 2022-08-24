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
            visibility = 'display group-card';
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
  if(isEditor || isviwer){
    navigate(`/reports/${groupID}`);
  }else{
    console.log('you are not allowed to view this group');
    
  }
  }


  // `/reports/${groupItem.id}`

  return<>
    <Navbar></Navbar>
    <h1>Groups</h1>
    <div className="group-container">
    <div className={visibility}  >
      <IoAddCircle color="#2E86C1" size={50}/>
      Create Group
    </div>
    {group.map((groupItem : IGroupProps) => ( 
    <div className="group-card" onClick={() => {
      users(groupItem.data.usersEdit, groupItem.data.usersView , groupItem.id);
    }}>
      <div className="group-item-icons">
      <MdOutlineModeEdit className={iconsVisibility} />
      <RiDeleteBin6Line className={iconsVisibility} onClick={() => {
        deleteGroup(groupItem.id);
      }} /> 
      </div>  
    {groupItem.data.name}
   </div>
    ))}
    </div>
    </>
}