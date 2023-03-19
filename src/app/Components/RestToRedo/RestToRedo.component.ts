import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { RestToRedoDataService } from 'src/app/layout/services/RestToRedoService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-RestToRedo',
	templateUrl: './RestToRedo.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestToRedoComponent implements OnInit {
	public students : any[] = [];

	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
    nationalities : any[] = [];
	sildes: any[] = [];

	modalTitle = 'Rest To Redo ';

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName','StudentName','civil_id', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


	model = {
		id:0,
		levelName:'',
		className:'',
		studentName: '',
        dateOfFileOpening: '',
        slide: '',
        reasons: '',
        results: ''
	}


    constructor( private RestToRedoDataService: RestToRedoDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Rest To Redo ';
			
    }
	
	submitForm(){
		this.RestToRedoDataService.Save(this.model).subscribe(
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
            dateOfFileOpening: '',
            slide: '',
            reasons: '',
            results: ''
		}
	}

	edit(student : any){
        this.RestToRedoDataService.GetById(this.model.id).subscribe(
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
        this.RestToRedoDataService.Delete(this.model.id).subscribe(
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

		this.RestToRedoDataService.Get().subscribe(
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
