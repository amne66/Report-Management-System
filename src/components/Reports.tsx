import { deleteDoc, doc } from 'firebase/firestore';
import { MdOutlineModeEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IReportProps, reportArr } from '../data/report';
import { db } from '../firebaseSetup';
import { Navbar } from './Navbar';
import { BsPlusLg } from 'react-icons/bs';

export function Reports(){

    const params:any = useParams();
    const groupReport = reportArr.filter((elm) =>elm.data.group_id  === params.id)
    let navigate = useNavigate();

    const deleteReport = async (id:any) => {
        const userDoc = doc(db, "reports", id);
        await deleteDoc(userDoc);
    };

    return<>
    <Navbar />
    <div className='container-btn'>
    <h1 className='blue-color'>Reports</h1> 
    <Link to={`/create/report/${params.id}`} className="no-line"><div className="new-report-btn"><BsPlusLg/></div></Link>
    </div>
    <div className="reports-container">  
    {groupReport.map((report : IReportProps) => (
    <div className="report-item" >
      <div onClick={() => {navigate(`/view/${report.id}`);}} className="report-item-title"> {report.data.title}</div>
      <div className="report-item-icons" >
      <MdOutlineModeEdit className='update'  onClick={() => {navigate(`/update/report/${report.id}/${params.id}`);}} />
      <RiDeleteBin6Line className='delete' onClick={() => {
                deleteReport(report.id);
              }} />  
      </div>
    </div>
    ))}
    </div> 
    </>
}