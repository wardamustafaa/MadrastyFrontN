import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DepManagerVisitDataService } from 'src/app/layout/services/DepManagerVisitDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-managervisit',
	templateUrl: './DepManagerVisit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ManagerVisitComponent implements OnInit {
	public managervisit : any[] = [];
 

    modalTitle = 'New Managervisit'

	displayedColumns: string[] = ['id', 'date','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		id:0,
        date: '',
		notes:''
	}

    constructor( private DepManagerVisitDataService: DepManagerVisitDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New managervisit'; 
			
    }
	
	submitForm(){
	
		this.DepManagerVisitDataService.Save(this.model).subscribe(
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
			date: '',
			notes:''
		 }
	}

	edit(managervisit : any){
        this.DepManagerVisitDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.managervisit = result['data'][0];
                this.DepManagerVisitDataService.GetById(result['data'][0].id).subscribe(
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

	delete(managervisit : any){
        this.DepManagerVisitDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
                this.DepManagerVisitDataService.Delete(result['data'][0].id).subscribe()
				this.getmanagervisit();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getmanagervisit(){

		this.DepManagerVisitDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.managervisit = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getmanagervisit();

		

	}

}