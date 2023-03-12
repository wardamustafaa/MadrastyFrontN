import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { AbsenceStatDataService } from 'src/app/layout/services/AbsenceStatDataService';

@Component({
	selector: 'kt-absencestat',
	templateUrl: './AbscenceStatistics.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class AbsenceStatComponent implements OnInit {
	public absencestat : any[] = [];

	model = {
		absence_id:0,
		absenceDate:'',
		level: '',

	}

	myModel: any = '';
    constructor( private AbsenceStatDataService: AbsenceStatDataService) {
			
    }
	
	submitForm(){
		alert(this.model.absenceDate);
		this.AbsenceStatDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getabsencestat();
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
			absence_id:0,
			absenceDate:'',
			level: '',	
		 }
	}

	edit(){
        this.AbsenceStatDataService.GetById(this.model.absence_id).subscribe(
        {
            next: (result : any)=>{
				this.absencestat = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.AbsenceStatDataService.Delete(this.model.absence_id).subscribe(
        {
            next: (result : any)=>{
				this.getAbsencestat();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getAbsencestat(){

		this.AbsenceStatDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.absencestat = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getAbsencestat();

		

	}

}
