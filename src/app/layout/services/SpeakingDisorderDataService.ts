import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class SpeakingDisorderDataService {
    
    readonly APIUrl = "https://localhost:7216/api";

    constructor(private http: HttpClient) { }
    
    Get(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorder/Get');
    }

    GetFirstDetails(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorderDetailsFirst/Get');
    }

    GetSecondDetails(): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorderDetailsSecond/Get');
    }

    GetById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorder/GetById/id?id=' + val);
    }

    GetFirstDetailsBySpeakingId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorderDetailsFirst/GetBySpeakingDisorderId/speakingDisorederId?speakingDisorederId=' + val);
    }

    GetFirstDetailsById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorderDetailsFirst/GetById/id?id=' + val);
    }

    GetSecondDetailsBySpeakingId(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorderDetailsSecond/GetBySpeakingDisorderId/speakingDisorederId?speakingDisorederId=' + val);
    }

    GetSecondDetailsById(val: any): Observable<any[]> {
        return this.http.get<any>(this.APIUrl + '/SpeakingDisorderDetailsSecond/GetById/id?id=' + val);
    }

    Save(val: any) {
        return this.http.post(this.APIUrl + '/SpeakingDisorder/Save', val);
    }

    SaveFirstDetails(val: any) {
        return this.http.post(this.APIUrl + '/SpeakingDisorderDetailsFirst/Save', val);
    }

    SaveSecondDetails(val: any) {
        return this.http.post(this.APIUrl + '/SpeakingDisorderDetailsSecond/Save', val);
    }

    Update(val: any) {
        return this.http.put(this.APIUrl + '/SpeakingDisorder/Update', val);
    }

    UpdateFirstDetails(val: any) {
        return this.http.put(this.APIUrl + '/SpeakingDisorderDetailsFirst/Update', val);
    }

    UpdateSecondDetails(val: any) {
        return this.http.put(this.APIUrl + '/SpeakingDisorderDetailsSecond/Update', val);
    }

    Delete(id: any) {
        return this.http.delete(this.APIUrl + '/SpeakingDisorder/Delete/' + id);
    }

    DeleteFirstDetailsById(id: any) {
        return this.http.delete(this.APIUrl + '/SpeakingDisorderDetailsFirst/Delete/' + id);
    }

    DeleteFirstDetailsByDisorderId(absenceCaseId: any) {
        return this.http.delete(this.APIUrl + '/SpeakingDisorderDetailsFirst/DeleteBySpeakingDisorderId/' + absenceCaseId);
    }

    DeleteSecondDetailsById(id: any) {
        return this.http.delete(this.APIUrl + '/SpeakingDisorderDetailsSecond/Delete/' + id);
    }

    DeleteSecondDetailsByDisorderId(absenceCaseId: any) {
        return this.http.delete(this.APIUrl + '/SpeakingDisorderDetailsSecond/DeleteBySpeakingDisorderId/' + absenceCaseId);
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