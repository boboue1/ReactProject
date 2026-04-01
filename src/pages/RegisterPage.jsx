import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerUser } from '../features/users/users.api';
import './auth.css';

const registerSchema = z.object({
  nom: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  password: z.string().min(6, 'Minimum 6 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError(null);
    try {
      await registerUser({ nom: data.nom, email: data.email, password: data.password });
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message || 'Une erreur est survenue';
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">✨</div>
        <h1 className="auth-title">Créer un compte</h1>
        <p className="auth-subtitle">Rejoignez-nous, c'est rapide et gratuit</p>

        {serverError && (
          <div className="auth-error">{serverError}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

          <div className="auth-field">
            <label className="auth-label">Nom</label>
            <input
              {...register('nom')}
              type="text"
              placeholder="Dupont"
              className={`auth-input${errors.nom ? ' has-error' : ''}`}
            />
            {errors.nom && <span className="auth-field-error">{errors.nom.message}</span>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="exemple@email.com"
              className={`auth-input${errors.email ? ' has-error' : ''}`}
            />
            {errors.email && <span className="auth-field-error">{errors.email.message}</span>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className={`auth-input${errors.password ? ' has-error' : ''}`}
            />
            {errors.password && <span className="auth-field-error">{errors.password.message}</span>}
          </div>

          <div className="auth-field">
            <label className="auth-label">Confirmer le mot de passe</label>
            <input
              {...register('confirmPassword')}
              type="password"
              placeholder="••••••••"
              className={`auth-input${errors.confirmPassword ? ' has-error' : ''}`}
            />
            {errors.confirmPassword && <span className="auth-field-error">{errors.confirmPassword.message}</span>}
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Inscription…' : "S'inscrire"}
          </button>

        </form>

        <p className="auth-footer">
          Déjà un compte ?{' '}
          <Link to="/login" className="auth-link">Se connecter</Link>
        </p>

      </div>
    </div>
  );
};

export default RegisterPage;
