import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ExcellentStudentsDataService } from 'src/app/layout/services/ExcellentStudentsDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-ExcellentStudents',
	templateUrl: './ExcellentStudents.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExcellentStudentsComponent implements OnInit {
	public students : any[] = [];

	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
    nationalities :any[] = [];

    modalTitle = 'New Excellent Student'

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName', 'Name', 'actions'];
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
        Notes: '',
        Efforts: '',
	}


    constructor( private ExcellentStudentsDataService: ExcellentStudentsDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Excellent Students'; 
			
			
    }
	
	submitForm(){
		this.ExcellentStudentsDataService.Save(this.model).subscribe(
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
            dob: '',
            Notes: '',
            Efforts: '',
		}
	}

	edit(student : any){
        this.ExcellentStudentsDataService.GetById(this.model.id).subscribe(
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
        this.ExcellentStudentsDataService.Delete(this.model.id).subscribe(
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

		this.ExcellentStudentsDataService.Get().subscribe(
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
