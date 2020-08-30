import { SelectedListItem } from './selectedListItem';

export class ListProperties
{
    constructor(public id:string,public name:string, public date:Date,public list:SelectedListItem[],public description?:string)
    {}
}