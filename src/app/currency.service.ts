
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Conversion } from './models/conversion.interface';

@Injectable({
  providedIn: 'root' 
})
export class CurrencyService {

  private readonly LOCAL_XML_PATH = '/eurofxref-daily.xml'; 

  constructor(private http: HttpClient) { }

  
  getRates(): Observable<any> {
    return this.http.get(this.LOCAL_XML_PATH, { responseType: 'text' }).pipe(
      map(response => this.parseXML(response)),
      catchError(error => {        
        return throwError(() => new Error(this.handleHttpError(error)));
      })
    );
  }

  // Parse XML data
  private parseXML(xml: string): any {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, 'text/xml');
      const cubes = xmlDoc.getElementsByTagName('Cube');
      const senderNameElement = xmlDoc.getElementsByTagName('gesmes:name')[0];
      const senderName = senderNameElement ? senderNameElement.textContent : 'Unknown';
      const rates: { [key: string]: number } = {};
      let dateOfRates: string |null = null;

      for (let i = 0; i < cubes.length; i++) {
        const currency = cubes[i].getAttribute('currency');
        const rate = cubes[i].getAttribute('rate');
       
        if (cubes[i].getAttribute('time') !=null){
          dateOfRates = cubes[i].getAttribute('time') ;
        }
       

        if (currency && rate) {
          rates[currency] = parseFloat(rate);
        }
      }

      return {
        rates,
        source: senderName,
        date: dateOfRates
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred during XML parsing');
      }
    }
  }

  
  saveConversion(conversion: Conversion): string {
    try {
      const history = this.getConversionHistory();
      history.push(conversion);
      localStorage.setItem('conversionHistory', JSON.stringify(history));
      return 'Saved Successfully!';
    } catch (error:unknown) {
      if (error instanceof Error) {
        throw new Error(`Error: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred save');
      }
    }
  }

  
  getConversionRate(destinationCurrencyRate: number, sourceCurrencyRate: number): number {
    return destinationCurrencyRate / sourceCurrencyRate;
  }

  
  getConversionHistory(): Conversion[] {
    return JSON.parse(localStorage.getItem('conversionHistory') || '[]');
  }


  private handleHttpError(error: any): string {
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      return `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      return `Error: ${error.status} - ${error.statusText}`;
    }
  }
}
