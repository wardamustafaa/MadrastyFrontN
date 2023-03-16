import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { DepManagerVisitDataService } from 'src/app/layout/services/DepManagerVisitDataService';

@Component({
	selector: 'kt-managervisit',
	templateUrl: './DepManagerVisit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class ManagerVisitComponent implements OnInit {
	public managervisit : any[] = [];

	model = {
		id:0,
		date:'',
		is_agree:0,
		notes: '',

	}

	myModel: any = '';
    constructor( private DepManagerVisitDataService: DepManagerVisitDataService) {
			
    }
	
	submitForm(){
		alert(this.model.date);
		this.DepManagerVisitDataService.Save(this.model).subscribe(
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
			date:'',
			is_agree:0,
			notes: '',
		 }
	}

	edit(){
        this.DepManagerVisitDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.managervisit = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.DepManagerVisitDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getmanagervisit();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getmanagervisit(){

		this.DepManagerVisitDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.managervisit = result['data'];
		
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getmanagervisit();

		

	}

}
