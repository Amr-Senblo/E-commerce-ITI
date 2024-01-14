import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgxImageZoomModule } from 'ngx-image-zoom';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, RouterLink, HttpClientModule , NgxImageZoomModule],
})
export class AppComponent {
  title = 'E-commerce-ITI';
}
