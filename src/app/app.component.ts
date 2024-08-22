import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgFor } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
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

  public nbClick = 0;
  public sound = false;
  public volume = 0.01;
  public volumeinterval: any;

  public pages = ["Accueil","La Corse","Nos Vans","Options et Accessoires","Qui sommes nous","Nous contacter"];
  public reseaux = [
    {
      img:"insta",
      link:"https://www.instagram.com/miz.camper/"
    }
  ];

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
}
