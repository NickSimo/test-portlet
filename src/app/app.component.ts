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

    //--------------------------------------------------------------------------
	title = "withivy";
	show = true;
	chartTitle = "";
	pieChartType = "PieChart";
	type1 = "ColumnChart";
	width = 550;
	height = 400;
	onSelect(event: any) {
		console.log(event);
	}
	options = {
		title: "",
	  /*'width':400,*/ height: 200,
		tooltip: {
			textStyle: { color: "blue", fontName: "Tahoma", fontSize: "15" }
		},
		labels: "none",
		pieSliceText: "none",
		pieSliceTextStyle: { color: "red", fontSize: 9, display: "none" },
		slices: [
			{ color: "3eafe0" },
			{ color: "bd6a67" },
			{ color: "b9b262" },
			{ color: "6abf7e" },
			{ color: "6c95b7" }
		],
		is3D: false,
		fontSize: 9,
		legend: "dsd"
	};

	columnNames221 = ["Year", "value", { role: "style" }, { role: "annotation" }];
	data221 = [
		["other", { v: 2, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
		["Architect", { v: 6, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
		["Business", { v: 3, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
		["Project", { v: 8, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"],
		["developer", { v: 9, f: "$12,345" }, "color: rgb(143, 27, 0)", "$6"]
	];
	
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
				  this.monitoraggio.forEach(e => this.data221.push([e.descrizione, { v: e.numero, f: "$12,345" }, "color: rgb(143, 27, 0)", String(e.numero)]));
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
