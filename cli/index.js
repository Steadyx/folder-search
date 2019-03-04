const readline = require("readline");
const inputs = require("./inputs");

const rl = readline.createInterface({
  input: process.stdin,
  out: process.stdout,
  terminal: false
});

function ParseCommands(opts) {
  this.opts = opts || {};
  let commands = [];

  const parseArgv = search => {
    const [, , ...args] = process.argv;

    return search
      .filter(command => {
        if (args.includes(command)) {
          return command;
        }
      })
      .join();
  };

  const mapKeys = () => {
    return Object.keys(this.opts)
      .map(command => {
        commands.push(this.opts[command]);
        return parseArgv(this.opts[command].commands);
      })
      .filter(command => command)
      .join(" ");
  };

  const handleKeys = () => {
    const keys = mapKeys();

    if (keys === "-h" || keys === "--help") {
      inputs.collectOpts(commands);
    } else if (keys === "--folder" || keys === "-f") {
      inputs.folder(keys);
    } else if (keys === "--search" || keys === "-s") {
      console.log("handle search");
    } else {
    }
  };

  return (function() {
    handleKeys();
    rl.close();
  })();
}

let commands = new ParseCommands({
  folder: {
    commands: ["--folder", "-f"],
    description: "This is the root folder you want to search inside of."
  },
  search: {
    commands: ["--search", "-s"],
    description: "This is the folder that you want to find."
  },
  help: {
    commands: ["--help", "-h"],
    description: "This will help you find a command"
  }
});
