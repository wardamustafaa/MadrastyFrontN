import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ActivityDataService } from 'src/app/layout/services/ActivityDataService';

@Component({
	selector: 'kt-activity',
	templateUrl: './Activities.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class ActivityComponent implements OnInit {
	public activity : any[] = [];

	model = {
		activity_id:0,
		activity_name:'',
		dep_name:'',
		year_data: '',
        scode:'',
        activity_date:'',
        semester:'',
        activity_notes:'',

	}

	myModel: any = '';
    constructor( private ActivityDataService: ActivityDataService) {
			
    }
	
	submitForm(){
		alert(this.model.activity_name);
		this.ActivityDataService.Save(this.model).subscribe(
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
            activity_id:0,
            activity_name:'',
            dep_name:'',
            year_data: '',
            scode:'',
            activity_date:'',
            semester:'',
            activity_notes:'',
		 }
	}

	edit(){
        this.ActivityDataService.GetById(this.model.activity_id).subscribe(
        {
            next: (result : any)=>{
				this.activity = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.ActivityDataService.Delete(this.model.activity_id).subscribe(
        {
            next: (result : any)=>{
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
			
				this.activity = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getactivity();

		

	}

}
