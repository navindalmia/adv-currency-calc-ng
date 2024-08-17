import { Component } from '@angular/core';
import { evaluate } from 'mathjs';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {

  input: string = '';
  error: string = '';
  handleKeyDown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === 'Enter') {
      this.handleButtonClick('=');
    } else if ('0123456789+-*/().'.includes(key)) {
      this.handleButtonClick(key);
    }
  }
  
   handleButtonClick(value:string|Number) : void {
    if (value === 'C') {
     this.input=''
      this.error='';
    } else if (value === '=') {
      try {
        this.input=evaluate(this.input).toString();
      } catch (err) {
        
        this.error = 'Invalid Expression';
      }
    } else {
      if (this.error) this.error='';
      
      this.input +=value;
    }
  };
}
