import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  @Input() owner!: any;
  @Input() name!: string;
  @Input() private!: boolean;
  @Input() created_at!: string;
  @Input() html_url!: string;
  @Input() stargazers_count!: number;
  @Input() watchers_count!: number;
  @Input() language!: string;
  @Input() topics!: string[];
  @Input() open_issues!: number;
  @Input() description!: string;

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
