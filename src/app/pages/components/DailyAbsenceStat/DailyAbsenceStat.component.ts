import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { DailyAbsenceStatDataService } from 'src/app/layout/services/DailyAbsenceStatDataService';

@Component({
	selector: 'kt-absencestat',
	templateUrl: './DailyAbsenceStat.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class AbsenceStatComponent implements OnInit {
	public absencestat : any[] = [];

	model = {
		id:0,
		lev_name:'',
		branch_name:'',
		total_num: '',
        absence_num:'',
        attendance_num:'',
        stu_att_score:'',
        teach_total_num:'',
        teach_absence:'',
        teach_attend:'',
        teach_att_score:'',

	}

	myModel: any = '';
    constructor( private DailyAbsenceStatDataService: DailyAbsenceStatDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.DailyAbsenceStatDataService.Save(this.model).subscribe(
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
		branch_name:'',
		total_num: '',
        absence_num:'',
        attendance_num:'',
        stu_att_score:'',
        teach_total_num:'',
        teach_absence:'',
        teach_attend:'',
        teach_att_score:'',
		 }
	}

	edit(){
        this.DailyAbsenceStatDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.absencestat = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.DailyAbsenceStatDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getabsencestat();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getabsencestat(){

		this.DailyAbsenceStatDataService.Get().subscribe(
        {
			next: (result : any)=>{
			
				this.getabsencestat = result['data'];
				
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getabsencestat();

		

	}

}
