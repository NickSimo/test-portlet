import { Component, Inject, OnInit } from '@angular/core';

import { MonitoraggioService } from './monitoraggio.service';
import { monitoraggio } from './monitoraggio';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

declare const Liferay: any;

@Component({
    selector: 'app-root',
	templateUrl:
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/test-creazione-portlet/app/app.component.html'
})
export class AppComponent implements OnInit{
	monitoraggio: monitoraggio[];
    loading: boolean = false;
    errorMessage: string;

    public barChartOptions: ChartOptions = {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{}], yAxes: [{}] },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    public barChartLabels: Label[];
    public barChartType: ChartType = 'bar';
    public barChartLegend = true;
    public barChartPlugins:any = [];
    public barChartData: ChartDataSets[];

	constructor(@Inject(MonitoraggioService) private monitoraggioService:MonitoraggioService) {
	}

//     public getMonitoraggio(tipo:string) {
//
//       }

    ngOnInit() {
        let startDateArry: any[] = [];
        let blinkArry: any[] = [];

        for (var i = 0; i < 7; i++) {
            blinkArry.push(Math.round(Math.random() * 100));
            startDateArry.push(Math.round(Math.random() * 100));
        }

        this.barChartData = [{ data: blinkArry, label: 'blinks' }];

        this.barChartLabels = [startDateArry];
        console.log('this is the issue!', this.barChartLabels);

        /* SOLUTION */
        this.barChartLabels = startDateArry;
        console.log('this is the fix!!!', this.barChartLabels);
    }

      public openCity(tipo:string) {

        const tabContents = document.getElementsByClassName(
            'tabcontent',
          ) as HTMLCollectionOf<HTMLElement>;
        const tabsList = Array.from(tabContents);

        const tabLinks = document.getElementsByClassName(
                    'tablinks',
                  ) as HTMLCollectionOf<HTMLElement>;
        const tabLinksList = Array.from(tabLinks);

        // Get all elements with class="tabcontent" and hide them
        tabsList.forEach(tab => {
          //do something
          tab.style.display = "none";
        });

        // Get all elements with class="tablinks" and remove the class "active"
        tabLinksList.forEach(tabLink => {
                 //do something
                 tabLink.className.replace(" active", "");
        });

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tipo).style.display = "block";
//         evt.currentTarget.className += " active";

        this.loading = true;
        this.errorMessage = "";
        this.monitoraggioService.getMonitoraggio(tipo)
          .subscribe(
            (response) => {                           //next() callback
              console.log('response received')
              this.monitoraggio = response;
            },
            (error) => {                              //error() callback
              console.error('Request failed with error')
              this.errorMessage = error;
              this.loading = false;
            },
            () => {                                   //complete() callback
              console.log('Request completed')      //This is actually not needed
              this.loading = false;
            })
      }

}
