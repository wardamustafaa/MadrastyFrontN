import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SupervisorOpinionDataService } from 'src/app/layout/services/SupervisorOpinionDataService';


@Component({
	selector: 'kt-SupervisorOpinion',
	templateUrl: './SupervisorOpinion.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupervisorOpinionComponent implements OnInit {
	public opinions : any[] = [];

	model = {
		id:0,
		levelName:'',
		className:'',
		studentName: '',
        departmentName: '',
        date: '',
        report: '',
        dep_man_opinion: ''
	}


    constructor( private SupervisorOpinionDataService: SupervisorOpinionDataService) {
			
    }
	
	submitForm(){
		this.SupervisorOpinionDataService.Save(this.model).subscribe(
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
            className:'',
            studentName: '',
            departmentName: '',
            date: '',
            report: '',
            dep_man_opinion: ''
		}
	}

	edit(){
        this.SupervisorOpinionDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.opinions = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.SupervisorOpinionDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getOpinions();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getOpinions(){

		this.SupervisorOpinionDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.opinions = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getOpinions();

		

	}

}
