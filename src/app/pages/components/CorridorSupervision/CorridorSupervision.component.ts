import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { CorridorSupervisionDataService } from 'src/app/layout/services/CorridorSupervisionDataService';

@Component({
	selector: 'kt-corrsupervision',
	templateUrl: './CorridorSupervision.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class CorrSupervisionComponent implements OnInit {
	public corrsupervision : any[] = [];

	model = {
		id:0,
		corr_meet_date:'',
		corr_meet_time:'',
		corr_meet_loc: '',

	}

	myModel: any = '';
    constructor( private CorridorSupervisionDataService: CorridorSupervisionDataService) {
			
    }
	
	submitForm(){
		alert(this.model.corr_meet_date);
		this.CorridorSupervisionDataService.Save(this.model).subscribe(
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
			corr_meet_date:'',
			corr_meet_time:'',
			corr_meet_loc: '',
		 }
	}

	edit(){
        this.CorridorSupervisionDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.corrsupervision = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.CorridorSupervisionDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getcorrsuper();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getcorrsuper(){

		this.CorridorSupervisionDataService.Get().subscribe(
        {
			next: (result : any)=>{
			
				this.corrsupervision = result['data'];
		
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getcorrsuper();

		

	}

}
