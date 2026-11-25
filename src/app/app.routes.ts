import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.page').then((m) => m.HomePage) },
  { path: 'projects', loadComponent: () => import('./features/projects/projects.page').then((m) => m.ProjectsPage) },
  {
    path: 'projects/:slug',
    loadComponent: () => import('./features/project-detail/project-detail.page').then((m) => m.ProjectDetailPage),
  },
  { path: 'about', loadComponent: () => import('./features/about/about.page').then((m) => m.AboutPage) },
  // The contact page moved to the home page; keep old links working.
  { path: 'contact', redirectTo: () => inject(Router).createUrlTree(['/'], { fragment: 'contact' }) },
  { path: '**', loadComponent: () => import('./features/not-found/not-found.page').then((m) => m.NotFoundPage) },
];
