import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DelayDataService } from 'src/app/layout/services/DelayDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-Delay',
	templateUrl: './Delay.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DelayComponent implements OnInit {
	public delays : any[] = [];
	public employees : any[]=[];

	modalTitle = 'New Delay'

	displayedColumns: string[] = ['Id', 'Date', 'EmployeeName', 'AttendanceTime', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		id:0,
		employeeName:'',
		date:'',
		time: 0,
	}


    constructor( private DelayDataService: DelayDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Delays'; 
			
    }
	
	submitForm(){
		this.DelayDataService.Save(this.model).subscribe(
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
            employeeName:'',
            date:'',
            time: 0,
		}
	}

	loadModel(id:number,openModal:boolean){
		this.delays.forEach((delay)=>{
		  if(delay.id == id){
			this.model = delay;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(id:number){
		this.delays.forEach((delay)=>{
		  if(delay.id == id){
			this.model = delay;
			alert(this.model.id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}

	edit(delay: any){
        this.DelayDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.delays = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(delay: any){
        this.DelayDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getDelays();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getDelays(){

		this.DelayDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.delays = result['data'];
				this.dataSource = new MatTableDataSource(this.delays);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getDelays();

		

	}

}
