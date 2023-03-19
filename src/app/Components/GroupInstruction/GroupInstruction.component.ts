import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { InstructionsDataService } from 'src/app/layout/services/InstructionsDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-GroupInstruction',
	templateUrl: './GroupInstruction.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class GroupInstructionComponent implements OnInit {
	public instructions : any[] = [];

	modalTitle = 'New Group Instruction';
	typeId = 49;


	displayedColumns: string[] = ['Id', 'group_number', 'sessions_number','notes', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

	model = {
		id: 0,
		groupNumber: 0,
		sessionNumber: 0,
		notes: '',
		type_id : 0,
	}


    constructor( private InstructionsDataService: InstructionsDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Group Instructions'; 
			
    }
	
	submitForm(){
		this.InstructionsDataService.Save(this.model).subscribe(
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
            groupNumber: 0,
            sessionNumber: 0,
            notes: '',
			type_id : 0,
		}
	}

	edit(instruction : any){
        this.InstructionsDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.instructions = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(instruction : any){
        this.InstructionsDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getInstructions();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	GroupInstructions: any[]= [];

	getInstructions(){

		this.InstructionsDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.instructions = result['data'];

				for(let item of this.instructions){
					if(item.type_id == this.typeId){
						this.GroupInstructions.push(item);
					}
				}
				
				this.dataSource = new MatTableDataSource(this.GroupInstructions);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getInstructions();

		

	}

}
