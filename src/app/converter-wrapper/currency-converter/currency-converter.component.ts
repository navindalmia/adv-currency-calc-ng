import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyService } from '../../currency.service';
import { CommonModule } from '@angular/common';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Conversion } from '../../models/conversion.interface';
@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [NgbModule, ReactiveFormsModule, CommonModule],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit {
  constructor(private currencyService: CurrencyService) { }
  currencies: string[] = [];
  isSaveDisabled: boolean = true;
  rateSource: string = "";
  updateDate!: Date;
  rates: { [key: string]: number } = {};
  saveMessage : string = "";
  error : string = "";

  currencyConverterForm = new FormGroup({
    sourceCurrency: new FormControl('', [Validators.required]),
    destinationCurrency: new FormControl('', [Validators.required]),
    sourceAmount: new FormControl('', [Validators.required, positiveNumberValidator()]),
    destinationAmount: new FormControl({ value: '', disabled: true }),
    setDestinationAmount: new FormControl(''),
    rate: new FormControl({ value: '', disabled: true }),
    // rateSource: new FormControl(''),
    // updateDate: new FormControl(''),
    // rates: new FormControl(),
    notes: new FormControl(''),
    // error: new FormControl(''),
    saveSuccess: new FormControl('')
    // isSaveDisabled: new FormControl('')
  });

  get sourceAmount() {
    return this.currencyConverterForm.get('sourceAmount');
  }

  get sourceCurrency() {
    return this.currencyConverterForm.get('sourceCurrency')!;
  }

  get destinationCurrency() {
    return this.currencyConverterForm.get('destinationCurrency')!;
  }
  getConversionRate = (sourceCurrency: string, destinationCurrency: string) => {
    return this.currencyService.getConversionRate(this.rates[destinationCurrency], this.rates[sourceCurrency]);
  };
  handleConvert(): void {
    if (this.currencyConverterForm.invalid) {
      this.currencyConverterForm.markAllAsTouched();
      return;
    }
    const sourceCurrency = this.currencyConverterForm.get('sourceCurrency')?.value;
    const destinationCurrency = this.currencyConverterForm.get('destinationCurrency')?.value;
    const sourceAmount = Number(this.currencyConverterForm.get('sourceAmount')?.value);

    const conversionRate = this.getConversionRate(sourceCurrency!, destinationCurrency!);
    const convertedAmount = sourceAmount! * conversionRate;
    this.currencyConverterForm.get('destinationAmount')?.setValue(convertedAmount.toFixed(3));
    this.currencyConverterForm.get('destinationAmount')?.setValue(convertedAmount.toFixed(3));
    this.currencyConverterForm.get('rate')?.setValue(conversionRate.toFixed(5));
    // this.currencyConverterForm.get('error')?.setValue('');

   
    this.enableSaveButton();



  }


  handleClear(): void {
    this.currencyConverterForm.reset({
      sourceCurrency: '',
      destinationCurrency: '',
      sourceAmount: '',
      destinationAmount:''
      
    });
   
   this.disableSaveButton();
  }
  handleSaveConversion(): void {
    if (this.currencyConverterForm.valid) {
      const conversion: Conversion = {
        sourceCurrency: this.currencyConverterForm.get('sourceCurrency')?.value!,
        destinationCurrency: this.currencyConverterForm.get('destinationCurrency')?.value!,
        sourceAmount:Number( this.currencyConverterForm.get('sourceAmount')?.value),
        destinationAmount:Number( this.currencyConverterForm.get('destinationAmount')?.value),
        rate: Number( this.currencyConverterForm.get('rate')?.value),
        date: new Date().toISOString(),
        rateSource:this.rateSource,
        notes: this.currencyConverterForm.get('notes')?.value??null
      };

      try {
         this.saveMessage = this.currencyService.saveConversion(conversion);
         this.displaySuccess(this.saveMessage);
      } catch (error) {
        if (error instanceof Error) {
          this.error = error.message;
          this.displayError(this.error);
        } else {
          this.error = 'An unknown error occurred while saving the conversion.';
        }
      }
    }
  }
  ngOnInit(): void {

    this.currencyService.getRates().subscribe(data => {
      this.currencies = Object.keys(data.rates);
      this.rates = data.rates;
      this.rateSource = data.source;
      this.updateDate = data.date;


    });
    
    this.currencyConverterForm.get('sourceCurrency')?.valueChanges.subscribe(() => {
      this.disableSaveButton();
    });
  
    this.currencyConverterForm.get('destinationCurrency')?.valueChanges.subscribe(() => {
      this.disableSaveButton();
    });
  
    this.currencyConverterForm.get('sourceAmount')?.valueChanges.subscribe(() => {
      this.disableSaveButton();
    });

   
  }

  disableSaveButton(): void {
    this.isSaveDisabled = true;
  }
  
  enableSaveButton(): void {
    this.isSaveDisabled = false;
  }
  displaySuccess(message:string):void {    
    setTimeout(() => this.saveMessage ='', 3000);
  this.disableSaveButton();
  }
  displayError(message:string):void {    
    setTimeout(() => this.error ='', 3000);
  this.enableSaveButton();
  }


}


export function positiveNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    
    return value != null && value <= 0 ? { 'positiveNumber': { value: control.value } } : null;
  };
}
