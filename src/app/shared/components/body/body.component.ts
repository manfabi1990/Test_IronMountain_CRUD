import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild, ɵɵqueryRefresh} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from 'src/app/user-service.service';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  userForm: FormGroup;
  listData: any;
  
  
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

    if(id.value == ''){
      this.userService.insertUser(new Date, name.value,  address.value, phone.value, curp.value).subscribe (

        datos => {
          if(datos){

              
          }
        }

      )
    }else{

      this.userService.editUser(id.value, new Date(), name.value,  address.value, phone.value, curp.value).subscribe (

        datos => {
          if(datos){

              
          }
        }

      )

    }

    document.getElementById('newUserModal').click(); 
    window.location.reload();
    //this.getAllUsers();

  }

  ngOnInit(): void {

    this.getAllUsers();

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

    let title: HTMLElement =<HTMLInputElement> document.getElementById("exampleModalLabel");
    title.innerText="New User";
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
    title.innerText="Edit User";
    
    

  }

  deleteUser(elemento: any){


    this.userService.deleteUser(elemento.txtID).subscribe (

      datos => {

        

      }
    );

    window.location.reload();
    //this.getAllUsers();
  }

  resetControl(): void{


    this.userForm.reset();

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
    let reader = new FileReader();
    reader.onload = (e) => {
      // Cuando el archivo se terminó de cargar
      let lines = this.parseCSV(e.target.result);
      
      this.setUsersCSV(lines);

    };
    // Leemos el contenido del archivo seleccionado
    reader.readAsBinaryString(file);

    document.getElementById('uploadCSVModal').click(); 

  }   
  
  setUsersCSV(output: any){


    let forms: FormGroup[];
    let counter: number = 0;

    output.forEach((value: any, index:number) => {
    
      if(counter > 0){

        
        this.userService.insertUser(new Date(), value[1], value[2], value[3], value[4]).subscribe(

          datos => {
            if(datos){
  
                
            }
          }

        );
        

      }
      
      counter+=1;
    });
    
    window.location.reload();
    //this.getAllUsers();
    


  }

}





