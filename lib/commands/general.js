import { youiEngineDriverReturnValues } from '../utils';
import logger from '../logger';

let commands = {};

commands.installApp = async function (appPath) {
  await this.device.installApp(appPath);
};

commands.removeApp = async function (bundleId) {
  await this.device.removeApp(bundleId);
};

commands.closeApp = async function () {
  await this.device.closeApp();
};

commands.launchApp = async function () {
  await this.device.launchApp();
};

commands.isAppInstalled = async function (bundleId) {
  return await this.device.isAppInstalled(bundleId);
};

commands.yiCloseApp = async function () {
  let commandObject = {
    name: 'CloseApp'
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);
  try {
    JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from CloseApp');
  }
};

commands.getPageSource = async function () {

  let source;

  let commandObject = {
    name: 'GetSRC'
  };
  let commandJSON = JSON.stringify(commandObject);

  logger.debug(`Before executeSocketCommand`);
  source = await this.executeSocketCommand(commandJSON);
  logger.debug(`After executeSocketCommand`);
  // throw new Error('Bad response from Simon');

  if (source) {
    return source.toString();
  } else {
    // this should never happen but we've received bug reports; this will help us track down
    // what's wrong in getTreeForXML
    throw new Error('Bad response from getTreeForXML');
  }
};

commands.getWindowRect = async function () {

  let commandObject = {
    name: `getWindowSize`
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from window_size');
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_WINDOW) {
    throw new Error('Could not find the requested surface');
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new Error('The requested command is not supported in the version of You.i Engine currently running.');
  }

  return result.value;
};

commands.getWindowSize = async function () {

  let commandObject = {
    name: `getWindowSize`
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from window_size');
  }

  // get status returned and handle errors returned from server
  if (result.status === youiEngineDriverReturnValues.WEBDRIVER_NO_SUCH_WINDOW) {
    throw new Error('Could not find the requested surface');
  } else if (result.status === youiEngineDriverReturnValues.WEBDRIVER_UNKNOWN_COMMAND) {
    throw new Error('The requested command is not supported in the version of You.i Engine currently running.');
  }

  return result.value;
};

commands.hideKeyboard = async function () {

  let commandObject = {
    name: `hideKeyboard`
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from hideKeyboard');
  }
  return result.value;
};

commands.isKeyboardShown = async function () {

  let commandObject = {
    name: `isKeyboardShown`
  };
  let commandJSON = JSON.stringify(commandObject);

  let data = await this.executeSocketCommand(commandJSON);

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    throw new Error('Bad response from isKeyboardShown');
  }
  return result.value;
};

export default commands;
