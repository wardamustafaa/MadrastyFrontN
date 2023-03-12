import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { BooksDataService } from 'src/app/layout/services/BooksDataService';

@Component({
	selector: 'kt-booksdata',
	templateUrl: './BooksData.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class BooksDataComponent implements OnInit {
	public books : any[] = [];

	model = {
		book_id:0,
		lib_rec_no:0,
		lib_book_name:'',
		classif:'',
		lib_book: 0,
		classif1:'',
		lib_author_name:'',
		date: '',
		lib_page_no:'',

	}

	myModel: any = '';
    constructor( private BooksDataService: BooksDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lib_book_name);
		this.BooksDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getbooks();
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
			lib_rec_no:0,
		lib_book_name:'',
		classif:'',
		lib_book: 0,
		classif1:'',
		lib_author_name:'',
		date: '',
		lib_page_no:'',
		 }
	}

	edit(){
        this.BooksDataService.GetById(this.model.book_id).subscribe(
        {
            next: (result : any)=>{
				this.books = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.BooksDataService.Delete(this.model.book_id).subscribe(
        {
            next: (result : any)=>{
				this.getbooks();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getbooks(){

		this.BooksDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.books = result['data'];
				
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getbooks();

		

	}

}
