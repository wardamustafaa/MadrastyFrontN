import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AbsenceStatDataService } from 'src/app/layout/services/AbsenceStatDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-absencestat',
	templateUrl: './AbscenceStatistics.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsenceStatComponent implements OnInit {
	public levels : any[] = [];
 

    modalTitle = 'New Absence'

	displayedColumns: string[] = ['absence_id', 'absence_lev','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		absence_id:0,
        absence_lev: '',
		absence_date:'',
		lev_name:''
	}

    constructor( private AbsenceStatDataService: AbsenceStatDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Absence'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.AbsenceStatDataService.Save(this.model).subscribe(
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
			absence_id:0,
			absence_lev: '',
			absence_date:'',
			lev_name:''
		 }
	}

	edit(absence : any){
        this.AbsenceStatDataService.GetById(this.model.absence_id).subscribe(
        {
            next: (result : any)=>{
				this.levels = result['data'][0];
                this.AbsenceStatDataService.GetById(result['data'][0].absence_id).subscribe(
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
        this.AbsenceStatDataService.Delete(this.model.absence_id).subscribe(
        {
            next: (result : any)=>{
                this.AbsenceStatDataService.Delete(result['data'][0].absence_id).subscribe()
				this.getAbsencestat();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getAbsencestat(){

		this.AbsenceStatDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.levels = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getAbsencestat();

		

	}

}