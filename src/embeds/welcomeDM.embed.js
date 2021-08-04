/**
 * 
 * Embed that is sent to people when they join the Discord server.
 * 
 * @author Nausher Rao
 * 
 */
const embed = {
    "title": "💻 **Welcome to the C³ Discord server!**",
    "description": "If this is your **first time using Discord**, refer to the Youtube video **[here](https://www.youtube.com/watch?v=TJ13BA3-NR4)!**",
    "url": "https://ccubed.dev",
    "color": 2897988,

    "author": {
        "name": "👋 Welcome!"
    },

    "thumbnail": {
        "url": "https://raw.githubusercontent.com/ccubed-dev/DiscordBot/main/resources/icon.png"
    },

    "fields": [
        {
            "name": "📜 Rules",
            "value": "Make sure to check out the rules channel to read up on all our rules! You must accept the ToS before being able to use the server!",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "⚽️ Interests",
            "value": "We have reaction roles so that you can give yourself access to different channels for different interests, such as sports, crypto, etc...",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "🎓 Schools",
            "value": "We also have reaction roles you can give yourself for all our different partner schools - easy way to show some school spirit!",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "♀ Pronouns",
            "value": "We have reaction roles that you can assign yourself that align with your gender!",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "🏫 The Organisation",
            "value": "Learn more about the organisation **[here](https://ccubed.dev)**!",
        },
    ]
};

module.exports = { embed };