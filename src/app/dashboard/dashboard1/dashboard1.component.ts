import { Component } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { UsersService } from 'app/shared/auth/users.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'app/shared/Models/UserModel';
import { WorkflowService } from 'app/shared/services/workflow.service';
import { Workflow } from 'app/shared/Models/WorkflowModel';
import { DocumentService } from 'app/shared/services/document.service';
import { Documents } from 'app/shared/Models/DocModel';

declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  // plugins?: any;
}

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component {

  numberOfUsers : number ;
  numberOfProcess : number ;
  numberOfDocument : number ;

  // line chart configuration Starts
  WidgetlineChart: Chart = {
    type: 'Line', data: data['Dashboard1_WidgetlineChart'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-regular'
        })
      ],
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true
    },
    events: {
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    }
  };
  // Line chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart1: Chart = {
      type: 'Line', data: data['Dashboard1_WidgetlineChart1'],
      options: {
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisY: {
          showGrid: false,
          low: 40,
          showLabel: false,
          offset: 0
        },
        plugins: [
          ChartistTooltip({
            appendToBody: true,
            currency: '$',
            pointClass: 'ct-point-regular'
          })
        ],
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        fullWidth: true
      },
      events: {
        draw(data: any): void {
          if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: 4,
              'ct:value': data.value.y,
              'ct:meta': data.meta,
              style: 'pointer-events: all !important',
              class: 'ct-point-regular'
            });
            data.element.replace(circle);
          }
        }
      }
    };
    // Line chart configuration Ends

      // line chart configuration Starts
  WidgetlineChart2: Chart = {
    type: 'Line', data: data['Dashboard1_WidgetlineChart2'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-regular'
        })
      ],
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true
    },
    events: {
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    }
  };
  // Line chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart3: Chart = {
      type: 'Line', data: data['Dashboard1_WidgetlineChart3'],
      options: {
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisY: {
          showGrid: false,
          low: 40,
          showLabel: false,
          offset: 0
        },
        plugins: [
          ChartistTooltip({
            appendToBody: true,
            currency: '$',
            pointClass: 'ct-point-regular'
          })
        ],
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        fullWidth: true
      },
      events: {
        draw(data: any): void {
          if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: 4,
              'ct:value': data.value.y,
              'ct:meta': data.meta,
              style: 'pointer-events: all !important',
              class: 'ct-point-regular'
            });
            data.element.replace(circle);
          }
        }
      }
    };
    // Line chart configuration Ends

    constructor(private usersService:UsersService , private router:Router,public toastr: ToastrService , private workflowService:WorkflowService , private docService : DocumentService) {
    }

    //Public methods

    getAllUser(){
      this.usersService.getAllUsers().subscribe((data:User[])=>{
      this.numberOfUsers = data.length;
        console.log("work!!!",this.numberOfUsers);
      })
    }

    getAllWorkFlows(){
      this.workflowService.getAllWorkFlows().subscribe((data:Workflow[])=>{
      this.numberOfProcess = data.length ;
      console.log("work!!!",this.numberOfProcess);
      })
    }

    getAllDocs(){
      this.docService.getAllDocs().subscribe((data:Documents[])=>{
      this.numberOfDocument = data.length ;
        console.log("work!!!",this.numberOfDocument);
      })
    }

  onResized(event: any) {
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };

  ngOnInit(): void {
    this.getAllUser();
    this.getAllWorkFlows();
    this.getAllDocs();
  }
}