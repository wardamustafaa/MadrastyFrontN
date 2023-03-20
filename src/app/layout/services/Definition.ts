import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class DefinitionDataService{
    readonly APIUrl = "https://localhost:7216/api";
  
    constructor(private http: HttpClient) { }

    GetDefinitions(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Definition/Get');
    }

    GetSCodes(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Definition/GetSCodeArabic');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Definition/GetById/id?id=' + val);
    }

    GetBySCode(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Definition/GetBySCode/scode?scode=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/Definition/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/Definition/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/Definition/Delete' + id);
    }

    Getdefinations_with_scode(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/defination/scode?scode=' + val);
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

