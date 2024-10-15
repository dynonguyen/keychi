const en = {
  pageTitle: {
    home: 'Home page',
    notFound: 'Page not found',
    serverError: 'Server error'
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
  }
} as const;

export default en;
