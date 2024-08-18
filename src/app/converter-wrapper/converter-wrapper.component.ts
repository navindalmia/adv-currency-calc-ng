import { Component } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyConverterComponent } from './currency-converter/currency-converter.component';
import { CalculatorComponent } from './calculator/calculator.component';
@Component({
  selector: 'app-converter-wrapper',
  standalone: true,
  imports: [NgbModule, CalculatorComponent, CurrencyConverterComponent],
  templateUrl: './converter-wrapper.component.html',
  styleUrl: './converter-wrapper.component.css'
})
export class ConverterWrapperComponent {

}
