module.exports = {

    "data": {
        "name": "record",
        "description": "Used to record a user in a voice channel that this bot is connected to.",
        "default_permission": true, 

        "permissions": [ 

            {
                "id": "ROLE_ID_1",
                "type": 1,
                "permission": true,
            },

            {
                "id": "ROLE_ID_1",
                "type": 1,
                "permission": true,
            }

        ],

        "options": [
            {
                "name": "start",
                "description": "Start the record for a specified user, if a recording hasn't already begun.",
                "type": 1,
                "options": [
                    {
                        "name": "targetUser",
                        "description": "The user to start the recording for.",
                        "type": 6,
                        "required": true
                    },
                ]
            },

            {
                "name": "stop",
                "description": "Stop the record for a specified user, if a recording for that user is in progress.",
                "type": 1,
                "options": [
                    {
                        "name": "targetUser",
                        "description": "The user to stop the recording for.",
                        "type": 6,
                        "required": true
                    },
                ]
            }

        ]
    },

    execute: (client, logger, interaction) => {
        let member = interaction.member;
        console.log(member.voice);
        console.log(member);
        if(member.voice) {
            sendMessage(client, interaction, "The selected user is in a voice channel!");

        } else 
            sendMessage(client, interaction, "The selected user is not in a voice channel!");

    }
}

function sendMessage(client, interaction, message) {
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: { type: 4, data: {content: message} }

    });
}