import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { WritingPrepDataService } from 'src/app/layout/services/WritingPrepDataService';

@Component({
	selector: 'kt-WritingPrep',
	templateUrl: './WritingPreparation.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class WritingPrepComponent implements OnInit {
	public writingprep : any[] = [];

	model = {
		id:0,
		subject_name:'',
		ta7dier_date:'',
		weeks: '',
		days:'',
		lev_name:'',
		ta7dier_name:'',
		data:'',

	}

	myModel: any = '';
    constructor( private WritingPrepDataService: WritingPrepDataService) {
			
    }
	
	submitForm(){
		alert(this.model.subject_name);
		this.WritingPrepDataService.Save(this.model).subscribe(
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
			subject_name:'',
			ta7dier_date:'',
			weeks: '',
			days:'',
			lev_name:'',
			ta7dier_name:'',
			data:'',
		 }
	}

	edit(){
        this.WritingPrepDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.writingprep = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.WritingPrepDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getwritingprep();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getwritingprep(){

		this.WritingPrepDataService.Get().subscribe(
        {
			next: (result : any)=>{
				//alert("reslt : " + result['data']);
				this.writingprep = result['data'];
				//alert("reslt : " + this.pahses[0].mr7la_id);
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getwritingprep();

		

	}

}
