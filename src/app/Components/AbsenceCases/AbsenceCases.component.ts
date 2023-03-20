import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AbsenceCasesDataService } from 'src/app/layout/services/AbsenceCasesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-AbsenceCases',
	templateUrl: './AbsenceCases.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsenceCasesComponent implements OnInit {
	public students : any[] = [];
    levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
    nationalities :any[] = [];

    modalTitle = 'New Absence Case'

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName', 'StudentName', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		id:0,
        caseType: '',
		levelName:'',
		className:'',
		studentName: '',
        nationality: '',
        dob: '',
        WorkStartDate: '',
        BehavioralNotes: '',
        SelfReasons: '',
	}

    details = {
        id: 0,
        AbsenceId: 0,
        OtherSituations: '',
        Date: '',
        EffortResults: '',
        EndYearState: '',
    }


    constructor( private AbsenceCasesDataService: AbsenceCasesDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Absence Cases'; 
			
    }
	
	submitForm(){
		this.AbsenceCasesDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
                this.AbsenceCasesDataService.SaveDetails(this.details).subscribe()
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
            WorkStartDate: '',
            BehavioralNotes: '',
            SelfReasons: '',
		}

        this.details = {
            id: 0,
            AbsenceId: 0,
            OtherSituations: '',
            Date: '',
            EffortResults: '',
            EndYearState: '',
        }
    
	}

	edit(student : any){
        this.AbsenceCasesDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
                this.AbsenceCasesDataService.GetDetailsByAbsenceCaseId(result['data'][0].id).subscribe(
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
        this.AbsenceCasesDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
                this.AbsenceCasesDataService.DeleteByAbsenceCaseId(result['data'][0].id).subscribe()
				this.getStudents();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStudents(){

		this.AbsenceCasesDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.students = result['data'];
                this.dataSource = new MatTableDataSource(this.students);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStudents();

		

	}

}
