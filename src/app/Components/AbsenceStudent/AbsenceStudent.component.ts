import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AbsenceDataService } from 'src/app/layout/services/AbsenceDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-AbsenceStudent',
	templateUrl: './AbsenceStudent.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsenceStudentComponent implements OnInit {
	public students : any[] = [];
	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];

	modalTitle = 'New Absence Student'

	displayedColumns: string[] = ['Id', 'AbsenceStudentName', 'civil_id', 'AbsenceDate', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id:0,
		AbsenceLevel:'',
		AbsenceClass: '',
		AbsenceStudentName: '',
		AbsenceStudentId: 0,
        AbsenceDate: '',
	}

    constructor( private AbsenceDataService: AbsenceDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Absence Students'; 
			
    }
	
	submitForm(){
		this.AbsenceDataService.Save(this.model).subscribe(
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
			AbsenceLevel:'',
			AbsenceClass: '',
			AbsenceStudentName: '',
			AbsenceStudentId: 0,
			AbsenceDate: '',
		}
	}

	
	edit(student : any){
        this.AbsenceDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(student : any){
        this.AbsenceDataService.Delete(this.model.id).subscribe(
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

		this.AbsenceDataService.Get().subscribe(
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
