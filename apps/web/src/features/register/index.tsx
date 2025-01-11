import AuthLayout from '../../layouts/AuthLayout';
import AuthNavigation from '../login/components/AuthNavigation';
import RegisterForm from './components/RegisterForm';
import WelcomeText from './components/WelcomeText';

export const Register = () => {
  return (
    <AuthLayout>
      <WelcomeText />
      <AuthNavigation />
      <RegisterForm />
    </AuthLayout>
  );
};

export default Register;
