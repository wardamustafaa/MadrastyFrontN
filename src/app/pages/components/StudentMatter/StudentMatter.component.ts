import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { StudentMatterDataService } from 'src/app/layout/services/StudentMatterDataService';

@Component({
	selector: 'kt-studentmatter',
	templateUrl: './StudentMatter.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class StudentMatterComponent implements OnInit {
	public studentmatter : any[] = [];

	model = {
		id:0,
		lev_name:'',
		class_name:'',
		student_name: '',
		topic:'',
		note_date:'',
		ntoes:'',
	}

	myModel: any = '';
    constructor( private StudentMatterDataService: StudentMatterDataService) {
			
    }
	
	submitForm(){
		alert(this.model.lev_name);
		this.StudentMatterDataService.Save(this.model).subscribe(
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
		lev_name:'',
		class_name:'',
		student_name: '',
		topic:'',
		note_date:'',
		ntoes:'',
		 }
	}

	edit(){
        this.StudentMatterDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.studentmatter = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.StudentMatterDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getstudentmatter();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

	getstudentmatter(){

		this.StudentMatterDataService.Get().subscribe(
        {
			next: (result : any)=>{
	
				this.studentmatter = result['data'];
		
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getstudentmatter();

		

	}

}
