import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ShowBooksDataService } from 'src/app/layout/services/ShowBooksDataService';

@Component({
	selector: 'kt-showbooks',
	templateUrl: './ShowBooks.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class ShowBooksComponent implements OnInit {
	public showbooks : any[] = [];

	model = {
		mr7la_id:0,
		mr7la_name:'',
		mr7la_code:0,
		mr7la_desc: '',

	}

	myModel: any = '';
    constructor( private ShowBooksDataService: ShowBooksDataService) {
			
    }
	
	submitForm(){
		alert(this.model.mr7la_name);
		this.ShowBooksDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getPhases();
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
        this.ShowBooksDataService.GetById(this.model.mr7la_id).subscribe(
        {
            next: (result : any)=>{
				this.showbooks = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.ShowBooksDataService.Delete(this.model.mr7la_id).subscribe(
        {
            next: (result : any)=>{
				this.getshowbooks();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

    getshowbooks(){

		this.ShowBooksDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.showbooks = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getshowbooks();

		

	}

}
