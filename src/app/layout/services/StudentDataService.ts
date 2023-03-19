import { Injectable, Output, EventEmitter } from '@angular/core';  
import { Observable } from 'rxjs';  
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class StudentDataService
{
    readonly APIUrl = "https://localhost:7216/api";

    constructor(private http: HttpClient){}
  
   
    GetBranchStatistics(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Student/GetBranchStatistics');
    }

    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Status/Get');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Status/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/Status/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/Status/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/Status/Delete' + id);
    }

    get_start_date(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/student/start_year');
    }
    
    UpdateStudentBranch(val: any) {
        return this.http.post(this.APIUrl + '/Student/UpdateStudentBranch', val);
    }
    
    GetAllStudent_of_level(val : any) {
        return this.http.get<any>(this.APIUrl + '/twze3_students/student_grade_id?student_grade_id=' + val);
    }
    GetAllStudent_of_class(val : any) {
        return this.http.get<any>(this.APIUrl + '/student/class_id?class_id=' + val);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }
    

}  