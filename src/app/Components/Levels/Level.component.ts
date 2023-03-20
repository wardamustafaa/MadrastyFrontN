import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { LevelsDataService } from 'src/app/layout/services/LevelsDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-Levels',
	templateUrl: './Level.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelComponent implements OnInit {
	public levels : any[] = [];

	modalTitle = 'New Level'

	displayedColumns: string[] = ['lev_id', 'lev_name', 'lev_desc', 'mr7la_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id:0,
		name:'',
		classNo:0,
		description: '',
	}

    constructor( private LevelsDataService: LevelsDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Swots'; 
    }
	
	submitForm(){
		this.LevelsDataService.Save(this.model).subscribe(
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

	loadModel(id:number,openModal:boolean){
		this.levels.forEach((level)=>{
		  if(level.id == id){
			this.model = level;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(id:number){
		this.levels.forEach((level)=>{
		  if(level.id == id){
			this.model = level;
			alert(this.model.id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}

	resetForm(){
		this.model = {
			id:0,
            name:'',
            classNo:0,
            description: '',
		}
	}

	edit(level : any){
        this.LevelsDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.levels = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(level : any){
        this.LevelsDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getLevels();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getLevels(){

		this.LevelsDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.levels = result['data'];
				this.dataSource = new MatTableDataSource(this.levels);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getLevels();

		

	}

}
