function Inputs(opts) {
  this.commands = opts || {};
  this.description = opts || {};

  return {
    collectOpts(prop) {
      console.log("Here Are your options:");

      for (const key in prop) {
        if (prop.hasOwnProperty(key)) {
          const command = prop[key];

          if (command.description || command.commands) {
            const longHand = command.commands[0];
            const shortHand = command.commands[1];

            console.log("\n", `Long: ${longHand}, Short: ${shortHand}` + ":\n" + command.description);
          }
        }
      }
    },
    help() {
      console.log(this.commands);
    },
    folder(input) {
      console.log(input);
      console.log("show folders");
    }
  };
}

module.exports = new Inputs();
