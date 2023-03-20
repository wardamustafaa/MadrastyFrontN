import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { InstructionsDataService } from 'src/app/layout/services/InstructionsDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-ClassInstruction',
	templateUrl: './ClassInstruction.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class ClassInstructionComponent implements OnInit {
	public instructions : any[] = [];
	public levels : any[] = [];
	public classes : any[] = [];

	typeId = 50;

	modalTitle = 'New Class Instruction'

	displayedColumns: string[] = ['Id', 'level_name', 'class_name', 'topic','notes', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

	model = {
		id: 0,
		levelName: '',
		className: '',
        topic: '',
		notes: '',
	}


    constructor( private InstructionsDataService: InstructionsDataService,
		public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'Class Insrtructions'; 
			
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
            levelName: '',
            className: '',
            topic: '',
		    notes: '',
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

	ClassInstructions : any[]=[];

	getInstructions(){

		this.InstructionsDataService.Get().subscribe(
        {
			next: (result : any)=>{
				this.instructions = result['data'];

				for(let item of this.instructions){
					if(item.type_id == this.typeId){
						this.ClassInstructions.push(item);
					}
				}

				this.dataSource = new MatTableDataSource(this.ClassInstructions);
				this.dataSource.paginator = this.paginator;
			},
			error: (err)=>{
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getInstructions();

		

	}

}
