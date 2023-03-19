import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class HealthCasesDataService {

    readonly APIUrl = "https://localhost:7216/api";

    constructor(private http: HttpClient) { }
    
    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/HealthCases/Get');
    }

    GetHealthCasesDetails(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/HealthCases/GetHealthCasesDetails');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/HealthCases/GetById/id?id=' + val);
    }

    GetHealthCasesDetailsWithHealthId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/HealthCases/GetHealthCasesDetailsWithHealthId/id?id=' + val);
    }


    GetHealthCasesDetailsWithId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/HealthCases/GetHealthCasesDetailsWithId/id?id=' + val);
    }


    Save(val: any) {
        return this.http.post(this.APIUrl + '/HealthCases/Save', val);
    }

    SaveHealthCasesDetails(val: any) {
        return this.http.post(this.APIUrl + '/HealthCases/SaveHealthCasesDetails', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/HealthCases/Update', val);
    }

    UpdateHealthCasesDetails(val: any) {
        return this.http.put(this.APIUrl + '/HealthCases/UpdateHealthCasesDetails', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/HealthCases/Delete/' + id);
    }

    DeleteHealthCasesDetails(id: any) {
        return this.http.delete(this.APIUrl + '/HealthCases/DeleteHealthCasesDetails/' + id);
    }

    DeleteHealthCasesDetailsWithHealthId(id: any) {
        return this.http.delete(this.APIUrl + '/HealthCases/DeleteHealthCasesDetailsWithHealthId/' + id);
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