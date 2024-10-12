const vi = {
  pageTitle: {
    home: 'Trang chủ',
    notFound: 'Không tìm thấy trang',
		serverError: 'Lỗi máy chủ'
  },
  notFound: {
    title: 'Không tìm thấy trang.',
    description: 'Trang này không tồn tại hoặc đã bị xóa!',
    backHome: 'Quay về <toHome>trang chủ</toHome> hoặc <toContact>liên hệ với chúng tôi</toContact>.'
  },
  serverError: {
    title: 'Lỗi máy chủ',
    description: 'Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.'
  }
} as const;

export default vi;
