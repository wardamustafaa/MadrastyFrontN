import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { MessageDataService } from 'src/app/layout/services/MessageDataService';

@Component({
	selector: 'kt-message',
	templateUrl: './Message.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class MessageComponent implements OnInit {
	public message : any[] = [];

	model = {
		id:0,
		emp_name:'',
		title:'',
		selectedFiles: '',

	}

	myModel: any = '';
    constructor( private MessageDataService: MessageDataService) {
			
    }
	
	submitForm(){
		alert(this.model.emp_name);
		this.MessageDataService.Save(this.model).subscribe(
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
		emp_name:'',
		title:'',
		selectedFiles: '',
		 }
	}

	edit(){
        this.MessageDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.message = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.MessageDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getmessage();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getmessage(){

		this.MessageDataService.Get().subscribe(
        {
			next: (result : any)=>{
	
				this.message = result['data'];

			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getmessage();

		

	}

}
