import RichTextEditor from "@mantine/rte";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebaseSetup";
import { Navbar } from "./Navbar";


export function NewReport(){
  
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [value, onChange] = useState("");
    const params:any = useParams();
    let navigate = useNavigate();


    function addReport(){
        const auth = getAuth();
        const user = auth.currentUser;
    
        // if(user){
         addDoc(collection(db, 'reports'),
          {
            title: title,
            content: value,
            tags: tags,
            group_id: params.gid,
           uploader_id: user?.uid,
        })
        navigate(`/reports/${params.gid}`);
     }


    return<>
    <Navbar />
    <h1 className="create-title">Create new report</h1>
    <div className="new-report-container">
    <input placeholder="Title" className="report-input" value={title} onChange={(event) => {setTitle(event.target.value);}} />
    <input placeholder="Tags" className="report-input" value={tags} onChange={(event) => {setTags(event.target.value);}} />
    <RichTextEditor value={value} onChange={onChange}  controls={[
        ['bold', 'italic', 'underline'],
        ['unorderedList', 'h1', 'h2', 'h3'],
        ['alignLeft', 'alignCenter', 'alignRight'],
    ]} className="report-text" />
    <input type='file' multiple/>
    <div className="report-flex">
    <div className="cancel-btn" onClick={() => {navigate(`/reports/${params.gid}`);}}>Cancel</div>
    <div className="publish-btn" onClick={addReport}>Publish</div>
    </div>
    </div>
    </>
}