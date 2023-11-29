import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'prescricao',
    loadChildren: () => import('./pages/prescricao/prescricao.module').then(m => m.PrescricaoModule),
  },
  {
    path: 'implementacao',
    loadChildren: () => import('./pages/prescricao/prescricao.module').then(m => m.PrescricaoModule),
  },
  // {
  //   path: 'paciente',
  //   loadChildren: () => import('./pages/paciente/paciente.module').then(m => m.PacienteModule),
  // },
  // {
  //   path: 'medicamento',
  //   loadChildren: () => import('./pages/medicamento/medicamento.module').then(m => m.MedicamentoModule),
  // },
  // {
  //   path: 'medico',
  //   loadChildren: () => import('./pages/medico/medico.module').then(m => m.MedicoModule),
  // },
  // {
  //   path: 'farmacia',
  //   loadChildren: () => import('./pages/farmacia/farmacia.module').then(m => m.FarmaciaModule),
  // },
  // {
  //   path: 'estoque',
  //   loadChildren: () => import('./pages/estoque/estoque.module').then(m => m.EstoqueModule),
  // },
  // {
  //   path: 'login',
  //   loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor() {
  }
  
  

}
