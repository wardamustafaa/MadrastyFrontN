import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AddAbsencePermDataService } from 'src/app/layout/services/AddAbsencePermDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';


@Component({
	selector: 'kt-addabsence',
	templateUrl: './AddAbsencePermissions.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddAbsenceComponent implements OnInit {
	public departments : any[] = [];
 

    modalTitle = 'الغيابات والاستئذانات'

	displayedColumns: string[] = ['ezn_id', 'dep_name', 'ezn_reason','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		ezn_id:0,
        absent_ezn_id: 0,
		premit_id:0,
		emp_id:0,
		ezn_date: '',
        ezn_reason: '',
        time_from: '',
        time_to: '',
		ezn_state: '',
		department:'',
		employee:''
	
	}

    constructor( private AddAbsencePermDataService: AddAbsencePermDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'الغيابات والاستئذانات'; 
			
    }
	
	submitForm(){

		this.AddAbsencePermDataService.Save(this.model).subscribe(
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
			ezn_id:0,
			absent_ezn_id: 0,
			premit_id:0,
			emp_id:0,
			ezn_date: '',
			ezn_reason: '',
			time_from: '',
			time_to: '',
			ezn_state: '',
			department:'',
			employee:''
		
		 }
	}

	edit(absenceprem : any){
        this.AddAbsencePermDataService.GetById(this.model.ezn_id).subscribe(
        {
            next: (result : any)=>{
				this.departments = result['data'][0];
                this.AddAbsencePermDataService.GetById(result['data'][0].ezn_id).subscribe(
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

	delete(absenceprem : any){
        this.AddAbsencePermDataService.Delete(this.model.ezn_id).subscribe(
        {
            next: (result : any)=>{
                this.AddAbsencePermDataService.Delete(result['data'][0].ezn_id).subscribe()
				this.getaddabsence();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getaddabsence(){

		this.AddAbsencePermDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.departments = result['data'];
				
			},
			error: (err)=>{
			
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getaddabsence();

	}

}