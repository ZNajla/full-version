import { Component } from '@angular/core';
import { DocumentService } from 'app/shared/services/document.service';
import { TasksService } from 'app/shared/services/tasks.service';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';

declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})

export class Dashboard2Component {

  numberOfMyDoc : number ;
  numberOfMyTasks : number ;

  constructor(private docService : DocumentService , private tacheService:TasksService) {}

  getMyDocument(){
    this.docService.getDocByIdUser().subscribe((data) => {
      this.numberOfMyDoc = data.length ;
    })
  }

  getMyTasks(){
    this.tacheService.getTasksByUserId().subscribe((data) => {
      this.numberOfMyTasks = data.length ;
    })
  }
  // Line chart configuration Starts
  WidgetlineChart: Chart = {
    type: 'Line', data: data['WidgetlineDashboard2Chart'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 50,
        showLabel: false,
        offset: 0,
      },
      fullWidth: true
    },
  };
  WidgetlineChart1: Chart = {
    type: 'Line', data: data['WidgetlineDashboard2Chart_1'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 50,
        showLabel: false,
        offset: 0,
      },
      fullWidth: true
    },
  };
  WidgetlineChart2: Chart = {
    type: 'Line', data: data['WidgetlineDashboard2Chart_2'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 50,
        showLabel: false,
        offset: 0,
      },
      fullWidth: true
    },
  };
  WidgetlineChart3: Chart = {
    type: 'Line', data: data['WidgetlineDashboard2Chart_3'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0,
      },
      axisY: {
        showGrid: false,
        low: 50,
        showLabel: false,
        offset: 0,
      },
      fullWidth: true
    },
  };
  // Line chart configuration Ends

   // Donut chart configuration Starts
   DonutChart: Chart = {
    type: 'Pie',
    data: data['donutDashboard'],
    options: {
      donut: true,
      startAngle: 0,
      labelInterpolationFnc: function (value) {
        var total = data['donutDashboard'].series.reduce(function (prev, series) {
          return prev + series.value;
        }, 0);
        return total + '%';
      }
    },
    events: {
      draw(data: any): void {
        if (data.type === 'label') {
          if (data.index === 0) {
            data.element.attr({
              dx: data.element.root().width() / 2,
              dy: data.element.root().height() / 2
            });
          } else {
            data.element.remove();
          }
        }

      }
    }
  };
  // Donut chart configuration Ends

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
    this.getMyDocument();
    this.getMyTasks();
  }
}