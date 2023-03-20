import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DepartmentDataService } from 'src/app/layout/services/DepartmentDataService';
import { EmployeeDataService } from 'src/app/layout/services/EmployeeDataService';
import { EvaluationDataService } from 'src/app/layout/services/EvaluationDataService';
import { TeamsDataService } from 'src/app/layout/services/TeamsDataService';

@Component({
	selector: 'kt-StudentTransfer',
	templateUrl: './StudentTransfer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTransferComponent implements OnInit {
	public evaluations : any[] = [];

	model = {
		Id:0,
		EvaluationId:0,
		EvaluationObject:0,
		EvaluationObjectName: '',
        EvaluationSubject: '',
        EvaluationSubjectId: 0,
        TheObjectId: 0,
        EvaluationDate: '',
	}
    details = {
        Id: 0,
        TakeemId: '',
        EvaluationItemId: 0,
        EvaluationItemName : '',
        EvaluationAppreciation: '',
        EvaluationScore : 0,
        EvaluationResult : '',
        EvaluationSubjectId : 0,
        EvaluationDate : ''
    }

    constructor( private EvaluationDataService: EvaluationDataService,
        private TeamsDataService: TeamsDataService,
        private EmployeeDataService : EmployeeDataService,
        private DepartmentDataService : DepartmentDataService) {
			
    }
    teams: any;
    show:any;
    employees: any;
    departments : any;

    def_change(event : any){
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.def_id== 56)
			{
				this.show = 3
				
				this.TeamsDataService.Get().subscribe(
				{
                    next: (result : any)=>{
                        this.teams = result['data']
                        
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                });

			}
			else if (event.def_id== 57)
			{
				this.show = 2
			
				this.EmployeeDataService.Get().subscribe(
                {
                    next: (result : any)=>{
                        this.employees = result['data']
                            
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                });
			}
			else if (event.def_id== 58)
			{
				this.show = 1
				
				this.DepartmentDataService.Get().subscribe(
                {
                    next: (result : any)=>{
                        this.departments = result['data']

                    },
                    error: (err)=>{
                        console.log(err);
                    }
                });
			}
		}

	}
    SelectedTeacher : any;
    SelectedTeam: any;
    SelectedDepartment: any;
    SelectedGhat : any;

    selection : any;

	submitForm(){
        if (this.show === 1)
		{
			this.model.EvaluationSubject = this.SelectedDepartment.dep_name;
			this.model.EvaluationSubjectId = this.SelectedDepartment.dep_id;

		}
		else if (this.show === 2)
		{
			this.model.EvaluationSubject = this.SelectedTeacher.emp_name;
			this.model.EvaluationSubjectId = this.SelectedTeacher.emp_id;

		}
		else if (this.show === 3)
		{
			this.model.EvaluationSubject =this.SelectedTeacher.name;
			this.model.EvaluationSubjectId = this.SelectedTeacher.id;
		}

		this.model.EvaluationObjectName = this.SelectedGhat.def_name;
		this.model.TheObjectId = this.SelectedGhat.def_id;


		this.EvaluationDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{

                for (let i = 0; i < this.selection.selected.length; i++) {
					
                    this.details.TakeemId = result['data'][0].Id,
					this.details.EvaluationItemId =  this.selection.selected[i].EvaluationItemId,
					this.details.EvaluationItemName =  this.selection.selected[i].EvaluationItemName,
					this.details.EvaluationAppreciation = String(this.selection.selected[i].EvaluationAppreciation),
					this.details.EvaluationScore = this.selection.selected[i].EvaluationScore,
					this.details.EvaluationResult = this.selection.selected[i].EvaluationResult
					
                }

				this.EvaluationDataService.SaveDetails(this.details).subscribe(
                    {
                        next: (result : any)=>{
                            this.resetForm();
                        },
                        error: (err)=>{
                            console.log(err);
                        }
                    });
                

			  },
			  error: (err)=>{
				console.log(err);
			  }
			}
		  )
	}

	resetForm(){
		this.model = {
			Id:0,
            EvaluationId:0,
            EvaluationObject:0,
            EvaluationObjectName: '',
            EvaluationSubject: '',
            EvaluationSubjectId: 0,
            TheObjectId: 0,
            EvaluationDate: '',
		}
	}

	
	edit(){
        this.EvaluationDataService.GetById(this.model.Id).subscribe(
        {
            next: (result : any)=>{
				this.evaluations = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.EvaluationDataService.Delete(this.model.Id).subscribe(
        {
            next: (result : any)=>{
				this.getEvaluations();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getEvaluations(){

		this.EvaluationDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.evaluations = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getEvaluations();

		

	}
}
