import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SpecialStudentDataService } from 'src/app/layout/services/SpecialStudentDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-SpecialStudents',
	templateUrl: './SpecialStudents.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecialStudentsComponent implements OnInit {
	public students : any[] = [];

	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
	deps: any[] = [];
	sideDeps: any[] = [];

	modalTitle = 'Special Students ';

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName','StudentName',
	 'DepartmentName', 'SubDepartmentName', 'actions'];

	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		id:0,
		levelName:'',
		className:'',
		studentName: '',
        departmentName:'',
        sideDepartment: '',
        excellentManifestations: '',
        development: '',
        results: ''
	}


    constructor( private SpecialStudentDataService: SpecialStudentDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Special Students ';
			
    }
	
	submitForm(){
		this.SpecialStudentDataService.Save(this.model).subscribe(
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
            departmentName:'',
            sideDepartment: '',
            excellentManifestations: '',
            development: '',
            results: ''
		}
	}

	edit(student : any){
        this.SpecialStudentDataService.GetById(this.model.id).subscribe(
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
        this.SpecialStudentDataService.Delete(this.model.id).subscribe(
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

		this.SpecialStudentDataService.Get().subscribe(
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
