import { EventEmitter, Injectable, Output } from '@angular/core';
/*import 'rxjs/add/operator/map'  */
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class LevelsDataService {
	readonly APIUrl = "https://localhost:7216/api";
    
    constructor(private http: HttpClient) { }

    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Levels/Get');
    }

    GetLevelsStat(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Levels/GetLevelsStat');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/Levels/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/Levels/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/Levels/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/Levels/Delete' + id);
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