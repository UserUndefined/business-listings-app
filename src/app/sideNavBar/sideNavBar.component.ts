import {Component, ViewChild, ViewEncapsulation, Input, Output, ElementRef, EventEmitter} from '@angular/core';

import './sideNavBar.loader.ts';

@Component({
  selector: 'side-nav-bar',
  template: require('./sideNavBar.html'),
  encapsulation: ViewEncapsulation.Native,
  styleUrls: [ './sideNavBar.style.css' ]
})
export class SideNavBar {

  sidebarToggleLeft = "200px";

  ngAfterViewInit() {

  }

  onResize(event){
    if(event.target.innerWidth >= 751){
      this.sidebarToggleLeft = "200px";
    }else{
      this.sidebarToggleLeft = "-200px";
    }
  }

  menuToggle(event){
    console.log('toggle menu');
  }
}
