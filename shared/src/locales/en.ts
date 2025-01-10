const en = {
  pageTitle: {
    home: 'Home page',
    notFound: 'Page not found',
    serverError: 'Server error',
    login: 'Sign in',
    register: 'Register',
    lock: 'Your vault is locked'
  },
  pageResultAction: 'Return to our <toHome>home page</toHome> or <toContact>contact us</toContact>.',
  notFound: {
    title: 'Oops!',
    description: "We can't seem to find the page you're looking for."
  },
  serverError: {
    title: 'Server error',
    description: 'An error occurred on the server. Please try again later.'
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
    system: 'System'
  },
  error: {
    INTERNAL_SERVER_ERROR: 'Internal server error',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized',
    USER_NOT_FOUND: 'User not found',
    EMAIL_DUPLICATE: 'Email already exists',
    INVALID_USER: 'Invalid email or password'
  },
  features: {
    login: {
      welcomeBack: 'Welcome Back',
      enterDetails: 'Hi 👋 Please enter your details',
      loginSuccess: 'Login successfully'
    }
  },
  common: {
    signIn: 'Sign in',
    signUp: 'Sign up'
  }
} as const;

export default en;
