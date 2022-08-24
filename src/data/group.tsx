import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseSetup";

export interface IGroup {
    name: string;
	usersView: string[];
	usersEdit: string[];
    adminID:string;
}
export interface IGroupProps {
	data: IGroup;
    id : string;
}
export let groupArr: IGroupProps[]  = [];
const groupsRef = collection(db, "groups");
onSnapshot(groupsRef, (querySnapshot:any) => {
    groupArr=(querySnapshot.docs.map((doc: { id: any; data: () => any; }) => ({
      id: doc.id,
      data: doc.data() 
    })))
})