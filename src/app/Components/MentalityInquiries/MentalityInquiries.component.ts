import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MentalityInquiriesDataService } from 'src/app/layout/services/MentalityInquiriesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-MentalityInquires',
	templateUrl: './MentalityInquiries.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class MentalityInquiresComponent implements OnInit {
	public inquiries : any[] = [];

	modalTitle = 'Menatlity Inquiries';

	displayedColumns: string[] = ['Id', 'ProblemType', 'Answer','Notes', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id:0,
		problemType:'',
		answer:'',
		notes: '',
	}


    constructor( private MentalityInquiriesDataService: MentalityInquiriesDataService) {
			
    }
	
	submitForm(){
		this.MentalityInquiriesDataService.Save(this.model).subscribe(
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
			id:0,
            problemType:'',
            answer:'',
            notes: '',
		}
	}

	edit(inquery : any){
        this.MentalityInquiriesDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.inquiries = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(inquery : any){
        this.MentalityInquiriesDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getInquiries();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getInquiries(){

		this.MentalityInquiriesDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.inquiries = result['data'];
				this.dataSource = new MatTableDataSource(this.inquiries);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getInquiries();

		

	}

}
