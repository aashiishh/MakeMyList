import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-universal-list-item',
  templateUrl: './add-universal-list-item.component.html',
  styleUrls: ['./add-universal-list-item.component.scss'],
})
export class AddUniversalListItemComponent implements OnInit {
  @ViewChild('f', {static: true}) form: NgForm; 
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  onCancel()
  {
    this.modalCtrl.dismiss(null,'cancel');
  }

  onAddItem()
  {
    if(!this.form.valid)
    return;

    this.modalCtrl.dismiss({
      newItemData : {
        name : this.form.value['name'],
        company : this.form.value['company'],
        unit : this.form.value['unit']
      }
    },'confirm');
  }

}
