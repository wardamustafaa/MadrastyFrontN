import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BorrowBookDataService } from 'src/app/layout/services/BorrowBookDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-borrowbook',
	templateUrl: './borrowbook.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BorrowBookComponent implements OnInit {
	public Employees : any[] = [];
 

    modalTitle = 'New Book'

	displayedColumns: string[] = ['borr_id', 'borr_date', 'borr_name','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		borr_id:0,
        borr_date: '',
		lib_book_name:'',
		borr_name:''

	}

    constructor( private BorrowBookDataService: BorrowBookDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Book'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.BorrowBookDataService.Save(this.model).subscribe(
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
			borr_id:0,
			borr_date: '',
			lib_book_name:'',
			borr_name:''
		 }
	}

	edit(book : any){
        this.BorrowBookDataService.GetById(this.model.borr_id).subscribe(
        {
            next: (result : any)=>{
				this.Employees = result['data'][0];
                this.BorrowBookDataService.GetById(result['data'][0].borr_id).subscribe(
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
        this.BorrowBookDataService.Delete(this.model.borr_id).subscribe(
        {
            next: (result : any)=>{
                this.BorrowBookDataService.Delete(result['data'][0].borr_id).subscribe()
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
				
				this.Employees = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getborrowbook();

		

	}

}
