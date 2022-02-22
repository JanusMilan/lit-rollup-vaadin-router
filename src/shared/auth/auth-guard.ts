import { Commands, Context, RedirectResult } from '@vaadin/router';
import { AuthorizationService } from './authorization-service';
// Import des Interface Typs PageEnabled für Methode 'pageEnabled' 
import { PageEnabled } from './page-enabled';

// Klasse exportieren und in 'index.ts' importieren
export class AuthGuard implements PageEnabled {
  // AuthorizationService
  private authService: AuthorizationService;
  constructor() {
    this.authService = new AuthorizationService();
  }

  // Methode 'pageEnabled' nach Interface Typ PageEnabled 'page-enabled'
  public async pageEnabled(
    context: Context,
    commands: Commands,
    pathRedirect?: string
  ): Promise<RedirectResult | undefined> {   // Methoden-Rückgabe
    const isAuthenticated = await this.authService.isAuthorized();
    /* 
       Wenn Authorization scheitert dann wird gewollte Navigation in 'analyticts' 
       umgeleitet mit 'redirect' in Path 'blog' was im 'index.ts' festgelegt ist 
    */
    if (!isAuthenticated) {
      // 'context.pathname' ist gewollte Navigations-Path 'analytics'
      console.warn('User not authorized', context.pathname);
      // 'pathRedirect' ist Path für 'redirect' wenn Authorization scheitert
      console.log("pathRedirect", pathRedirect)
      return commands.redirect(pathRedirect ? pathRedirect : '/');
    }
    /*  
        Wenn Authorization klappt dann wird gewollte Navigation in 'analyticts' 
        nicht gestört was im 'index.ts' festgelegt ist 
    */
    return undefined;
  }
}

// Methode exportieren und in 'index.ts' importieren
                               // path            
export async function authGuard(context: Context, commands: Commands) {
  const isAuthenticated = await new AuthorizationService().isAuthorized();

  if (!isAuthenticated) {
    console.warn('User not authorized', context.pathname);
    return commands.redirect('/');
  }

  return undefined;
}
