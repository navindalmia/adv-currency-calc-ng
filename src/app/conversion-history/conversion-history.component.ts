import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../currency.service';
import { Conversion } from '../models/conversion.interface';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-conversion-history',
  standalone: true,
  imports: [NgbModule, CommonModule, AgGridModule, AgGridAngular],
  templateUrl: './conversion-history.component.html',
  styleUrl: './conversion-history.component.css'
})
export class ConversionHistoryComponent implements OnInit {
  history: Conversion[] = [];

  columnDefs = [
    { headerName: 'Source Currency', field: 'sourceCurrency' },
    { headerName: 'Source Amount', field: 'sourceAmount' },
    { headerName: 'Rate', field: 'rate' },
    { headerName: 'Destination Currency', field: 'destinationCurrency' },
    { headerName: 'Destination Amount', field: 'destinationAmount' },
    { headerName: 'Date/Time', field: 'date' },
    { headerName: 'Rate Source', field: 'rateSource' },
    { headerName: 'Notes', field: 'notes', wrapText: true, width: 350 }
  ];

  gridOptions = {
    defaultColDef: {
      resizable: true,
      autoHeight: true
    }
  };
  paginationPageSizeSelector = [10, 20, 50];
  constructor(private currencyService: CurrencyService) { }
  ngOnInit(): void {
    this.history = this.currencyService.getConversionHistory();


  }
}
