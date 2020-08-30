import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap,take, switchMap, map} from 'rxjs/operators';
import { UniversalListItem } from '../model/universalListItem';
import { BehaviorSubject } from 'rxjs';
import { SelectedListItem } from '../model/selectedListItem';
import { ListProperties } from '../model/listProperties';


interface universalItemData {
  company?: string,
  name: string,
  unit: string
}

@Injectable({
  providedIn: 'root'
})
export class DbService {
private _uItems = new BehaviorSubject<UniversalListItem[]>([]);
private _myLists = new BehaviorSubject<ListProperties[]>([]);
private _selectedList = new BehaviorSubject<SelectedListItem[]>([]);
  constructor(private http:HttpClient) { }
  get uItems()
  {
    return this._uItems.asObservable();
  }

  get selectedList()
  {
    return this._selectedList.asObservable();
  }
  get myLists()
  {
    return this._myLists.asObservable();
  }

  addItemToUniversalList(newItem : UniversalListItem)
  {
    let generatedId : string; 
   return this.http.post<{name : string}>('https://list-creator-790ea.firebaseio.com/Universal%20List.json',{...newItem,id:null})
    .pipe(switchMap(resData => {
      generatedId = resData.name;
      return this._uItems;
    }),take(1), tap(items => {
      newItem.id = generatedId;
      this._uItems.next(items.concat(newItem));
    }))
  }

  addListToMyLists(newList : ListProperties)
  {
    let generatedId : string; 
   return this.http.post<{name : string}>('https://list-creator-790ea.firebaseio.com/mylists.json',{...newList,id:null})
    .pipe(switchMap(resData => {
      generatedId = resData.name;
      return this._myLists;
    }),take(1), tap(lists => {
      newList.id = generatedId;
      this._myLists.next(lists.concat(newList));
    }))
  }

  fetchUniversalItemsList()
  {
    return this.http.get<{[key : string]: universalItemData}>('https://list-creator-790ea.firebaseio.com/Universal%20List.json').pipe(
       /* tap(resData => {
          console.log(resData);
        })*/
       map( uItemsData => {
        const items = [];
        for(const key in uItemsData)
        {
          if(uItemsData.hasOwnProperty(key))
          {
            items.push(new UniversalListItem(key,uItemsData[key].name,uItemsData[key].unit,uItemsData[key].company))
          }
        }
        return items;
      }), tap(items => {
        this._uItems.next(items);
      })
      )
  }

  fetchMyLists()
  {
    return this.http.get<{[key : string]: ListProperties}>('https://list-creator-790ea.firebaseio.com/mylists.json').pipe(
       /* tap(resData => {
          console.log(resData);
        })*/
       map( myListsData => {
        const lists = [];
        for(const key in myListsData)
        {
          if(myListsData.hasOwnProperty(key))
          {
            lists.push(new ListProperties(key,myListsData[key].name,new Date(myListsData[key].date),myListsData[key].list,myListsData[key].description))
          }
        }
        return lists;
      }), tap(lists => {
        this._myLists.next(lists);
      })
      )
  }

  deleteListFromMyLists(listId : string)
  {
      return this.http.delete(`https://list-creator-790ea.firebaseio.com/mylists/${listId}.json`)
      .pipe(switchMap(() => {
        return this.myLists;
      }),
      take(1),
      tap(lists => {
        this._myLists.next(lists.filter(l => l.id !== listId));
      }));
  }

}
