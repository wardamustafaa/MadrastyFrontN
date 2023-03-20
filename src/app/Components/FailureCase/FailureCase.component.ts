import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FailureCsesDataService } from 'src/app/layout/services/FailureCasesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-FailureCase',
	templateUrl: './FailureCase.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FailureCaseComponent implements OnInit {
	public students : any[] = [];

    levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
    nationalities :any[] = [];
    subjects :any[] = [];

    modalTitle = 'New Failure Case'

	displayedColumns: string[] = ['Id', 'student_name', 'fail_date', 'fail_reason', 'actions'];
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
        phone: 0,
        dob: '',
        WorkStartDate: '',
        Notes: '',
        reasons: '',
        FailSub: '',
        Fail1 :0,
        Fail2: 0,
        Fail3 : 0,
        Fail4: 0,
        FailEndYear: 0,
        FailSit: '',
        Date: '',
        EffortResults : '',
        FailRecomm: ''
	}


    constructor( private FailureCsesDataService: FailureCsesDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Failure Cases'; 
			
    }
	
	submitForm(){
		this.FailureCsesDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
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
            phone: 0,
            dob: '',
            WorkStartDate: '',
            Notes: '',
            reasons: '',
            FailSub: '',
            Fail1 :0,
            Fail2: 0,
            Fail3 : 0,
            Fail4: 0,
            FailEndYear: 0,
            FailSit: '',
            Date: '',
            EffortResults : '',
            FailRecomm: ''
		}
	}

	edit(student : any){
        this.FailureCsesDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.model = result['data'][0];
               
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(student : any){
        this.FailureCsesDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getStudents();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStudents(){

		this.FailureCsesDataService.Get().subscribe(
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
