// /admin/profile?username=luixaviles
// 

import { Commands, Context, Route, Router } from '@vaadin/router';
import './app';
import './analytics/analytics';
import { authGuard, AuthGuard } from './shared/auth/auth-guard';

const routes: Route[] = [
  {
    /* Sichtbare Kinder: 'blog' und 'about' */  
    path: '/',   // es geht auch ''
    component: 'lit-app',
    action: async () => {
      await import('./app');
    },
    children: [
      {
        // beim anklicken von 'blog'
        // geht sofort weiter zum 'blog/posts' 
        path: 'blog',
        // besteht NUR aus einem Slot
        component: 'lit-blog',
        // einfügen Kind 'blog' 
        action: async () => {
          await import('./blog/blog');
        },
        children: [
          {
            path: '',
            // leitet 'blog' um  
            redirect: './blog/posts',
          },
          {
            path: 'posts',
            component: 'lit-blog-posts',
            // einfügen Kind 'blog-posts'
            action: async () => {
              await import('./blog/blog-posts');
            },
          },
          {
            // beim anklicken von 'blog-post'
            path: 'posts/:id',
            component: 'lit-blog-post',
            action: async () => {
              await import('./blog/blog-post');
            },
          },
        ],
      },
      {
        path: 'about',
        component: 'lit-about',
        action: async () => {
          await import('./about/about');
        },
      },
      {
        path: 'admin/:section',
        component: 'lit-admin',
        action: async () => {
          await import('./admin/admin');
        },
      },
      {
        path: 'analytics',
        component: 'lit-analytics',
        // Über Construktor ausführen die Methode 'pageEnabled' 
        // um zu prüfen ob Zugang zur Analytisc erlaubt ist
        action: async (context: Context, commands: Commands) => {
          return await new AuthGuard().pageEnabled(context, commands, '/blog');
        },
        children: [
          {
            path: '/',
            component: 'lit-analytics-home',
            action: async () => {
              await import('./analytics/analytics-home');
            },
          },
          {
            path: ':period', // path: 'analytics/:period' geht NICHT
            component: 'lit-analytics-period',
            action: async () => {
              await import('./analytics/analytics-period');
            },
          },
        ],
      },
    ],
  },
];

const outlet = document.getElementById('outlet');
// Router Klasse
export const router = new Router(outlet);
// Router Methode
router.setRoutes(routes);
