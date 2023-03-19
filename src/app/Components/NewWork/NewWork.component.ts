import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { NewWorkDataService } from 'src/app/layout/services/NewWorkDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-NewWork',
	templateUrl: './NewWork.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewWorkComponent implements OnInit {
	public works : any[] = [];

	modalTitle = 'New Work';

	displayedColumns: string[] = ['Id', 'Name', 'Date', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		id:0,
		name:'',
		date:'',
	}


    constructor( private NewWorkDataService: NewWorkDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Work';
			
    }
	
	submitForm(){
		this.NewWorkDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getPhases();
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
            name:'',
            date:'',
		}
	}

	edit(work : any){
        this.NewWorkDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.works = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(work : any){
        this.NewWorkDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getLevels();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getLevels(){

		this.NewWorkDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.works = result['data'];
				this.dataSource = new MatTableDataSource(this.works);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getLevels();

		

	}

}
