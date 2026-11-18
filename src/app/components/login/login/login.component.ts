import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../../supabase.service';


@Component({
  selector: 'app-login',
  imports: [FormsModule], // Добавили FormsModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class Login {
  email = signal('');
  password = signal('');

  loading = signal(false);
  error = signal('');

  constructor(private supabaseService: SupabaseService) {}

  async submit(event: Event) {
    event.preventDefault();
    this.error.set('');

    if (!this.email() || !this.password()) {
      this.error.set('Пожалуйста, заполните все поля.');
      return;
    }

    this.loading.set(true);

    try {
      const { data, error } = await this.supabaseService.signIn(
        this.email(),
        this.password()
      );

      if (error) {
        // Если Supabase вернул ошибку (неверный пароль и т.д.)
        this.error.set(error.message);
      } else if (data.user) {
        // Если ошибки нет и пользователь получен
        console.log('Вход!', data.user);
        // Здесь в будущем мы сделаем редирект на страницу календаря (Router)
      }
    } catch (err: any) {
      this.error.set('Произошла неизвестная ошибка');
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }
}
