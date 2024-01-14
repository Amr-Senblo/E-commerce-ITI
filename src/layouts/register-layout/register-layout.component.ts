import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-layout',
  standalone: true,
  templateUrl: './register-layout.component.html',
  styleUrl: './register-layout.component.css',
  imports: [RouterModule, FooterComponent],
})
export class RegisterLayoutComponent {}
