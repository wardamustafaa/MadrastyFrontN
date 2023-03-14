import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { AddAbsencePermDataService } from 'src/app/layout/services/AddAbsencePermDataService';

@Component({
	selector: 'kt-addabsence',
	templateUrl: './AddAbsencePermissions.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddAbsenceComponent implements OnInit {
	public addabsence : any[] = [];

	model = {
		id:0,
		dep_name:'',
		emp_name:'',
		ezn_date: '',
		ezn_reason:'',
		time_from:'',
		time_to:'',
	}

	myModel: any = '';
    constructor( private AddAbsencePermDataService: AddAbsencePermDataService) {
			
    }
	
	submitForm(){
		alert(this.model.dep_name);
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
			id:0,
		dep_name:'',
		emp_name:'',
		ezn_date: '',
		ezn_reason:'',
		time_from:'',
		time_to:'',
		 }
	}

	edit(){
        this.AddAbsencePermDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.addabsence = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.AddAbsencePermDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
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
	
				this.addabsence = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getaddabsence();

		

	}

}
