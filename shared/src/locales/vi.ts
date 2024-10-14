const vi = {
  pageTitle: {
    home: 'Trang chủ',
    notFound: 'Không tìm thấy trang',
    serverError: 'Đã xảy ra lỗi'
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
  }
} as const;

export default vi;
