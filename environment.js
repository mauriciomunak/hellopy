// Data Environment
// Poner en false para la instrucción $ electron-packager ./ --platform=win32 --arch=x64 --overwrite
const modedevelop = true;

const env = {
  dev: modedevelop,
  urlpy: modedevelop ? "./py/" : "./resources/app/py/",
};

module.exports = {env}