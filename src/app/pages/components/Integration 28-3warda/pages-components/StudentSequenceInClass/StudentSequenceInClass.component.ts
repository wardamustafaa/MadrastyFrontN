import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StudentSequenceDataService } from 'src/app/layout/services/StudentSequenceDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-studentseq',
	templateUrl: './StudentSequenceInClass.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentSequenceComponent implements OnInit {
	public levels : any[] = [];
	classes : any[] = [];

    modalTitle = 'New Studentseq'

	displayedColumns: string[] = ['student_id', 'lev_name', 'class_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		student_id:0,
        lev_name: '',
		class_name:''

	}

    constructor( private StudentSequenceDataService: StudentSequenceDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Studentseq'; 
			
    }
	
	submitForm(){
	
		this.StudentSequenceDataService.Save(this.model).subscribe(
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
			student_id:0,
        lev_name: '',
		class_name:''
		 }
	}

	edit(studentseq : any){
        this.StudentSequenceDataService.GetById(this.model.student_id).subscribe(
        {
            next: (result : any)=>{
				this.levels = result['data'][0];
                this.StudentSequenceDataService.GetById(result['data'][0].student_id).subscribe(
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

	delete(studentseq : any){
        this.StudentSequenceDataService.Delete(this.model.student_id).subscribe(
        {
            next: (result : any)=>{
                this.StudentSequenceDataService.Delete(result['data'][0].student_id).subscribe()
				this.getstudentseq();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getstudentseq(){

		this.StudentSequenceDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.levels = result['data'];
				
			},
			error: (err)=>{
				
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getstudentseq();

		

	}

}
