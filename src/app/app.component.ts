import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { DatePipe, NgFor, NgIf, registerLocaleData } from '@angular/common';
import { Component, HostListener, LOCALE_ID, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NgIf, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule],
  providers: [provideNativeDateAdapter(),{ provide: LOCALE_ID, useValue: 'fr-FR'}],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('logoFadeIn', [
      state('0', style({ opacity : 0})),
      state('1', style({ opacity : 0.9})),
      transition('0 => 1', [animate('2000ms ease-in-out')])
    ])
  ]
})

export class AppComponent implements OnInit
{
  public innerWidth: any = window.outerWidth;
  public innerHeight: any = window.innerHeight;

  public logoState = "0";
  public logoInterval: any;

  public page = 0;
  public scroll = 0;

  public reserver = false;

  public nbClick = 0;
  public sound = false;
  public volume = 0.01;
  public volumeinterval: any;

  public start:any;
  public end:any;

  public selectDate = false;

  public pages = ["Accueil","La Corse","Nos Vans","Options et Accessoires","Qui sommes-nous ?","Nous contacter"];
  public reseaux = [
    {
      img:"insta",
      link:"https://www.instagram.com/miz.camper/"
    }
  ];

  public resas:any = [];

  public formulaire = [
    {label:"Nom",type:"text",placeholder:"Nom.."},
    {label:"Prénom",type:"text",placeholder:"Prénom.."},
    {label:"Date",type:"date"},
    {label:"Van",type:"select"},
  ]

  public weekDaysName = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
  public monthDays: any[] = [];
  public year: number = 0;
  public month: number = 0;
  public resavant:any;
  public resapres:any;

  constructor()
  {
    let date = new Date();
    this.year = date.getFullYear();
    this.month = date.getMonth();

    let d2 = new Date();
    d2.setDate(2);
    d2.setMonth(8);
    d2.setFullYear(2024);
    let d3 = new Date();
    d3.setDate(3);
    d3.setMonth(8);
    d3.setFullYear(2024);

    this.resas.push({start:d2,end:d3});

    d2 = new Date();
    d2.setDate(6);
    d2.setMonth(8);
    d2.setFullYear(2024);
    d3 = new Date();
    d3.setDate(7);
    d3.setMonth(8);
    d3.setFullYear(2024);
    
    this.resas.push({start:d2,end:d3});

    d2 = new Date();
    d2.setDate(23);
    d2.setMonth(8);
    d2.setFullYear(2024);
    d3 = new Date();
    d3.setDate(24);
    d3.setMonth(8);
    d3.setFullYear(2024);
    
    this.resas.push({start:d2,end:d3});

    d2 = new Date();
    d2.setDate(27);
    d2.setMonth(8);
    d2.setFullYear(2024);
    d3 = new Date();
    d3.setDate(28);
    d3.setMonth(8);
    d3.setFullYear(2024);
    
    this.resas.push({start:d2,end:d3});
  }

