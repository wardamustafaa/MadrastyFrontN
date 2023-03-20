import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { VisitTypesDataService } from 'src/app/layout/services/VisitTypesDataService';

@Component({
	selector: 'kt-VisitTypes',
	templateUrl: './VisitType.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VisitTypeComponent implements OnInit {
	public visitTypes : any[] = [];

	model = {
		id:0,
		name:'',
		date:'',
		phone: 0,
        startTime: 0,
        endTime: 0,
        nameLabel: '',
        topic:'',
        instructions: '',
        job:'',
        notes: '',
        department: '',
        VNote: '',
        VPic: '',

	}


    constructor( private VisitTypesDataService: VisitTypesDataService) {
			
       
    }
	
	submitForm(){

        this.VisitTypesDataService.Save(this.model).subscribe(
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
            name:'',
            date:'',
            phone: 0,
            startTime: 0,
            endTime: 0,
            nameLabel: '',
            topic:'',
            instructions: '',
            job:'',
            notes: '',
            department: '',
            VNote: '',
            VPic: '',
		}
	}

	getVisitTypes(){

		this.VisitTypesDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.visitTypes = result['data'];
				
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	edit(){
        this.VisitTypesDataService.GetById(this.model.id).subscribe(
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
        this.VisitTypesDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getVisitTypes();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	ngOnInit() {
		this.getVisitTypes();

	}

}
