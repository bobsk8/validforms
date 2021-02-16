import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'main', loadChildren: () => import('./views/main/main.module')
      .then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login', loadChildren: () => import('./views/login/login.module')
      .then(m => m.LoginModule)
  },
  {
    path: 'main', redirectTo: 'main/person', pathMatch: 'full'
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
