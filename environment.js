// Data Environment
// Poner en false para la instrucción $ electron-packager ./compiled/ --platform=win32 --arch=x64
const modedevelop = false;

const env = {
  urlpy: modedevelop ? "./py/" : "./resources/app/py/",
};
