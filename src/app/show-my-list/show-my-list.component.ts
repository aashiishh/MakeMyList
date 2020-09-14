import { Component, OnInit, Input } from '@angular/core';
import { SelectedListItem } from '../model/selectedListItem';
import { ModalController, ToastController } from '@ionic/angular';
import { ListProperties } from '../model/listProperties';

@Component({
  selector: 'app-show-my-list',
  templateUrl: './show-my-list.component.html',
  styleUrls: ['./show-my-list.component.scss'],
})
export class ShowMyListComponent implements OnInit {
  @Input() myList : ListProperties;
  constructor(private modalCtrl:ModalController,public toast:ToastController) { }

  ngOnInit() {}

  onClose()
  {
      this.modalCtrl.dismiss();
  }

  onShareList()
  {
      this.toast.create({
        message: 'Please take a screenshot of this screen',
        position: 'middle',
        duration: 4000,
        color: 'dark'
      }).then(toastEle =>{
        toastEle.present();
      })
  }
  

  onDeleteItem(item : SelectedListItem)
  {
     
  }

}
