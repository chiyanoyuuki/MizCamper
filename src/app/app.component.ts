import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
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

  @HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    if(event.deltaY>0)this.scroll--;
    else this.scroll++;
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event:any) {
    event.preventDefault();
  }

  ngOnInit() {
    this.logoInterval = setInterval(() => {
      this.logoState = "1";
      clearInterval(this.logoInterval);
    },1000);
  }
}
