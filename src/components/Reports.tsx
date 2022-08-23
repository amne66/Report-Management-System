import { deleteDoc, doc } from 'firebase/firestore';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import { IReportProps, reportArr } from '../data/report';
import { db } from '../firebaseSetup';
import { Navbar } from './Navbar';

export function Reports(){

    const params:any = useParams();
    const groupReport = reportArr.filter((elm) =>elm.data.group_id  === params.id)

    const deleteReport = async (id:any) => {
        const userDoc = doc(db, "reports", id);
        await deleteDoc(userDoc);
    };

    return<>
    <Navbar />
    <div className="reports-container">  
    {groupReport.map((report : IReportProps) => (
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