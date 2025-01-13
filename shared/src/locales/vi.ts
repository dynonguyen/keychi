import { APP_NAME } from '../constants';

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
  },
  common: {
    signIn: 'Đăng nhập',
    signUp: 'Đăng ký',
    logout: 'Đăng xuất',
    unlock: 'Mở khóa',
    password: 'Mật khẩu',
    fullname: 'Họ tên',
    vault_one: 'Vault',
    vault_other: 'Vaults',
    setting_one: 'Cài đặt',
    setting_other: 'Cài đặt',
    favorite_one: 'Yêu thích',
    favorite_other: 'Yêu thích',
    tool_one: 'Công cụ',
    tool_other: 'Công cụ',
    trash: 'Thùng rác',
    newItem: 'Thêm mới',
    lockNow: 'Khóa ngay',
    collapseSidebar: 'Thu gọn sidebar',
    expandSidebar: 'Mở rộng sidebar'
  },
  validation: {
    required: 'Trường này là bắt buộc',
    minLength: 'Phải lớn hơn hoặc bằng {{min}} ký tự',
    maxLength: 'Phải nhỏ hơn hoặc bằng {{max}} ký tự',
    invalid: 'Trường này không hợp lệ',
    min: 'Giá trị tối thiểu là {{min}}',
    max: 'Giá trị tối đa là {{max}}',
    specialChar: 'Không chứa ký tự đặc biệt',
    email: 'Email không hợp lệ'
  },
  features: {
    login: {
      welcomeBack: 'Chào mừng trở lại',
      enterDetails: 'Xin chào 👋 Vui lòng nhập thông tin của bạn',
      loginSuccess: 'Đăng nhập thành công'
    },
    register: {
      getStarted: 'Bắt đầu',
      welcome: `Chào mừng đến với ${APP_NAME} - Hãy tạo tài khoản của bạn`,
      registerSuccess: 'Đăng ký thành công'
    },
    lock: {
      title: 'Vault của bạn đã bị khóa'
    }
  }
} as const;

export default vi;
