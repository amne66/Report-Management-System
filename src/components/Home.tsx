import { group } from "console";
import { getAuth } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { IGroupProps } from "../data/group";
import { usersArr } from "../data/users";
import { db } from "../firebaseSetup";
import { Navbar } from "./Navbar";


export function Home(){
  const params:any = useParams();

  let visibility:any ='';
  const auth = getAuth();
    const user = auth.currentUser;
  const isadmin = usersArr.filter((elem) =>elem.id  === user?.uid);    
          if(isadmin[0].data.role === 'admin'){
            visibility = 'display group-card';
          }else{
          visibility = 'hide';
        }
  const [group, setGroup] = useState([]);
  const groupRef = collection(db, "groups");
    useEffect(() => {
      onSnapshot(groupRef, (querySnapshot:any) => {
        setGroup(querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
          id: doc.id,
          data: doc.data() 
        })))
      })
    },[])

    return<>
    <Navbar></Navbar>
    <h1>Groups</h1>
    <div className="group-container">
    <div className={visibility}  >
        <IoAddCircle color="#2E86C1" size={50}/>
      Create Groupe 
    </div>
    {group.map((groupItem : IGroupProps) => ( 
    <Link to={`/reports/${groupItem.id}`} className="no-line" ><div className="group-card">
    {groupItem.data.name}
   </div> </Link>
    ))}
    </div>
    </>
}