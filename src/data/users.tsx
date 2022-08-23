import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseSetup";

export interface IUsers {
    name: string;
    email:string;
    role:string;
}
interface IUsersProps {
	data: IUsers;
    id : string;
}
export let usersArr: IUsersProps[]  = [];
const usersRef = collection(db, "users");
onSnapshot(usersRef, (querySnapshot:any) => {
    usersArr=(querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
      id: doc.id,
      data: doc.data() 
    })))
})