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
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { BooksDataComponent } from './pages/components/BooksData/BooksData.component';
import { AbsenceStatComponent } from './pages/components/AbscenceStatistics/AbscenceStatistics.component';
import { AbsencePermissionsComponent } from './pages/components/AbsenceAndPermissions/AbsenceAndPermissions.component';
import { ActivityComponent } from './pages/components/Activities/Activities.component';
import { AddAbsenceComponent } from './pages/components/AddAbsencePermissions/AddAbsencePermissions.component';
import { BadStudentCardComponent } from './pages/components/BadStudentsCard/BadStudentsCard.component';
import { BorrowBookComponent } from './pages/components/BorrowBook/BorrowBook.component';
import { CorridorComponent } from './pages/components/Corridors/Corridors.component';
import { CorrSupervisionComponent } from './pages/components/CorridorSupervision/CorridorSupervision.component';
import { DailyAbsenceStatComponent } from './pages/components/DailyAbsenceStat/DailyAbsenceStat.component';
import { ManagerVisitComponent } from './pages/components/DepManagerVisit/DepManagerVisit.component';
import { EnzaratComponent } from './pages/components/enzarat/enzarat.component';
import { EventsComponent } from './pages/components/events/events.component';
import { FinancialFundComponent } from './pages/components/FinancialFundExpenses/FinancialFundExpenses.component';
import { GoodStudentCardComponent } from './pages/components/GoodStudentsCard/GoodStudentsCard.component';
import { MaintenanceComponent } from './pages/components/Maintenance/Maintenance.component';
import { MessageComponent } from './pages/components/message/message.component';
import { NewsInternalExternalComponent } from './pages/components/NewsInternalExternal/NewsInternalExternal.component';
import { NewTripComponent } from './pages/components/NewTrip/NewTrip.component';
import { ObserversDistributionComponent } from './pages/components/ObserversDistribution/ObserversDistribution.component';
import { ReturnBookComponent } from './pages/components/ReturnBook/ReturnBook.component';
import { SchoolPartyComponent } from './pages/components/SchoolParty/SchoolParty.component';
import { ShowBooksDataComponent } from './pages/components/ShowBooks/ShowBooks.component';
import { ShowTa7diersComponent } from './pages/components/ShowTa7diers/ShowTa7diersComponent';
import { StrategicPLanComponent } from './pages/components/StrategicPlanTeam/StrategicPlanTeam.component';
import { StudentDistributionComponent } from './pages/components/StudentDistribution/StudentDistribution.component';

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
    MentalityInquiresComponent,

    BooksDataComponent,
    AbsenceStatComponent,
    AbsencePermissionsComponent,
    ActivityComponent,
    AddAbsenceComponent,
    BadStudentCardComponent,
    BorrowBookComponent,
    CorridorComponent,
    CorrSupervisionComponent,
    DailyAbsenceStatComponent,
    ManagerVisitComponent,
    EnzaratComponent,
    EventsComponent,
    FinancialFundComponent,
    GoodStudentCardComponent,
    MaintenanceComponent,
    MessageComponent,
    NewsInternalExternalComponent,
    NewTripComponent,
    ObserversDistributionComponent,
    ReturnBookComponent,
    SchoolPartyComponent,
    ShowBooksDataComponent,
    ShowTa7diersComponent,
    StrategicPLanComponent,
    StudentDistributionComponent

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
