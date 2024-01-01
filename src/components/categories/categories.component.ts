import { Component, Input } from '@angular/core';
import { ICategory } from '../../models/icategory';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  @Input() categories: ICategory[] = []
}
