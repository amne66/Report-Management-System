import RichTextEditor from "@mantine/rte";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reportArr } from "../data/report";
import { db } from "../firebaseSetup";
import { Navbar } from "./Navbar";


export function UpdateReport(){
  
    const params:any = useParams();
    const searchIndex = reportArr.find((report) => report.id === params.id); 
    const [title, setTitle] = useState(searchIndex?.data.title);
    const [tags, setTags] = useState(searchIndex?.data.tags);
    const [value, onChange] = useState(searchIndex?.data.content);
    let navigate = useNavigate();


    async function updateReport(){
        const auth = getAuth();
        const user = auth.currentUser;
        const reportDocRef = doc(db, 'reports', params.id)
        try{        
            await updateDoc(reportDocRef, {
                title: title,
                content: value,
                tags: tags,
                group_id: params.gid,
                uploader_id: user?.uid,
             })
             navigate(`/reports/${params.gid}/${'edit'}`);
           } catch (err) {
             console.log(err);          
            }         
    
    }


    return<>
    <Navbar />
    <h1 className="create-title">Update report</h1>
    <div className="new-report-container">
    <input placeholder="Title" className="report-input" value={title} onChange={(event) => {setTitle(event.target.value);}} />
    <input placeholder="Tags" className="report-input" value={tags} onChange={(event) => {setTags(event.target.value);}} />
    <RichTextEditor value={value} onChange={onChange}  controls={[
        ['bold', 'italic', 'underline'],
        ['unorderedList', 'h1', 'h2', 'h3'],
        ['alignLeft', 'alignCenter', 'alignRight'],
    ]} className="report-text"  />
    <div className="report-flex">
    <div className="cancel-btn"onClick={() => {navigate(`/reports/${params.gid}/${'edit'}`);}}>Cancel</div>
    <div className="publish-btn" onClick={updateReport}>Update</div>
    </div>
    </div>
    </>
}