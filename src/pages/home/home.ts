import { Component } from '@angular/core';
import { NavController,ModalController,AlertController  } from 'ionic-angular';
import * as moment from 'moment';

import { AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


   eventSource;
    viewTitle;
    events = [];
    isToday: boolean;
    selectedDay = new Date();
    calendar = {
        mode: 'month',
        currentDate: new Date()
    }; // these are the variable used by the calendar.
   

     path = "/events"

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController,public db : AngularFireDatabase) {
     
      

      // this.events.push({
      // 	startTime : new Date(),
      // 	endTime : new Date()
      // })

      // // this.events.push({
      // // 	startTiem : new Date("2017-08-23T12:00:00+05:00"),
      // // 	endTime : new Date("2017-08-23T12:00:00+05:00")
      // // })


      // this.eventSource = this.events;

      this.db.list(this.path).subscribe(data=>{
      console.log(data.length);
      for (var i = 0; i < data.length; ++i) {

        console.log(data[i]);
        this.loadEvents(data[i]);
      }
    },err=>{
       console.log(err);
    });


      
      
  }

   

       loadEvents(data) {
	        this.events.push({
	            title: data.title,
	            startTime: new Date(data.startTime),
	            endTime: new Date(data.endTime),
	            allDay: data.allDay
	        });

	        this.eventSource = this.events;
        }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay});
    modal.present();
    

    modal.onDidDismiss(data => {
    	console.log(data)
      
      if (data) {
        var dbData = {};
        Object.assign(dbData,data)
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        this.events.push(eventData);
        this.eventSource = [];
        
       
        setTimeout(() => {
          this.eventSource = this.events;
          
          this.db.list(this.path).push(dbData);
        });
      }
    });
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onEventSelected(event) {

    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
    
    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
 
  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    
  }

}
