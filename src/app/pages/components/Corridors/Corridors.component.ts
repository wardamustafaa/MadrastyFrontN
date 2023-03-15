import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { CorridorDataService } from 'src/app/layout/services/CorridorDataService';

@Component({
	selector: 'kt-corridor',
	templateUrl: './Corridors.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class CorridorComponent implements OnInit {
	public corridor : any[] = [];

	model = {
		corridor_id:0,
		corridor_name:'',
		corridor_desc: '',
	}

	myModel: any = '';
    constructor( private CorridorDataService: CorridorDataService) {
			
    }
	
	submitForm(){
		alert(this.model.corridor_name);
		this.CorridorDataService.Save(this.model).subscribe(
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
			corridor_id:0,
		corridor_name:'',
		corridor_desc: '',
		 }
	}

	edit(){
        this.CorridorDataService.GetById(this.model.corridor_id).subscribe(
        {
            next: (result : any)=>{
				this.corridor = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.CorridorDataService.Delete(this.model.corridor_id).subscribe(
        {
            next: (result : any)=>{
				this.getcorridor();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getcorridor(){

		this.CorridorDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.corridor = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getcorridor();

		

	}

}
