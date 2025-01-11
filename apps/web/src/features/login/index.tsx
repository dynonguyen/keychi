import AuthLayout from '../../layouts/AuthLayout';
import AuthNavigation from './components/AuthNavigation';
import LoginForm from './components/LoginForm';
import WelcomeText from './components/WelcomeText';

export const Login = () => {
  return (
    <AuthLayout>
      <WelcomeText />
      <AuthNavigation />
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
