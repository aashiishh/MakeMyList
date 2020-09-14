import { Component, OnInit, Input } from '@angular/core';
import {ModalController , AlertController, ToastController, LoadingController } from '@ionic/angular';
import { SelectedListItem } from '../model/selectedListItem';
import { DbService } from '../services/db-service.service';
import { ListProperties } from '../model/listProperties';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-my-list',
  templateUrl: './edit-my-list.component.html',
  styleUrls: ['./edit-my-list.component.scss'],
})
export class EditMyListComponent implements OnInit {
  @Input() itemsList : SelectedListItem[];
  tempList : ListProperties;
  constructor(public modalCtrl:ModalController,public totalCtrl: ToastController,public alertCtrl:AlertController,public dbService:DbService,public route:Router,private loadingCtrl:LoadingController) { }

  ngOnInit() {}

  onInc(item : SelectedListItem)
  {
    if(item.quantity<=50)
    item.quantity = item.quantity + 0.5;
  }

  onDec(item : SelectedListItem)
  {
    if(item.quantity > 0)
     item.quantity = item.quantity - 0.5;
  }

  async onUpdate()
  {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Saving your list...',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Name'
        },
        {
          name: 'description',
          id: 'paragraph',
          type: 'textarea',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
         // cssClass: 'secondary',
          handler: () => {
            
          }
        }, {
          text: 'Ok',
          handler: data => {
            this.itemsList = this.itemsList.filter(ele => ele.quantity!=0)
            console.log(this.itemsList)
            console.log(this.itemsList.length);
          /*  this.tempList = new ListProperties(null,data.name,new Date(),this.myList,data.description);

            this.loadingCtrl.create({
              message: 'please wait...',
            }).then(loader => {
              loader.present();
              this.dbService.addListToMyLists(this.tempList).subscribe(() => {
                loader.dismiss();
                
                this.route.navigateByUrl('/home').then(()=>{
                  this.modalCtrl.dismiss(null,'confirm');
                  this.totalCtrl.create({
                    message: 'Your list is created successfully',
                    position: 'bottom',
                    duration: 3000,
                    color: 'secondary'
                  }).then(toast => {
                    toast.present();
                  })
                });
                  
              })
            })*/


       
          }
        }
      ]
    });

    await alert.present();
  }

}
