import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ViolationRecordDataService } from 'src/app/layout/services/ViolationRecordDataService';

@Component({
	selector: 'kt-violationrecord',
	templateUrl: './ViolationRecord.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class ViolationRecordComponent implements OnInit {
	public violationrecord : any[] = [];

	model = {
		id:0,
		lev_name:'',
		class_name:'',
		student_name: '',
        viol_date:'',
        viols:'',
        viols_proced:'',
        
	}

	myModel: any = '';
    constructor( private ViolationRecordDataService: ViolationRecordDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.ViolationRecordDataService.Save(this.model).subscribe(
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
            student_name: '',
            viol_date:'',
            viols:'',
            viols_proced:'',
		 }
	}

	edit(){
        this.ViolationRecordDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.violationrecord = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.ViolationRecordDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getviolationrecord();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getviolationrecord(){

		this.ViolationRecordDataService.Get().subscribe(
        {
			next: (result : any)=>{
		
				this.violationrecord = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getviolationrecord();

		

	}

}
