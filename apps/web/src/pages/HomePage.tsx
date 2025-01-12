import { Navigate } from 'react-router-dom';
import { PATH } from '../constants/path';

export const HomePage = () => {
  return <Navigate to={PATH.VAULTS} />;
};

export default HomePage;
