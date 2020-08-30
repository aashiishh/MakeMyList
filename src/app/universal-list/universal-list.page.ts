import { Component, OnInit, OnDestroy } from '@angular/core';
import { DbService } from '../services/db-service.service';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { AddUniversalListItemComponent } from '../add-universal-list-item/add-universal-list-item.component';
import { UniversalListItem } from '../model/universalListItem';
import { Subscription } from 'rxjs';
import { SelectedListItem } from '../model/selectedListItem';
import { Router } from '@angular/router';
import { SaveListComponent } from '../save-list/save-list.component';

@Component({
  selector: 'app-universal-list',
  templateUrl: './universal-list.page.html',
  styleUrls: ['./universal-list.page.scss'],
})

export class UniversalListPage implements OnInit, OnDestroy {
  
  isLoading : boolean = false;
  item : UniversalListItem;
  loadedUniversalItems : UniversalListItem[];
  selectedItemsList : SelectedListItem[] = [];
  isItemSelected : boolean = false;
  private uItemsSub : Subscription;
  constructor(private dbService:DbService, private modalCtrl:ModalController,private loadingCtrl:LoadingController,private toastCtrl:ToastController,private router:Router) { }

  ngOnInit() {
  
   this.uItemsSub = this.dbService.uItems.subscribe(items => {
      this.loadedUniversalItems = items;
    });
  }

  ionViewWillEnter()
  {
      this.isLoading = true;
      this.dbService.fetchUniversalItemsList().subscribe(() => {
        this.isLoading = false;
      });
  }

  onAddItem()
  {
      this.modalCtrl.create({
        component: AddUniversalListItemComponent,
      }).then(modal => {
        modal.present();
        return modal.onDidDismiss();
      }).then(resultData => {
        
        if(resultData.role==='confirm')
        { 
          this.loadingCtrl.create({
            message: 'Adding Item...'
          }).then(loader => {
            loader.present();
            this.item = new UniversalListItem(Math.random().toString(),resultData.data.newItemData.name,resultData.data.newItemData.unit,resultData.data.newItemData.company);
            this.dbService.addItemToUniversalList(this.item).subscribe(() => {
              console.log('added successfully')
              loader.dismiss();
              loader.onDidDismiss().then(() => {
                this.toastCtrl.create({
                  message: this.item.name+' added successfully!!',
                  color: 'secondary',
                  position: 'bottom',
                  duration: 3000
                }).then(toast => {
                  toast.present();
                })
            })
            })
          });
          
        }
        })
     
  }

  onItemDidSelected(itemSelected : UniversalListItem)
  {
    if(itemSelected.isSelected)
    {
      const selectedItem = new SelectedListItem(itemSelected.id,itemSelected.name,itemSelected.unit,1,itemSelected.company,itemSelected.isSelected);
      this.selectedItemsList.push(selectedItem);
    }
    else
    {
      this.selectedItemsList = this.selectedItemsList.filter(i => i.id !== itemSelected.id); //when user de-select the item
    }
  }

  saveSelectedList()
  {
      this.modalCtrl.create({
        component: SaveListComponent,
        componentProps: {ItemsList : this.selectedItemsList}
      }).then(modal => {
        modal.present();
        modal.onDidDismiss().then(result => {
            if(result.role==='confirm')
             this.selectedItemsList = [];
        })
      })
  }

  goToHome()
  {
    this.selectedItemsList = [];
    this.router.navigateByUrl('/home');
  }

  ngOnDestroy()
  {
    if(this.uItemsSub)
    this.uItemsSub.unsubscribe();
  }

}
