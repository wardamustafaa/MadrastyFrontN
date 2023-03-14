import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { EventsDataService } from 'src/app/layout/services/EventsDataService';

@Component({
	selector: 'kt-events',
	templateUrl: './Events.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class EventsComponent implements OnInit {
	public events : any[] = [];

	model = {
		id:0,
		dep_name:'',
		event_loc:'',
		event_date: '',
        event_time:'',
        event_name:'',
        event_site:'',
        event_invitees:'',
        event_objectives:'',
        event_desc:'',
	}

	myModel: any = '';
    constructor( private EventsDataService: EventsDataService) {
			
    }
	
	submitForm(){
		alert(this.model.dep_name);
		this.EventsDataService.Save(this.model).subscribe(
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
		event_loc:'',
		event_date: '',
        event_time:'',
        event_name:'',
        event_site:'',
        event_invitees:'',
        event_objectives:'',
        event_desc:'',	
		 }
	}

	edit(){
        this.EventsDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.events = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.EventsDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
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
			
				this.events = result['data'];
			
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getevents();

		

	}

}
