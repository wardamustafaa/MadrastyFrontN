import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BehavioralStatusDataService } from 'src/app/layout/services/BehavioralStatusDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-behavstatus',
	templateUrl: './BehavioralStatus.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BehavioralStatusComponent implements OnInit {
	public levels : any[] = [];
	classes : any[] = [];
	students : any[] = [];

    modalTitle = 'New Behavioral'

	displayedColumns: string[] = ['behave_stat_id', 'lev_name', 'class_name', 'behave_stat_rep', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		behave_stat_id:0,
        lev_id: 0,
		lev_name:'',
		class_id:0,
		class_name: '',
        student_id: 0,
        student_name: '',
        behave_date: '',
		behave_stat_rep: ''
	}

    constructor( private BehavioralStatusDataService: BehavioralStatusDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Behavioral'; 
			
    }
	
	submitForm(){
	
		this.BehavioralStatusDataService.Save(this.model).subscribe(
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
			behave_stat_id:0,
			lev_id: 0,
			lev_name:'',
			class_id:0,
			class_name: '',
			student_id: 0,
			student_name: '',
			behave_date: '',
			behave_stat_rep: ''
		 }
	}

	edit(behavioral : any){
        this.BehavioralStatusDataService.GetById(this.model.behave_stat_id).subscribe(
        {
            next: (result : any)=>{
				this.levels = result['data'][0];
                this.BehavioralStatusDataService.GetById(result['data'][0].behave_stat_id).subscribe(
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

	delete(behavioral : any){
        this.BehavioralStatusDataService.Delete(this.model.behave_stat_id).subscribe(
        {
            next: (result : any)=>{
                this.BehavioralStatusDataService.Delete(result['data'][0].behave_stat_id).subscribe()
				this.getbehavioral();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getbehavioral(){

		this.BehavioralStatusDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.levels = result['data'];
				
			},
			error: (err)=>{
			
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getbehavioral();

		

	}

}

