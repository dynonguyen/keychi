const vi = {
  pageTitle: {
    home: 'Trang chủ',
    notFound: 'Không tìm thấy trang',
    serverError: 'Đã xảy ra lỗi'
  },
  notFound: {
    title: 'Không tìm thấy trang.',
    description: 'Trang này không tồn tại hoặc đã bị xóa!',
    backHome: 'Quay về <toHome>trang chủ</toHome> hoặc <toContact>liên hệ với chúng tôi</toContact>.'
  },
  serverError: {
    title: 'Đã xảy ra lỗi',
    description: 'Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.'
  }
} as const;

export default vi;
