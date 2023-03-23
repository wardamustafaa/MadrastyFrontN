import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { EventsDataService } from 'src/app/layout/services/EventsDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-events',
	templateUrl: './Events.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsComponent implements OnInit {
	public departments : any[] = [];


    modalTitle = 'New Event'

	displayedColumns: string[] = ['event_id', 'dep_name', 'event_loc', 'event_name', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		event_id:0,
        dep_id: 0,
		dep_name:'',
		event_loc:'',
		event_date: '',
        event_name: '',
        event_site: '',
        event_invitees: '',
		event_objectives: '',
        event_desc: '',
        event_time: ''
	}

    constructor( private EventsDataService: EventsDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Event'; 
			
    }
	
	submitForm(){
		// alert(this.model.lib_book_name);
		this.EventsDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
			//	this.getbooks();
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
			event_id:0,
			dep_id: 0,
			dep_name:'',
			event_loc:'',
			event_date: '',
			event_name: '',
			event_site: '',
			event_invitees: '',
			event_objectives: '',
			event_desc: '',
			event_time: ''
		 }
	}

	edit(event : any){
        this.EventsDataService.GetById(this.model.event_id).subscribe(
        {
            next: (result : any)=>{
				this.departments = result['data'][0];
                this.EventsDataService.GetById(result['data'][0].event_id).subscribe(
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

	delete(event : any){
        this.EventsDataService.Delete(this.model.event_id).subscribe(
        {
            next: (result : any)=>{
                this.EventsDataService.Delete(result['data'][0].event_id).subscribe()
				this.getevents();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }



	getevents(){

		this.EventsDataService.Get().subscribe(
        {
			next: (result : any)=>{
				
				this.departments = result['data'];
				
			},
			error: (err)=>{
				// alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getevents();

		

	}

}
