module.exports = {

    // How long to wait in between calls to this tasks execute(), in milliseconds.
    interval: 1000 * 60,

    execute: (client, logger) =>{
        console.log(`The time is currently: ${new Date().toLocaleString()} for ${client.user.tag}!`);

    }

}