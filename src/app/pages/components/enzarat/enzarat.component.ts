import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { EnzaratDataService } from 'src/app/layout/services/EnzaratDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-enzarat',
	templateUrl: './Enzarat.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnzaratComponent implements OnInit {
	public students : any[] = [];
	classes : any[] = [];
	alert_types : any[] = [];
	levels : any[] = [];

    modalTitle = 'New Enzarat'

	displayedColumns: string[] = ['ser', 'alert_type','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		ser:0,
        level_id: 0,
		lev_name:'',
		class_id:0,
		alert_type:'',
		student_id:0,
        is_sent: 0,
		student_name:'',
		class_name:''

	}

    constructor( private EnzaratDataService: EnzaratDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Book'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.EnzaratDataService.Save(this.model).subscribe(
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
			ser:0,
			level_id: 0,
			lev_name:'',
			class_id:0,
			alert_type:'',
			student_id:0,
			is_sent: 0,
			student_name:'',
			class_name:''
		 }
	}

	edit(enzarat : any){
        this.EnzaratDataService.GetById(this.model.ser).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
                this.EnzaratDataService.GetById(result['data'][0].ser).subscribe(
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

	delete(enzarat : any){
        this.EnzaratDataService.Delete(this.model.ser).subscribe(
        {
            next: (result : any)=>{
                this.EnzaratDataService.Delete(result['data'][0].ser).subscribe()
				this.getenzarat();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getenzarat(){

		this.EnzaratDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.students = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getenzarat();

		

	}

}
