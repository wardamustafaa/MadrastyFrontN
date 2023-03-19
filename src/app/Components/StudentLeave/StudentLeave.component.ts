import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { StudentLeaveDataService } from 'src/app/layout/services/StudentLeaveDataService';

@Component({
	selector: 'kt-StudentTransfer',
	templateUrl: './StudentTransfer.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentTransferComponent implements OnInit {
	public students : any[] = [];

	model = {
		id:0,
		levelName:'',
		className:'',
		studentName: '',
        civilNo: '',
        branch: '',
        reasonName: '',
        date: ''
	}

    constructor( private StudentLeaveDataService: StudentLeaveDataService) {
			
    }
	
	submitForm(){
		this.StudentLeaveDataService.Save(this.model).subscribe(
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
            levelName:'',
            className:'',
            studentName: '',
            civilNo: '',
            branch: '',
            reasonName: '',
            date: ''
		}
	}

	
	edit(){
        this.StudentLeaveDataService.GetById(this.model.id).subscribe(
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
        this.StudentLeaveDataService.Delete(this.model.id).subscribe(
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

		this.StudentLeaveDataService.Get().subscribe(
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
