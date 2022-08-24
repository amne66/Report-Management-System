import { getAuth } from "firebase/auth";
import { addDoc,collection,} from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';
import { usersArr } from "../data/users";
import { db } from "../firebaseSetup";
import { Navbar } from "./Navbar";


export function CreteGroup(){

  
  let options = usersArr.map((elm)=>({
    value: elm.id,
    label: elm.data.name,
  }));
  let navigate = useNavigate();
  const [ selectedOptionView, setSelectedOptionView] = useState(null);
  const [ selectedOptionEdit, setselectedOptionEdit] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");


  const handleChangeview = (selectedOptionView:any) => {
  setSelectedOptionView(selectedOptionView) 
  }

  const handleChangeEdit = (selectedOptionEdit:any) => {
  setselectedOptionEdit(selectedOptionEdit) 
  }

  function newGroup(){
    if(groupName !== ''){
    addDoc(collection(db, 'groups'),
     {
       name: groupName,
       usersView: selectedOptionView,
       usersEdit:selectedOptionEdit,
    })
    navigate('/groups'); }
    else{
      setError('required field')
    }    
 }


return <>
<Navbar></Navbar>
<div className="form-container">
<div className="new-group-form">
  <p className="red">{error}</p>
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
<div className="group-btns">
<div className="cancel-btn-group"onClick={() => {navigate('/groups');}}>Cancel</div>
<div className='submit-btn' onClick={newGroup} >Submit</div>
</div>      
</div>
</div>
</>
}