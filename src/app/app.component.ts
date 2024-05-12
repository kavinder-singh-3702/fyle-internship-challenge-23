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
        console.log('total ', this.totalPages);
      },
      (error) => {
        console.log('Error fetching repositories:', error);
        this.loading = false;
      }
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
}
