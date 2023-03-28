import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StudentTrackingDataService } from 'src/app/layout/services/StudentTrackingDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-studenttrack',
	templateUrl: './StudentTracking.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTrackComponent implements OnInit {
	public subjects : any[] = [];
	levels : any[] = [];
	classes : any[] = [];
	terms : any[] = [];

    modalTitle = 'New Track'

	displayedColumns: string[] = ['ser', 'subject_id', 'level_id', 'class_id', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		ser:0,
        term_id: 0,
		subject_id:0,
		level_id:0,
		class_id: 0,
        date: '',
        student_id: 0,
        behavior: '',
		book: '',
		practice: ''
	}

    constructor( private StudentTrackingDataService: StudentTrackingDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Track'; 
			
    }
	
	submitForm(){
	
		this.StudentTrackingDataService.Save(this.model).subscribe(
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
			ser:0,
			term_id: 0,
			subject_id:0,
			level_id:0,
			class_id: 0,
			date: '',
			student_id: 0,
			behavior: '',
			book: '',
			practice: ''
		 }
	}

	edit(track : any){
        this.StudentTrackingDataService.GetById(this.model.ser).subscribe(
        {
            next: (result : any)=>{
				this.subjects = result['data'][0];
                this.StudentTrackingDataService.GetById(result['data'][0].ser).subscribe(
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

	delete(track : any){
        this.StudentTrackingDataService.Delete(this.model.ser).subscribe(
        {
            next: (result : any)=>{
                this.StudentTrackingDataService.Delete(result['data'][0].ser).subscribe()
				this.getstudenttrack();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getstudenttrack(){

		this.StudentTrackingDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.subjects = result['data'];
				
			},
			error: (err)=>{
				
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getstudenttrack();

		

	}

}