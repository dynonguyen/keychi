const en = {
  pageTitle: {
    home: 'Home page',
    notFound: 'Page not found'
  },
  notFound: {
    title: 'Oops!',
    description: "We can't seem to find the page you're looking for.",
    backHome: 'Return to our <toHome>home page</toHome> or <toContact>contact us</toContact>.'
  },
  serverError: {
    title: 'Server Error',
    description: 'An error occurred on the server. Please try again later.'
  }
} as const;

export default en;
