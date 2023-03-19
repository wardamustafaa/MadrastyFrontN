import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { IndividualCasesDataService } from 'src/app/layout/services/IndividualCasesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-IndividualCases',
	templateUrl: './IndividualCases.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndividualCasesComponent implements OnInit {
	public students : any[] = [];
	levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
    nationalities : any[] = [];
	sildes: any[] = [];

	modalTitle = 'Individual Cases';

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName','StudentName', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		id:0,
        caseType: '',
		levelName:'',
		className:'',
		studentName: '',
        dateOfFileOpening: '',
        slide: '',
        transferProcedures: '',
        results: ''
	}


    constructor( private IndividualCasesDataService: IndividualCasesDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Individual Cases'; 
			
    }
	
	submitForm(){
		this.IndividualCasesDataService.Save(this.model).subscribe(
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
            caseType: '',
            levelName:'',
            className:'',
            studentName: '',
            dateOfFileOpening: '',
            slide: '',
            transferProcedures: '',
            results: ''
		}
	}

	edit(student : any){
        this.IndividualCasesDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(student : any){
        this.IndividualCasesDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getStudents();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStudents(){

		this.IndividualCasesDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.students = result['data'];
				this.dataSource = new MatTableDataSource(this.students);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStudents();

		

	}

}
