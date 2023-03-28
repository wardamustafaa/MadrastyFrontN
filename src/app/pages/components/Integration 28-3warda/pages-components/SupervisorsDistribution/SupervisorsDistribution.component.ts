import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SupervisorDistributionDataService } from 'src/app/layout/services/SupervisorDistributionDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-supervisordis',
	templateUrl: './SupervisorsDistribution.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupervisordisComponent implements OnInit {
	public corrs : any[] = [];
	depts : any[] = [];
	emps : any[] = [];

    modalTitle = 'New Supervisor'

	displayedColumns: string[] = ['supervision_id', 'corridor_name', 'dep_name', 'emp_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		supervision_id:0,
        corridor_id: '',
		basic_emp_id:'',
		basic_emp_name:'',
		spare_emp_id: '',
        spare_emp_name: '',
        from_date: '',
        to_date: '',
		emp_name: '',
        emp_id: 0,
        dep_name: '',
        dep_id: 0,
		corridor_name: ''

	}

    constructor( private SupervisorDistributionDataService: SupervisorDistributionDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Supervisor'; 
			
    }
	
	submitForm(){
		
		this.SupervisorDistributionDataService.Save(this.model).subscribe(
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
			supervision_id:0,
			corridor_id: '',
			basic_emp_id:'',
			basic_emp_name:'',
			spare_emp_id: '',
			spare_emp_name: '',
			from_date: '',
			to_date: '',
			emp_name: '',
			emp_id: 0,
			dep_name: '',
			dep_id: 0,
			corridor_name: ''
		 }
	}

	edit(supervisor : any){
        this.SupervisorDistributionDataService.GetById(this.model.supervision_id).subscribe(
        {
            next: (result : any)=>{
				this.corrs = result['data'][0];
                this.SupervisorDistributionDataService.GetById(result['data'][0].supervision_id).subscribe(
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

	delete(supervisor : any){
        this.SupervisorDistributionDataService.Delete(this.model.supervision_id).subscribe(
        {
            next: (result : any)=>{
                this.SupervisorDistributionDataService.Delete(result['data'][0].supervision_id).subscribe()
				this.getsupervisordis();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getsupervisordis(){

		this.SupervisorDistributionDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.corrs = result['data'];
				
			},
			error: (err)=>{
		
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getsupervisordis();

		

	}

}
