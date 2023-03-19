import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { AchievementLevelDataService } from 'src/app/layout/services/AchievementLevelDataService';

@Component({
	selector: 'kt-StudentsDistributionByAchivements',
	templateUrl: './StudentDistributionByAchievements.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsDistributionByAchivementsComponent implements OnInit {
	
	public students : any[] = [];

	model = {
		id:0,
		levelName:'',
        FirstTermFails: 0,
        SecondTermFails: 0,
		AcademicFailure: 0,
        AcademicExcellence: 0,
	}


    constructor( private AchievementLevelDataService: AchievementLevelDataService) {
			
    }
	
	submitForm(){

        this.AchievementLevelDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
				this.getStudents();
			  },
			  error: (err)=>{
				console.log(err);
			  }
			}
		  )
	}

	

	getStudents(){

		this.AchievementLevelDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.students = result['data'];
				
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	
	ngOnInit() {
		this.getStudents();

	}

}
