import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { WritingPrepDataService } from 'src/app/layout/services/WritingPrepDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-WritingPrep',
	templateUrl: './WritingPreparation.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WritingPrepComponent implements OnInit {
	public subjects : any[] = [];
	weeks : any[] = [];
	days : any[] = [];
	levels : any[] = [];


    modalTitle = 'New Prep'

	displayedColumns: string[] = ['ta7dier_id', 'subject_name', 'ta7dier_date','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		ta7dier_id:0,
emp_id:0,
emp_name: '',
subject_id:0,
subject_name: '',
grade_id:0,
grade_name: '',
ta7dier_date: '',
ta7dier_week:0,
ta7dier_day:0,
is_done:0,
is_late:0,
ta7dier_state_id:0,
state_name: '',
ta7dier_name: '',
ta7dier_body: '',
ta7dier_notes: '',
ta7dier_supervision_state_id:0,
ta7dier_supervision_state_name: '',
ta7dier_state_name: '',
ta7dier_file: '',
ta7dier_file_type: '',
is_file:0,
lev_name:''

	}

    constructor( private WritingPrepDataService: WritingPrepDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Prep'; 
			
    }
	
	submitForm(){
		
		this.WritingPrepDataService.Save(this.model).subscribe(
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
			ta7dier_id:0,
			emp_id:0,
			emp_name: '',
			subject_id:0,
			subject_name: '',
			grade_id:0,
			grade_name: '',
			ta7dier_date: '',
			ta7dier_week:0,
			ta7dier_day:0,
			is_done:0,
			is_late:0,
			ta7dier_state_id:0,
			state_name: '',
			ta7dier_name: '',
			ta7dier_body: '',
			ta7dier_notes: '',
			ta7dier_supervision_state_id:0,
			ta7dier_supervision_state_name: '',
			ta7dier_state_name: '',
			ta7dier_file: '',
			ta7dier_file_type: '',
			is_file:0,
			lev_name:''
		 }
	}

	edit(prep : any){
        this.WritingPrepDataService.GetById(this.model.ta7dier_id).subscribe(
        {
            next: (result : any)=>{
				this.subjects = result['data'][0];
                this.WritingPrepDataService.GetById(result['data'][0].ta7dier_id).subscribe(
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

	delete(prep : any){
        this.WritingPrepDataService.Delete(this.model.ta7dier_id).subscribe(
        {
            next: (result : any)=>{
                this.WritingPrepDataService.Delete(result['data'][0].ta7dier_id).subscribe()
				this.getwritingprep();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getwritingprep(){

		this.WritingPrepDataService.Get().subscribe(
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
		this.getwritingprep();

		

	}

}