import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { SupervisorDistributionDataService } from 'src/app/layout/services/SupervisorDistributionDataService';

@Component({
	selector: 'kt-supervisordis',
	templateUrl: './SupervisorsDistribution.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class SupervisordisComponent implements OnInit {
	public supervisordis : any[] = [];

	model = {
		id:0,
		corridor_name:'',
		dep_name:'',
		emp_name: '',

	}

	myModel: any = '';
    constructor( private SupervisorDistributionDataService: SupervisorDistributionDataService) {
			
    }
	
	submitForm(){
		alert(this.model.corridor_name);
		this.SupervisorDistributionDataService.Save(this.model).subscribe(
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
		corridor_name:'',
		dep_name:'',
		emp_name: '',

		 }
	}

	edit(){
        this.SupervisorDistributionDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.supervisordis = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.SupervisorDistributionDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getsupervisordis();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getsupervisordis(){

		this.SupervisorDistributionDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.supervisordis = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getsupervisordis();

		

	}

}
