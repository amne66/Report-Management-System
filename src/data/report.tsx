export interface IReport {
    title: string;
    content:string;
    files:any[];
    tags: string[];
}
export interface IReportProps {
	data: IReport;
    id : string;
}
export let reportArr: IReportProps[]  = [];