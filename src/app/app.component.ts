import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from "./footer/footer.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    /*this.router.events.subscribe(() => {
      const childRoute = this.route.firstChild;
      if (childRoute) {
        const title = childRoute.snapshot.data['title'] || 'User Management';
        const description = childRoute.snapshot.data['description'] || 'Default description';
        const keywords = childRoute.snapshot.data['keywords'] || 'default, keywords';
        this.setMetaTags(title, description, keywords);
      }
    });*/
  }


  setMetaTags(title: string, description: string, keywords: string): void {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
  }
  

}
