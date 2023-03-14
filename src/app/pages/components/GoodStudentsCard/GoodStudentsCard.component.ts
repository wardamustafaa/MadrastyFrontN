import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { GoodStudentCardDataService } from 'src/app/layout/services/GoodStudentCardDataService';

@Component({
	selector: 'kt-goodstudent',
	templateUrl: './GoodStudentsCard.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class GoodStudentCardComponent implements OnInit {
	public goodstudent : any[] = [];

	model = {
		id:0,
		subject_name:'',
		lev_name:'',
		class_name: '',
		student_name:'',
		good_ebda3:'',
		good_tahfeez:'',
		good_result:'',

	}

	myModel: any = '';
    constructor( private GoodStudentCardDataService: GoodStudentCardDataService) {
			
    }
	
	submitForm(){
		alert(this.model.subject_name);
		this.GoodStudentCardDataService.Save(this.model).subscribe(
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
		good_ebda3:'',
		good_tahfeez:'',
		good_result:'',
		 }
	}

	edit(){
        this.GoodStudentCardDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.goodstudent = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.GoodStudentCardDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getgoodstudent();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getgoodstudent(){

		this.GoodStudentCardDataService.Get().subscribe(
        {
			next: (result : any)=>{
	
				this.goodstudent = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getgoodstudent();

		

	}

}
