import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-4 group cursor-pointer">
      <div class="relative">
        <!-- Artistic Logo: Interlocking Circles with Gold Glow -->
        <div class="w-14 h-14 rounded-full border-2 border-cafe-dark flex items-center justify-center relative z-10 bg-cafe-cream group-hover:border-cafe-gold transition-all duration-700">
          <mat-icon class="text-cafe-dark group-hover:text-cafe-gold transition-colors duration-500">local_cafe</mat-icon>
        </div>
        <div class="absolute -top-1 -right-1 w-14 h-14 rounded-full border border-cafe-gold/30 -z-0 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-700"></div>
      </div>
      <div class="flex flex-col -space-y-2">
        <span class="text-3xl font-serif italic tracking-tighter text-cafe-dark group-hover:text-cafe-gold transition-colors duration-500">Vibrant</span>
        <span class="text-[9px] font-sans font-black tracking-[0.6em] text-cafe-dark/40 uppercase pl-1">Roastery</span>
      </div>
    </div>
  `
})
export class Logo {}
