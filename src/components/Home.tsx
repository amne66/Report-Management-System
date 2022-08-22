import { group } from "console";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { IGroupProps } from "../data/group";
import { db } from "../firebaseSetup";


export function Home(){

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
    <h1>Groups</h1>
    <div className="group-container">
    <div className="group-card">
        <IoAddCircle color="#2E86C1" size={50}/>
      Create Groupe 
    </div>
    {group.map((groupItem : IGroupProps) => (
    <div className="group-card">
     {groupItem.data.name}
    </div>
    ))}
    </div>
    </>
}