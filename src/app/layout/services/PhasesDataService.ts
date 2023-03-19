import { EventEmitter, Injectable, Output } from '@angular/core';

/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PhasesDataService {
    readonly APIUrl = "https://localhost:7216/api";

    constructor(private http: HttpClient) { }
    
    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Phase/Get');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Phase/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/Phase/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/Phase/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/Phase/Delete/' + id);
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