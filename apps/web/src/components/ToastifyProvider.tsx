import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import useThemeStore from '../stores/theme';

export const ToastifyProvider = () => {
  const isDark = useThemeStore((state) => state.isDark);

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
