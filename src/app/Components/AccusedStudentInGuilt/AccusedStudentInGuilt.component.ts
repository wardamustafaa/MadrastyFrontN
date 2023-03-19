import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AccusedStudentDataService } from 'src/app/layout/services/AccusedStudentDataService';

@Component({
	selector: 'kt-AccusedStudentInGuilt',
	templateUrl: './AccusedStudentInGuilt.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccusedStudentInGuiltComponent implements OnInit {
	public students : any[] = [];

	model = {
		id:0,
		levelName:'',
		className:'',
		studentName: '',
        dateOfFileOpening: '',
        slide: '',
        results: ''
	}


    constructor( private AccusedStudentDataService: AccusedStudentDataService) {
			
    }
	
	submitForm(){
		this.AccusedStudentDataService.Save(this.model).subscribe(
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
            levelName:'',
            className:'',
            studentName: '',
            dateOfFileOpening: '',
            slide: '',
            results: ''
		}
	}

	edit(){
        this.AccusedStudentDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.AccusedStudentDataService.Delete(this.model.id).subscribe(
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

		this.AccusedStudentDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.students = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStudents();

		

	}

}
