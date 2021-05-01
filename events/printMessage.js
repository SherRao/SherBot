module.exports = {

    name: "message",
    
    once: false,

    execute: (client, logger, message) => {
        logger.debug(`Someone said: "${message.content}"`);

    }

}