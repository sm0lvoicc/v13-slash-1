const { readdirSync } = require('fs'); //requiring fs
const ascii = require('ascii-table'); //ascii thingy to make it look cool
let table = new ascii("SLASH COMMANDS"); //making the table, like, declaring it
module.exports = (bot) => {
  const slass = readdirSync('./slashCommands/').filter(file => file.endsWith('.js')); //filteting all files which end with .js
  for( const file of slass)
  {
      //it is basic stuff from here so no need to explain
    const command = require(`../slashCommands/${file}`);
    if (command.name)
    {
      let name = command.name? '✅' : `❌`;
      let description = command.description? '✅' : `❌`;
      let usage = command.usage? '✅' : `❌`;
      let dev = command.dev? '✅' : `❌`;
      let global = command.global? '✅' : `❌`;
      let guild = command.guild? '✅' : `❌`;
      let data = command.data? '✅' : `❌`;
      bot.slash.set(command.name, command)
      table.setHeading('Command', 'File', 'Name', 'Data' ,'Description', 'Usage', '</>', 'Global', 'Guild').addRow(command.name, file, name, data ,description, usage, dev, global, guild);
    } else {
      let name = command.name? '✅' : `❌`;
      let description = command.description? '✅' : `❌`;
      let usage = command.usage? '✅' : `❌`;
      let dev = command.dev? '✅' : `❌`;
      let global = command.global? '✅' : `❌`;
      let guild = command.guild? '✅' : `❌`;
      let data = command.data? '✅' : `❌`;
      table.addRow("-", file, name, data ,description, usage, dev, global, guild);
    }
  }
  console.log(table.toString());
};
