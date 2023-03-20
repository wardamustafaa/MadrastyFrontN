import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ExcellentStudentsDataService } from 'src/app/layout/services/ExcellentStudentsDataService';
import { StudentDataService } from 'src/app/layout/services/StudentDataService';

@Component({
	selector: 'kt-ChangeBranch',
	templateUrl: './ChangeBranch.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeBranchComponent implements OnInit {

	model = {
		id:0,
        branch: '',
	}


    constructor( private StudentDataService: StudentDataService) {
			
    }
	
	submitForm(){
		this.StudentDataService.UpdateStudentBranch(this.model).subscribe(
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
            branch: '',
		}
	}

	ngOnInit() {

		

	}

}
