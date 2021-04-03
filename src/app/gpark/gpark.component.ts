import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone, ɵConsole } from '@angular/core';
import { ParkService } from '../shared/park.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';

import { ChartsModule } from 'ng2-charts';


import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-gpark',
  templateUrl: './gpark.component.html',
  styleUrls: ['./gpark.component.css']
})
export class GparkComponent implements OnInit {
  public chartType: string = 'bar';
  userId;
  nbparking=0;

  public chartDatasets=[];
  public chartLabels: Array<any> = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi','Samedi'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
 
 markers = {} as any;
  marker = [] as any ;
  list = {} as any;
  parking = {} as any;
  m = 0;
  isDraggable: boolean;
  selected: string;
  cmp = 0;
  nbv = 0;
  nbf = 0;
  nbt = 0;
  nbc = 0;
  nbn = 0;
  nbp = 0;
  prix = 0;
  time: Date = new Date();
  currentWeekNumber = require('current-week-number');
  markerss = {} as any ;
  lists = {} as any;
  times =  new Date();
  priceT = 0;
  priceW = 0;
  priceD = 0;
  lun = 0 ;
 
  mar = 0 ;
  
  mer = 0 ;
  pa:number;
  jeu = 0 ;
  ven = 0 ;
  sam = 0 ;
  dem = 0  ;
  d = 0;
  week = 0;
  week1;
  year = {jun: 0 , fev: 0 , mar: 0 , avr: 0 , mai: 0 , jon: 0 , jui: 0 , out: 0 , sep: 0 , oct: 0 , nouv: 0 , dec: 0};
 
  
  constructor(private auth: ParkService, private router: Router, private auths: ReservationService) { 
    
    
  }

