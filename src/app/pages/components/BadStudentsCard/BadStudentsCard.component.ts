import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BadStudentCardDataService } from 'src/app/layout/services/BadStudentCardDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-badstudent',
	templateUrl: './BadStudentsCard.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadStudentCardComponent implements OnInit {
	public subjects : any[] = [];
	levels : any[] = [];
	classes : any[] = [];
	students : any[] = [];

    modalTitle = 'New Student'

	displayedColumns: string[] = ['student_card_id', 'subject_name', 'student_name', 'bad_da3f', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		student_card_id:0,
        good_card_id: 0,
		bad_card_id:0,
		grade_id:0,
		garde_name: '',
        class_id: 0,
        class_name: '',
		lev_name:'',
        subject_id: 0,
		subject_name: '',
        student_id: 0,
        student_name: '',
        good_ebda3: '',
		good_tahfeez: '',
        good_result: '',
		bad_da3f: '',
        bad_da3f_reasons: '',
		bad_cure_ways: '',
        bad_result: '',
	}

    constructor( private BadStudentCardDataService: BadStudentCardDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Book'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.BadStudentCardDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getbooks();
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
			student_card_id:0,
			good_card_id: 0,
			bad_card_id:0,
			grade_id:0,
			garde_name: '',
			class_id: 0,
			class_name: '',
			lev_name:'',
			subject_id: 0,
			subject_name: '',
			student_id: 0,
			student_name: '',
			good_ebda3: '',
			good_tahfeez: '',
			good_result: '',
			bad_da3f: '',
			bad_da3f_reasons: '',
			bad_cure_ways: '',
			bad_result: '',
		 }
	}

	edit(student : any){
        this.BadStudentCardDataService.GetById(this.model.student_card_id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
                this.BadStudentCardDataService.GetById(result['data'][0].lib_id).subscribe(
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

	delete(student : any){
        this.BadStudentCardDataService.Delete(this.model.student_card_id).subscribe(
        {
            next: (result : any)=>{
                this.BadStudentCardDataService.Delete(result['data'][0].student_card_id).subscribe()
				this.getstudent();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getstudent(){

		this.BadStudentCardDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.students = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getstudent();

		

	}

}