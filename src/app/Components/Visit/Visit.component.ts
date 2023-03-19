import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { VisitDataService } from 'src/app/layout/services/VisitDataService';


@Component({
	selector: 'kt-Visit',
	templateUrl: './Visit.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisitComponent implements OnInit {
	public visits : any[] = [];

	model = {
		id:0,
		date:'',
		job:'',
		percentage: '',
        topic: ''
	}


    constructor( private VisitDataService: VisitDataService) {
			
    }
	
	submitForm(){
		this.VisitDataService.Save(this.model).subscribe(
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
            date:'',
            job:'',
            percentage: '',
            topic: ''
		}
	}

	edit(){
        this.VisitDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.visits = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.VisitDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getVisits();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getVisits(){

		this.VisitDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.visits = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getVisits();

		

	}

}
