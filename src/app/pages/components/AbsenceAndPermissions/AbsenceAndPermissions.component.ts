import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { AbsencePermDataService } from 'src/app/layout/services/AbsencePermDataService';

@Component({
	selector: 'kt-absenceperm',
	templateUrl: './AbsenceAndPermissions.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class AbsencePermissionsComponent implements OnInit {
	public absenceperm : any[] = [];

	model = {
		id:0,
		emp_name:'',
		civil_id:'',
		file_id: '',

	}

	myModel: any = '';
    constructor( private AbsencePermDataService: AbsencePermDataService) {
			
    }
	
	submitForm(){
		alert(this.model.emp_name);
		this.AbsencePermDataService.Save(this.model).subscribe(
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
            emp_name:'',
            civil_id:'',
            file_id: '',
		 }
	}

	edit(){
        this.AbsencePermDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.absenceperm = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.AbsencePermDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getabsenceperm();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getabsenceperm(){

		this.AbsencePermDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.absenceperm = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getabsenceperm();

		

	}

}
