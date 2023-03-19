import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StatusDataService } from 'src/app/layout/services/StatusDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-Status',
	templateUrl: './Status.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusComponent implements OnInit {
	public status : any[] = [];

	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
	statusTypes :any[] = [];
	
	modalTitle = 'Status ';

	displayedColumns: string[] = ['Id','StatusName', 'LevelName', 'ClassName','StudentName', 'actions'];

	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		id:0,
        StatusType: '',
        caseType: '',
		levelName:'',
		className:'',
		studentName: '',
        StatusConcerns: '',
        Notes: '',
	}


    constructor( private StatusDataService: StatusDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Status ';
			
    }
	
	submitForm(){
		this.StatusDataService.Save(this.model).subscribe(
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
            StatusType: '',
            caseType: '',
            levelName:'',
            className:'',
            studentName: '',
            StatusConcerns: '',
            Notes: '',
		}
	}

	edit(student : any){
        this.StatusDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.model = result['data'][0];
               
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(student : any){
        this.StatusDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getStatus();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStatus(){

		this.StatusDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.status = result['data'];
				this.dataSource = new MatTableDataSource(this.status);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStatus();

		

	}

}
