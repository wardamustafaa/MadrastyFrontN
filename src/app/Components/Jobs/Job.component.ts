import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { JobsDataService } from 'src/app/layout/services/JobsDataService';

@Component({
	selector: 'kt-Jobs',
	templateUrl: './Job.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobComponent implements OnInit {
	public jobs : any[] = [];
    public privs : any[] = [];

    privs_edit: Array<any>=[];


	model = {
		JobId:0,
		JobName:'',
		JobDesc:'',
		InClassPriv: 0,
        DepWork: 0,
       
	}
    details = {
        EmpId : 0,
        EmpNme : '',
        PrivId : 0 ,
        JobId : 0 ,
        MenuId : 0,
        UserMenuName : '', 
        PageName : '',
        PrivName : '',
        PrivDefId : 0,
        InClassPriv : 0,
        DepWork : 0,
    }

    constructor( public _fb: FormBuilder,private JobsDataService: JobsDataService) {

        this.JobsDataService.GetDetails().subscribe(
            {
                next: (result : any)=>{
                    this.privs = result['data'];

                    for (var i = 0; i < this.privs.length; i++) {

                        var ismatch = false; // we haven't found it yet
    
                        for (var j = 0; j < this.privs_edit.length; j++) {
    
                            if (this.privs[i].menu_id == this.privs_edit[j].menu_id) {
                                // we have found this.officeLIST[i]] in this.office, so we can stop searching
                                ismatch = true;
                                this.privs[i].checked = true;//  checkbox status true
                                this.newArray.push(this.privs[i]);
                                break;
                            }
                            //End if
                            // if we never find this.officeLIST[i].office_id in this.office, the for loop will simply end,
                            // and ismatch will remain false
                        }
                        // add this.officeLIST[i] to newArray only if we didn't find a match.
                        if (!ismatch) {
                            this.privs[i].checked = false;//  checkbox status false
                            this.newArray.push(this.privs[i]);
                        } //End if
                    }
                },
                error: (err)=>{
                    console.log(err);
                }
            })	
			
    }

    newArray: Array<any> = [];

	butdisableclass: number = 0;
	butdisablework: number = 0;

	side_jobclass_chck_change(event : any) {
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.checked == true) {
				this.butdisableclass = 1;
			}
			if (event.checked === false) {
				this.butdisableclass = 0;
			}
		}
	}

	side_jobwork_chck_change(event : any) {
		if(event !== null && event !== undefined && event.length !== 0){

			if (event.checked == true) {
				this.butdisablework = 1;
			}
			if (event.checked === false) {
				this.butdisablework = 0;
			}
		}
	}

    returned_job_id: any;
    checkbox_array: any;
	submitForm(){
		this.JobsDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
                this.returned_job_id = result['data'][0].JobId; 
				
				if(this.checkbox_array !== undefined){

					for (let i = 0; i < this.checkbox_array.length; i++) {
							
						this.details.JobId = Number(this.returned_job_id);
						this.details.PrivName = this.checkbox_array[i];
						this.details.PageName = this.checkbox_array[i];
						this.details.PrivDefId = Number(this.checkbox_array[i]);
						this.details.InClassPriv = Number(this.butdisableclass);
						this.details.DepWork = Number(this.butdisablework);
							
						this.JobsDataService.SaveDetails(this.details).subscribe(
                        {
                            next: (result : any)=>{
                                this.resetForm();
                            },
                            error: (err)=>{
                                console.log(err);
                            }
                        });
					}
				}
			  },
			  error: (err)=>{
				console.log(err);
			  }
			}
		  )
	}

	resetForm(){
		this.model = {
			JobId:0,
            JobName:'',
            JobDesc:'',
            InClassPriv: 0,
            DepWork: 0,
		}
	}

    initModelForm(): FormGroup {
		return this._fb.group({
			otherControls: [''],
			// The formArray, empty 
			myChoices: new FormArray([]),
		})
	}

	myForm: FormGroup = this.initModelForm();

    onCheckChange(event : any) {
		if(event !== null && event !== undefined && event.length !== 0){

			const formArray: FormArray = this.myForm.get('myChoices') as FormArray;

			if (event.target.checked) {
				formArray.push(new FormControl(event.target.value));
			}
            else {
			
				let i: number = 0;

				formArray.controls.forEach((ctrl: any) => {
					if (ctrl.value == event.target.value) {
						// Remove the unselected element from the arrayForm
						formArray.removeAt(i);
						return;
					}

					i++;
				});
			}
			this.checkbox_array = formArray.value;
		}
	}
	
	edit(){
        this.JobsDataService.GetById(this.model.JobId).subscribe(
        {
            next: (result : any)=>{
				this.jobs = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.JobsDataService.Delete(this.model.JobId).subscribe(
        {
            next: (result : any)=>{
				this.getJobs();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getJobs(){

		this.JobsDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.jobs = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getJobs();

		

	}
}
