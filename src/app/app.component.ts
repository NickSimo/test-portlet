import { Component, Inject } from '@angular/core';

import { MonitoraggioService } from './monitoraggio.service';
import { monitoraggio } from './monitoraggio';

declare const Liferay: any;

@Component({
    selector: 'app-root',
	templateUrl:
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/test-creazione-portlet/app/app.component.html'
})
export class AppComponent {
	monitoraggio: monitoraggio[];

    loading: boolean = false;
    errorMessage: string;

    name = 'Angular';

    options = {
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true,
                },
            },
        ],
        yAxis: [
            {
                type: 'value',
            },
        ],
        series: [
            {
                name: 'Counters',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220],
            },
        ],
    };

	constructor(@Inject(MonitoraggioService) private monitoraggioService:MonitoraggioService) {
	}

//     public getMonitoraggio(tipo:string) {
//
//       }

  

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
