import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { DepartmentDataService } from 'src/app/layout/services/DepartmentDataService';
import { MeetingTypeDataService } from 'src/app/layout/services/MeetingTypeDataService';

@Component({
	selector: 'kt-MeetingTypes',
	templateUrl: './MeetingType.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeetingComponent implements OnInit {
	public meetings : any[] = [];

	model = {
		id:0,
        meetingType:'',
		date:'',
		groupName:'',
		startTime: 0,
        endTime: 0,
        groupNumber: 0,
        groupMemberNo: 0,
        workPlan: '',
        recomm: '',
        departmentName: '',
        subject: '',
        absence: '',
        course: '',
        content: '',

	}

    
    deps: any[] = [];
    subjects: any[] = [];

    constructor(private DepartmentDataService:DepartmentDataService, 
        private MeetingTypeDataService : MeetingTypeDataService) {
			
        this.DepartmentDataService.Get().subscribe(data => this.deps = data);
		
    }
	
	submitForm(){
		
		this.MeetingTypeDataService.Save(this.model).subscribe(
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
            meetingType:'',
            date:'',
            groupName:'',
            startTime: 0,
            endTime: 0,
            groupNumber: 0,
            groupMemberNo: 0,
            workPlan: '',
            recomm: '',
            departmentName: '',
            subject: '',
            absence: '',
            course: '',
            content: '',
		}
	}

	getMeetings(){

		this.MeetingTypeDataService.Get().subscribe(
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
        this.MeetingTypeDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.meetings = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.MeetingTypeDataService.Delete(this.model.id).subscribe(
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
