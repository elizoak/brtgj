import { Component } from '@angular/core';


@Component({
    selector: 'app-admin-layout',
    template: `
    <nav class="navbar navbar-expand navbar-dark bg-dark static-top">
    <a class="navbar-brand mr-1" routerLink="/admin">SHIBA TOKEN MINER</a>
    <button class="btn btn-link btn-sm text-white order-1 order-sm-0" id="sidebarToggle" href="#">
      <i class="fas fa-bars"></i>
    </button>
  </nav>
  <div id="wrapper">
    <!-- Sidebar -->
    <ul class="sidebar navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" routerLink="/admin">
          <i class="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <li class="nav-item">
          <a class="nav-link" routerLink="/admin">
            <i class="fas fa-fw fa-users"></i>
            <span>User</span></a>
        </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/admin/withdraw">
          <i class="fas fa-fw fa-money-bill"></i>
          <span>Withdraw</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/admin/deposit">
          <i class="fas fa-fw fa-coins"></i>
          <span>Deposit</span></a>
      </li>
    </ul>
    <div id="content-wrapper">
        <router-outlet></router-outlet>
</div>


    <!-- /.content-wrapper -->

  </div>`,
  styles: ['@import "/assets/temp/css/sb-admin.css";']
})
export class AdminLayoutComponent {
    title = 'admin-layout';
}
