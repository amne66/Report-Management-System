import { getAuth } from "firebase/auth";
import { addDoc,collection,} from "firebase/firestore";
import { useState } from "react";
import Select from 'react-select';
import { usersArr } from "../data/users";
import { db } from "../firebaseSetup";
import { Navbar } from "./Navbar";



export function CreteGroup(){

  function newGroup(){
    const auth = getAuth();
    const user = auth.currentUser;

    // if(user){
     addDoc(collection(db, 'groups'),
      {
        name: groupName,
        usersView: selectedOptionView,
        usersEdit:selectedOptionEdit,
     })
  }

  const options = usersArr.map((elm)=>({
    value: elm.id,
    label: elm.data.name,
  }));
  console.log(options)
 const [ selectedOptionView, setSelectedOptionView] = useState(null);
 const [ selectedOptionEdit, setselectedOptionEdit] = useState(null);

 const [groupName, setGroupName] = useState("");

 const handleChangeview = (selectedOptionView:any) => {
  setSelectedOptionView(selectedOptionView) 
 }
 const handleChangeEdit = (selectedOptionEdit:any) => {
  setselectedOptionEdit(selectedOptionEdit) 
 }

return <>
<Navbar></Navbar>
<div className="new-group-form">
<label > Group name:  </label>
<input type="text" className="group-name" onChange={(e) => setGroupName(e.target.value)}/>

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
<div className='submit-btn' onClick={newGroup} >Submit</div>
</div>
</>
}