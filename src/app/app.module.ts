import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HeaderComponent } from './layout/components/header/header.component';
import { SideComponent } from './layout/components/side/side.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { MobileHeaderComponent } from './layout/components/mobile-header/mobile-header.component';
import { SubHeaderComponent } from './layout/components/sub-header/sub-header.component';
import { QuickPanelComponent } from './layout/components/quick-panel/quick-panel.component';
import { ChatComponent } from './layout/components/chat/chat.component';
import { DemoPanelComponent } from './layout/components/demo-panel/demo-panel.component';
// import { Toastr, TOASTR_TOKEN } from './layout/services/toastr.service';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxUiLoaderHttpModule } from 'ngx-ui-loader';
import { NgxUiLoaderConfig } from 'ngx-ui-loader/public-api';
import { PhaseComponent } from './Components/Phases/Phases.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort'
import { SwotComponent } from './Components/Swot/Swot.component';
import { DepartmentComponent } from './Components/Departments/Department.copmponent';
import { DelayComponent } from './Components/Delay/Delay.component';
import { EmployeeComponent } from './Components/Employees/Employee.component';
import { LevelComponent } from './Components/Levels/Level.component';
import { GuideComponent } from './Components/Guide/Guide.component';
import { GuiltComponent } from './Components/Guilt/Guilt.component';
import { ClassInstructionComponent } from './Components/ClassInstruction/ClassInstruction.component';
import { ClassComponent } from './Components/Classes/Class.component';
import { AbsenceStudentComponent } from './Components/AbsenceStudent/AbsenceStudent.component';
import { AbsenceCasesComponent } from './Components/AbsenceCases/AbsenceCases.component';
import { ExcellentStudentsComponent } from './Components/ExcellentStudents/ExcellentStudents.component';
import { FailureCaseComponent } from './Components/FailureCase/FailureCase.component';
import { GroupInstructionComponent } from './Components/GroupInstruction/GroupInstruction.component';
import { HealthCasesComponent } from './Components/HealthCases/HealthCases.component';
import { IndividualCasesComponent } from './Components/IndividualCases/IndividualCases.component';
import { OtherStudentSlidesComponent } from './Components/OtherStudentSlides/OtherStudentSlide.component';
import { NewWorkComponent } from './Components/NewWork/NewWork.component';
import { RestToRedoComponent } from './Components/RestToRedo/RestToRedo.component';
import { RegimeCouncilStudentsComponent } from './Components/RegimeCouncilStudents/RegimeCouncilStudents.component';
import { SonOfMartyrsComponent } from './Components/SonOfMartyrs/SonOfMartyrs.component';
import { SpecialStudentsComponent } from './Components/SpecialStudents/SpecialStudents.components';
import { SpeakingDisorderComponent } from './Components/SpeakingDisorder/SpeakingDisorder.component';
import { StatusComponent } from './Components/Status/Status.component';
import { SuggesstionsComponent } from './Components/Suggesstions/Suggesstion.component';
import { TestMetricComponent } from './Components/TestMetric/TestMetric.component';
import { MentalityInquiresComponent } from './Components/MentalityInquiries/MentalityInquiries.component';

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
    QuickPanelComponent,
    ChatComponent,
    DemoPanelComponent,
    PhaseComponent,
    SwotComponent,
    DelayComponent,
    DepartmentComponent,
    EmployeeComponent,
    LevelComponent,
    GuideComponent,
    GuiltComponent,

    ClassInstructionComponent,
    ClassComponent,
    AbsenceStudentComponent,
    AbsenceCasesComponent,
    ExcellentStudentsComponent,
    FailureCaseComponent,
    GroupInstructionComponent,
    HealthCasesComponent,
    IndividualCasesComponent,
    OtherStudentSlidesComponent,
    NewWorkComponent,
    RestToRedoComponent,
    RegimeCouncilStudentsComponent,
    SonOfMartyrsComponent,
    SpecialStudentsComponent,
    SpeakingDisorderComponent,
    StatusComponent,
    SuggesstionsComponent,
    TestMetricComponent,
    MentalityInquiresComponent

  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    
    ToastNoAnimationModule.forRoot({
      closeButton: true,
      maxOpened:1,
      positionClass: 'toast-top-center'
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    BrowserAnimationsModule,
    
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
