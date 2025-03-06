import type { Routes } from "@angular/router"
import { ReleaseDetailComponent } from "./pages/release-detail/release-detail.component"
import { AntiqueDetailComponent } from "./components/antique-detail/antique-detail.component"
import { AntiquesComponent } from "./pages/antiques/antiques.component"

export const routes: Routes = [
  { path: "", loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent) },
  { path: "browse", loadComponent: () => import("./pages/browse/browse.component").then((m) => m.BrowseComponent) },
  { path: "cart", loadComponent: () => import("./pages/cart/cart.component").then((m) => m.CartComponent) },
  {
    path: "equipment",
    loadComponent: () => import("./pages/equipment/equipment.component").then((m) => m.EquipmentComponent),
  },
  {
    path: "auth",
    loadComponent: () => import("./pages/auth/auth.component").then((m) => m.AuthComponent),
    children: [
      { path: "", redirectTo: "login", pathMatch: "full" },
      {
        path: "login",
        loadComponent: () => import("./pages/auth/login/login.component").then((m) => m.LoginComponent),
      },
      {
        path: "register",
        loadComponent: () => import("./pages/auth/register/register.component").then((m) => m.RegisterComponent),
      },
    ],
  },
  {
    path: "profile",
    loadComponent: () => import("./pages/profile/profile.component").then((m) => m.ProfileComponent),
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      {
        path: "overview",
        loadComponent: () => import("./pages/profile/overview/overview.component").then((m) => m.OverviewComponent),
      },
      {
        path: "orders",
        loadComponent: () => import("./pages/profile/orders/orders.component").then((m) => m.OrdersComponent),
      },
      {
        path: "settings",
        loadComponent: () =>
          import("./pages/profile/account-settings/account-settings.component").then((m) => m.AccountSettingsComponent),
      },
      {
        path: "preferences",
        loadComponent: () =>
          import("./pages/profile/preferences/preferences.component").then((m) => m.PreferencesComponent),
      },
    ],
  },
  { path: "antiques", component: AntiquesComponent },
  { path: "release/:id", component: ReleaseDetailComponent },
  {
    path: "antiques/:id",
    component: AntiqueDetailComponent,
  },
]

