import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { StudentPermisionDataService } from 'src/app/layout/services/StudentPermisionDataService';

@Component({
	selector: 'kt-StudentPermission',
	templateUrl: './StudentPermission.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentPermissionComponent implements OnInit {
	
	public permissions : any[] = [];

	model = {
		id:0,
		levelName:'',
        className: '',
        studentName: '',
		date: '',
        leaveTime: 0,
        arriveTime: 0,

	}


    constructor( private StudentPermisionDataService: StudentPermisionDataService) {
			
    }
	
	submitForm(){

        this.StudentPermisionDataService.Save(this.model).subscribe(
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
			leaveTime: 0,
			arriveTime: 0,
		}
	}

	getPermissions(){

		this.StudentPermisionDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.permissions = result['data'];
				
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	edit(){
        this.StudentPermisionDataService.GetById(this.model.id).subscribe(
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
        this.StudentPermisionDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getPermissions();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	ngOnInit() {
		this.getPermissions();

	}

}
