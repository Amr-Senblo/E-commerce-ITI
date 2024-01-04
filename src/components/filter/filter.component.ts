import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { IProduct } from '../../models/iproduct';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  providers: [SearchService],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  searchQuery!: string;
  products!: IProduct[];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((queryParams) => {
      this.searchQuery = queryParams['keyword'];
      this.searchService.getSearchResult(this.searchQuery).subscribe((data) => {
        this.products = data;
        console.log(this.products);
      });
    });
  }
}
