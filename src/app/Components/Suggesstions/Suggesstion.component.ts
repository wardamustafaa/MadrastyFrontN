import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SuggestionsDataService } from 'src/app/layout/services/SuggestionsDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-Suggesstions',
	templateUrl: './Suggesstion.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class SuggesstionsComponent implements OnInit {
	public suggesstions : any[] = [];
	public types : any[] = [];

	modalTitle = 'Suggesstions ';

	displayedColumns: string[] = ['Id','sugg_title', 'sugg_body', 'sugg_type', 'actions'];

	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		id: 0,
		title: '',
		body: '',
		type: '',
        file: ''
	}


    constructor( private SuggestionsDataService: SuggestionsDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Suggesstions ';
			
    }
	
	submitForm(){
		this.SuggestionsDataService.Save(this.model).subscribe(
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
            title: '',
            body: '',
            type: '',
            file: ''
		}
	}

	edit(sugg : any){
        this.SuggestionsDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.suggesstions = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(sugg : any){
        this.SuggestionsDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getSuggesstions();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getSuggesstions(){

		this.SuggestionsDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.suggesstions = result['data'];
				this.dataSource = new MatTableDataSource(this.suggesstions);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getSuggesstions();

		

	}

}
