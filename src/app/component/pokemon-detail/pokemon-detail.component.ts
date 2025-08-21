import { Component, Input } from '@angular/core';
import { Pokemon } from '../../dto/pokemon';

@Component({
  selector: 'app-pokemon-detail',
  imports: [],
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.scss'
})
export class PokemonDetailComponent {
  @Input() pokemon: Pokemon | null = null;

  private audio?: HTMLAudioElement;

  playCry(url?: string) {
    if (!url) return;
    // guarda para SSR / ambientes sem Audio
    if (typeof Audio === 'undefined') return;

    try {
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
      this.audio = new Audio(url);
      // volume opcional: this.audio.volume = 0.9;
      void this.audio.play().catch(() => {
        // silenciosamente ignora erro (ex.: bloqueio do navegador)
      });
    } catch {
      // noop
    }
  }

  ngOnDestroy(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
      this.audio = undefined;
    }
  }
}
