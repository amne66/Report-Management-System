import { getAuth } from "firebase/auth";
import { addDoc,collection,} from "firebase/firestore";
import { useState } from "react";
import Select from 'react-select';
import { usersArr } from "../data/users";
import { db } from "../firebaseSetup";



export function CreteGroup(){

  function newGroup(){
    const auth = getAuth();
    const user = auth.currentUser;

    // if(user){
     addDoc(collection(db, 'groups'),
      {
        name: groupName,
        users: selectedOption,
        reports: [],
        admin: 'aa'
     })
  }

  const options = usersArr.map((elm)=>({
    value: elm.data.email,
    label: elm.data.name,
  }));

 const [ selectedOption, setSelectedOption] = useState(null);
 const [groupName, setGroupName] = useState("");

 const handleChange = (selectedOption:any) => {
  setSelectedOption(selectedOption) 
 }

return <div className="new-group-form">
<label > Group name:  </label>
<input type="text" className="group-name" onChange={(e) => setGroupName(e.target.value)}/>

<label>Group members:</label>
<div className="App">
      <Select
        defaultValue={selectedOption}
        onChange={handleChange}
        options={options} isMulti
      />
    </div>
<div className='submit-btn' onClick={newGroup} >Submit</div>
</div>
}