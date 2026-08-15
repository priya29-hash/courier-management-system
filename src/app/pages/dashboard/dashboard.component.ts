import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: any = {};

  dashboardCards: any[] = [];

  chart: any;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {

    this.dashboardService.getDashboardStats().subscribe({

      next: (data: any) => {

        this.stats = data;

        this.dashboardCards = [

          {
            title: 'Employees',
            value: data.employees,
            route: 'employee'
          },

          {
            title: 'Branches',
            value: data.branch_inscan,
            route: 'branch-inscan'
          },

          {
            title: 'Vehicles',
            value: data.vehicles,
            route: 'vehicle'
          },

          {
            title: 'Bags',
            value: data.bags,
            route: 'bag'
          },

          {
            title: 'Manifests',
            value: data.manifests,
            route: 'manifest'
          },

          {
            title: 'Documents',
            value: data.documents,
            route: 'documents'
          },

          {
            title: 'Deliveries',
            value: data.deliveries,
            route: 'delivery'
          },

          {
            title: 'Tracking',
            value: data.tracking,
            route: 'tracking'
          }

        ];

        this.createChart();

      },

      error: (err: any) => {
        console.error('Dashboard Error:', err);
      }

    });

  }

  createChart(): void {

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('lineChart', {

      type: 'line',

      data: {

        labels: [
          'Employees',
          'Branches',
          'Vehicles',
          'Bags',
          'Manifests',
          'Documents',
          'Deliveries',
          'Tracking'
        ],

        datasets: [

          {

            label: 'Courier Records',

            data: [

              this.stats.employees,
              this.stats.branch_inscan,
              this.stats.vehicles,
              this.stats.bags,
              this.stats.manifests,
              this.stats.documents,
              this.stats.deliveries,
              this.stats.tracking

            ],

            borderColor: '#ff6d00',

            backgroundColor: 'rgba(255,109,0,0.20)',

            fill: true,

            tension: 0.4,

            borderWidth: 3,

            pointRadius: 5,

            pointHoverRadius: 7

          }

        ]

      },

     options: {

  responsive: true,

  maintainAspectRatio: false,

  scales: {

    y: {

      beginAtZero: true,

      ticks: {

        stepSize: 1,

        precision: 0

      }

    }

  }

}

    });

  }

  goTo(route: string): void {
    this.router.navigate(['/app', route]);
  }

}