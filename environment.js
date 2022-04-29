// Data Environment
// Poner en false para la instrucción $ electron-packager ./ --platform=win32 --arch=x64
const modedevelop = true;

const env = {
  urlpy: modedevelop ? "./py/" : "./resources/app/py/",
};
