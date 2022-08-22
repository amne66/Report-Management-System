import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseSetup";

export interface IUsers {
    name: string;
    email:string;
}
interface IUsersProps {
	data: IUsers;
    id : string;
}
export let usersArr: IUsersProps[]  = [];
const toolsRef = collection(db, "users");
onSnapshot(toolsRef, (querySnapshot:any) => {
    usersArr=(querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
      id: doc.id,
      data: doc.data() 
    })))
})