import { APP_NAME } from '../constants';

const en = {
  pageTitle: {
    home: 'Home page',
    notFound: 'Page not found',
    serverError: 'Server error',
    login: 'Sign in',
    register: 'Sign up',
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
  common: {
    signIn: 'Sign in',
    signUp: 'Sign up',
    logout: 'Logout',
    unlock: 'Unlock',
    password: 'Password',
    fullname: 'Fullname',
    vault_one: 'Vault',
    vault_other: 'Vaults',
    setting_one: 'Setting',
    setting_other: 'Settings',
    favorite_one: 'Favorite',
    favorite_other: 'Favorites',
    tool_one: 'Tool',
    tool_other: 'Tools',
    trash: 'Trash',
    newItem: 'New item',
    lockNow: 'Lock now',
    collapseSidebar: 'Collapse sidebar',
    expandSidebar: 'Expand sidebar',
    close: 'Close',
    folder_one: 'Folder',
    folder_other: 'Folders'
  },
  validation: {
    required: 'This field is required',
    minLength: 'Must be greater than or equal to {{min}} characters',
    maxLength: 'Must be less than or equal to {{max}} characters',
    invalid: 'This field is invalid',
    min: 'The maximum value is {{min}}',
    max: 'The minimum value is {{max}}',
    specialChar: 'Does not contain special characters',
    email: 'Invalid email'
  },
  features: {
    login: {
      welcomeBack: 'Welcome back',
      enterDetails: 'Hi 👋 Please enter your details',
      loginSuccess: 'Login successfully'
    },
    register: {
      getStarted: 'Get started',
      welcome: `Welcome to ${APP_NAME} - Let's create your account`,
      registerSuccess: 'Register successfully'
    },
    lock: {
      title: 'Your vault is locked'
    }
  }
} as const;

export default en;
