import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { LevelsDataService } from 'src/app/layout/services/LevelsDataService';

@Component({
	selector: 'kt-StudentsDistributionsByLevels',
	templateUrl: './StudentsDistributionsByLevels.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsDistributionsByLevelsComponent implements OnInit {

    public studentsNumber = 0;
    public classesNumber = 0;
	

    constructor( private LevelsDataService: LevelsDataService) {

		this.LevelsDataService.GetLevelsStat().subscribe({
            next: (result : any)=>{
                this.studentsNumber = result['data'][0].studentsNumber;
                this.classesNumber = result['data'][0].classesNumber;
            },
            error: (err)=>{
                console.log(err);
            }
        })
    }
	

	ngOnInit() {
		
	}

}
