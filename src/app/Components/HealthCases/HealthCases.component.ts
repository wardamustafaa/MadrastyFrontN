import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { HealthCasesDataService } from 'src/app/layout/services/HealthCasesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-HealthCases',
	templateUrl: './HealthCases.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthCasesComponent implements OnInit {
	public students : any[] = [];
    levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
    nationalities : any[] = [];
    
    modalTitle = 'Health Cases';

	displayedColumns: string[] = ['Id', 'lev_name', 'class_name','student_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		id:0,
        caseType: '',
		levelName:'',
		className:'',
		studentName: '',
        nationality: '',
        dob: '',
        status: '',
        recomm: '',
        YearEndState: '',
	}

    details = {
        id: 0,
        HealthId: 0,
        OtherSituations: '',
        Date: '',
        EffortResults: '',
        EndYearState: '',
    }


    constructor( private HealthCasesDataService: HealthCasesDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Health Cases'; 
			
    }
	
	submitForm(){
		this.HealthCasesDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
                this.HealthCasesDataService.SaveHealthCasesDetails(this.details).subscribe()
                this.resetForm();

			  },
			  error: (err)=>{
				console.log(err);
			  }
			}
		  )
	}

	resetForm(){
		this.model = {
			id:0,
            caseType: '',
            levelName:'',
            className:'',
            studentName: '',
            nationality: '',
            dob: '',
            status: '',
            recomm: '',
            YearEndState: '',
		}

        this.details = {
            id: 0,
            HealthId: 0,
            OtherSituations: '',
            Date: '',
            EffortResults: '',
            EndYearState: '',
        }
    
	}

	edit(student : any){
        this.HealthCasesDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
                this.HealthCasesDataService.GetHealthCasesDetailsWithHealthId(result['data'][0].id).subscribe(
                {
                    next: (result : any)=>{
                        this.details = result['data'][0];
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                })
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(student : any){
        this.HealthCasesDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
                this.HealthCasesDataService.DeleteHealthCasesDetailsWithHealthId(result['data'][0].id).subscribe()
				this.getStudents();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStudents(){

		this.HealthCasesDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.students = result['data'];
                this.dataSource = new MatTableDataSource(this.students);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStudents();

		

	}

}
