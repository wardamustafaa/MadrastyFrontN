import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { StudentDistributionDataService } from 'src/app/layout/services/StudentDistributionDataService';

@Component({
	selector: 'kt-studentdistribution',
	templateUrl: './StudentDistribution.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentDistributionComponent implements OnInit {
	public studentdistribution : any[] = [];

	model = {
		id:0,
		lev_name:'',


	}

	myModel: any = '';
    constructor( private StudentDistributionDataService: StudentDistributionDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.StudentDistributionDataService.Save(this.model).subscribe(
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
		lev_name:'',
		 }
	}

	edit(){
        this.StudentDistributionDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.studentdistribution = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.StudentDistributionDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getstudentdis();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getstudentdis(){

		this.StudentDistributionDataService.Get().subscribe(
        {
			next: (result : any)=>{

				this.studentdistribution = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getstudentdis();

		

	}

}
