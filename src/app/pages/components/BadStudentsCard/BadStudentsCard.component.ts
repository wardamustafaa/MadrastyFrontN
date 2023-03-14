import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { BadStudentCardDataService } from 'src/app/layout/services/BadStudentCardDataService';

@Component({
	selector: 'kt-badstudent',
	templateUrl: './BadStudentsCard.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class BadStudentCardComponent implements OnInit {
	public badstudent : any[] = [];

	model = {
		id:0,
		subject_name:'',
		lev_name:'',
		class_name: '',
		student_name:'',
		bad_da3f:'',
		bad_da3f_reasons:'',
		bad_cure_ways:'',
		bad_result:'',
	}

	myModel: any = '';
    constructor( private BadStudentCardDataService: BadStudentCardDataService) {
			
    }
	
	submitForm(){
		alert(this.model.subject_name);
		this.BadStudentCardDataService.Save(this.model).subscribe(
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
		subject_name:'',
		lev_name:'',
		class_name: '',
		student_name:'',
		bad_da3f:'',
		bad_da3f_reasons:'',
		bad_cure_ways:'',
		bad_result:'',
		 }
	}

	edit(){
        this.BadStudentCardDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.badstudent = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.BadStudentCardDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getbadstudent();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getbadstudent(){

		this.BadStudentCardDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.badstudent = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getbadstudent();

		

	}

}
