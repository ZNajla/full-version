import { Component } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";

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

  constructor() {}

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
}