import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FinancialFundDataService } from 'src/app/layout/services/FinancialFundDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-financialfund',
	templateUrl: './FinancialFundExpenses.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialFundComponent implements OnInit {
	public financialfund : any[] = [];
 

    modalTitle = 'New Financial'

	displayedColumns: string[] = ['id', 'type_name', 'price', 'date', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		id:0,
        type_name: '',
		date:'',
		price:'',
		notes: '',
	}

    constructor( private FinancialFundDataService: FinancialFundDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Book'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.FinancialFundDataService.Save(this.model).subscribe(
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
			id:0,
			type_name: '',
			date:'',
			price:'',
			notes: '',
		 }
	}

	edit(financialfund : any){
        this.FinancialFundDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.financialfund = result['data'][0];
                this.FinancialFundDataService.GetById(result['data'][0].id).subscribe(
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

	delete(financialfund : any){
        this.FinancialFundDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
                this.FinancialFundDataService.Delete(result['data'][0].id).subscribe()
				this.getfinancialfund();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getfinancialfund(){

		this.FinancialFundDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.financialfund = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getfinancialfund();

		

	}

}