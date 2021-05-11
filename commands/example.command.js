const util = require('../util');
const main = require('../index');
const discord = main.discord;
const logger = main.logger;

/**
 * 
 * A command file that contains the JSON needed to POST the command
 * to the Discord command endpoint AND the code needed to handle 
 * the command when it's triggered.
 * 
 * Reference -> https://discord.com/developers/docs/interactions/slash-commands#registering-a-command
 * 
 * @author Nausher Rao
 * 
 */
module.exports = {

    // Data object that includes all the JSON to post to the Discord command endpoint.
    "data": {
        "name": "hello",
        "description": "Henlo.",
        "default_permission": false, //By default, nobody has permission if set to false

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

        "type": 2,
        "options": [

            {
                "name": "world",
                "description": "Its world",
                "type": 1,
                "options": [],
            }, 

            {
                "name": "nausher",
                "description": "Its me",
                "type": 1,
                "options": [{
                    "name": "rao",
                    "description": "Its me x2.",
                    "type": 1,
                    "required": false,
                }],
            },

        ],
    },

    // Code executed when this slash command is used by a valid user.
    execute: (interaction) => {
        logger.info("Someone used the example command!");
        util.sendMessage("Hello world!", interaction);

    }

}