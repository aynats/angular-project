import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SupabaseService } from './supabase.service';
import { Login } from './components/login/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-project');
  constructor(private supabaseService: SupabaseService) { }

  async ngOnInit() { }
}
