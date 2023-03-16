import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { MaintenanceDataService } from 'src/app/layout/services/MaintenanceDataService';

@Component({
	selector: 'kt-maintenance',
	templateUrl: './Maintenance.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class MaintenanceComponent implements OnInit {
	public maintenance : any[] = [];

	model = {
		id:0,
		date:'',
		maint_type:'',
		maint_loc: '',
    maint_work:'',
    maint_notes:'',

	}

	myModel: any = '';
    constructor( private MaintenanceDataService: MaintenanceDataService) {
			
    }
	
	submitForm(){
		alert(this.model.maint_type);
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
      id:0,
      date:'',
      maint_type:'',
      maint_loc: '',
      maint_work:'',
      maint_notes:'',
		 }
	}

	edit(){
        this.MaintenanceDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.maintenance = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.MaintenanceDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
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
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getmaintenance();

		

	}

}
