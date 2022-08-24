import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { SignUp } from './components/SignUp';
import { SignIn } from './components/SignIn';
import { CreteGroup } from './components/CreateGroupe';
import { Reports } from './components/Reports';
import { NewReport } from './components/NewReport';
import { UpdateReport } from './components/UpdateReport';
import { ViewReport } from './components/ViewReport';
import { Message } from './components/Message';
import { UpdateGroup } from './components/UpdateGroup';
import { Search } from './components/Search';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
<BrowserRouter>
		<Routes>
	   <Route path='/' element={<SignUp />} />
       <Route path='/groups' element={< Home/>} />
	     <Route path='/create/group' element={<CreteGroup/>} />
       <Route path='/signin' element={<SignIn/>} />
       <Route path='/reports/:id/:type' element={<Reports/>} />
       <Route path='/create/report/:gid' element={<NewReport/>} />
       <Route path='/update/report/:id/:gid' element={<UpdateReport/>} />
       <Route path='/view/:id' element={<ViewReport/>} />
       <Route path='/permission' element={<Message/>} />
       <Route path='/update/group/:id' element={<UpdateGroup/>} />
       <Route path='/search' element={<Search/>} />
		</Routes>
	</BrowserRouter>
);
reportWebVitals();
