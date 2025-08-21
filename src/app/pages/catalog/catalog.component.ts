import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RequestService } from '../../services/request.service';
import { Pokemon } from '../../dto/pokemon';
import { CommonModule } from '@angular/common';
import { PokemonDetailComponent } from "../../component/pokemon-detail/pokemon-detail.component";

@Component({
  selector: 'app-catalog',
  imports: [
    CommonModule,
    PokemonDetailComponent
],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  constructor (private readonly route: ActivatedRoute) {}
  private readonly destroy$ = new Subject<void>();
  private readonly pokemonService = inject(RequestService);

  id: string | null | undefined;
  pokemon?: Pokemon;
  loading = false;
  error = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id') || null
    })
    this.fetch(this.id ?? 'ditto')
  }

  fetch(nameOrId: string | number) {
    this.loading = true;
    this.error = '';
    this.pokemonService.GetPokemon(nameOrId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (p) => { this.pokemon = p; this.loading = false; },
        error: (e) => { this.error = e.message || 'Erro inesperado'; this.loading = false; }
      })
  }
}
