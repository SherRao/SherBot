const { Client } = require("discord.js");

const defaultOptions = {
    commandsDirectory: "commands",
    eventsDirectory: "events",
    embedsDirectory: "embeds",
    tasksDirectory: "tasks",
};

class SherBotClient {

    /**
     * Creates a new SherBotClient.
     * 
     * @param {ClientOptions} [clientOptions] Options for the regular Discord client.
     * @param {SherBotOptions} [options] Options to be used for SherBot.
     * 
     */
    constructor(clientOptions = {}, options = defaultOptions) {
        this.client = new Client(clientOptions);
        this.options = options;

        Object.defineProperty(this, "token", { writable: true });
        if (!browser && !this.token && "DISCORD_TOKEN" in process.env) {
            /**
             * Authorization token for the logged in bot.
             * If present, this defaults to `process.env.DISCORD_TOKEN` when instantiating the client
             * <warn>This should be kept private at all times.</warn>
             * @type {?string}
             */
            this.token = process.env.DISCORD_TOKEN;

        } else
            this.token = null;
    }

    /**
     * Logs the client in, establishing a websocket connection to Discord.
     * 
     * @param {string} [token=this.token] Token of the account to log in with
     * @returns {Promise<string>} Token of the account used
     * @example client.login('my token');
     * 
     */
    async login(token = this.token) {
        this.client.once("ready", () => {
            initLogger();
            setPresence();
            registerCommands();
            registerEvents();
            registerTasks();
            handleCommands();

            logger.info("Bot loaded!");
        });

        return this.client.login(token);
    }

    #initLogger() {
        console.log("initLogger");
    }

    #setPresence() {
        console.log("setPresence");
    }

    #registerCommands() {
        console.log("registerCommands");
    }

    #registerEvents() {
        console.log("registerEvents");
    }

    #registerTasks() {
        console.log("registerTasks");
    }

    #handleCommands() {
        console.log("handleCommands");
    }
}

module.exports = SherBotClient;