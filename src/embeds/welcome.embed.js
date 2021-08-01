/**
 * 
 * Embed that is sent to people when they join the Discord server.
 * 
 * @author Nausher Rao
 * 
 */
const embed = {
    "title": "💻 **Welcome - C³ Discord Server**",
    "description": "We are a national community of Computer Science students aiming to connect, inspire, and support!",
    "url": "https://ccubed.dev",
    "color": 2897988,

    "author": {
        "name": "👋 Welcome!"
    },

    "thumbnail": {
        "url": "https://raw.githubusercontent.com/ccubed-dev/DiscordBot/main/icon.png"
    },

    "fields": [
        {
            "name": "❓ Who are we?",
            "value": "**The Computing Councils of Canada (also known as C³, or CCubed) aims to serve all students in computer science related fields** from post-secondary institutions across Canada, providing them with equal opportunities to grow, network, learn, and excel with equal representation. C3 provides a foundation for technological student organizations affiliated with academic institutions nationwide to communicate and share resources.",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "🙋 What's a Representative?",
            "value": "We have two branches; executives and representatives. Every school assigns one person on their team to be a representative for C³. Representatives enable communication between their school and us! They also vote on official C³ matters. ",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "😎 Okay.. that's cool, but what's an Executive?",
            "value": "Executives consist of Directors and their subordinates, known as \"Staff\". These are the people who run C³ on a day-to-day basis. We have the administration, finance, partnerships, communications, events, systems administration, and community outreach departments! If you would like to join, feel free to contact a staff member!",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "🏆 This sounds sick! I want my school to join!",
            "value": "If your school isn't already a member, feel free to contact <@672172999096401933> - Branden is our Director of Adminstration and deals with member schools!",
        },

        {
            "name": "\u200B",
            "value": "\u200B",
        },

        {
            "name": "🏫 Where do I learn more???",
            "value": "Learn more about the organisation **[here](https://ccubed.dev)**!",
        },
    ]
};

module.exports = { embed };