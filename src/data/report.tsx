import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseSetup";

export interface IReport {
    title: string;
    content: any;
    tags: string;
    group_id: string;
    uploader_id: string;
}
export interface IReportProps {
	data: IReport;
    id : string;
}

export let reportArr: IReportProps[]  = [];
const reportsRef = collection(db, "reports");
onSnapshot(reportsRef, (querySnapshot:any) => {
    reportArr=(querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
      id: doc.id,
      data: doc.data() 
    })))
})  
