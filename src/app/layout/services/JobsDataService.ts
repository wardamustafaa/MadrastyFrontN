import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class JobsDataService {
   
    readonly APIUrl = "https://localhost:7216/api";
    
    constructor(private http: HttpClient) { }

    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/JobMaster/Get');
    }
    
    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/JobMaster/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/JobMaster/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/JobMaster/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/JobMaster/Delete' + id);
    }
   
    GetDetails(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/JobMaster/GetDetails');
    }
    
    GetEmpWithJobId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/JobMaster/GetEmpWithJobId/jobId?jobId=' + val);
    }

    GetAllprivs_with_job_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/job_details_def/job_id_priv?job_id_priv=' + val);
    }

    SaveDetails(val: any) {
        return this.http.post(this.APIUrl + '/JobMaster/SaveDetails', val);
    }
    
    UpdateDetails(val: any) {
        return this.http.put(this.APIUrl + '/JobMaster/UpdateDetails', val);
    }
    
    DeleteDetails(id: any) {
        return this.http.delete(this.APIUrl + '/JobMaster/DeleteDetails/' + id);
    }

    get_emp_user_privliges_menus_route(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/login/get_emp_user_privliges_menus_route?id=' + val);
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