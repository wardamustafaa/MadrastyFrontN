import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TestsMetricDataService } from 'src/app/layout/services/TestMetricDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-TestMetric',
	templateUrl: './TestMetric.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class TestMetricComponent implements OnInit {
	public tests : any[] = [];

	displayedColumns: string[] = ['Id','Type', 'Date', 'StudentsNo', 'actions'];

	modalTitle = 'Test Metric ';

	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


	model = {
		id: 0,
		type: '',
		date: '',
		studentsNo: 0,
	}


    constructor( private TestsMetricDataService: TestsMetricDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Test Metric ';
			
    }
	
	submitForm(){
		this.TestsMetricDataService.Save(this.model).subscribe(
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
            type: '',
            date: '',
            studentsNo: 0,
		}
	}

	edit(test : any){
        this.TestsMetricDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.tests = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(test : any){
        this.TestsMetricDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getTests();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getTests(){

		this.TestsMetricDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.tests = result['data'];
				this.dataSource = new MatTableDataSource(this.tests);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getTests();

		

	}

}
