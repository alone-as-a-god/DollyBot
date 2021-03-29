export const commands = [
  { name: "connect", description: "Connects the bot to the invokers channel"},
  { name: "play [title]", description: "Adds the song with corresponding title to the queue" },
  { name: "search [title]", description: "Lists a few tracks with matching name"},
  { name: "stop", description: "Stops playback"},
  { name: "clear", description: "clears the queue" },
  { name: "skip", description: "plays next song in queue/skips current song" },
  { name: "shuffle", description: "shuffles music in queue"},
  { name: "queue", description: "displays upcming songs in queue"},
  { name: "prefix [newPrefix]", description: "change prefix"},
  { name: "purge [count]", description: "Deletes defined amount of messages. Default: 10"},
];
