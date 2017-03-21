import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

/*
  Generated class for the Equity page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-equity',
  templateUrl: 'equity.html'
})

export class EquityPage {
users: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public af: AngularFire, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
  	this.users = af.database.list('/users');
  }

  ionViewDidLoad() {
  }

  addUser(){
  	let prompt = this.alertCtrl.create({
      title: 'Add a new housemate',
      message: "Enter the name and the equity",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        },
        {
          name: 'percentage',
          placeholder: '0.25'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.users.push({
            	name: data.name,
            	percentage: data.percentage
            })
          }
        }
      ]
    });
    prompt.present();
  }

  removeUser(userId){
  	this.users.remove(userId);

  	let alert = this.alertCtrl.create({
      title: 'Housemate Removed!',
      subTitle: 'Your housemate is removed from the list. Please change the equity accordingly.',
      buttons: ['OK']
    });
    alert.present();
  }

  updateUser(userId, userPercent){
  	 let prompt = this.alertCtrl.create({
      title: 'Change Housemate Equity',
      message: "Enter the percentage in decimal form",
      inputs: [
        {
          name: 'percentage',
          placeholder: '0.50',
          value: userPercent
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.users.update(userId, {
            	percentage: data.percentage
            });
          }
        }
      ]
    });
    prompt.present(); 
  }

   editUser(userId, userName, userPercent){
  	let actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Delete Housemate',
          role: 'destructive',
          handler: () => {
            this.removeUser(userId);
          }
        },{
          text: 'Change Percentage',
          handler: () => {
            this.updateUser(userId, userPercent);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
