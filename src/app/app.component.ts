import { Component } from '@angular/core';
import { DataBridgeService } from './services/data-bridge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-blog';
  constructor(
    private dataProvider: DataBridgeService
  ){
    console.log(
      "%cHire me.",
      "color:red;font-family:Helvetica;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold"
    );
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log("%cInitializing App Component", "color:green; font-size:18px");
  }
}
