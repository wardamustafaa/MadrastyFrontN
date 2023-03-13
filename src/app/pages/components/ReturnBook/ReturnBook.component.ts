import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ReturnBookDataService } from 'src/app/layout/services/ReturnBookDataService';

@Component({
	selector: 'kt-returnbook',
	templateUrl: './ReturnBook.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class ReturnBookComponent implements OnInit {
	public returnbook : any[] = [];

	model = {
		mr7la_id:0,
		mr7la_name:'',
		mr7la_code:0,
		mr7la_desc: '',

	}

	myModel: any = '';
    constructor( private ReturnBookDataService: ReturnBookDataService) {
			
    }
	
	submitForm(){
		alert(this.model.mr7la_name);
		this.ReturnBookDataService.Save(this.model).subscribe(
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
        this.ReturnBookDataService.GetById(this.model.mr7la_id).subscribe(
        {
            next: (result : any)=>{
				this.returnbook = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.ReturnBookDataService.Delete(this.model.mr7la_id).subscribe(
        {
            next: (result : any)=>{
				this.getreturnbook();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

    getreturnbook(){

		this.ReturnBookDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.returnbook = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getreturnbook();

		

	}

}
