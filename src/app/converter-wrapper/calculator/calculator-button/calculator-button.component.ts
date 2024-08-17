import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css'
})
export class CalculatorButtonComponent {
@Input() value! : string|number;  
@Input() className: string ='';
@Output() buttonClick = new EventEmitter<string| number>();

handleClick():void {
  console.log('I AM CLICKED');
  this.buttonClick.emit(this.value);
}

}
