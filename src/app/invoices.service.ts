import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {

  constructor(private http: HttpClient) { }

  getData() {

    return this.http.get('http://localhost:3000/invoices')
  }

  postData(body:any) {

    return this.http.post('http://localhost:3000/invoices',body)

  }

  showData(id:any) {

    return this.getShowdata = this.http.get(`http://localhost:3000/invoices/${id}`)

  }

  getShowdata:any
  showData2() {

    return this.getShowdata
  }



}
