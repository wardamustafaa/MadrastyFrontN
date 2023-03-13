import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Ta7derStatusDataService } from 'src/app/layout/services/Ta7derStatusDataService';

@Component({
	selector: 'kt-ta7der',
	templateUrl: './Ta7derStatus.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class Ta7derStatusComponent implements OnInit {
	public ta7derstatus : any[] = [];

	model = {
		mr7la_id:0,
		mr7la_name:'',
		mr7la_code:0,
		mr7la_desc: '',

	}

	myModel: any = '';
    constructor( private Ta7derStatusDataService: Ta7derStatusDataService) {
			
    }
	
	submitForm(){
		alert(this.model.mr7la_name);
		this.Ta7derStatusDataService.Save(this.model).subscribe(
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
			mr7la_id:0,
			mr7la_name:'',
			mr7la_code:0,
			mr7la_desc: '',	
		 }
	}

	edit(){
        this.Ta7derStatusDataService.GetById(this.model.mr7la_id).subscribe(
        {
            next: (result : any)=>{
				this.ta7derstatus = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.Ta7derStatusDataService.Delete(this.model.mr7la_id).subscribe(
        {
            next: (result : any)=>{
				this.getta7derstatus();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getta7derstatus(){

		this.Ta7derStatusDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.ta7derstatus = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getta7derstatus();

		

	}

}
