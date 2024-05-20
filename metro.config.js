const { getDefaultConfig } = require('expo/metro-config');
const { execSync } = require('child_process');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.resolverMainFields.unshift('sbmodern');
defaultConfig.resolver.sourceExts.push('cjs');

//module.exports = defaultConfig;
module.exports = {
  resetCache: true,
  server: {
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        clearTerminal();
        return middleware(req, res, next);
      };
    },
  },
};

function clearTerminal() {
  if (process.platform === 'win32') {
    execSync('cls', { stdio: 'inherit' });
  } else {
    execSync('tput cup 20 0 && tput ed', { stdio: 'inherit' });
  }
}