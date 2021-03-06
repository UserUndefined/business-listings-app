import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Material 2
// import { MaterialModule } from '@angular/material';
import { MdIconModule, MdIconRegistry } from '@angular/material';
import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
// import { MdCoreModule } from '@angular2-material/core';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';
// import { MdRadioModule } from '@angular2-material/radio';
// import { MdCheckboxModule } from '@angular2-material/checkbox'
// import { MdTooltipModule } from '@angular2-material/tooltip';
// import { MdSliderModule } from '@angular2-material/slider';
// import '@angular2-material/grid-list';
// import '@angular2-material/input';
// import '@angular2-material/progress-bar';
// import '@angular2-material/progress-circle';
// import '@angular2-material/slide-toggle';
// import '@angular2-material/tabs';
import 'hammerjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AboutComponent } from './about';
import { AccountComponent } from './account';
import { CustomerComponent } from './customer';
import { DashboardComponent } from './dashboard';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';
import { SideNavBarComponent } from './sideNavBar';
import { UserService, LoginCallback } from './services/user.service';
import { CognitoUtil } from './services/cognito.service';
import { UserParametersService } from './services/user.parameters.service';

import '../styles/styles.scss';
import '../styles/headings.css';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    AccountComponent,
    CustomerComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    NoContentComponent,
    XLargeDirective,
    SideNavBarComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    // MaterialModule.forRoot(),
    MdIconModule.forRoot(),
    // MdCoreModule.forRoot(),
    MdCardModule.forRoot(),
    MdButtonModule.forRoot(),
    MdSidenavModule.forRoot(),
    MdToolbarModule.forRoot(),
    MdListModule.forRoot(),
    // MdRadioModule,
    // MdCheckboxModule,
    // MdTooltipModule,
    // MdSliderModule,
    NgxChartsModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    MdIconRegistry,
    UserService,
    CognitoUtil,
    UserParametersService
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
