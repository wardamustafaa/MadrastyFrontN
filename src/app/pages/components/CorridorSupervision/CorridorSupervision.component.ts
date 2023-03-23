import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CorridorSupervisionDataService } from 'src/app/layout/services/CorridorSupervisionDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-corrsupervision',
	templateUrl: './CorridorSupervision.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorrSupervisionComponent implements OnInit {
	public corrsuper : any[] = [];
 

    modalTitle = 'New Corrsuper'

	displayedColumns: string[] = ['supervision_id', 'corr_meet_time', 'corr_meet_loc','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		supervision_id:0,
        corr_meet_time: '',
		corr_meet_loc:'',
		corr_meet_date:''
	}

    constructor( private CorridorSupervisionDataService: CorridorSupervisionDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Corrsuper'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.CorridorSupervisionDataService.Save(this.model).subscribe(
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
			supervision_id:0,
			corr_meet_time: '',
			corr_meet_loc:'',
			corr_meet_date:''
		 }
	}

	edit(corrsuper : any){
        this.CorridorSupervisionDataService.GetById(this.model.supervision_id).subscribe(
        {
            next: (result : any)=>{
				this.corrsuper = result['data'][0];
                this.CorridorSupervisionDataService.GetById(result['data'][0].supervision_id).subscribe(
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

	delete(corrsuper : any){
        this.CorridorSupervisionDataService.Delete(this.model.supervision_id).subscribe(
        {
            next: (result : any)=>{
                this.CorridorSupervisionDataService.Delete(result['data'][0].supervision_id).subscribe()
				this.getcorrsupervision();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getcorrsupervision(){

		this.CorridorSupervisionDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.corrsuper = result['data'];
				
			},
			error: (err)=>{
				
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getcorrsupervision();

		

	}

}