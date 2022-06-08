import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

URL = "http://localhost/php_test/Views/"

  constructor(private http: HttpClient) { }

  //
  getAll(){

    return this.http.get(`${this.URL}getAllusersService.php`);

  }

  deleteUser(ID: number){



    return this.http.get(`${this.URL}deleteUserService.php?ID=` + ID + ``);

  }

  insertUser(registrationDate: string, name: String, address: String, phone: String, curp: String){


    return this.http.get(`${this.URL}insertUserService.php?registrationDate="`+ registrationDate + `"&name="` + name + `"&address="` + address + `"&phone=` + phone + `&curp="` + curp + `"`);

  }

  editUser(id: String, registrationDate: string, name: String, address: String, phone: String, curp: String){


    return this.http.get(`${this.URL}editUserService.php?ID=` + id + `&registrationDate="`+ registrationDate + `"&name="` + name + `"&address="` + address + `"&phone=` + phone + `&curp="` + curp + `"`);

  }
}
