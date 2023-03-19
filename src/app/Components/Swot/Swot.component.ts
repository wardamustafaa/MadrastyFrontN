import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SwotDataService } from 'src/app/layout/services/SwotDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-Swot',
	templateUrl: './Swot.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwotComponent implements OnInit {
	public swots : any[] = [];
	public deps: any[] = [];

	modalTitle = 'New Swot'

	displayedColumns: string[] = ['ser', 'dep_name', 'strength', 'weakness','actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id:0,
		name:'',
        departmentName: '',
        departmentId: 0,
		strength: '',
        chances: '',
        risks: '',

	}


    constructor( private SwotDataService: SwotDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Swots'; 
			
       
    }
	
	submitForm(){

        this.SwotDataService.Save(this.model).subscribe(
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
            departmentName: '',
            departmentId: 0,
            strength: '',
            chances: '',
            risks: '',
		}
	}

	getSwots(){

		this.SwotDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.swots = result['data'];
				this.dataSource = new MatTableDataSource(this.swots);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	edit(swot : any){
        this.SwotDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.model = result['data'];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

	loadModel(id:number,openModal:boolean){
		this.swots.forEach((swot)=>{
		if(swot.id == id){
			this.model = swot;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(id:number){
		this.swots.forEach((swot)=>{
		if(swot.id == id){
			this.model = swot;
			alert(this.model.id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}

    delete(swot : any){
        this.SwotDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getSwots();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	ngOnInit() {
		this.getSwots();

	}

}
