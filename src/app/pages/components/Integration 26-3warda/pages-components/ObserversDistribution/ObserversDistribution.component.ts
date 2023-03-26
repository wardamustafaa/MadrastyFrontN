import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ObserversDataService } from 'src/app/layout/services/ObserversDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-observers',
	templateUrl: './ObserversDistribution.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObserversDistributionComponent implements OnInit {
	public periods : any[] = [];
	levels : any[] = [];
	classes : any[] = [];
	emps : any[] = [];

    modalTitle = 'New Observ'

	displayedColumns: string[] = ['observer_id', 'lev_name', 'class_name', 'emp_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		observer_id:0,
        observ_ftra: '',
		lev_id:0,
		lev_name:'',
		class_id: 0,
        class_name: '',
        emp_id: 0,
		emp_name:'',
        observ_loc: '',
		observe_date: ''
    
	}

    constructor( private ObserversDataService: ObserversDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Observ'; 
			
    }
	
	submitForm(){
	
		this.ObserversDataService.Save(this.model).subscribe(
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
			observer_id:0,
        observ_ftra: '',
		lev_id:0,
		lev_name:'',
		class_id: 0,
        class_name: '',
        emp_id: 0,
		emp_name:'',
        observ_loc: '',
		observe_date: ''
		 }
	}

	edit(observer : any){
        this.ObserversDataService.GetById(this.model.observer_id).subscribe(
        {
            next: (result : any)=>{
				this.emps = result['data'][0];
                this.ObserversDataService.GetById(result['data'][0].observer_id).subscribe(
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

	delete(observer : any){
        this.ObserversDataService.Delete(this.model.observer_id).subscribe(
        {
            next: (result : any)=>{
                this.ObserversDataService.Delete(result['data'][0].observer_id).subscribe()
				this.getobservers();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getobservers(){

		this.ObserversDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.emps = result['data'];
				
			},
			error: (err)=>{
				
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getobservers();

		

	}

}