  @HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    if(event.deltaY>0&&this.scroll>-5)this.scroll--;
    else if(event.deltaY<0&&this.scroll<5) this.scroll++;
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
    event.preventDefault();
  }

  @HostListener('click', ['$event'])
  onClick(event:any) {
    if(this.nbClick==0)
    {
      let el : any = document.getElementById("video");
      this.startVolume();
      el.muted = false;
      this.sound = !this.sound;
      this.nbClick=1;
    }
  }

  startVolume()
  {
    let el : any = document.getElementById("video");
    this.volume = 0.01;
    el.volume = this.volume;
    this.volumeinterval = setInterval(() => {
      this.volume+= 0.01;
      el.volume = this.volume;
      if(this.volume>=0.1)clearInterval(this.volumeinterval);
    },200);
  }

  ngOnInit() {
    this.logoInterval = setInterval(() => {
      this.logoState = "1";
      clearInterval(this.logoInterval);
    },1000);
  }

  clickSound(){
    let el : any = document.getElementById("video");
    if(this.nbClick==0)return;
    this.sound = !this.sound;
    el.muted = !this.sound;
    if(this.sound)this.startVolume();
    else{
      clearInterval(this.volumeinterval);
    }
  }

  link(link:string)
  {
    window.open(link, "_blank");
  }

  cantSelect(day:any)
  {
    let date = new Date();
    date.setDate(day.number);
    date.setMonth(day.monthIndex);
    date.setFullYear(day.year);

    if(this.resavant)
    {
      if(date<=this.resavant)return true;
    }
    if(this.resapres)
    {
      if(date>=this.resapres)return true;
    }
    return false;
  }

  startCalendar()
  {
    this.resavant = undefined;
    this.resapres = undefined;
    this.start = undefined;
    this.end = undefined;
    this.setMonthDays(this.getCurrentMonth());
    this.selectDate = true;
  }

  private setMonthDays(days: any[]){
    this.monthDays = days;
    this.month = this.monthDays[0].monthIndex;
    this.year = this.monthDays[0].year;
  }

  onNextMonth(){
    this.month++;
    if(this.month == 13)
    {
      this.month = 1;
      this.year++;
    }

    this.setMonthDays(this.getMonth(this.month,this.year));
  }

  onPreviousMonth(){
    this.month--;
    if(this.month < 1)
    {
      this.month = 12;
      this.year--;
    }

    this.setMonthDays(this.getMonth(this.month,this.year));
  }

  getCurrentMonth(){
    return this.getMonth(this.month,this.year);
  }

  getMonth(monthIndex:number, year:number)
  {
    let days = [];
    let firstDay = this.createDay(1, monthIndex, year);
    console.log(firstDay);

    if(firstDay.weekDayNumber==0)
    {
      for(let i=1;i<7;i++)
        {
          days.push({
            weekDayNumber: i,
            monthIndex: monthIndex,
            year: year,
            disabled:true,
          });
        }
    }
    else
    {
      for(let i=1;i<firstDay.weekDayNumber;i++)
        {
          days.push({
            weekDayNumber: i,
            monthIndex: monthIndex,
            year: year,
            disabled:true,
          });
        }
    }
    days.push(firstDay);

    let countDaysInMonth = new Date(year, monthIndex +1, 0).getDate();
    for(let i=2;i<countDaysInMonth+1;i++){
      days.push(this.createDay(i,monthIndex,year));
    }
    return days;
  }

  private createDay(dayNumber: number, monthIndex: number, year: number)
  {
    let date = new Date();
    let d = new Date();
    d.setDate(dayNumber);
    d.setMonth(monthIndex);
    d.setFullYear(year);

    let day: any = {};
    if(d<date)day.disabled = true;
    let tmp = this.resas.find((resa:any)=>this.inRange(resa.start,d,resa.end));
    if(tmp)day.taken = true;
    day.monthIndex = monthIndex;
    day.month = this.getMonthName(monthIndex);
    day.number = dayNumber;
    day.year = this.year;
    day.weekDayNumber = new Date(year, monthIndex, dayNumber).getDay();
    day.weekDayName = this.getDayName(day.weekDayNumber);

    return day;
  }

  inRange(start:any,date:any,end:any)
  {
    if(start.getFullYear() > date.getFullYear()) return false;
    else if(end.getFullYear() < date.getFullYear()) return false;
    else if(start.getMonth() > date.getMonth()) return false;
    else if(end.getMonth() < date.getMonth()) return false;
    else if(start.getFullYear() == date.getFullYear() && start.getMonth() == date.getMonth() && start.getDate() > date.getDate()) return false;
    else if(end.getFullYear() == date.getFullYear() && end.getMonth() == date.getMonth() && end.getDate() < date.getDate()) return false;
    else return true;
  }

  getMonthName(index:number)
  {
    switch(index){
      case 0:return "Janvier";
      case 1:return "Février";
      case 2:return "Mard";
      case 3:return "Avril";
      case 4:return "Mai";
      case 5:return "Juin";
      case 6:return "Juillet";
      case 7:return "Aout";
      case 8:return "Septembre";
      case 9:return "Octobre";
      case 10:return "Novembre";
      case 11:return "Décembre";
      default:return "";
    }
  }

  getDayName(index:number)
  {
    switch(index){
      case 0:return "Dimanche";
      case 1:return "Lundi";
      case 2:return "Mardi";
      case 3:return "Mercredi";
      case 4:return "Jeudi";
      case 5:return "Vendredi";
      case 6:return "Samedi";
      default:return "";
    }
  }

  clickDay(day:any)
  {
    let over = this.start;
    if(!over)
    {
      let date = new Date();
      date.setDate(day.number);
      date.setMonth(day.monthIndex);
      date.setFullYear(day.year);
  
      this.start = date;

      let resavant = this.resas.filter((resa:any)=>resa.end<date);
      if(resavant.length>0)
      {
        resavant.sort((a:any,b:any)=>{return b.end-a.end});
        this.resavant = resavant[0].end;
      }
      let resapres = this.resas.filter((resa:any)=>resa.start>date);
      if(resapres.length>0)
      {
        resapres.sort((a:any,b:any)=>{return a.start-b.start});
        this.resapres = resapres[0].start;
      }
    }

    let date2 = new Date();
    date2.setDate(day.number);
    date2.setMonth(day.monthIndex);
    date2.setFullYear(day.year);

    this.end = date2;

    if(over)
    {
      if(this.start > this.end)
      {
        let date = this.start;
        this.start = this.end;
        this.end = date;
      }
      this.selectDate = false;
    }
  }

  getDate()
  {
    const datepipe: DatePipe = new DatePipe('fr-FR')
    return datepipe.transform(this.start, 'dd/MM/YYYY') + " - " + datepipe.transform(this.end, 'dd/MM/YYYY');
  }

  selectedDate(day:any)
  {
    if(!this.start||!this.end)return false;
    let date = new Date();
    date.setDate(day.number);
    date.setMonth(day.monthIndex);
    date.setFullYear(day.year);

    if(this.start>this.end)
    {
      return this.inRange(this.end,date,this.start);
    }
    else
    {
      return this.inRange(this.start,date,this.end);
    }
  }

  hoverDay(day:any)
  {
    if(!this.start)return;

    let date = new Date();
    date.setDate(day.number);
    date.setMonth(day.monthIndex);
    date.setFullYear(day.year);

    this.end = date;
   
  }
}
