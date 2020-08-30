import { Component, OnInit, Input } from '@angular/core';
import { SelectedListItem } from '../model/selectedListItem';
import { ModalController,PopoverController, AlertController, ToastController, LoadingController  } from '@ionic/angular';
import { ListProperties } from '../model/listProperties';
import { DbService } from '../services/db-service.service';
import { Router } from '@angular/router';
import { AddUniversalListItemComponent } from '../add-universal-list-item/add-universal-list-item.component';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.scss'],
})
export class SaveListComponent implements OnInit {
@Input() ItemsList : SelectedListItem[];
myList : ListProperties;
  constructor(public modalCtrl:ModalController,public totalCtrl: ToastController,public alertCtrl:AlertController,public dbService:DbService,public route:Router,private loadingCtrl:LoadingController) { }

  ngOnInit() {
  }

  onCancel()
  {
    this.modalCtrl.dismiss(null,'cancel');
   // this.ItemsList = this.ItemsList.filter(ele => !ele.quantity); // return this list when cancelling the model
    this.ItemsList = []; 
  }

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

  async onSave()
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
            this.ItemsList.filter(ele => ele.quantity!=0)
            
            this.myList = new ListProperties(null,data.name,new Date(),this.ItemsList,data.description);

            this.loadingCtrl.create({
              message: 'please wait...',
            }).then(loader => {
              loader.present();
              this.dbService.addListToMyLists(this.myList).subscribe(() => {
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
            })


       
          }
        }
      ]
    });

    await alert.present();
  }



}
