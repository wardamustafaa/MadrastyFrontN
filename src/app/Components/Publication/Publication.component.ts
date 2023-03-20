import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PublicationDataService } from 'src/app/layout/services/PublicationDataService';

@Component({
	selector: 'kt-Publication',
	templateUrl: './Publication.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicationComponent implements OnInit {
	public pubs : any[] = [];

	model = {
		id:0,
		Sender:'',
		Topic:'',
		PagesNo: '',
        Date: '',
        IsDepartment: 0,
        Attach: '',
        Text: '',
        FileType: '',
        IsFile: 0
	}
    details = {
        PublicationId: 0,
        ObjectId: 0,
        ObjectName: ' '
    }

    constructor( private PublicationDataService: PublicationDataService) {
			
    }
	department: any = [];
    employee : any = [];

    selected_obj_id: any;
	selected_obj_name: any;

	submitForm(){
        var is_dep_value = 1
		if (this.checked_radio === "department") {is_dep_value = 1}
		if (this.checked_radio === "employee") {is_dep_value = 0}

		this.PublicationDataService.Save(this.model).subscribe(
			{
			  next: (result : any)=>{
                
                if (this.checked_radio === "employee") {
                    for (let i = 0; i < this.employee.length; i++) {
                        this.selected_obj_id = Number(this.employee[i].emp_id);
                        this.selected_obj_name = this.employee[i].emp_name;
    
                        
                        this.details.PublicationId  = result['data'][0].id,
                        this.details.ObjectId = this.selected_obj_id,
                        this.details.ObjectName = this.selected_obj_name
                        
                        this.PublicationDataService.SaveDetails(this.details).subscribe();
                    }
                }
                else  {
                    
                    for (let i = 0; i < this.department.length; i++) {
    
                        this.selected_obj_id = Number(this.department[i].dep_id);
                        this.selected_obj_name = this.department[i].dep_name;
    
                        this.details.PublicationId  = result['data'][0].id,
                        this.details.ObjectId = this.selected_obj_id,
                        this.details.ObjectName = this.selected_obj_name
    
                        this.PublicationDataService.SaveDetails(this.details).subscribe()
                    }
                };

                this.resetForm();

			  },
			  error: (err)=>{
				console.log(err);
			  }
			}
		  )
	}

    file: any ;

	base64textString: string = '';
	nachra_file_type:any;

    handleFileSelect(evt : any) {
		const files = evt.target.files;
		
        this.file = files[0];
		
        this.nachra_file_type=files[0].type
		
        const reader = new FileReader();
		
        reader.readAsDataURL(this.file);
		
        reader.onload = () => {
			this.base64textString = reader.result as string;
			this.model.Attach = this.base64textString;
		};
	}

    disabled: boolean = false;
	disabled_emp: boolean = false;
    checked_radio: any;

    handleChange(evt : any) {
		if (evt.target.value === "employee") {
			this.disabled = true
			this.disabled_emp = false
		}
		else if (evt.target.value === "department") {
			this.disabled = false
			this.disabled_emp = true
		}
		else if (evt.target.value != "department" && "employee") {
			this.disabled = false
			this.disabled_emp = false
		}
		this.checked_radio = evt.target.value
	}

	resetForm(){
		this.model = {
			id:0,
            Sender:'',
            Topic:'',
            PagesNo: '',
            Date: '',
            IsDepartment: 0,
            Attach: '',
            Text: '',
            FileType: '',
            IsFile: 0
		}
	}

	
	edit(){
        this.PublicationDataService.GetById(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.pubs = result['data'][0];
			},
			error: (err)=>{
				console.log(err);
			}
        })

    }

    delete(){
        this.PublicationDataService.Delete(this.model.id).subscribe(
        {
            next: (result : any)=>{
				this.getPublications();
			},
			error: (err)=>{
				console.log(err);
			}
        })
    }

    Attach: string= ' ';
    FileType: string = '';

    view(pub : any) {

		this.PublicationDataService.GetById(pub.id)
		.subscribe(
            {
                next: (result : any)=>{
                    this.Attach = result['data'][0].Attach;
                    this.FileType = result['data'][0].FileType;
                    this.openFile(this.Attach,this.FileType);
                },
                error: (err)=>{
                    console.log(err);
                }
            })
	}

    openFile(base64textString : any, file_type : any) {
		
		const base64Data = base64textString.substring(base64textString.indexOf(',') + 1);
				const fileType = file_type;
				const base64File = base64Data;
				const blob = this.b64toBlob(base64File, fileType);
				const blobUrl = URL.createObjectURL(blob);
				window.open(blobUrl, '_blank');
			  }

			  b64toBlob(b64Data: string, contentType: string = '', sliceSize: number = 512): Blob {
				const byteCharacters = atob(b64Data);
				const byteArrays = [];
			  
				for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
				  const slice = byteCharacters.slice(offset, offset + sliceSize);
			  
				  const byteNumbers = new Array(slice.length);
				  for (let i = 0; i < slice.length; i++) {
					byteNumbers[i] = slice.charCodeAt(i);
				  }
			  
				  const byteArray = new Uint8Array(byteNumbers);
				  byteArrays.push(byteArray);
				}
			  
				return new Blob(byteArrays, { type: contentType });
	}

	getPublications(){

		this.PublicationDataService.Get().subscribe(
        {
			next: (result : any)=>{
				alert("reslt : " + result['data']);
				this.pubs = result['data'];
			},
			error: (err)=>{
				alert("error : " + err['data']);
				console.log(err);
			}
        })
	}

	ngOnInit() {
		this.getPublications();

		

	}
}
