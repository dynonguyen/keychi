const vi = {
  pageTitle: {
    home: 'Trang chủ',
    notFound: 'Không tìm thấy trang',
    serverError: 'Đã xảy ra lỗi',
    login: 'Đăng nhập',
    register: 'Đăng ký',
    lock: 'Vault của bạn đã bị khóa'
  },
  pageResultAction: 'Quay về <toHome>trang chủ</toHome> hoặc <toContact>liên hệ với chúng tôi</toContact>.',
  notFound: {
    title: 'Không tìm thấy trang.',
    description: 'Trang này không tồn tại hoặc đã bị xóa!'
  },
  serverError: {
    title: 'Đã xảy ra lỗi',
    description: 'Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.'
  },
  theme: {
    light: 'Sáng',
    dark: 'Tối',
    system: 'Hệ thống'
  },
  error: {
    INTERNAL_SERVER_ERROR: 'Đã xảy ra lỗi trên máy chủ',
    BAD_REQUEST: 'Yêu cầu không hợp lệ',
    UNAUTHORIZED: 'Không có quyền truy cập',
    USER_NOT_FOUND: 'Người dùng không tồn tại',
    EMAIL_DUPLICATE: 'Email đã tồn tại',
    INVALID_USER: 'Email hoặc mật khẩu không đúng'
  }
} as const;

export default vi;
