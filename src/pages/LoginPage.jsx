import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth.api';
import { authStore } from '../store/auth.store';
import './auth.css';

const loginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(4, 'Minimum 6 caractères'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await login(data);
      authStore.setTokens(response.data.token, response.data.refresh_token);
      navigate('/');
    } catch (error) {
      const message = error.response?.data?.message || 'Email ou mot de passe incorrect';
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <div className="auth-logo">🔐</div>
        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">Bienvenue, entrez vos identifiants</p>

        {serverError && (
          <div className="auth-error">{serverError}</div>
        )}

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>

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

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Connexion…' : 'Se connecter'}
          </button>

        </form>

        <p className="auth-footer">
          Pas encore de compte ?{' '}
          <Link to="/register" className="auth-link">S'inscrire</Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
