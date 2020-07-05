class DefaultCommandProcessor {
    constructor(state = null) {
        this.message = null;
        this.state = state;

        this.commandHandlers = {};
        this.commandHandlers['start'] = this.cmdStart;
        this.commandHandlers['help'] = this.cmdHelp;
    }

    proceedCommand(cmd, user) {
        this.commandHandlers[cmd.name].apply(this, cmd);
    }

    cmdStart() {
        let message = {};
        message.text = helloText;
        message.keyboard = null;
        this.message = message;
    }

    cmdHelp() {
        let message = {};
        message.text = helpText;
        message.keyboard = null;
        this.message = message;
    }
}