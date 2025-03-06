import { Component, type OnInit } from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { CommonModule } from "@angular/common"
import { SiteHeaderComponent } from "./components/site-header/site-header.component"
import { SiteFooterComponent } from "./components/site-footer/site-footer.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, SiteHeaderComponent, SiteFooterComponent],
  template: `
    <div class="min-h-screen bg-cream flex flex-col">
      <app-site-header></app-site-header>
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-site-footer></app-site-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  title = "Vinyl Vault"

  ngOnInit() {
    // Remove any dark mode related logic
  }
}

