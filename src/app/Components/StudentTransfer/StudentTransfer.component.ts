import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SpeakingDisorderDataService } from 'src/app/layout/services/SpeakingDisorderDataService';
import { StudentTransferDataService } from 'src/app/layout/services/StudentTransferDataService';

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
        educationRegion: '',
        school: '',
        newBranch: 0,
        date: ''
	}

    constructor( private StudentTransferDataService: StudentTransferDataService) {
			
    }
	
	submitForm(){
		this.StudentTransferDataService.Save(this.model).subscribe(
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
            educationRegion: '',
            school: '',
            newBranch: 0,
            date: ''
		}
	}

	
	edit(){
        this.StudentTransferDataService.GetById(this.model.id).subscribe(
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
        this.StudentTransferDataService.Delete(this.model.id).subscribe(
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

		this.StudentTransferDataService.Get().subscribe(
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
