import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AbsenceCasesComponent } from './Components/AbsenceCases/AbsenceCases.component';
import { AbsenceStudentComponent } from './Components/AbsenceStudent/AbsenceStudent.component';
import { ClassComponent } from './Components/Classes/Class.component';
import { ClassInstructionComponent } from './Components/ClassInstruction/ClassInstruction.component';
import { DelayComponent } from './Components/Delay/Delay.component';
import { DepartmentComponent } from './Components/Departments/Department.copmponent';
import { EmployeeComponent } from './Components/Employees/Employee.component';
import { ExcellentStudentsComponent } from './Components/ExcellentStudents/ExcellentStudents.component';
import { FailureCaseComponent } from './Components/FailureCase/FailureCase.component';
import { GroupInstructionComponent } from './Components/GroupInstruction/GroupInstruction.component';
import { GuideComponent } from './Components/Guide/Guide.component';
import { GuiltComponent } from './Components/Guilt/Guilt.component';
import { HealthCasesComponent } from './Components/HealthCases/HealthCases.component';
import { IndividualCasesComponent } from './Components/IndividualCases/IndividualCases.component';
import { LevelComponent } from './Components/Levels/Level.component';
import { MentalityInquiresComponent } from './Components/MentalityInquiries/MentalityInquiries.component';
import { NewWorkComponent } from './Components/NewWork/NewWork.component';
import { OtherStudentSlidesComponent } from './Components/OtherStudentSlides/OtherStudentSlide.component';
import { PhaseComponent } from './Components/Phases/Phases.component';
import { RegimeCouncilStudentsComponent } from './Components/RegimeCouncilStudents/RegimeCouncilStudents.component';
import { RestToRedoComponent } from './Components/RestToRedo/RestToRedo.component';
import { SonOfMartyrsComponent } from './Components/SonOfMartyrs/SonOfMartyrs.component';
import { SpeakingDisorderComponent } from './Components/SpeakingDisorder/SpeakingDisorder.component';
import { SpecialStudentsComponent } from './Components/SpecialStudents/SpecialStudents.components';
import { StatusComponent } from './Components/Status/Status.component';
import { SuggesstionsComponent } from './Components/Suggesstions/Suggesstion.component';
import { SwotComponent } from './Components/Swot/Swot.component';
import { TestMetricComponent } from './Components/TestMetric/TestMetric.component';
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

const routes: Routes = [
  {path:'department',component: DepartmentComponent},
  {path:'BooksData',component: BooksDataComponent},
  {path:'AbsenceCases',component: AbsenceCasesComponent},
  {path:'AbscenceStatistics',component: AbsenceStatComponent},
  {path:'AbsencePermissionsComponent',component: AbsencePermissionsComponent},
  {path:'ActivityComponent',component: ActivityComponent},
  {path:'AddAbsenceComponent',component: AddAbsenceComponent},
  {path:'BadStudentCardComponent',component: BadStudentCardComponent},
  {path:'BorrowBookComponent',component: BorrowBookComponent},
  {path:'CorridorComponent',component: CorridorComponent},
  {path:'CorrSupervisionComponent',component: CorrSupervisionComponent},
  {path:'DailyAbsenceStatComponent',component: DailyAbsenceStatComponent},
  {path:'ManagerVisitComponent',component: ManagerVisitComponent},
  {path:'EnzaratComponent',component: EnzaratComponent},
  {path:'EventsComponent',component: EventsComponent},
  {path:'FinancialFundComponent',component: FinancialFundComponent},
  {path:'GoodStudentCardComponent',component: GoodStudentCardComponent},
  {path:'MaintenanceComponent',component: MaintenanceComponent},
  {path:'MessageComponent',component: MessageComponent},
  {path:'NewsInternalExternalComponent',component: NewsInternalExternalComponent},
  {path:'NewTripComponent',component: NewTripComponent},
  {path:'ObserversDistributionComponent',component: ObserversDistributionComponent},
  {path:'ReturnBookComponent',component: ReturnBookComponent},
  {path:'SchoolPartyComponent',component: SchoolPartyComponent},
  {path:'ShowBooksDataComponent',component: ShowBooksDataComponent},
  {path:'ShowTa7diersComponent',component: ShowTa7diersComponent},
  {path:'StrategicPLanComponent',component: StrategicPLanComponent},
  {path:'StudentDistributionComponent',component: StudentDistributionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
