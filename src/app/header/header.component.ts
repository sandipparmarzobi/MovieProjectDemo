import { Component, ElementRef, Renderer2 } from '@angular/core';
declare var $: any; // Declare jQuery to be available in your component

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  openModal() {
    const modalElement = this.el.nativeElement.querySelector('#myModal'); // Replace 'myModal' with your modal's ID
    this.renderer.setProperty(modalElement, 'style.display', 'block');
  }
}
