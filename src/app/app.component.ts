import { Component, Inject, ViewChild, ElementRef } from '@angular/core';

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

    //--------------------------------------------------------------------------
    type = 'barChart';
    RESOURCE_DOWNLOAD_TITLE     ="Risorse piu scaricate"
    RESOURCE_VIEW_TITLE         ="Risorse piu visualizzate"
    DATASET_VIEW_TITLE          ="Dataset piu visualizzati"
    ORGANIZATION_VIEW_TITLE     ="Organizzazioni piu visualizzate"
    PAGE_VIEW_TITLE             ="Pagine piu visualizzate"
	title = "withivy";
	show = true;
	chartTitle = "";
	pieType = "PieChart";
	barChartType = "BarChart";
	//width = 1000;
	barHeight : number;
    pieHeight: number;
    pieWidth: number;

    @ViewChild('tabcontent')
    tabcontent: ElementRef;
	onSelect(event: any) {
		console.log(event);
	}

	barOptions = {
        //title: "prova",
        //height: 50000,
        width: 1000,
        fontSize: 12,
        fontName: "Arial",
        bar: { groupWidth: '60%' },
        chartArea: { left: 220, top: 20 },
        legend: { position: "none" }
    };

    pieOptions = {
        //width: 10000,
        fontSize: 12,
        fontName: "Arial",
        chartArea: { left: 0, top: 20, width: '100%', height: '75%'}
    };

	columnNames221 = ["Year", "value", { role: "style" }, { role: "annotation" }];
	data221: (string | { v: number; f: string; })[][];
	
    //--------------------------------------------------------------------------


	constructor(@Inject(MonitoraggioService) private monitoraggioService:MonitoraggioService) {
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
        tabsList.forEach(tab => {
          tab.style.display = "none";
        });
        tabLinksList.forEach(tabLink => {
                 tabLink.className.replace(" active", "");
        });
        document.getElementById(tipo).style.display = "block";
        this.loading = true;
        this.errorMessage = "";
        this.monitoraggioService.getMonitoraggio(tipo)
          .subscribe(
            (response : monitoraggio[]) => {  
              console.log('response received')
				  this.monitoraggio = response;
				  console.log("Monitoraggio prima del for: ", this.monitoraggio);
				  this.data221 = [];
                  this.monitoraggio.forEach(e => this.data221.push([e.descrizione, { v: e.numero, f: null }, "color: #3366cc", String(e.numero)]));
                  console.log("Bar chart height: " + this.data221.length * 80)
                  this.barHeight = this.data221.length * 80;
                  this.pieHeight = 200 + this.data221.length * 40;
                  console.log("PieChart height: " + (200 + this.data221.length * 40))
                  this.pieWidth = this.tabcontent.nativeElement.offsetWidth
                  console.log("PieChart width: " + this.tabcontent.nativeElement.offsetWidth)
            },
            (error) => {           
              console.error('Request failed with error')
              this.errorMessage = error;
              this.loading = false;
            },
            () => {                                
              console.log('Request completed')     
              this.loading = false;
			  })
		
	}

  
}
