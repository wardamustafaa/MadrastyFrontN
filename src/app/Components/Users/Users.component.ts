import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UserPrivDataService } from 'src/app/layout/services/UserPrivDataService';

@Component({
	selector: 'kt-Users',
	templateUrl: './Users.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
	public users : any[] = [];
    SelectedJob : any = [];
    SelectedEmployee : any = [];
	
    model = {
		Id:0,
		JobId:0,
		EmpId:0,
		EmpName: '',
	}

    constructor( private UserPrivDataService: UserPrivDataService) {
			
    }
	
	submitForm(){
		this.UserPrivDataService.Save(this.model).subscribe(
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
			Id:0,
            JobId:0,
            EmpId:0,
            EmpName: '',
		}
	}

	
	edit(){
        this.UserPrivDataService.GetById(this.model.Id).subscribe(
        {
            next: (result : any)=>{
				this.users = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.UserPrivDataService.Delete(this.model.Id).subscribe(
        {
            next: (result : any)=>{
				this.getUsers();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getUsers(){

		this.UserPrivDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.users = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getUsers();

		

	}
}
