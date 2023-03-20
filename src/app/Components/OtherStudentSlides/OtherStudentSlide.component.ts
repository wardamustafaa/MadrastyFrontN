import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { OtherStudentSlidesDataService } from 'src/app/layout/services/OtherStudentSlidesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-OtherStudentSlides',
	templateUrl: './OtherStudentSlide.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtherStudentSlidesComponent implements OnInit {
	public students : any[] = [];
	
	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
    nationalities : any[] = [];
	sildes: any[] = [];

	modalTitle = 'Other Student Slides';

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName','StudentName','civil_id', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id:0,
        slideType: '',
		levelName:'',
		className:'',
		studentName: '',
        dateOfFileOpening: '',
        slide: '',
        details: '',
        results: ''
	}


    constructor( private OtherStudentSlidesDataService: OtherStudentSlidesDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Other Student Slides'; 
			
    }
	
	submitForm(){
		this.OtherStudentSlidesDataService.Save(this.model).subscribe(
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
            slideType: '',
            levelName:'',
            className:'',
            studentName: '',
            dateOfFileOpening: '',
            slide: '',
            details: '',
            results: ''
		}
	}

	edit(student : any){
        this.OtherStudentSlidesDataService.GetById(this.model.id).subscribe(
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
        this.OtherStudentSlidesDataService.Delete(this.model.id).subscribe(
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

		this.OtherStudentSlidesDataService.Get().subscribe(
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
