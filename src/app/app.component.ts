import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ApiCRUD_Test_IronMountain';

  getName(): void{

      console.log("Hello Angular");
  }
}
