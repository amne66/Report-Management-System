import { getAuth } from "firebase/auth";
import { addDoc,collection, doc, updateDoc,} from "firebase/firestore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from 'react-select';
import { groupArr } from "../data/group";
import { usersArr } from "../data/users";
import { db } from "../firebaseSetup";
import { Navbar } from "./Navbar";


export function UpdateGroup(){

    const params:any = useParams();
    const searchIndex = groupArr.find((group) => group.id === params.id); 
    let view :any = searchIndex?.data.usersView;
    let edit : any= searchIndex?.data.usersEdit;
    console.log(searchIndex);
    
  let options = usersArr.map((elm)=>({
    value: elm.id,
    label: elm.data.name,
  }));
  
 let navigate = useNavigate();
 const [ selectedOptionView, setSelectedOptionView] = useState(view);
 const [ selectedOptionEdit, setselectedOptionEdit] = useState(edit);
 const [groupName, setGroupName] = useState(searchIndex?.data.name);

 const handleChangeview = (selectedOptionView:any) => {
  setSelectedOptionView(selectedOptionView) 
 }

 const handleChangeEdit = (selectedOptionEdit:any) => {
  setselectedOptionEdit(selectedOptionEdit) 
 }

 async function updatGroup(){
    const reportDocRef = doc(db, 'groups', params.id)
    try{        
        await updateDoc(reportDocRef, {
            name: groupName,
            usersView: selectedOptionView,
            usersEdit:selectedOptionEdit,
         })
         navigate('/groups');
       } catch (err) {
         console.log(err);          
        }   
 }

return <>
<Navbar></Navbar>
<div className="new-group-form">
<label > Group name:  </label>
<input type="text" className="group-name" value={groupName}  onChange={(e) => setGroupName(e.target.value)}/>

<label>Users who can view only:</label>
<div className="App">
      <Select
        defaultValue={selectedOptionView}
        onChange={handleChangeview}
        options={options} isMulti
      />
    </div>
<label>Users who can edit and delete :</label>
<div className="App">
      <Select
        defaultValue={selectedOptionEdit}
        onChange={handleChangeEdit}
        options={options} isMulti
      />
    </div>      
<div className='submit-btn' onClick={updatGroup} >Update group</div>
</div>
</>
}