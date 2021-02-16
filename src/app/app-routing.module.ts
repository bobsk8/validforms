import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main', loadChildren: () => import('./views/main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: '', loadChildren: () => import('./views/login/login.module')
      .then(m => m.LoginModule)
  },
  { path: 'main', redirectTo: 'main/person', pathMatch: 'full' },
  {
    path: '**', redirectTo: 'login', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
