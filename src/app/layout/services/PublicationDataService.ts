import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PublicationDataService {
    readonly APIUrl = "https://localhost:7216/api";

    constructor(private http: HttpClient) { }
    
    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Publication/Get');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Publication/GetById/id?id=' + val);
    }

    GetDetailsByPublicationId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/PublicationDetails/GetByPublicationId/publicationId?publicationId=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/Publication/Save', val);
    }

    SaveDetails(val: any) {
        return this.http.post(this.APIUrl + '/PublicationDetails/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/Publication/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/Publication/Delete/' + id);
    }

    DeleteDetails(id: any) {
        return this.http.delete(this.APIUrl + '/PublicationDetails/Delete/' + id);
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