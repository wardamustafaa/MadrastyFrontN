import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { PhasesDataService } from 'src/app/layout/services/PhasesDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { LayoutService } from 'src/app/layout/services/layout.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'kt-Pahses',
	templateUrl: './Phasees.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class PhaseComponent implements OnInit {
	public pahses: any[] = [];

	displayedColumns: string[] = ['mr7la_id', 'mr7la_name', 'mr7la_code', 'mr7la_desc', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	modalTitle = 'New Phase'

	model = {
		mr7la_id: 0,
		mr7la_name: '',
		mr7la_code: 0,
		mr7la_desc: '',

	}


	constructor(private PhasesDataService: PhasesDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Phases'; 
	}

	loadModel(mr7la_id:number,openModal:boolean){
		this.pahses.forEach((phase)=>{
		  if(phase.mr7la_id == mr7la_id){
			this.model = phase;
			if(openModal){
			  document.getElementById('modalCloser')?.click();
			}
		  }
		});
	}

	openModal(mr7la_id:number){
		this.pahses.forEach((phase)=>{
		  if(phase.mr7la_id == mr7la_id){
			this.model = phase;
			alert(this.model.mr7la_id)
			this.modalTitle = 'Edit '
			document.getElementById('modalOpener')?.click();
		  }
		});
	}
	

	submitForm() {
		alert(this.model.mr7la_name);
		this.PhasesDataService.Save(this.model).subscribe(
			{
				next: (result: any) => {
					this.toastr.success('Success')

					//	this.getPhases();
					this.resetForm();
				},
				error: (err) => {
					console.log(err);
				}
			}
		)
	}

	resetForm() {
		this.model = {
			mr7la_id: 0,
			mr7la_name: '',
			mr7la_code: 0,
			mr7la_desc: '',
		}
		document.getElementById('modalCloser')?.click();

	}

	edit(pahse : any) {
		this.PhasesDataService.GetById(this.model.mr7la_id).subscribe(
		{
			next: (result: any) => {
				this.pahses = result['data'][0];
					
			},
			error: (err) => {
				console.log(err);
			}
		})
	}

	delete(phase : any) {
		this.PhasesDataService.Delete(this.model.mr7la_id).subscribe(
			{
				next: (result: any) => {
					this.getPhases();
				},
				error: (err) => {
					console.log(err);
				}
			})
	}

	getPhases() {

		this.PhasesDataService.Get().subscribe(
			{
				next: (result: any) => {
					this.pahses = result['data'];
					this.dataSource = new MatTableDataSource(this.pahses);
					this.dataSource.paginator = this.paginator;
				},
				error: (err) => {
					alert("error : " + err['data']);
					console.log(err);
				}
			})
	}
	

	ngOnInit() {
		this.getPhases();
	}

}
