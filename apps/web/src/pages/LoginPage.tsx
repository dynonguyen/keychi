import { Button } from '@nextui-org/react';
import axios from 'axios';
import ThemeController from '../components/ThemeController';

export const LoginPage = () => {
  function getToken() {
    axios
      .post('http://localhost:3000/api/v1/login', {
        email: 'dyno@email.com',
        password: '1234'
      })
      .then((response) => {
        console.log(response.data.data.accessToken);
        localStorage.setItem('accessToken', response.data.data.accessToken);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  function getUser() {
    axios
      .get('http://localhost:3000/api/v1/user', {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
      })
      .then((response) => {
        console.log(`☕ DYNO LOG ~ LoginPage.tsx:25 🥺`, response.data);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }

  return (
    <div>
      <ThemeController />
      <br />

      <Button color="danger" onClick={getToken}>
        Get Token
      </Button>

      <Button color="primary" onClick={getUser}>
        Get User
      </Button>
    </div>
  );
};

export default LoginPage;
