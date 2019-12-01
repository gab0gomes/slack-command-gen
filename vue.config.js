module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/slack-command-gen'
    : '/',
};
