import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { NewTripDataService } from 'src/app/layout/services/NewTripDataService';

@Component({
	selector: 'kt-newtrip',
	templateUrl: './NewTrip.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewTripComponent implements OnInit {
	public newtrip : any[] = [];

	model = {
		id:0,
		dep_name:'',
		emp_name:'',
		trip_type: '',
		trip_loc:'',
		student_number:'',
		lev_name:'',
		class_name:'',
		student_name:'',
		trip_date:'',
		trip_time:'',
		trip_duration:'',
		trip_goals:'',
		trip_notes:'',

	}

	myModel: any = '';
    constructor( private NewTripDataService: NewTripDataService) {
			
    }
	
	submitForm(){
		alert(this.model.dep_name);
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
			id:0,
		dep_name:'',
		emp_name:'',
		trip_type: '',
		trip_loc:'',
		student_number:'',
		lev_name:'',
		class_name:'',
		student_name:'',
		trip_date:'',
		trip_time:'',
		trip_duration:'',
		trip_goals:'',
		trip_notes:'',
		 }
	}

	edit(){
        this.NewTripDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.newtrip = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.NewTripDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getnewtrip();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getnewtrip(){

		this.NewTripDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.newtrip = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getnewtrip();

		

	}

}
