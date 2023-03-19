import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { GuideDataService } from 'src/app/layout/services/GuideDataService ';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-Guide',
	templateUrl: './Guide.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class GuideComponent implements OnInit {
	public guides : any[] = [];
	students: any[] = [];
	classes: any[] = [];
	levels: any[] = [];
	guideTypes: any[] = [];

	modalTitle = 'New Guide'

	displayedColumns: string[] = ['Id', 'TypeName', 'LevelName', 'ClassName','StudentName', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id: 0,
		levelName: '',
		className: '',
        studentName: '',
        guideTypes: '',
		notes: '',
	}


    constructor( private GuideDataService: GuideDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Guides'; 
    }
	
	submitForm(){
		this.GuideDataService.Save(this.model).subscribe(
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
			id: 0,
            levelName: '',
            className: '',
            studentName: '',
            guideTypes: '',
            notes: '',
		}
	}

	loadModel(id:number,openModal:boolean){
		this.guides.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(id:number){
		this.guides.forEach((object)=>{
		  if(object.id == id){
			this.model = object;
			alert(this.model.id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}

	edit(guide : any){
        this.GuideDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.guides = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(guide : any){
        this.GuideDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getGuides();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getGuides(){

		this.GuideDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.guides = result['data'];
				this.dataSource = new MatTableDataSource(this.guides);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getGuides();

		

	}

}
