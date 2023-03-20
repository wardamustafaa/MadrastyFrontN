﻿import { EventEmitter, Injectable, Output } from '@angular/core';  
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';  
/*import { map } from 'rxjs/operators';*/
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class StudentParentMeetingDataService 
{
    readonly APIUrl = "https://localhost:7216/api";
   
    constructor(private http: HttpClient){}
  
    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/StudentParentMeeting/Get');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/StudentParentMeeting/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/StudentParentMeeting/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/StudentParentMeeting/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/StudentParentMeeting/Delete/' + id);
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