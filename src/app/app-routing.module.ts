import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './components/core/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: '', loadChildren: './components/misc/misc.module#MiscModule'},
    { path: '', loadChildren: './components/user/user.module#UserModule'},
    { path: '', loadChildren: './components/account/account.module#AccountModule'},
    { path: '', loadChildren: './components/admin/admin.module#AdminModule'},
    // { path: '', loadChildren: './shared/shared.module#SharedModule'},
    { path: '**', redirectTo: '/' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
