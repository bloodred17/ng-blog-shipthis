import { Component, OnInit } from '@angular/core';
import { DataBridgeService } from '../services/data-bridge.service';

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {

  constructor(
    private dataProvider: DataBridgeService
  ) { }

  ngOnInit() {
    console.log("%cInitializing Holder Component", "color:cyan; font-size:18px");
  }

}
