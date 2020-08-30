import { Component, OnInit, Input } from '@angular/core';
import { SelectedListItem } from '../model/selectedListItem';
import { ModalController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ListProperties } from '../model/listProperties';

@Component({
  selector: 'app-show-my-list',
  templateUrl: './show-my-list.component.html',
  styleUrls: ['./show-my-list.component.scss'],
})
export class ShowMyListComponent implements OnInit {
  @Input() myList : ListProperties;
  constructor(private modalCtrl:ModalController,private socialSharing: SocialSharing) { }

  ngOnInit() {}

  onShareList()
  {
    /*this.socialSharing.canShareViaEmail().then(() => {
      console.log('can send')
    }).catch(() => {
      console.log('not possible')
    });
    const list = this.myList.list;
    let list_content : string = '';
    let sno = 0;
    list.forEach(ele => {
          list_content = list_content + sno+1+' '+ele.name+'  '+ele.quantity+''+ele.unit+'\n'
    })
    // Share via email
    this.socialSharing.shareViaEmail(list_content, this.myList.name+' List', ['chaturvedi.ashish728@gmail.com']).then(() => {
      console.log('sent')
    }).catch(() => {
      console.log('error')
    }); */
  }

  onClose()
  {
      this.modalCtrl.dismiss();
  }

  

  onDeleteItem(item : SelectedListItem)
  {
     
  }

}