  ngOnInit(): void {
    this.userId= localStorage.getItem("userId");
    
    this.auth.getAdminListReservation(this.userId.substr(1,this.userId.length-2))
       .subscribe( data=>{
        const resSTR = JSON.stringify(data);
        const resJSON = JSON.parse(resSTR);

        this.nbparking=resJSON.length
        console.log("nb parking: "+this.nbparking)
      
        
        
    } );
     

    const s = localStorage.getItem('role');
    const ss = JSON.parse(localStorage.getItem('roles'));
    // this.selected = ss.user.parking;
    // console.log('rrrrrttgg' , ss.user.parking);
    // this.auth.getByNamep(this.selected).subscribe((res) => {
    //   this.marker.push(res[0]);
    //   console.log('rrrrfffmar', this.marker);
    // });
    // console.log('rrrrfffmar2', this.marker);

    if ( s === 'sup' || s === 'admin' ) {
      this.selected = ss.user.parking;

      this.auth.getAdminListReservation(this.userId.substr(1,this.userId.length-2)).subscribe((res) => {
        this.marker = res;
        this.cmp = this.marker.length;
        console.log("nombre de parking: "+this.cmp)
      });

    } else {

      this.auth.getListPark(" ").subscribe((res) => {
        this.marker = res ,
        this.cmp = this.marker.length ;
      });
    }

    this.auths.getListReservation().subscribe(res => {
      this.list = res,
      console.log(this.list);
    });
    this.week = this.currentWeekNumber(this.times );
    console.log('week', this.week);
    // this.auth.getListPark().subscribe((res) => {
    //   this.marker = res;
    // });
   
    this.auths.getListReservation().subscribe(res => {
      
      this.list = res ;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.list.length ; i++) {
        this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
        this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
        this.week1 = this.currentWeekNumber(this.list[i].timeE );
        console.log('week11' , this.week1 );
        if (this.week === this.week1) {
          switch (this.list[i].timeE.getDay() ) {
            case 1 : {
              this.lun ++;
              break;
            }
            case 2 : {
              this.mar ++;
              break;
            }
            case 3 : {
              this.mer ++;
              break;
            }
            case 4   : {
              this.jeu ++;
              break;
            }
            case 5 : {
              this.ven ++;
              break;
            }
            case 6 : {
              this.sam ++;
              break;
            }
            case 0 : {
              this.dem ++;
              break;
            }
          }
        }
        switch (this.list[i].timeE.getMonth()  ) {
          case 0 : {
            this.year.jun ++;
            break;
          }
          case 1 : {
            this.year.fev ++;
            break;
          }
          case 2 : {
            this.year.mar ++;
            break;
          }
          case 3   : {
            this.year.avr ++;
            break;
          }
          case 4 : {
            this.year.mai ++;
            break;
          }
          case 5 : {
            this.year.jon ++;
            break;
          }
          case 6 : {
            this.year.jui ++;
            break;
          }
          case 7 : {
            this.year.out ++;
            break;
          }
          case 8 : {
            this.year.sep ++;
            break;
          }
          case 9: {
            this.year.oct ++;
            break;
          }
          case 10 : {
            this.year.nouv ++;
            break;
          }
          case 11 : {
            this.year.dec ++;
            break;
          }

        }
    }
    this.chartDatasets= [
      { data: [this.dem, this.lun, this.mar, this.mer, this.jeu, this.ven, this.sam], label: 'NB Reservation / days in week' }
    ];
  
   });
  }
  
  
  filterChanged(selectedValue: string) {
   
    this.m = 0;
    this.selected = selectedValue;
    this.nbc = 0;
    this.nbn = 0;
    this.nbp = 0;
    this.nbv = 0;
    this.nbf = 0;
    this.nbt = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.list.length; i++) {
        // tslint:disable-next-line:prefer-for-of
        this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
        this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
        console.log( this.list[i].timeE.getTime());

        this.priceT = 0;
        this.priceW = 0;
        this.priceD = 0;
        let nb = 0;
        let r = 0;
        let f = 0;
        this.selected = selectedValue;
        console.log('<weeeeek', this.week);
        // tslint:disable-next-line:prefer-for-of
        // tslint:disable-next-line:no-shadowed-variable
        for (let k = 0; k < this.marker.length; k++) {
          this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
          this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
          if (  this.selected === this.marker[k].name ) {
            // tslint:disable-next-line:prefer-for-of
            for  (let j = 0; j < this.list.length; j++) {
              this.week1 = this.currentWeekNumber(this.list[i].timeE );
              console.log('<weeeeek111111', this.week1);
              if ( this.selected === this.list[j].name  ) {
                nb++;
                console.log('fffgt', nb);
                this.priceT = this.marker[k].price * nb;
                console.log('ROUROU',this.marker[k].capteur.length );
                console.log('ROU',nb );
                this.nbv = nb;
              }
              if ( this.selected === this.list[j].name && this.list[j].timeE.getDay() === this.times.getDay()  ) {
                r++;
                console.log('rheeee', r);
                this.priceD = this.marker[k].price * r;
               // this.nbv = r;
              }
              if ( this.selected === this.list[j].name && this.week1 === (this.week - 2)  ) {
                f++;
                console.log('rheeee', f);
                this.priceW = this.marker[k].price * f;
               // this.nbv = f;
              }
            }

          }
        }

       

      }
    // tslint:disable-next-line:prefer-for-of
    for (let j = 0; j < this.marker.length; j++) {
        if ( this.selected=== this.marker[j].name) {
          console.log('ffffffffffff',this.marker[j].capteur.length-1);
          //this.nbv = this.marker[j].capteur.length;
         // console.log('ffff',this.nbv);
          this.nbt = this.marker[j].capteur.length;
          console.log('ffff',this.nbt);
        }


      }
    console.log('ti nb', this.m);
    return this.m;
  }


  getNbCarsDay() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.list.length ; i++) {
     this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
     this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
     this.d += this.list[i].price;
     return this.d;
    
 }

}

 






 nbRepition() {
   let nb = 0;
   // tslint:disable-next-line:prefer-for-of
   for (let i = 0 ; i < this.list.length ; i++) {
     this.list[i].timeS = new Date(Number(Date.parse(this.list[i].timeS)));
     this.list[i].timeE = new Date(Number(Date.parse(this.list[i].timeE)));
     if (this.selected === this.list[i].name ) {
         nb ++;
         console.log('gggg');
     }
     }
   console.log('ti nb', nb);
   return nb;

 }





}




 



