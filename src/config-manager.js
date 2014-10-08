var fs   = require('fs-extra');
var path = require('path');
var $ = require('../lib/jquery');

var HOME_DIR     = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
var CONFIG_PATH  = path.join(HOME_DIR, '.config/gatenu');
var DEFAULT_FILE = path.join(CONFIG_PATH, 'meshblu.json');

module.exports = {
  loadConfig : function( configPath ) {
    configPath = configPath || DEFAULT_FILE;
    if( !fs.existsSync(configPath) ) {
      return {};
    }
    return JSON.parse(fs.readFileSync(configPath))
  },
  saveConfig : function(config, configPath) {
    if (!config.path) {
      config.path = CONFIG_PATH;
    }
    $('ul').append('<li>' + config.path + '</li>');
    if (!config.devicePath) {
      config.devicePath = path.join(config.path, 'devices');
    }
    if (!config.tmpPath) {
      config.tmpPath = path.join(config.path, 'tmp');
    }
    configPath = configPath || DEFAULT_FILE;
    fs.mkdirpSync(config.path);
    return fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  }
};
