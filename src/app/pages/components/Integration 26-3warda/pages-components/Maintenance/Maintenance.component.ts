import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MaintenanceDataService } from 'src/app/layout/services/MaintenanceDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-maintenance',
	templateUrl: './Maintenance.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaintenanceComponent implements OnInit {
	public maintenance : any[] = [];


    modalTitle = 'New Maint'

	displayedColumns: string[] = ['maint_id', 'maint_type', 'maint_loc', 'maint_work', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		maint_id:0,
        maint_date: '',
		maint_type:'',
		maint_loc:'',
		maint_work: '',
        maint_notes: ''
    
	}

    constructor( private MaintenanceDataService: MaintenanceDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Maint'; 
			
    }
	
	submitForm(){
	
		this.MaintenanceDataService.Save(this.model).subscribe(
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
			maint_id:0,
        maint_date: '',
		maint_type:'',
		maint_loc:'',
		maint_work: '',
        maint_notes: ''
		 }
	}

	edit(maintenance : any){
        this.MaintenanceDataService.GetById(this.model.maint_id).subscribe(
        {
            next: (result : any)=>{
				this.maintenance = result['data'][0];
                this.MaintenanceDataService.GetById(result['data'][0].maint_id).subscribe(
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

	delete(maintenance : any){
        this.MaintenanceDataService.Delete(this.model.maint_id).subscribe(
        {
            next: (result : any)=>{
                this.MaintenanceDataService.Delete(result['data'][0].maint_id).subscribe()
				this.getmaintenance();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getmaintenance(){

		this.MaintenanceDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.maintenance = result['data'];
				
			},
			error: (err)=>{
			
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getmaintenance();

		

	}

}