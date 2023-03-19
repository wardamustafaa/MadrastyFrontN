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

const routes: Routes = [
  {path:'',component: MentalityInquiresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
