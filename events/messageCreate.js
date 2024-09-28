module.exports = {
  name: "messageCreate",
  execute(message, client) {
    if (message.author.bot) return;

    const prefix = "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      command.execute(message);
    } catch (error) {
      console.error(error);
      message.reply("There was an error executing that command.");
    }
  },
};
