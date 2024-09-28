module.exports = {
  name: "ready",
  once: true, // This runs only once
  execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
  },
};
