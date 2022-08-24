import RichTextEditor from "@mantine/rte";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { reportArr } from "../data/report";
import { Navbar } from "./Navbar";

export function ViewReport(){

    const params:any = useParams();
    const searchIndex = reportArr.find((report) => report.id === params.id); 
    const [value, onChange] = useState(searchIndex?.data.content);

    return<>
    <Navbar />
    <div className="view-report-container">
    <label className="view-titles">Title:</label>
    <div className="report-view">{searchIndex?.data.title}</div><br />
    <label className="view-titles">Tags:</label>
    <div className="report-view">{searchIndex?.data.tags}</div><br />
    <label className="view-titles">Report details:</label>
    <RichTextEditor value={value} onChange={onChange} readOnly className="report-view-details"/>
    </div>
    </>
}