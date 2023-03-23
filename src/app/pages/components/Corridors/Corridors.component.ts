import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CorridorDataService } from 'src/app/layout/services/CorridorDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-corridor',
	templateUrl: './Corridors.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorridorComponent implements OnInit {
	
	public corridor : any[] = [];

    modalTitle = 'New Corridor'

	displayedColumns: string[] = ['corridor_id', 'corridor_name', 'corridor_desc','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		corridor_id:0,
        corridor_name: '',
		corridor_desc:''

	}

    constructor( private CorridorDataService: CorridorDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Corridor'; 
			
    }
	
	submitForm(){
	
		this.CorridorDataService.Save(this.model).subscribe(
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
			corridor_id:0,
			corridor_name: '',
			corridor_desc:''
		 }
	}

	edit(corridor : any){
        this.CorridorDataService.GetById(this.model.corridor_id).subscribe(
        {
            next: (result : any)=>{
				this.corridor = result['data'][0];
                this.CorridorDataService.GetById(result['data'][0].corridor_id).subscribe(
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

	delete(corridor : any){
        this.CorridorDataService.Delete(this.model.corridor_id).subscribe(
        {
            next: (result : any)=>{
                this.CorridorDataService.Delete(result['data'][0].corridor_id).subscribe()
				this.getcorridor();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getcorridor(){

		this.CorridorDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.corridor = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getcorridor();

		

	}

}