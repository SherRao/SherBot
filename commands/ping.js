module.exports = {

    "data": {
        "name": "ping",
        "description": "Pong!",
        "default_permission": true, 

        "permissions": [],

        "type": 1,
        "options": [],
    },

    execute: (client, logger, interaction) => {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: { type: 4, data: {content: "Pong!"} }

        });
    }

}