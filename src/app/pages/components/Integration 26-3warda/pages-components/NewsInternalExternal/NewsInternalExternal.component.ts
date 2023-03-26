import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NewsInternalExternalDataService } from 'src/app/layout/services/NewsInternalExternalDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-newsinex',
	templateUrl: './NewsInternalExternal.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsInternalExternalComponent implements OnInit {
	public Employees1 : any[] = [];
	Departments : any[] = [];
	Employees : any[] = [];


    modalTitle = 'New News'

	displayedColumns: string[] = ['nchra_id', 'nchra_sender', 'nchra_topic', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		nchra_id:0,
        nchra_date: '',
		nchra_sender:'',
		nchra_topic:'',
		nchra_text: '',
        nchra_pages_num: '',
        nchra_attach: '',
		nachra_file_type:'',
        is_file: '',
		is_dep: '',
		emp_name:'',
		dep_name:''
	}

    constructor( private NewsInternalExternalDataService: NewsInternalExternalDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New News'; 
			
    }
	
	submitForm(){
	
		this.NewsInternalExternalDataService.Save(this.model).subscribe(
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
			nchra_id:0,
        nchra_date: '',
		nchra_sender:'',
		nchra_topic:'',
		nchra_text: '',
        nchra_pages_num: '',
        nchra_attach: '',
		nachra_file_type:'',
        is_file: '',
		is_dep: '',
		emp_name:'',
		dep_name:''
	
		 }
	}

	edit(news : any){
        this.NewsInternalExternalDataService.GetById(this.model.nchra_id).subscribe(
        {
            next: (result : any)=>{
				this.Departments = result['data'][0];
                this.NewsInternalExternalDataService.GetById(result['data'][0].nchra_id).subscribe(
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

	delete(news : any){
        this.NewsInternalExternalDataService.Delete(this.model.nchra_id).subscribe(
        {
            next: (result : any)=>{
                this.NewsInternalExternalDataService.Delete(result['data'][0].nchra_id).subscribe()
				this.getnews();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getnews(){

		this.NewsInternalExternalDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.Departments = result['data'];
				
			},
			error: (err)=>{
				
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getnews();

		

	}

}