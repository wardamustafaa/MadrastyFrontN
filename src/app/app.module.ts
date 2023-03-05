import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from './layout/components/header/header.component';
import { SideComponent } from './layout/components/side/side.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { MobileHeaderComponent } from './layout/components/mobile-header/mobile-header.component';
import { SubHeaderComponent } from './layout/components/sub-header/sub-header.component';
import { HomeComponent } from './pages/components/home/home.component';
import { QuickPanelComponent } from './layout/components/quick-panel/quick-panel.component';
import { ChatComponent } from './layout/components/chat/chat.component';
import { DemoPanelComponent } from './layout/components/demo-panel/demo-panel.component';
import { DashboardComponent } from './pages/components/dashboard/dashboard.component';
import { DepartmentComponent } from './pages/components/department/department.component';
// import { Toastr, TOASTR_TOKEN } from './layout/services/toastr.service';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { NgxUiLoaderConfig } from 'ngx-ui-loader/public-api';


// declare const toastr: Toastr;
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  // bgsOpacity: 0.5,
  // bgsPosition: POSITION.bottomLeft,
  // bgsSize: 60,
  // bgsType: SPINNER.chasingDots,
  // blur: 5,
  // delay: 0,
  fastFadeOut: true,
  fgsColor: 'red',
  // fgsPosition: POSITION.centerCenter,
  // fgsSize: 60,
  // fgsType: SPINNER.chasingDots,
  // gap: 24,
  // logoPosition: POSITION.centerCenter,
  // logoSize: 120,
  // logoUrl: 'assets/angular.png',
  // overlayBorderRadius: '0',
  // overlayColor: 'rgba(40, 40, 40, 0.8)',
  pbColor: 'red'
  // pbDirection: PB_DIRECTION.leftToRight,
  // pbThickness: 5,
  // hasProgressBar: false,
  // text: 'Welcome to ngx-ui-loader',
  // textColor: '#FFFFFF',
  // textPosition: POSITION.centerCenter,
  // maxTime: -1,
  // minTime: 500
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideComponent,
    FooterComponent,
    MobileHeaderComponent,
    SubHeaderComponent,
    HomeComponent,
    QuickPanelComponent,
    ChatComponent,
    DemoPanelComponent,
    DashboardComponent,
    DepartmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    ToastNoAnimationModule.forRoot({
      closeButton: true,
      maxOpened:1,
      positionClass: 'toast-top-center'
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule
  ],
  providers: [
    // {
    //   provide: TOASTR_TOKEN,
    //   useValue: toastr
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
