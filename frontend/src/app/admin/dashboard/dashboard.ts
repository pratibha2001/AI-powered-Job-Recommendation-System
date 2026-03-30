import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { JobService } from '../../services/job';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, HttpClientModule, FormsModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit {
  jobs: any[] = [];
  newJob = { title: '', company: '', location: '', salary: '' };

  constructor(private auth: AuthService, private router: Router, private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs() {
    this.jobService.getAllJobs().subscribe((data) => (this.jobs = data));
  }

  addJob() {
    this.jobService.addJob(this.newJob).subscribe(() => {
      this.newJob = { title: '', company: '', location: '', salary: '' };
      this.fetchJobs();
    });
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id).subscribe(() => this.fetchJobs());
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }

}
