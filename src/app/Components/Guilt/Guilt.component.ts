import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { GuiltDataServices } from 'src/app/layout/services/GuiltDataServices';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'kt-Guilt',
	templateUrl: './Guilt.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class GuiltComponent implements OnInit {
	public guilts : any[] = [];

	model = {
		id: 0,
		name: '',
		date: '',
		details: 0,
	}

	modalTitle = 'New Guilt'

	displayedColumns: string[] = ['Id', 'Name', 'Date','StudentName', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor( private GuiltDataServices: GuiltDataServices,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Guides';
			
    }
	
	submitForm(){
		this.GuiltDataServices.Save(this.model).subscribe(
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
			id: 0,
            name: '',
            date: '',
		    details: 0, 
		}
	}

	edit(guilt : any){
        this.GuiltDataServices.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.guilts = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(guilt : any){
        this.GuiltDataServices.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getGuilts();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	loadModel(id:number,openModal:boolean){
		this.guilts.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(id:number){
		this.guilts.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			alert(this.model.id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}


	getGuilts(){

		this.GuiltDataServices.Get().subscribe(
        {
			next: (result : any)=>{
				this.guilts = result['data'];
				this.dataSource = new MatTableDataSource(this.guilts);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getGuilts();

		

	}

}
