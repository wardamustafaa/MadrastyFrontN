import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class StudentLeaveDataService {
    readonly APIUrl = "https://localhost:7216/api";

    constructor(private http: HttpClient) { }

    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/StudentLeave/Get');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/StudentLeave/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/StudentLeave/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/StudentLeave/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/StudentLeave/Delete' + id);
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