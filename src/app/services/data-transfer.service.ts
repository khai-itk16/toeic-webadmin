import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {

  public dataTranfer = new BehaviorSubject('');

  constructor() { }

  setDataTranfer(data){
    this.dataTranfer.next(data);
  }

  getDataTranfer(): Observable<any> {
      return this.dataTranfer.asObservable();
  }
}
