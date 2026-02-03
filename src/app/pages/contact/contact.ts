import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {


  name: string = '';
  email: string = '';
  feedback: string = '';
  message: string = '';

  showSuccess = false;

  constructor(private router: Router) {}

  goBack() {
    window.history.back();
  }

  openMap() {
    window.open('https://maps.google.com/?q=Mamounia Marrakech Morocco', '_blank');
  }

  openInstagram() {
    window.open('https://instagram.com', '_blank');
  }

  openFacebook() {
    window.open('https://facebook.com', '_blank');
  }

  sendMessage() {
    if(!this.name || !this.email || !this.message){
      alert('Please fill all fields');
      return;
    }

    // simulate send
    this.showSuccess = true;

    setTimeout(() => {
      this.showSuccess = false;
      this.router.navigate(['/']); // redirect home
    },2000);
  }
}

