module.exports = {
  name: "present",
  description: "Test command.",
  execute(message) {
    message.channel.send("I'm a Discord Bot, at your service.");
  },
};
