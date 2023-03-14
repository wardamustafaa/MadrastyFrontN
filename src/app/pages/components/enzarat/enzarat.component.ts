import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { EnzaratDataService } from 'src/app/layout/services/EnzaratDataService';

@Component({
	selector: 'kt-enzarat',
	templateUrl: './Enzarat.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class EnzaratComponent implements OnInit {
	public enzarat : any[] = [];

	model = {
		id:0,
		lev_name:'',
		class_name:'',
		alert_type: '',
        student_name:'',
        is_sent:'',
	}

	myModel: any = '';
    constructor( private EnzaratDataService: EnzaratDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.EnzaratDataService.Save(this.model).subscribe(
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
		lev_name:'',
		class_name:'',
		alert_type: '',
        student_name:'',
        is_sent:'',
		 }
	}

	edit(){
        this.EnzaratDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.enzarat = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.EnzaratDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getenzarat();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getenzarat(){

		this.EnzaratDataService.Get().subscribe(
        {
			next: (result : any)=>{
		
				this.enzarat = result['data'];
				
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getenzarat();

		

	}

}
