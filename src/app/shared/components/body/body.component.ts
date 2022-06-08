import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild, ɵɵqueryRefresh} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { count } from 'rxjs';
import { UserServiceService } from 'src/app/user-service.service';
import Swal from 'sweetalert2';






@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})

export class BodyComponent implements OnInit {

  userForm: FormGroup;
  listData: any;
  Swal = ('sweetalert2')
  
  
  
  constructor(private fb: FormBuilder, private userService: UserServiceService) {

    this.listData = [];
    this.userForm = this.fb.group({

      txtID: ['', Validators.required],
      txtRegistrationDate: ['', Validators.required],
      txtName: ['', Validators.required],
      txtAddress: ['', Validators.required],
      txtPhone: ['', Validators.required],
      txtCurp: ['', Validators.required],


    });

    

  }

  saveOrEditUser(): void{

    let id : HTMLInputElement = <HTMLInputElement> document.getElementById("txtID");
    let name: HTMLInputElement =<HTMLInputElement> document.getElementById("txtName");
    let address: HTMLInputElement =<HTMLInputElement> document.getElementById("txtAddress");
    let phone: HTMLInputElement =<HTMLInputElement> document.getElementById("txtPhone");
    let curp: HTMLInputElement =<HTMLInputElement> document.getElementById("txtCurp");
    let title: HTMLElement =<HTMLInputElement> document.getElementById("exampleModalLabel");
    let d = new Date();
    let year = d.getUTCFullYear().toString();
    let month = d.getUTCMonth().toString().length > 1 ? d.getUTCMonth().toString() : '0' + d.getUTCMonth().toString();
    let day = d.getDate().toString().length > 1 ? d.getDate().toString() : '0' + d.getDate().toString();

    let valid: string = this.validateControls(name.value, address.value, phone.value, curp.value);
    
    if(valid.length == 0){
      if(id.value == ''){

        

        this.userService.insertUser(year + '-' + month + '-' + day, name.value,  address.value, phone.value, curp.value).subscribe (

          datas => {

            if(!(datas[0] == "NO")){

              let list = Object.entries(datas);


              list.forEach((value: any, index: number) => {

                const form = new FormGroup({

                  txtID: new FormControl(value[1].ID),
                  txtRegistrationDate: new FormControl(value[1].registrationDate),
                  txtName: new FormControl(value[1].name),
                  txtAddress: new FormControl(value[1].address),
                  txtPhone: new FormControl(value[1].phone),
                  txtCurp: new FormControl(value[1].curp)
            
                });
    
                this.listData.push(form.value);


              });

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Contact Saved',
                showConfirmButton: false,
                timer: 1500
              });

            }else{

              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Intern Error',
                showConfirmButton: false,
                timer: 1500
              });
              
            }
          }

        );

        
        

      }else{

        this.userService.editUser(id.value, year + '-' + month + '-' + day, name.value,  address.value, phone.value, curp.value).subscribe (

          datas => {

            if(datas[0] == "OK"){


              this.listData.forEach((value: any, index: number) => {
                
                if(value.txtID == id.value){

                  value.txtRegistrationDate = year + '-' + month + '-' + day;
                  value.txtName = name.value;
                  value.txtAddress = address.value;
                  value.txtPhone = phone.value;
                  value.txtCurp = curp.value;

                }


              });

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Contact Edited',
                showConfirmButton: false,
                timer: 1500
              });


            }else{

              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Intern Error',
                showConfirmButton: false,
                timer: 1500
              });
              
            }
          }

        );

        

      }

      
      document.getElementById('newUserModal').click(); 
      //window.location.reload();
  
    }else{


      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: valid,
        showConfirmButton: false,
        timer: 1500
      })

    }

    

  }

  ngOnInit(): void {

    this.getAllUsers();
    this.initEvents();

  }

  initEvents(){

    let filter: HTMLInputElement =<HTMLInputElement> document.getElementById("txtSearch");
    filter.addEventListener('keyup', function(){

        
      var keyword = this.value;

      keyword = keyword.toUpperCase();
          let table: HTMLTableElement =<HTMLTableElement> document.getElementById("tableUsers");
          let all_tr =  table.getElementsByTagName("tr");
          for(var i=1; i<all_tr.length; i++){
            
            let exist: number = 0;
            let all_td = all_tr[i].getElementsByTagName("td");

            for(var a = 0; a<all_td.length; a++){

              let name_column = all_td[a];
              if(name_column){

                var name_value = name_column.textContent || name_column.innerText;
                name_value = name_value.toUpperCase();
                  if(name_value.indexOf(keyword) > -1){
                    exist += 1;  
                     // show
                      
                  }

              }

            }

            if(exist > 0){
              
              all_tr[i].style.display = "";

            
            }else{

              all_tr[i].style.display = "none"; // hide
            }
        }

    }, false);

    

  }

  getAllUsers(){


    //this.listData= [];

    this.userService.getAll().subscribe (



      datos => {
        if(datos){

            let list = Object.entries(datos);


            list.forEach((value: any, index: number) => {

              const form = new FormGroup({

                txtID: new FormControl(value[1].ID),
                txtRegistrationDate: new FormControl(value[1].registrationDate),
                txtName: new FormControl(value[1].name),
                txtAddress: new FormControl(value[1].address),
                txtPhone: new FormControl(value[1].phone),
                txtCurp: new FormControl(value[1].curp)
          
              });
  
              this.listData.push(form.value);


            });
        }
      }

    )

  }

  changeTitle(){

    this.resetControl();
    let title: HTMLElement =<HTMLInputElement> document.getElementById("exampleModalLabel");
    title.innerText="New Contact";
  }

  geteditUser(element: any){

    this.userForm.reset();

    let id: HTMLInputElement =<HTMLInputElement> document.getElementById("txtID");
    id.value=element.txtID;

    let name: HTMLInputElement =<HTMLInputElement> document.getElementById("txtName");
    name.value=element.txtName;

    let address: HTMLInputElement =<HTMLInputElement> document.getElementById("txtAddress");
    address.value=element.txtAddress;

    let phone: HTMLInputElement =<HTMLInputElement> document.getElementById("txtPhone");
    phone.value=element.txtPhone;

    let curp: HTMLInputElement =<HTMLInputElement> document.getElementById("txtCurp");
    curp.value=element.txtCurp;

    let title: HTMLElement =<HTMLInputElement> document.getElementById("exampleModalLabel");
    title.innerText="Edit Contact";
    
    

  }

  deleteUser(elemento: any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.userService.deleteUser(elemento.txtID).subscribe (

          datas => {
  
            if(datas[0] == "OK"){


              this.listData.forEach((value: any, index: number) => {
                
                if(value.txtID == elemento.txtID){

                  this.listData.splice(index, 1);

                }

              });

              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'The contact been deleted',
                showConfirmButton: false,
                timer: 1500
              });

            }else{

              Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Error',
                showConfirmButton: false,
                timer: 1500
              });

            }
  
          }
        );

       

      }
    });

    //window.location.reload();
    //this.getAllUsers();
  }

  resetControl(): void{


    this.userForm.reset();
    let csv: HTMLInputElement = <HTMLInputElement> document.getElementById("txtFileCSV");
    csv.value="";

  }


  parseCSV(text: any) {
    // Obtenemos las lineas del texto
    let lines = text.split('\n');
    return lines.map((line: any) => {
      // Por cada linea obtenemos los valores
      let values = line.split(',');
      return values;
    });
  }
  
  
  readFile() {


    let inputFile: HTMLInputElement = <HTMLInputElement> document.getElementById("txtFileCSV");



    let file = inputFile.files[0];
    console.log(file);
    if(file!=null){

      let reader = new FileReader();
      reader.onload = (e) => {
        // Cuando el archivo se terminó de cargar
        let lines = this.parseCSV(e.target.result);
        
        this.setUsersCSV(lines);

      };
      // Leemos el contenido del archivo seleccionado
      reader.readAsBinaryString(file);

      document.getElementById('uploadCSVModal').click(); 
    }else{

      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'The CSV is required',
        showConfirmButton: false,
        timer: 1500
      });


    }
  }   
  
  setUsersCSV(output: any){


    let forms: FormGroup[];
    let counter: number = 0;
    let d = new Date();
    let year = d.getUTCFullYear().toString();
    let month = d.getUTCMonth().toString().length > 1 ? d.getUTCMonth().toString() : '0' + d.getUTCMonth().toString();
    let day = d.getDate().toString().length > 1 ? d.getDate().toString() : '0' + d.getDate().toString();

    

    
      output.forEach((value: any, index:number) => {

        console.log(counter);
        if(counter > 0){

            this.userService.insertUser(year + '-' + month + '-' + day, value[0], value[1], value[2], value[3]).subscribe(

             datas => {

            if(!(datas[0] == "NO")){

              let list = Object.entries(datas);


              list.forEach((value2: any, index: number) => {

                const form = new FormGroup({

                  txtID: new FormControl(value2[1].ID),
                  txtRegistrationDate: new FormControl(value2[1].registrationDate),
                  txtName: new FormControl(value2[1].name),
                  txtAddress: new FormControl(value2[1].address),
                  txtPhone: new FormControl(value2[1].phone),
                  txtCurp: new FormControl(value2[1].curp)
            
                });
    
                this.listData.push(form.value);


              });

              

            }else{

              
            }
          }

            );
          }else{

            counter+=1;

          }
          
        
      });

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The CSV has been upload',
        showConfirmButton: false,
        timer: 1500
      });

     
    
    
    


  }

  validateControls(name: string, address: string, phone: string, curp: string): string{

    let isValid: string = "";
    let re = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
      
    if(name.length == 0){

      isValid+="The name is required \n";

    }

    if(address.length == 0){

      isValid+="The address is required \n";

    }

    if(phone.toString().length == 0){

      isValid += "The phone number is required \n"

    }else
    if(!(phone.toString().length == 10)){

      isValid += "The phone number must be ten digits \n"

    }

    if(curp.toString().length == 0){

      isValid += "The CURP is required \n"

    }else
    if(!curp.match(re)){

      isValid += "CURP format is incorrect";

    }

    return isValid; 

  }
  
}





