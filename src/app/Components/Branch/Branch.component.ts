import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ExcellentStudentsDataService } from 'src/app/layout/services/ExcellentStudentsDataService';
import { StudentDataService } from 'src/app/layout/services/StudentDataService';

@Component({
	selector: 'kt-Branch',
	templateUrl: './Branch.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchComponent implements OnInit {
	public branches : any[] = [];

    constructor( private StudentDataService: StudentDataService) {
			
    }


	getBranches(){

		this.StudentDataService.GetBranchStatistics().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.branches = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getBranches();

		

	}

}
