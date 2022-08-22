export interface IGroup {
    name: string;
	users: string[];
	reports: string[];
    adminID:string;
}
export interface IGroupProps {
	data: IGroup;
    id : string;
}
export let groupArr: IGroupProps[]  = [];