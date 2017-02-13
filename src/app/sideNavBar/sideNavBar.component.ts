import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'side-nav-bar',
  template: require('./sideNavBar.html'),
  encapsulation: ViewEncapsulation.Native,
  styleUrls: [ './sideNavBar.style.css' ]
})
export class SideNavBarComponent implements OnInit  {

  private sidebarToggleLeft = '200px';

  public ngOnInit() {
    console.log('hello from SideNavBarComponent component');
  }

  public onResize(event) {
    if (event.target.innerWidth >= 751) {
      this.sidebarToggleLeft = '200px';
    } else {
      this.sidebarToggleLeft = '-200px';
    }
  }

  public menuToggle(event) {
    console.log('toggle menu');
  }
}
