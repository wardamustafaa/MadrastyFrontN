import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { StrategicPlanTeamDataService } from 'src/app/layout/services/StrategicPlanTeamDataService';

@Component({
	selector: 'kt-strategicplan',
	templateUrl: './StrategicPlanTeam.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class StrategicPLanComponent implements OnInit {
	public strategicplan : any[] = [];

	model = {
		id:0,
		teams_type:'',
		dep_name:'',
		name: '',
		emp_name:'',
		goals:'',
	}

	myModel: any = '';
    constructor( private StrategicPlanTeamDataService: StrategicPlanTeamDataService) {
			
    }
	
	submitForm(){
		alert(this.model.teams_type);
		this.StrategicPlanTeamDataService.Save(this.model).subscribe(
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
		teams_type:'',
		dep_name:'',
		name: '',
		emp_name:'',
		goals:'',
		 }
	}

	edit(){
        this.StrategicPlanTeamDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.strategicplan = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.StrategicPlanTeamDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getStrategicplan();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStrategicplan(){

		this.StrategicPlanTeamDataService.Get().subscribe(
        {
			next: (result : any)=>{
		
				this.strategicplan = result['data'];
	
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStrategicplan();

		

	}

}
