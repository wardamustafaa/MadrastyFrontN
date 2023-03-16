import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { VisitsDataService } from 'src/app/layout/services/VisitsDataService';

@Component({
	selector: 'kt-visits',
	templateUrl: './Visits.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class VisitsComponent implements OnInit {
	public visits : any[] = [];

	model = {
		id:0,
		visit_type_name:'',
		visit_date2:'',
		start_time: '',
        name:'',
        job:'',
        dep_name:'',
        phone:'',
        end_time:'',
        topic:'',
        notes:'',
        vnote:'',
        emp_name:'',
        evaluation_date:'',
    

	}

	myModel: any = '';
    constructor( private VisitsDataService: VisitsDataService) {
			
    }
	
	submitForm(){
		alert(this.model.visit_type_name);
		this.VisitsDataService.Save(this.model).subscribe(
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
            visit_type_name:'',
            visit_date2:'',
            start_time: '',
            name:'',
            job:'',
            dep_name:'',
            phone:'',
            end_time:'',
            topic:'',
            notes:'',
            vnote:'',
            emp_name:'',
            evaluation_date:'',
		 }
	}

	edit(){
        this.VisitsDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.visits = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.VisitsDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getvisits();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getvisits(){

		this.VisitsDataService.Get().subscribe(
        {
			next: (result : any)=>{
			
				this.visits = result['data'];
				
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getvisits();

		

	}

}
