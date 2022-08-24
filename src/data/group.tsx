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