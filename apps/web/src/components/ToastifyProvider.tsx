import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useTheme from '../hooks/useTheme';

export const ToastifyProvider = () => {
  const { isDark } = useTheme();

  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={true}
      draggable={false}
      pauseOnHover
      theme={isDark ? 'dark' : 'light'}
    />
  );
};

export default ToastifyProvider;
