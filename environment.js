// Data Environment
// Poner en false para la instrucción $ electron-packager ./ --platform=win32 --arch=x64
const modedevelop = false;

const env = {
  dev: modedevelop,
  urlpy: modedevelop ? "./py/" : "./resources/app/py/",
};
