import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { RegimeCouncilStudentDataService } from 'src/app/layout/services/RegimeCouncilStudentDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-RegimeCouncilStudents',
	templateUrl: './RegimeCouncilStudents.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegimeCouncilStudentsComponent implements OnInit {
	public students : any[] = [];

	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
	sildes: any[] = [];

	modalTitle = 'Regime Council Students';

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName','StudentName','civil_id',
		'DefinitionName','Date', 'actions'];

	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id:0,
		levelName:'',
		className:'',
		studentName: '',
        date: '',
        slide: ''
	}


    constructor( private RegimeCouncilStudentDataService: RegimeCouncilStudentDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Regime Council Students';
			
			
    }
	
	submitForm(){
		this.RegimeCouncilStudentDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getPhases();
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
            levelName:'',
            className:'',
            studentName: '',
            date: '',
            slide: ''
		}
	}

	edit(student : any){
        this.RegimeCouncilStudentDataService.GetById(this.model.id).subscribe(
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
        this.RegimeCouncilStudentDataService.Delete(this.model.id).subscribe(
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

		this.RegimeCouncilStudentDataService.Get().subscribe(
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
