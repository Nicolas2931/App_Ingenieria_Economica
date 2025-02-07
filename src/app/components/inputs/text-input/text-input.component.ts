import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  @Input()
  inputType: string = 'text';

  @Input()
  class: string = '';

  @Input()
  name: string = 'input';

  @Input()
  label: HTMLElement | string;
}
