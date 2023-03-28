import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { StudentDistributionDataService } from 'src/app/layout/services/StudentDistributionDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-studentdistribution',
	templateUrl: './StudentDistribution.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentDistributionComponent implements OnInit {
	public levels : any[] = [];
 

    modalTitle = 'New Students'

	displayedColumns: string[] = ['twze3_id', 'twze3_lev', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		twze3_id:0,
        twze3_lev: '',
		student_id:0,
		student_name:'',
		class_id: 0,
        class_name: ''

	}

    constructor( private StudentDistributionDataService: StudentDistributionDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Students'; 
			
    }
	
	submitForm(){
	
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
			twze3_id:0,
			twze3_lev: '',
			student_id:0,
			student_name:'',
			class_id: 0,
			class_name: ''
		 }
	}

	edit(student : any){
        this.StudentDistributionDataService.GetById(this.model.twze3_id).subscribe(
        {
            next: (result : any)=>{
				this.levels = result['data'][0];
                this.StudentDistributionDataService.GetById(result['data'][0].twze3_id).subscribe(
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

	delete(student : any){
        this.StudentDistributionDataService.Delete(this.model.twze3_id).subscribe(
        {
            next: (result : any)=>{
                this.StudentDistributionDataService.Delete(result['data'][0].twze3_id).subscribe()
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
				
				this.levels = result['data'];
				
			},
			error: (err)=>{
			
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getstudentdis();

		

	}

}