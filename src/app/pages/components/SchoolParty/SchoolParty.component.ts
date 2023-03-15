import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { SchoolPartyDataService } from 'src/app/layout/services/SchoolPartyDataService';

@Component({
	selector: 'kt-schoolparty',
	templateUrl: './SchoolParty.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class SchoolPartyComponent implements OnInit {
	public schoolparty : any[] = [];

	model = {
		id:0,
		dep_name:'',
		party_occ:'',
		party_date: '',
        party_duration:'',
        party_loc:'',
        party_sponsor:'',
        party_invitees:'',
        external_part:'',
        party_desc:'',

	}

	myModel: any = '';
    constructor( private SchoolPartyDataService: SchoolPartyDataService) {
			
    }
	
	submitForm(){
		alert(this.model.dep_name);
		this.SchoolPartyDataService.Save(this.model).subscribe(
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
            id:0,
            dep_name:'',
            party_occ:'',
            party_date: '',
            party_duration:'',
            party_loc:'',
            party_sponsor:'',
            party_invitees:'',
            external_part:'',
            party_desc:'',
		 }
	}

	edit(){
        this.SchoolPartyDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.schoolparty = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.SchoolPartyDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getschoolparty();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getschoolparty(){

		this.SchoolPartyDataService.Get().subscribe(
        {
			next: (result : any)=>{
		
				this.schoolparty = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getschoolparty();

		

	}

}
