import { Commands, Context, RedirectResult } from '@vaadin/router';

// Iterface 'PageEnabled' für Typ Definition für Methode 'pageEnabled'
export interface PageEnabled {
  pageEnabled(
    context: Context,
    commands: Commands,
    pathRedirect?: string
  ): Promise<RedirectResult | undefined>;
}
