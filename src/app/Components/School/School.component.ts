import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SchoolDataService } from 'src/app/layout/services/SchoolDataService';

@Component({
	selector: 'kt-School',
	templateUrl: './School.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolComponent implements OnInit {
	public schools : any[] = [];

	model = {
		id:0,
		name:'',
		mangerName:'',
		ass1: '',
        ass2: '',
        ass3: '',
        ass4: '',
        pedal: '',
        fax: '',
        address : '',
        director: '',
        logo: ''
	}

    constructor( private SchoolDataService: SchoolDataService) {
			
    }
	
    public onFileChanged(event : any) {

		var file = event.target.files[0],
			reader = new FileReader();

        reader.onloadend = () => {
            this.model.logo = reader.result as string;			
		};
	
        reader.readAsDataURL(file)
	}

	submitForm(){
		this.SchoolDataService.Save(this.model).subscribe(
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
            name:'',
            mangerName:'',
            ass1: '',
            ass2: '',
            ass3: '',
            ass4: '',
            pedal: '',
            fax: '',
            address : '',
            director: '',
            logo: ''
		}
	}

	
	edit(){
        this.SchoolDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.schools = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.SchoolDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getSchools();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getSchools(){

		this.SchoolDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.schools = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getSchools();

		

	}
}
