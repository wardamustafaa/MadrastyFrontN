import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ObserversDataService } from 'src/app/layout/services/ObserversDataService';

@Component({
	selector: 'kt-observers',
	templateUrl: './ObserversDistribution.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class ObserversDistributionComponent implements OnInit {
	public observers : any[] = [];

	model = {
		id:0,
		period:'',
		lev_name:'',
		class_name: '',
        emp_name:'',
        observ_loc:'',
        observe_date:'',
	}

	myModel: any = '';
    constructor( private ObserversDataService: ObserversDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.ObserversDataService.Save(this.model).subscribe(
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
            period:'',
            lev_name:'',
            class_name: '',
            emp_name:'',
            observ_loc:'',
            observe_date:'',
		 }
	}

	edit(){
        this.ObserversDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.observers = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.ObserversDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getobservers();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getobservers(){

		this.ObserversDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.observers = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getobservers();

		

	}

}
