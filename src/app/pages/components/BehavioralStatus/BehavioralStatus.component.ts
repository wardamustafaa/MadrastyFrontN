import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { BehavioralStatusDataService } from 'src/app/layout/services/BehavioralStatusDataService';

@Component({
	selector: 'kt-behavstatus',
	templateUrl: './BehavioralStatus.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class BehavioralStatusComponent implements OnInit {
	public behavstatus : any[] = [];

	model = {
		lev_name:'',
		class_name:'',
		student_name:'',
		behave_date: '',
        behave_stat_rep:'',

	}

	myModel: any = '';
    constructor( private BehavioralStatusDataService: BehavioralStatusDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.BehavioralStatusDataService.Save(this.model).subscribe(
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
            lev_name:'',
            class_name:'',
            student_name:'',
            behave_date: '',
            behave_stat_rep:'',
		 }
	}

	edit(){
        this.BehavioralStatusDataService.GetById(this.model.lev_name).subscribe(
        {
            next: (result : any)=>{
				this.behavstatus = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.BehavioralStatusDataService.Delete(this.model.lev_name).subscribe(
        {
            next: (result : any)=>{
				this.getbehavstatus();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getbehavstatus(){

		this.BehavioralStatusDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.behavstatus = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getbehavstatus();

		

	}

}
