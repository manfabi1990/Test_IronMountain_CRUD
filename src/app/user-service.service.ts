import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

URL = "http://localhost/php_test/"

  constructor(private http: HttpClient) { }


  getAll(){

    return this.http.get(`${this.URL}getAlluser.php`);

  }

  deleteUser(ID: number){



    return this.http.get(`${this.URL}deleteUser.php?ID=` + ID + ``);

  }

  insertUser(registrationDate: Date, name: String, address: String, phone: String, curp: String){


    return this.http.get(`${this.URL}insertUser.php?registrationDate="`+ registrationDate + `"&name="` + name + `"&address="` + address + `"&phone=` + phone + `&curp="` + curp + `"`);

  }

  editUser(id: String, registrationDate: Date, name: String, address: String, phone: String, curp: String){


    return this.http.get(`${this.URL}editUser.php?ID=` + id + `&registrationDate="`+ registrationDate + `"&name="` + name + `"&address="` + address + `"&phone=` + phone + `&curp="` + curp + `"`);

  }
}
