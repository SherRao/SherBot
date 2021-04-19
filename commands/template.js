module.exports = {

    // Data object that includes all the JSON to post to the Discord command endpoint.
    "data": {
        "name": "hello",
        "description": "Henlo.",
        "type": 1,
        "options": [            {
            "name": "world",
            "description": "Its world",
            "type": 1,
            "options": []
        }, 

        {
            "name": "nausher",
            "description": "Its me",
            "type": 1,
            "options": [{
                "name": "rao",
                "description": "Its me x2.",
                "type": 1,
                "required": false
            }]
        }]
    },

    // A list that contains all the ids of the roles allowed to use this command. Set null for any role.
    permission_roles: null,

    // A list that contains all the Strings of the permissions needed to use this command. Set null for any permission.
    permissions: null,

    // Code executed when this slash command is used by a valid user.
    execute: (client, interation) => {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {type: 4, data: {content: "Hello world!"} }

        });
    }

}