import { EventEmitter, Injectable, Output } from '@angular/core';  
import { Observable } from 'rxjs';  
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class UserPrivDataService
{
    readonly APIUrl = "https://localhost:7216/api";       

    constructor(private http: HttpClient){
       // const userToken = localStorage.getItem(environment.authTokenKey);
       // this.decoded = jwt_decode(userToken);

    }
   
    //get_emp_user_privliges_menus_route_with_route(val: any): Observable<any[]> {
     // return this.http.post<any>('https://localhost:44337/api/login/get_emp_user_privliges_menus_route_with_route' , {emp_id:this.decoded.id,menu_route:val});
    //}

   
    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/UserPrivilige/Get/');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/UserPrivilige/GetById?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/UserPrivilige/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/UserPrivilige/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/UserPrivilige/Delete/' + id);
    }

    GetAlluser_privs_with_emp_id(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/emp_user_privliges/emp_id?id=' + val);
    }
   
    deleteuser_privs(id: any) {
        return this.http.delete(this.APIUrl + '/emp_user_privliges/emp_id?emp_id=' + id);
    }

    get_priv_pages(val: any,val2: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/emp_user_privliges/get_priv_pages?id=' + val+'&job_id='+val2);
    }
    save_update_emp_user_privliges(val: any) {
        return this.http.post(this.APIUrl + '/emp_user_privliges/save_update_emp_user_privliges', val);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }

    @Output() bClickedEvent = new EventEmitter<string>();
    BClicked(msg: string) {
        this.bClickedEvent.emit(msg);
    }

    @Output() e_bind_tableClickedEvent = new EventEmitter<string>();
    f_bind_tableClicked(msg: string) {
        this.e_bind_tableClickedEvent.emit(msg);
    }
}  