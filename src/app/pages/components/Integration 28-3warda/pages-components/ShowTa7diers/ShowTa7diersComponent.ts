import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Ta7derStatusDataService } from 'src/app/layout/services/Ta7derStatusDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
  selector: 'kt-ShowTa7diersComponent',
  templateUrl: './ShowTa7diersComponent.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowTa7diersComponent implements OnInit {
	public departments : any[] = [];
  subjects : any[] = [];

    modalTitle = 'New Ta7der'

	displayedColumns: string[] = ['ta7dier_id', 'dep_name', 'subject_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		ta7dier_id:0,
    dep_name: '',
		subject_name:''

	}

    constructor( private Ta7derStatusDataService: Ta7derStatusDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Ta7der'; 
			
    }
	
	submitForm(){

		this.Ta7derStatusDataService.Save(this.model).subscribe(
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
      ta7dier_id:0,
      dep_name: '',
      subject_name:''
		 }
	}

	edit(ta7der : any){
        this.Ta7derStatusDataService.GetById(this.model.ta7dier_id).subscribe(
        {
            next: (result : any)=>{
				this.departments = result['data'][0];
                this.Ta7derStatusDataService.GetById(result['data'][0].ta7dier_id).subscribe(
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

	delete(ta7der : any){
        this.Ta7derStatusDataService.Delete(this.model.ta7dier_id).subscribe(
        {
            next: (result : any)=>{
                this.Ta7derStatusDataService.Delete(result['data'][0].ta7dier_id).subscribe()
				this.getta7der();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



    getta7der(){

		this.Ta7derStatusDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.departments = result['data'];
				
			},
			error: (err)=>{

				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getta7der();

		

	}

}