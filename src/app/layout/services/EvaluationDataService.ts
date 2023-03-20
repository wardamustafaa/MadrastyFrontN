import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class EvaluationDataService {
    
    readonly APIUrl = "https://localhost:7216/api";

    constructor(private http: HttpClient) { }

    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/TakeemMaster/Get');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/TakeemMaster/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/TakeemMaster/Save', val);
    }

    SaveDetails(val: any) {
        return this.http.post(this.APIUrl + '/TakeemMaster/SaveDetails', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/TakeemMaster/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/TakeemMaster/Delete' + id);
    }

    GetDetailsByTakeemId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/TakeemMaster/GetDetailsByTakeemId/takeemId?takeemId=' + val);
    }

    GetEvaluationWithEvaluationSubject(val: any): Observable<any[]> {
        return this.http.post<any>(this.APIUrl + '/TakeemMaster/GetEvaluationWithEvaluationSubject',val);
    }

    @Output() aClickedEvent = new EventEmitter<string>();
    AClicked(msg: string) {
        this.aClickedEvent.emit(msg);
    }
    @Output() cClickedEvent = new EventEmitter<string>();
    CClicked(msg: string) {
        this.cClickedEvent.emit(msg);
    }
    @Output() dClickedEvent = new EventEmitter<string>();
    DClicked(msg: string) {
        this.dClickedEvent.emit(msg);
    }

    @Output() eClickedEvent = new EventEmitter<string>();
    EClicked(msg: string) {
        this.eClickedEvent.emit(msg);
    }
    @Output() aftersaveClickedEvent = new EventEmitter<string>();
    AFTERsaveClicked(msg: string) {
        this.aftersaveClickedEvent.emit(msg);
    }
}