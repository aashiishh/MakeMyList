import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ListProperties } from '../model/listProperties';
import { DbService } from '../services/db-service.service';
import { Subscription } from 'rxjs';
import { IfStmt } from '@angular/compiler';
import { SelectedListItem } from '../model/selectedListItem';
import { ModalController, IonItemSliding, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ShowMyListComponent } from '../show-my-list/show-my-list.component';
import { EditMyListComponent } from '../edit-my-list/edit-my-list.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy{
 
  myLists : ListProperties[] = [];
  private myListsSub : Subscription;
  isLoading : boolean = false;
  constructor(private router:Router, public dbService:DbService,private modalCtrl:ModalController,private alertController:AlertController,private loadingCtrl:LoadingController,private toastCtrl:ToastController) {}

  ngOnInit()
  {
   this.myListsSub = this.dbService.myLists.subscribe(lists => {
      this.myLists = lists;
   })
  }

  ionViewWillEnter()
  {
      this.isLoading = true;
      this.dbService.fetchMyLists().subscribe(() => {
        this.isLoading = false;
      });
  }

  onViewList(list : ListProperties)
  {
      this.modalCtrl.create({
         component: ShowMyListComponent,
         componentProps: {myList : list}
      }).then(modal => {
        modal.present();
      })
  }
  onDeleteList(listId: string,listName : string,slider : IonItemSliding)
  {
      slider.close();
      this.presentAlertConfirm(listId,listName);
  }

  async presentAlertConfirm(listId: string,listName : string) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion!',
      message: 'Are you sure, you want to delete <strong>'+listName+'</strong> list?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.loadingCtrl.create({
              message: 'please wait...'
            }).then(loader => {
              loader.present();
            });
         this.dbService.deleteListFromMyLists(listId).subscribe(() => {
                this.loadingCtrl.dismiss();
                this.toastCtrl.create({
                  message: listName+' list deleted successfully!!!',
                  color: 'danger',
                  duration: 4000,
                  position: 'bottom'
                }).then(toast => {
                  toast.present();
                })
            });
          }
        }
      ]
    });

    await alert.present();
  }

  onEditList(list : ListProperties,slider : IonItemSliding)
  {
    slider.close();
    this.modalCtrl.create({
      component: EditMyListComponent,
      componentProps: {itemsList : list.list}
    }).then(modal => {
      modal.present();
      modal.onDidDismiss().then(result => {
          // if(result.role==='confirm')
          //  this.selectedItemsList = [];
      })
    })
  }

  ngOnDestroy()
  {
    if(this.myListsSub)
    this.myListsSub.unsubscribe();
  }


}
