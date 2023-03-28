import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StrategicPlanTeamDataService } from 'src/app/layout/services/StrategicPlanTeamDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-strategicplan',
	templateUrl: './StrategicPlanTeam.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrategicPLanComponent implements OnInit {
	public teamstypes : any[] = [];
	departments : any[] = [];
	Employees: any[]=[];

    modalTitle = 'New Plan'

	displayedColumns: string[] = ['id', 'name', 'goals','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		id:0,
        type_id: 0,
		type_name:'',
		name:'',
		goals: '',
        emp_name: '',
        emp_id: 0,
        dep_id: 0,
		dep_name:''

	}

    constructor( private StrategicPlanTeamDataService: StrategicPlanTeamDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Plan'; 
			
    }
	
	submitForm(){
		
		this.StrategicPlanTeamDataService.Save(this.model).subscribe(
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
        type_id: 0,
		type_name:'',
		name:'',
		goals: '',
        emp_name: '',
        emp_id: 0,
        dep_id: 0,
		dep_name:''
		 }
	}

	edit(plan : any){
        this.StrategicPlanTeamDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.teamstypes = result['data'][0];
                this.StrategicPlanTeamDataService.GetById(result['data'][0].id).subscribe(
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

	delete(plan : any){
        this.StrategicPlanTeamDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
                this.StrategicPlanTeamDataService.Delete(result['data'][0].id).subscribe()
				this.getpalns();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getpalns(){

		this.StrategicPlanTeamDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.teamstypes = result['data'];
				
			},
			error: (err)=>{
				
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getpalns();

		

	}

}
