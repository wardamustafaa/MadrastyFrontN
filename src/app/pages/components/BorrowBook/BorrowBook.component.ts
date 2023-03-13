import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { BorrowBookDataService } from 'src/app/layout/services/BorrowBookDataService';

@Component({
	selector: 'kt-borrowbook',
	templateUrl: './borrowbook.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class BorrowBookComponent implements OnInit {
	public borrowbook : any[] = [];

	model = {
		book_id:0,
		emp_name:'',
		borr_date:'',

	}

	myModel: any = '';
    constructor( private BorrowBookDataService: BorrowBookDataService) {
			
    }
	
	submitForm(){
		alert(this.model.emp_name);
		this.BorrowBookDataService.Save(this.model).subscribe(
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
			book_id:0,
		emp_name:'',
		borr_date:'',
		 }
	}

	edit(){
        this.BorrowBookDataService.GetById(this.model.book_id).subscribe(
        {
            next: (result : any)=>{
				this.borrowbook = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.BorrowBookDataService.Delete(this.model.book_id).subscribe(
        {
            next: (result : any)=>{
				this.getborrowbook();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getborrowbook(){

		this.BorrowBookDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.borrowbook = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getborrowbook();

		

	}

}
