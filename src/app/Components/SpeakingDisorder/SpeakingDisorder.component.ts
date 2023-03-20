import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SpeakingDisorderDataService } from 'src/app/layout/services/SpeakingDisorderDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-SpeakingDisorder',
	templateUrl: './SpeakingDisorder.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakingDisorderComponent implements OnInit {
	public students : any[] = [];

    levels :  any[] = [];
	classes :any[] = [];
	studentList :any[] = [];
	nationalities: any[] = [];

	modalTitle = 'Speaking Disorder';

	displayedColumns: string[] = ['Id', 'LevelName', 'ClassName','StudentName', 'actions'];

	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id:0,
        caseType: '',
		levelName:'',
		className:'',
		studentName: '',
        nationality: '',
        dob: '',
        WorkStartDate: '',
        BehavioralNotes: '',
        SelfReasons: '',
        DisorderType: 0,
	}

    details = {
        id: 0,
        SpeakingDisorderId: 0,
        OtherSituations: '',
        Date: '',
        EffortResults: '',
        EndYearState: '',
    }
    anotherDetails = {
        id: 0,
        SpeakingDisorderId : 0,
        Date: '',
        Results : ''
    }


    constructor( private SpeakingDisorderDataService: SpeakingDisorderDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Speaking Disorder';
			
    }
	
	submitForm(){
		this.SpeakingDisorderDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
                this.SpeakingDisorderDataService.SaveFirstDetails(this.details).subscribe()
                this.SpeakingDisorderDataService.SaveSecondDetails(this.anotherDetails).subscribe()
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
            caseType: '',
            levelName:'',
            className:'',
            studentName: '',
            nationality: '',
            dob: '',
            WorkStartDate: '',
            BehavioralNotes: '',
            SelfReasons: '',
            DisorderType: 0,
		}

        this.details = {
            id: 0,
            SpeakingDisorderId: 0,
            OtherSituations: '',
            Date: '',
            EffortResults: '',
            EndYearState: '',
        }

        this.anotherDetails = {
            id: 0,
            SpeakingDisorderId : 0,
            Date: '',
            Results : ''
        }
    
	}

	edit(student : any){
        this.SpeakingDisorderDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.students = result['data'][0];
                this.SpeakingDisorderDataService.GetFirstDetailsBySpeakingId(result['data'][0].id).subscribe(
                {
                    next: (result2 : any)=>{
                        this.details = result2['data'][0];
                        this.SpeakingDisorderDataService.GetFirstDetailsBySpeakingId(result['data'][0].id).subscribe(
                        {
                            next: (result3 : any)=>{
                                this.anotherDetails = result3['data'][0];
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
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(student : any){
        this.SpeakingDisorderDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
                this.SpeakingDisorderDataService.DeleteFirstDetailsByDisorderId(result['data'][0].id).subscribe()
                this.SpeakingDisorderDataService.DeleteSecondDetailsByDisorderId(result['data'][0].id).subscribe()
                this.getStudents();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getStudents(){

		this.SpeakingDisorderDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.students = result['data'];
                this.dataSource = new MatTableDataSource(this.students);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getStudents();

		

	}

}
