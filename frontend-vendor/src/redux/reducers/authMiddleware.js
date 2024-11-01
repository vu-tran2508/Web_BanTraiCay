import AuthService from '../../services/AuthService';
import { jwtDecode } from 'jwt-decode';
import useAuthNavigation from './useAuthNavigation';  // Đường dẫn cụ thể đến hook mới

const requireAuth = () => (next) => (action) => {
  const { redirectToLogin, redirectToForbidden } = useAuthNavigation();  // Sử dụng hook mới

  const currentUser = AuthService.getCurrentUser();
  const path = decodeURIComponent(window.location.pathname);
  const isAdminRoute = path.startsWith('/admin');

  if (isAdminRoute && (!currentUser || !currentUser.accessToken)) {
    redirectToLogin();
  }

  if (isAdminRoute) {
    const decodedToken = jwtDecode(currentUser.accessToken);

    if (!decodedToken || !(decodedToken.roles.includes('ROLE_STAFF') || decodedToken.roles.includes('ROLE_ADMIN'))) {
      redirectToForbidden();
    }
  }

  return next(action);
};

export default requireAuth;
