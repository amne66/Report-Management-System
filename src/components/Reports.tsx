import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IReportProps } from '../data/report';
import { db } from '../firebaseSetup';

export function Reports(){
    const [report, setReport] = useState([]);
    const reportRef = collection(db, "reports");
    useEffect(() => {
      onSnapshot(reportRef, (querySnapshot:any) => {
        setReport(querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
          id: doc.id,
          data: doc.data() 
        })))
      })
    },[])

    const deleteReport = async (id:any) => {
        const userDoc = doc(db, "reports", id);
        await deleteDoc(userDoc);
    };

    return<>
    <div className="reports-container">  
    {report.map((report : IReportProps) => (
    <div className="report-item">
      {report.data.title}
      <div className="report-item-icons">
      <MdOutlineModeEdit className='update' />
      <RiDeleteBin6Line className='delete' onClick={() => {
                deleteReport(report.id);
              }}/>  
      </div>
    </div>
    ))}
    </div> 
    </>
}