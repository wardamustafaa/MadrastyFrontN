import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { StudentTrackingDataService } from 'src/app/layout/services/StudentTrackingDataService';

@Component({
	selector: 'kt-studenttrack',
	templateUrl: './StudentTracking.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentTrackComponent implements OnInit {
	public studenttrack : any[] = [];

	model = {
		id:0,
		emp_subject_name:'',
		lev_name:'',
		class_name: '',
        year_data:'',
        date:'',
	}

	myModel: any = '';
    constructor( private StudentTrackingDataService: StudentTrackingDataService) {
			
    }
	
	submitForm(){
		alert(this.model.emp_subject_name);
		this.StudentTrackingDataService.Save(this.model).subscribe(
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
		emp_subject_name:'',
		lev_name:'',
		class_name: '',
        year_data:'',
        date:'',
		 }
	}

	edit(){
        this.StudentTrackingDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.studenttrack = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.StudentTrackingDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getstudenttrack();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getstudenttrack(){

		this.StudentTrackingDataService.Get().subscribe(
        {
			next: (result : any)=>{
			
				this.studenttrack = result['data'];
				
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getstudenttrack();

		

	}

}
