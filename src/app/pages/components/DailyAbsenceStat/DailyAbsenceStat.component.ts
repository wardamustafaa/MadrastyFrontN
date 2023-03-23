import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DailyAbsenceStatDataService } from 'src/app/layout/services/DailyAbsenceStatDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-dailyabsencestat',
	templateUrl: './DailyAbsenceStat.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailyAbsenceStatComponent implements OnInit {
	public Levels : any[] = [];
	branch : any[] = [];


    modalTitle = 'New Absencestat'

	displayedColumns: string[] = ['absence_stat_id', 'lev_name', 'absence_num', 'stu_att_score', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		absence_stat_id:0,
        lev_id: 0,
		lev_name:'',
		tch3eb:'',
		total_num: '',
        attendance_num: '',
        absence_num: '',
        stu_att_score: '',
		teach_total_num: '',
        teach_attend: '',
        teach_absence: '',
        teach_att_score: '',
		tch3eb_id: ''
	}

    constructor( private DailyAbsenceStatDataService: DailyAbsenceStatDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Absencestat'; 
			
    }
	
	submitForm(){
		
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
			absence_stat_id:0,
			lev_id: 0,
			lev_name:'',
			tch3eb:'',
			total_num: '',
			attendance_num: '',
			absence_num: '',
			stu_att_score: '',
			teach_total_num: '',
			teach_attend: '',
			teach_absence: '',
			teach_att_score: '',
			tch3eb_id: ''
		 }
	}

	edit(absencestat : any){
        this.DailyAbsenceStatDataService.GetById(this.model.absence_stat_id).subscribe(
        {
            next: (result : any)=>{
				this.Levels = result['data'][0];
                this.DailyAbsenceStatDataService.GetById(result['data'][0].absence_stat_id).subscribe(
                {
                    next: (result : any)=>{
                        this.model = result['data'][0];
                    },
                    error: (err)=>{
                        console.log(err);
                    }
                })
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

	delete(absencestat : any){
        this.DailyAbsenceStatDataService.Delete(this.model.absence_stat_id).subscribe(
        {
            next: (result : any)=>{
                this.DailyAbsenceStatDataService.Delete(result['data'][0].absence_stat_id).subscribe()
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
				
				this.Levels = result['data'];
				
			},
			error: (err)=>{
				
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getabsencestat();

		

	}

}