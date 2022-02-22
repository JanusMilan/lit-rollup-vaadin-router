
// Klasse für Authorization
export class AuthorizationService {

  // key für Token
  private readonly key = 'key';

  // prüfen Authorization
  public isAuthorized(): Promise<boolean> {
    const token = this.getToken();
    // Authorization ist NICHT immplementiert
    return new Promise((resolve, reject) => {
      // resolve(token !== null);      // immer 'false' da null == null ist
      // true um Zugang zu 'analytics' zu ermöglichen 
      resolve(true);
    });
  }

  // die Speicherung der Token in 'localStorage' ist NICHT implemmentiert
  setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.key);
  }
}
