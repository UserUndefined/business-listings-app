import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavBar } from './sideNavBar.component';

@NgModule({
  imports: [ RouterModule, CommonModule ],
  declarations: [ SideNavBar ],
  exports: [ SideNavBar ]
})
export class SideNavBarModule {}
