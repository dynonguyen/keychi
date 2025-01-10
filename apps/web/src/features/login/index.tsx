import { Flex } from '../../components/ui';
import AuthLayout from '../../layouts/AuthLayout';
import AuthNavigation from './components/AuthNavigation';
import LoginForm from './components/LoginForm';
import WelcomeText from './components/WelcomeText';

export const Login = () => {
  return (
    <AuthLayout>
      <Flex stack center className="mt-16 lg:mt-40 gap-4">
        <WelcomeText />
        <AuthNavigation />
        <LoginForm />
      </Flex>
    </AuthLayout>
  );
};

export default Login;
