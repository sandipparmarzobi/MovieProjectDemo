import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, public layoutService: LayoutService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const matchingRoute = this.router.config.find(
          (route) => event.url === `/${route.path}`
        );

        if (matchingRoute) {
          const layout = matchingRoute.data
            ? matchingRoute.data['layout'] || 'default'
            : 'default';

          this.layoutService.setLayout(layout);
        }
      }
    });
  }
}
