import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, LoggedInCallback } from '../services/user.service';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.component.css'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, LoggedInCallback {
  public developmentsLogo = 'assets/img/developments.png';
  public newDevelopmentLogo = 'assets/img/new-development.png';
  public kpiDashboardLogo = 'assets/img/kpi-dashboard.jpg';
  public reportPriorityLogo = 'assets/img/report-priority.jpg';

  // pie chart properties
  public chartWorkflowData;
  public chartWorkflowView: any[] = [600, 200];
  public chartWorkflowShowLegend = true;
  public chartWorkflowColorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  public chartWorkflowShowLabels = true;
  public chartWorkflowExplodeSlices = false;
  public chartWorkflowDoughnut = false;
  public chartWorkflowGradient: any;

  // number card chart properties
  public chartNumberCardData;
  public chartNumberCardView: any[] = [600, 200];
  public chartNumberCardColorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C']
  };

  constructor(public router: Router, public userService: UserService) {
  }

  public redirect(pagename: string) {
    this.router.navigate(['/' + pagename]);
  }

  public onChartWorkflowSelect(event) {
    console.log(event);
  }

  public chartNumberCardOnSelect(event) {
    console.log(event);
  }

  public goArtifactReport() {
    window.location.href = 'https://reports.zoho.com/ZDBDataSheetView.' +
    'cc?OBJID=1210336000000010568&STANDALONE=true&privatelink=424139' +
    'fb7779020a2ba7df3f22a9cda2&INTERVAL=-1&REMTOOLBAR=true&INCLUDET' +
    'ITLE=true&INCLUDEDESC=false';
  }

  public goRevenueReport() {
    window.location.href = 'https://reports.zoho.com/ZDBDataSheetView.' +
      'cc?OBJID=1210336000000010568&STANDALONE=true&privatelink=424139' +
      'fb7779020a2ba7df3f22a9cda2&INTERVAL=-1&REMTOOLBAR=true&INCLUDET' +
      'ITLE=true&INCLUDEDESC=false';
  }

  public goWorkflowReport() {
    window.location.href = 'https://reports.zoho.com/ZDBDataSheetView.' +
      'cc?OBJID=1210336000000010568&STANDALONE=true&privatelink=424139' +
      'fb7779020a2ba7df3f22a9cda2&INTERVAL=-1&REMTOOLBAR=true&INCLUDET' +
      'ITLE=true&INCLUDEDESC=false';
  }

  public goKpiDashboardReport() {
    window.location.href = 'https://reports.zoho.com/ZDBDataSheetView.' +
      'cc?OBJID=1210336000000010275&STANDALONE=true&privatelink=604410cf' +
      'f4c6b6a457944526a07d34c7&INTERVAL=-1&REMTOOLBAR=true&INCLUDETITLE' +
      '=false&INCLUDEDESC=false';
  }

  public goPriorityReport() {
    window.location.href = 'https://reports.zoho.com/ZDBDataSheetView.' +
      'cc?OBJID=1210336000000010568&STANDALONE=true&privatelink=424139' +
      'fb7779020a2ba7df3f22a9cda2&INTERVAL=-1&REMTOOLBAR=true&INCLUDET' +
      'ITLE=true&INCLUDEDESC=false';
  }

  public ngOnInit() {
    this.userService.isAuthenticated(this);
    this.chartWorkflowData = [
      {
        name: 'Complete',
        value: 125
      },
      {
        name: 'Behind',
        value: 5
      },
      {
        name: 'On Target',
        value: 57
      }
    ];

    this.chartNumberCardData = [{
      name: 'Widgets',
      value: 301
    },
      {
        name: 'Sprokets',
        value: 127
      },
      {
        name: 'Ratchets',
        value: 55
      }];
  }

  public isLoggedIn(message: string, isLoggedIn: boolean) {
    if (!isLoggedIn) {
      this.redirect('login');
    }
  }
}
