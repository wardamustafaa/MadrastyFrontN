import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BooksDataService } from 'src/app/layout/services/BooksDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-booksdata',
	templateUrl: './BooksData.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooksDataComponent implements OnInit {
	public classifs : any[] = [];
 

    modalTitle = 'New Book'

	displayedColumns: string[] = ['lib_id', 'lib_book_name', 'lib_author_name', 'lib_date', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		lib_id:0,
        lib_book_name: '',
		lib_author_name:'',
		lib_ref:'',
		lib_classification: '',
        lib_book: '',
        lib_date: '',
        lib_page_no: ''

	}

    constructor( private BooksDataService: BooksDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Book'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
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
			lib_id:0,
        lib_book_name: '',
		lib_author_name:'',
		lib_ref:'',
		lib_classification: '',
        lib_book: '',
        lib_date: '',
        lib_page_no: ''
		 }
	}

	edit(book : any){
        this.BooksDataService.GetById(this.model.lib_id).subscribe(
        {
            next: (result : any)=>{
				this.classifs = result['data'][0];
                this.BooksDataService.GetById(result['data'][0].lib_id).subscribe(
                {
                    next: (result : any)=>{
                        this.model = result['data'][0];
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                })
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

	delete(student : any){
        this.BooksDataService.Delete(this.model.lib_id).subscribe(
        {
            next: (result : any)=>{
                this.BooksDataService.Delete(result['data'][0].lib_id).subscribe()
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
				
				this.classifs = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getbooks();

		

	}

}
