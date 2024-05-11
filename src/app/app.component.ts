import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

interface Repo {
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
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: string = 'kavinder-singh-3702';
  repos: Repo[] = [];
  loading: boolean = true;
  pageSize: number = 10;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchRepos();
  }

  fetchRepos() {
    this.apiService.getRepos(this.user, this.pageSize).subscribe(
      (data) => {
        console.log(data);
        this.repos = data;
        this.loading = false;
      },
      (error) => {
        console.log('Error fetching repositories:', error);
        this.loading = false;
      }
    );
  }
}
