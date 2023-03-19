import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ClassesDataService } from 'src/app/layout/services/ClassesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-Classes',
	templateUrl: './Class.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassComponent implements OnInit {
	public classes : any[] = [];
	levels : any[] = [];
	phases : any[] = [];
	corrs : any[] = [];

	modalTitle = 'New Class'

	displayedColumns: string[] = ['Id', 'class_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		class_id:0,
		class_name:'',
		phase_name : '',
        level_name: '',
		corr_name: '',
	}

    constructor(private ClassDataService: ClassesDataService) {	
        
    }
	
	submitForm(){
		
		this.ClassDataService.Save(this.model).subscribe(
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
			class_id:0,
            class_name:'',
            phase_name : '',
            level_name: '',
            corr_name: '',
		}
	}

	getClasses(){

		this.ClassDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.classes = result['data'];
				this.dataSource = new MatTableDataSource(this.classes);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	edit(cls : any){
        this.ClassDataService.GetById(this.model.class_id).subscribe(
        {
            next: (result : any)=>{
				this.classes = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(cls : any){
        this.ClassDataService.Delete(this.model.class_id).subscribe(
        {
            next: (result : any)=>{
				this.getClasses();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }


	ngOnInit() {
		this.getClasses();

	}

}
