import RichTextEditor from "@mantine/rte";
import { useState } from "react";
import { Navbar } from "./Navbar";

export function NewReport(){
  
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [reportText, setReportText] = useState('');
    const [value, onChange] = useState("");

    return<>
    <Navbar />
    <div className="new-report-container">
    <input placeholder="Title" className="report-input" onChange={(event) => {setTitle(event.target.value);}} />
    <input placeholder="Tags" className="report-input" onChange={(event) => {setTags(event.target.value);}} />
    {/* <textarea placeholder="Details" onChange={(event) => {setReportText(event.target.value);}} /> */}
    <RichTextEditor value={value} onChange={onChange}  controls={[
        ['bold', 'italic', 'underline'],
        ['unorderedList', 'h1', 'h2', 'h3'],
        ['alignLeft', 'alignCenter', 'alignRight'],
    ]}/>
    <input type='file' multiple/>
    <div className="publish-btn">Publish</div>
    </div>
    </>
}