import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
/* import 'rxjs/add/operator/filter'; */
import  * as auth0  from 'auth0-js'
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams, provideHttpClient, withFetch } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'cSab7XYHx9yKcfOqYU9LJpUOFE9AA77b',
    domain: 'dev-u5hvg8wb8m85i4jl.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'https://0maxwelle4.github.io/no-frontiers/home',
    /* redirectUri: 'http://localhost:4200', */
    audience: 'https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/api/v2/',
    scope: 'openid profile email read:current_user user_metadata create:users'
  });


  constructor(public router: Router, private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object, private activatedRoute: ActivatedRoute ) {}

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  handleAuthentication(): void {
    if (typeof window !== 'undefined') {
      this.auth0.parseHash((err, authResult) => {
        if (authResult) {
          if (authResult.accessToken && authResult.idToken && authResult.expiresIn) {
            this.setSession(authResult);
            this.router.navigate(['/']); // Redirect to home after successful login
          } else {
            console.error('Authentication result is missing required properties.');
          }
        } else if (err) {
          console.error(`Error: ${err.error}`);
        } else {
          console.error('Authentication result is undefined.');
        }
      });
    } else {
      console.error('handleAuthentication can only be called in the browser environment.');
    }
  }
  
  

  private setSession(authResult: auth0.Auth0DecodedHash): void {
    if (authResult.expiresIn !== undefined) {
      // Set the time that the access token will expire
      const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
  
      // Save authentication data in local storage
      localStorage.setItem('access_token', authResult.accessToken || '');
      localStorage.setItem('id_token', authResult.idToken || '');
      localStorage.setItem('expires_at', expiresAt);
    } else {
      console.error('Auth result does not contain expiresIn property.');
    }
  }
  

  public login(): void{

    if (typeof window !== 'undefined') {
      this.auth0.authorize();
    }else {
      console.error('login can only be called in the browser environment.');
    }
  }

  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.isAuthenticatedSubject.next(false);
    // Redirect to the home route
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    if (typeof localStorage !== 'undefined') {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
      return new Date().getTime() < expiresAt;
    } else {
      // Handle non-browser environments (e.g., return false if localStorage is not available)
      
      return false;
    }
  }

  getUserProfile(): Observable<any> {
    // Check if the code is running in the browser environment
    if (isPlatformBrowser(this.platformId)) {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        return this.http.get<any>('https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/userinfo', {
          headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`)
        });
      } else {
        console.error("ERROR: Access token not found in localStorage.");
        // Return an observable with an error
        return throwError("Access token not found in localStorage.");
      }
    } else {
      console.error("ERROR: getUserProfile() cannot be called in a non-browser environment.");
      // Return an observable with an error
      return throwError("getUserProfile() cannot be called in a non-browser environment.");
    }
  }


  metaData( id:any ){
    const accessToken = localStorage.getItem('access_token');    
    console.log(accessToken);
    const userId = id;
    const url = `https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/api/v2/users/${userId}`
    let header = new HttpHeaders({
      'Accept': `application/json`,
      'Authorization': `Bearer ${accessToken}`
    })
    return this.http.get<any>(encodeURI(url),{headers: header});
  
  }

  CrearProfesor(profesor: any): Observable<any> {
    return from(this.tokenApi()).pipe(
      switchMap(accessToken => {
        console.log(accessToken);
        
        const body = JSON.stringify(profesor);
        const url = `https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/api/v2/users`;
        let header = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        });    

        return this.http.post<any>(url, body, { headers: header });
      })
    );
  }

  getUserbyId( id:any ){
    return from (this.tokenApi()).pipe(
      switchMap(accessToken => {
        //console.log(accessToken);

        const url = `https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/api/v2/users/${id}`;
        let header = new HttpHeaders({
          'Authorization': `Bearer ${accessToken}`
        });

        return this.http.get<any>(url, { headers: header});
      })
    );
  }

  tokenApi(): Promise<string> {
    let accessToken = ''; 

    const header = new HttpHeaders({ 
      'content-type': 'application/x-www-form-urlencoded'
    });

    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: 'hymDxVjcTI8Tp24mbisLeSn7x7yfmrqD',
      client_secret: 'JP5UPRCe_tSXUGL5a7d2gsjHme5Rps8zd3LZzddcVFoCPdK3FXRcfK8irBpfAEgy',
      audience: 'https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/api/v2/'
    });

    const url = 'https://dev-u5hvg8wb8m85i4jl.eu.auth0.com/oauth/token';

    return this.http.post<any>(url, body.toString(), { headers: header }).toPromise().then(data => {
      accessToken = data.access_token;
      //console.log('Access token:', accessToken);
      return accessToken;
    }).catch(error => {
      console.error('Error while fetching token:', error);
      throw error;
    });
  }

}

