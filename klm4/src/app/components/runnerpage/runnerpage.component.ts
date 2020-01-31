import {Component, OnInit} from '@angular/core';
import {RunnerService} from './runner.service';

@Component({
  selector: 'app-runnerpage',
  templateUrl: './runnerpage.component.html',
  styleUrls: ['./runnerpage.component.css']
})
export class RunnerpageComponent implements OnInit {
  constructor(public runnerRouter: RunnerService) {
  }

  ngOnInit() {
  }
}
