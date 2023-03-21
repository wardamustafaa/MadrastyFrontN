import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AbsencePermDataService } from 'src/app/layout/services/AbsencePermDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-absenceperm',
	templateUrl: './AbsenceAndPermissions.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AbsencePermissionsComponent implements OnInit {
	public emp : any[] = [];
 

    modalTitle = 'New Prem'

	displayedColumns: string[] = ['emp', 'civil_id', 'file_id', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		ezn_id:0,
		emp:'',
        civil_id: '',
		file_id:''
	}

    constructor( private AbsencePermDataService: AbsencePermDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Book'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.AbsencePermDataService.Save(this.model).subscribe(
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
			ezn_id:0,
			emp:'',
			civil_id: '',
			file_id:''
		 }
	}

	edit(permission : any){
        this.AbsencePermDataService.GetById(this.model.ezn_id).subscribe(
        {
            next: (result : any)=>{
				this.emp = result['data'][0];
                this.AbsencePermDataService.GetById(result['data'][0].ezn_id).subscribe(
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

	delete(permission : any){
        this.AbsencePermDataService.Delete(this.model.ezn_id).subscribe(
        {
            next: (result : any)=>{
                this.AbsencePermDataService.Delete(result['data'][0].ezn_id).subscribe()
				this.getabsenceperm();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getabsenceperm(){

		this.AbsencePermDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.emp = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getabsenceperm();

		

	}

}