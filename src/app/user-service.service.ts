import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//service that works as a consumer of a PHP API
export class UserServiceService {

URL = "http://localhost/php_test/Views/"

  constructor(private http: HttpClient) { }

  //Service for get all contacts
  getAll(){

    return this.http.get(`${this.URL}getAllusersService.php`);

  }

  //Service for delete contacts
  deleteUser(ID: number){



    return this.http.get(`${this.URL}deleteUserService.php?ID=` + ID + ``);

  }

  //Service for save a new contact
  insertUser(registrationDate: string, name: String, address: String, phone: String, curp: String){


    return this.http.get(`${this.URL}insertUserService.php?registrationDate="`+ registrationDate + `"&name="` + name + `"&address="` + address + `"&phone=` + phone + `&curp="` + curp + `"`);

  }

  //Service for edit a contact
  editUser(id: String, registrationDate: string, name: String, address: String, phone: String, curp: String){


    return this.http.get(`${this.URL}editUserService.php?ID=` + id + `&registrationDate="`+ registrationDate + `"&name="` + name + `"&address="` + address + `"&phone=` + phone + `&curp="` + curp + `"`);

  }
}
