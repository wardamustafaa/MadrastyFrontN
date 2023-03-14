import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { NewsInternalExternalDataService } from 'src/app/layout/services/NewsInternalExternalDataService';

@Component({
	selector: 'kt-newsinex',
	templateUrl: './NewsInternalExternal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewsInternalExternalComponent implements OnInit {
	public newsinex : any[] = [];

	model = {
		id:0,
		emp_name:'',
		nchra_pages_num:'',
		nchra_topic: '',
		nchra_date:'',
		dep_name:'',

	}

	myModel: any = '';
    constructor( private NewsInternalExternalDataService: NewsInternalExternalDataService) {
			
    }
	
	submitForm(){
		alert(this.model.emp_name);
		this.NewsInternalExternalDataService.Save(this.model).subscribe(
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
			nchra_pages_num:'',
			nchra_topic: '',
			nchra_date:'',
			dep_name:'',
		 }
	}

	edit(){
        this.NewsInternalExternalDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.newsinex = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.NewsInternalExternalDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getnewsexin();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getnewsexin(){

		this.NewsInternalExternalDataService.Get().subscribe(
        {
			next: (result : any)=>{
		
				this.newsinex = result['data'];
	
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getnewsexin();

		

	}

}
