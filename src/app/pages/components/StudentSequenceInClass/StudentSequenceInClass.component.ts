import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { StudentSequenceDataService } from 'src/app/layout/services/StudentSequenceDataService';

@Component({
	selector: 'kt-studentseq',
	templateUrl: './StudentSequenceInClass.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentSequenceComponent implements OnInit {
	public studentseq : any[] = [];

	model = {
		id:0,
		lev_name:'',
		class_name:'',
	}

	myModel: any = '';
    constructor( private StudentSequenceDataService: StudentSequenceDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.StudentSequenceDataService.Save(this.model).subscribe(
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
      class_name:'',
		 }
	}

	edit(){
        this.StudentSequenceDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.studentseq = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.StudentSequenceDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getstudentseq();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

    getstudentseq(){

		this.StudentSequenceDataService.Get().subscribe(
        {
			next: (result : any)=>{

				this.studentseq = result['data'];
	
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getstudentseq();

		

	}

}
