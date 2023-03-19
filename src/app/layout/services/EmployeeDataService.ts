import { EventEmitter, Injectable, Output } from '@angular/core';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EmployeeDataService {
	readonly APIUrl = "https://localhost:7216/api";
    
    constructor(private http: HttpClient) { }

	GetGoodStudents(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/employee/GetGoodStudents');
	}

	GetNumberOfStudent(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/employee/GetNumberOfStudent');
	}

    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Employee/Get');
	}
	GetById(val:any): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/Emplyee/Get/id?id=' + val);
    }
   
    Getcountries(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/countries');
    }
    Save(val: any) {
        return this.http.post(this.APIUrl + '/Employee/Save', val);
    }
	Update(val: any) {
		
        return this.http.put(this.APIUrl + '/Employee/Update', val);
    }
    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/Employee/Delete/' + id);
	}

	GetAllEmployee_of_department(val: any) {
		return this.http.get<any>(this.APIUrl + '/employee/dep_id?dep_id=' + val);
		
	}
	GetAllEmployee_of_job(val :any) {
		return this.http.get<any>(this.APIUrl + '/job_details_def/job_id?job_id=' + val);
	}
	get_subject_with_emp_id(val : any): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/subject/emp_id?id=' + val);
    }
	update_emp_def_connection_id(val: any) {
		
        return this.http.post(this.APIUrl + '/employee/update_emp_def_connection_id', val);
    }
	get_emp_def_with_subject_id(val : any): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/employee/get_emp_def_with_subject_id?id=' + val);
    }

	get_emp_def_with_subject_id_with_validation(val : any, val2 : any): Observable<any[]> {
		return this.http.get<any>(this.APIUrl + '/employee/get_emp_def_with_subject_id_with_validation?id=' + val + '&date=' + val2);
    }
	@Output() aClickedEvent = new EventEmitter<string>();
	/*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
	AClicked(msg: string) {
		this.aClickedEvent.emit(msg);
    }
    @Output() bClickedEvent = new EventEmitter<string>();
    /*   @Output() deparmentClickedEvent = new EventEmitter<string>();*/
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }
}