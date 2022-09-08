import { Component, Inject } from '@angular/core';

import LiferayParams from '../types/LiferayParams'

import { ClientiService } from './clienti.service';
import { clienti } from './clienti';

declare const Liferay: any;

@Component({
    selector: 'app-root',
	templateUrl:
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/test-creazione-portlet/app/app.component.html'
})
export class AppComponent {
	params: LiferayParams;
	labels: any;
	clienti: clienti[];
    loading: boolean = false;
    errorMessage: string;

	constructor(@Inject(ClientiService) private clientiService:ClientiService) {
		this.labels = {        
			
			configuration: 'Configurazione',
			
			portletNamespace: 'Portlet Namespace',
        	contextPath: 'Context Path',
			portletElementId: 'Portlet Element Id',
			nuovaLabel: 'Nuova Label Aggiunta',
		}
	}

	get configurationJSON() {
		return JSON.stringify(this.params.configuration, null, 2);
	}

	get chiamataNuova() {
	    return "prova";
    }

    public getClienti() {
        this.loading = true;
        this.errorMessage = "";
        this.clientiService.getClienti()
          .subscribe(
            (response) => {                           //next() callback
              console.log('response received')
              this.clienti = response;
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
