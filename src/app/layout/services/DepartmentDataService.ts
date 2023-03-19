import { EventEmitter, Injectable, Output } from '@angular/core';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DepartmentDataService
{
    readonly APIUrl = "https://localhost:7216/api";
   
    constructor(private http: HttpClient){}
 
    GetAllMasterdepartment(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department/master');
    }
    GetAllsidedepartment(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department/side');
    }
    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Departments/Get');
    }
    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Departments/Get/id?id=' + val);
    }
    get_department_def_with_master_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/department/get_department_def_with_master_id?id=' + val);
    }
    Save(val: any) {
        return this.http.post(this.APIUrl + '/Departments/Save', val);
    }
    Update(val: any) {
        return this.http.put(this.APIUrl + '/Departments/Update', val);
    }
    Delete(val: any) {
        return this.http.delete(this.APIUrl + '/Department/Delete/' + val);
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