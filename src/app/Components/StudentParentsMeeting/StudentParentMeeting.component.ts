import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { StudentParentMeetingDataService } from 'src/app/layout/services/StudentParentMeetingDataService ';

@Component({
	selector: 'kt-StudentParentMeeting',
	templateUrl: './StudentParentMeeting.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentParentMeetingComponent implements OnInit {
	
	public meetings : any[] = [];

	model = {
		id:0,
		levelName:'',
        className: '',
        studentName: '',
		date: '',
        reasons: ''
	}

    constructor( private StudentParentMeetingDataService: StudentParentMeetingDataService) {
			
    }
	
	submitForm(){

        this.StudentParentMeetingDataService.Save(this.model).subscribe(
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
            className: '',
            studentName: '',
            date: '',
            reasons: ''
		}
	}

	getMeetings(){

		this.StudentParentMeetingDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.meetings = result['data'];
				
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	edit(){
        this.StudentParentMeetingDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.model = result['data'];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.StudentParentMeetingDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getMeetings();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	ngOnInit() {
		this.getMeetings();

	}

}
