/**
 * 
 * Embed that is sent to people when they join the Discord server.
 * 
 * @author Nausher Rao
 * 
 */
const embed = {
    "title": "💻 **Pronouns - C³ Reaction Roles**",
    "description": "Below you can find pronouns that you can assign to yourself! Refer to the legend, and just react with the emoji that represents your gender!",
    "color": 2897988,

    "thumbnail": {
        "url": "https://raw.githubusercontent.com/ccubed-dev/DiscordBot/main/resources/icon.png"
    },

    "fields": [
        {
            "name": "He/Him",
            "value": "♂",
            "inline": true
        },

        {
            "name": "She/Her",
            "value": "♀",
            "inline": true
        },

        {
            "name": "They/Them",
            "value": ":transgender_symbol:",
            "inline": true
        },

        {
            "name": "Other Pronoun",
            "value": "☮️",
            "inline": true
        },

    ]
};

module.exports = { embed };