import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Pokemon } from '../dto/pokemon';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly http = inject(HttpClient);
  
  GetPokemon(nameOrId: string | number): Observable<Pokemon> {
    const url = `${environment.api_base}pokemon/${nameOrId}`;
    return this.http.get<Pokemon>(url).pipe(
      map(p => ({ ...p, name: p.name?.toLowerCase() })),
      catchError(err => {
        console.error('Erro ao buscar Pokémon:', err);
        return throwError(() => new Error('Não foi possível buscar o Pokémon.'));
      })
    );
  }
}
