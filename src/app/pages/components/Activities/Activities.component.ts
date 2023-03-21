import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivityDataService } from 'src/app/layout/services/ActivityDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-activity',
	templateUrl: './Activities.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityComponent implements OnInit {
	public departments : any[] = [];
	semesters :  any[] = [];
	year_data :  any[] = [];
	activitylevels :  any[] = [];

    modalTitle = 'New Activity'

	displayedColumns: string[] = ['activity_id', 'activity_name', 'activity_dep','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		activity_id:0,
        activity_name: '',
		activity_dep:'',
		activity_school_year:'',
		activity_school_year_id: '',
        activity_level: '',
        activity_date: '',
        activity_school_term: '',
		activity_notes: '',
        parent_id: '',
	}

    constructor( private ActivityDataService: ActivityDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Activity'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.ActivityDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getbooks();
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
			activity_id:0,
			activity_name: '',
			activity_dep:'',
			activity_school_year:'',
			activity_school_year_id: '',
			activity_level: '',
			activity_date: '',
			activity_school_term: '',
			activity_notes: '',
			parent_id: '',
		 }
	}

	edit(activity : any){
        this.ActivityDataService.GetById(this.model.activity_id).subscribe(
        {
            next: (result : any)=>{
				this.departments = result['data'][0];
                this.ActivityDataService.GetById(result['data'][0].activity_id).subscribe(
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

	delete(activity : any){
        this.ActivityDataService.Delete(this.model.activity_id).subscribe(
        {
            next: (result : any)=>{
                this.ActivityDataService.Delete(result['data'][0].activity_id).subscribe()
				this.getactivity();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getactivity(){

		this.ActivityDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.departments = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getactivity();

		

	}

}
