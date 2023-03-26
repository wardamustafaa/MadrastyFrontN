import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MessageDataService } from 'src/app/layout/services/MessageDataService';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { ToastrService } from 'ngx-toastr';
import { LayoutService } from 'src/app/layout/services/layout.service';

@Component({
	selector: 'kt-message',
	templateUrl: './Message.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageComponent implements OnInit {
	public emps : any[] = [];
	

    modalTitle = 'New Message'

	displayedColumns: string[] = ['ser', 'to_emp_id', 'title', 'files', 'actions'];
	dataSource  = new  MatTableDataSource();

    @ViewChild(MatSort, { static: true }) sort!: MatSort; 
	@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


	model = {
		ser:0,
        to_emp_id: 0,
		emp_name:'',
		bad_card_id:0,
		files:'',
		title: '',
		body:''
	}

    constructor( private MessageDataService: MessageDataService,
        public layoutService: LayoutService,
		private toastr: ToastrService) {
			
			layoutService.subHeaderTitle = 'New Message'; 
			
    }
	
	submitForm(){

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
			ser:0,
			to_emp_id: 0,
			emp_name:'',
			bad_card_id:0,
			files:'',
			title: '',
			body:''
		 }
	}

	edit(emps : any){
        this.MessageDataService.GetById(this.model.ser).subscribe(
        {
            next: (result : any)=>{
				this.emps = result['data'][0];
                this.MessageDataService.GetById(result['data'][0].ser).subscribe(
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

	delete(emps : any){
        this.MessageDataService.Delete(this.model.ser).subscribe(
        {
            next: (result : any)=>{
                this.MessageDataService.Delete(result['data'][0].ser).subscribe()
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
				
				this.emps = result['data'];
				
			},
			error: (err)=>{

				console.log(err);
			}
        })
	}

 



	ngOnInit() {
		this.getmessage();

		

	}

}

