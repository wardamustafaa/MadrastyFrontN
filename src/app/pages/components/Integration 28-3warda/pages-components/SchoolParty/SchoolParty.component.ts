import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { SchoolPartyDataService } from 'src/app/layout/services/SchoolPartyDataService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-schoolparty',
	templateUrl: './SchoolParty.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolPartyComponent implements OnInit {
	public departments : any[] = [];
 

    modalTitle = 'New Party'

	displayedColumns: string[] = ['sch_party_id', 'dep_name', 'party_occ', 'party_loc', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		sch_party_id:0,
        dep_id: 0,
		dep_name:'',
		party_occ:'',
		party_date: '',
        party_duration: '',
        party_loc: '',
        party_sponsor: '',
		party_invitees: '',
        external_part: '',
        party_desc: ''

	}

    constructor( private SchoolPartyDataService: SchoolPartyDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Party'; 
			
    }
	
	submitForm(){
	
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
			sch_party_id:0,
			dep_id: 0,
			dep_name:'',
			party_occ:'',
			party_date: '',
			party_duration: '',
			party_loc: '',
			party_sponsor: '',
			party_invitees: '',
			external_part: '',
			party_desc: ''
		 }
	}

	edit(party : any){
        this.SchoolPartyDataService.GetById(this.model.sch_party_id).subscribe(
        {
            next: (result : any)=>{
				this.departments = result['data'][0];
                this.SchoolPartyDataService.GetById(result['data'][0].sch_party_id).subscribe(
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

	delete(party : any){
        this.SchoolPartyDataService.Delete(this.model.sch_party_id).subscribe(
        {
            next: (result : any)=>{
                this.SchoolPartyDataService.Delete(result['data'][0].sch_party_id).subscribe()
				this.getparties();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getparties(){

		this.SchoolPartyDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.departments = result['data'];
				
			},
			error: (err)=>{
		
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getparties();

		

	}

}
