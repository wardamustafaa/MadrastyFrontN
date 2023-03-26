import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NewTripDataService } from 'src/app/layout/services/NewTripDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-newtrip',
	templateUrl: './NewTrip.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTripComponent implements OnInit {
	public Departments : any[] = [];
	Employees : any[] = [];
	levels : any[] = [];
	classes : any[] = [];
	students: any[]=[];

    modalTitle = 'New Trip'

	displayedColumns: string[] = ['trip_id', 'dep_name', 'emp_name', 'trip_loc', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		trip_id:0,
        dep_id: 0,
		dep_name:'',
		emp_id:0,
		emp_name: '',
        trip_loc: '',
        trip_date: '',
		trip_time:'',
        trip_duration: '',
		trip_goals: '',
        trip_notes: '',
        student_number: 0,
        trip_type: 0,
		transportation_type: 0,
        class_id: 0,
		level_id: 0,
		student_name:'',
		class_name:'',
		lev_name:''

	}

    constructor( private NewTripDataService: NewTripDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Trip'; 
			
    }
	
	submitForm(){
	
		this.NewTripDataService.Save(this.model).subscribe(
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
			trip_id:0,
        dep_id: 0,
		dep_name:'',
		emp_id:0,
		emp_name: '',
        trip_loc: '',
        trip_date: '',
		trip_time:'',
        trip_duration: '',
		trip_goals: '',
        trip_notes: '',
        student_number: 0,
        trip_type: 0,
		transportation_type: 0,
        class_id: 0,
		level_id: 0,
		student_name:'',
		class_name:'',
		lev_name:''
		 }
	}

	edit(trip : any){
        this.NewTripDataService.GetById(this.model.trip_id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
                this.NewTripDataService.GetById(result['data'][0].trip_id).subscribe(
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

	delete(trip : any){
        this.NewTripDataService.Delete(this.model.trip_id).subscribe(
        {
            next: (result : any)=>{
                this.NewTripDataService.Delete(result['data'][0].trip_id).subscribe()
				this.gettrip();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	gettrip(){

		this.NewTripDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.students = result['data'];
				
			},
			error: (err)=>{
		
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.gettrip();

		

	}

}