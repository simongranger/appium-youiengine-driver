let commands = {};

commands.getPageSource = async function (context) {

  let source;
  
  if (typeof context === "undefined" || !context) {
    context = '';
  }

  var commandObject = {
    name: 'GetSRC',
    args: [`${context}`]
  };
  var commandJSON = JSON.stringify(commandObject);

  source = await this.executeSocketCommand(commandJSON);

  if (source) {
    return source.toString();
  } else {
    // this should never happen but we've received bug reports; this will help us track down
    // what's wrong in getTreeForXML
    throw new Error("Bad response from getTreeForXML");
  }
};

commands.getSourceElement = async function (context) {

  let source;
  
  if (typeof context === "undefined" || !context) {
    context = '';
  }
  
  let ext = mult ? 's' : '';
  
  var commandObject = {
    name: 'getsrcel',
    args: [`${selector}`, `${context}`]
  };
  var commandJSON = JSON.stringify(commandObject);

  source = await this.executeSocketCommand(commandJSON);

  if (source) {
    return source.toString();
  } else {
    // this should never happen but we've received bug reports; this will help us track down
    // what's wrong in getTreeForXML
    throw new Error("Bad response from getTreeForXML");
  }
};


export default commands;
