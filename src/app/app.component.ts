import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

interface Repo {
  status: string;
  serviceName: string;
  owner: {
    avatar_url: string;
    login: string;
  };
  name: string;
  private: boolean;
  created_at: string;
  html_url: string;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  open_issues: number;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: string = ''; // Initialize user as empty string
  pagesArray: number[] = [];

  totalRepos: number = 0;
  repos: Repo[] = [];
  loading: boolean = false;
  pageSize: number = 10;
  currentPage: number = 1;
  selectedTenant: any;
  reposervice: any;
  toastr: any;
  filteredRepos: Repo[] = [];
  // noOfPages: number = 5;
  totalPages: number = 0; // Add totalPages property
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.updatePage();
  }

  fetchRepos() {
    const offset = this.currentPage;
    this.apiService.getRepos(this.user, this.pageSize, offset).subscribe(
      (data) => {
        console.log(data);
        this.repos = data;
        this.loading = false;
        this.totalPages = Math.ceil(this.totalRepos / this.pageSize); // Calculate totalPages
        this.calculatePagesArray();
        console.log('total ', this.totalPages);
      },
      (error) => {
        console.log('Error fetching repositories:', error);
        this.loading = false;
      }
    );
  }
  calculatePagesArray() {
    const startPage = Math.max(1, this.currentPage - 2);
    const endPage = Math.min(this.totalPages, startPage + 4);
    this.pagesArray = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }
  fetchUser() {
    this.apiService.getUser(this.user).subscribe(
      (data) => {
        console.log(data);
        this.totalRepos = data.public_repos;
      },
      (error) => {
        console.log('Error fetching repositories:', error);
        this.error = error;
        this.loading = false;
      }
    );
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.totalRepos / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  onSearch(username: string) {
    this.user = username;
    this.currentPage = 1;
    this.updatePage();
    this.fetchUser();
  }
  updatePage() {
    this.fetchRepos();
  }

  // Method to navigate to a specific page
  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.currentPage = page;
      this.fetchRepos(); // Fetch repositories for the selected page
    }
  }
}
