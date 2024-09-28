const googleIt = require("google-it");

module.exports = {
  name: "google",
  description: "Performs a Google search and returns the first few results",
  execute(message) {
    const searchQuery = message.content.slice(8).trim();
    if (!searchQuery) return message.reply("Please provide a search term!");

    googleIt({ query: searchQuery })
      .then((results) => {
        message.channel.send(
          results
            .map((result) => result.title + "\n" + result.link)
            .join("\n\n")
        );
      })
      .catch((error) => {
        console.error(error);
        message.reply("Something went wrong while searching.");
      });
  },
};
