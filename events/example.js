module.exports = {

    name: "ready",
    
    once: true,

    execute: (client, logger) => {
        console.log(`Ready! Logged in as ${client.user.tag}!`);

    }

}