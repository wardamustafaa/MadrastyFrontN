import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StudentMatterDataService } from 'src/app/layout/services/StudentMatterDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-studentmatter',
	templateUrl: './StudentMatter.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentMatterComponent implements OnInit {
	public Levels : any[] = [];
	classes : any[] = [];
	students : any[] = [];

    modalTitle = 'New Matter'

	displayedColumns: string[] = ['id', 'level_name', 'class_name', 'student_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		id:0,
        level_id: 0,
		level_name:'',
		class_id: 0,
		class_name: '',
        note_date: '',
        topic: '',
        ntoes: '',
		student_id: '',
        student_name: ''

	}

    constructor( private StudentMatterDataService: StudentMatterDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Matter'; 
			
    }
	
	submitForm(){

		this.StudentMatterDataService.Save(this.model).subscribe(
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
        level_id: 0,
		level_name:'',
		class_id: 0,
		class_name: '',
        note_date: '',
        topic: '',
        ntoes: '',
		student_id: '',
        student_name: ''
		 }
	}

	edit(matter : any){
        this.StudentMatterDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.Levels = result['data'][0];
                this.StudentMatterDataService.GetById(result['data'][0].id).subscribe(
                {
                    next: (result : any)=>{
                        this.model = result['data'][0];
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

	delete(matter : any){
        this.StudentMatterDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
                this.StudentMatterDataService.Delete(result['data'][0].id).subscribe()
				this.getstudentmatter();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getstudentmatter(){

		this.StudentMatterDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.Levels = result['data'];
				
			},
			error: (err)=>{
	
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getstudentmatter();

		

	}

}
