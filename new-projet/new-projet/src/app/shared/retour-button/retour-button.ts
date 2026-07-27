import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-retour-button',
  standalone: true,
  templateUrl: './retour-button.html',
  styleUrl: './retour-button.css'
})
export class RetourButtonComponent {

  constructor(private location: Location){}

  retour(){
    this.location.back();
  }

}