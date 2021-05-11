/**
 * 
 * File that contains an embed to use within different places
 * in the code. 
 * 
 * Reference -> https://discordjs.guide/popular-topics/embeds.html#embed-preview
 * 
 * @author Nausher Rao
 * 
 */
module.exports = {

    exampleEmbed = {
        color: 0x0099ff,
        title: 'Some title',
        url: 'https://discord.js.org',

        author: {
            name: 'Some name',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
            url: 'https://discord.js.org',
        },

        description: 'Some description here',

        thumbnail: { url: 'https://i.imgur.com/wSTFkRM.png' },

        fields: [
            {
                name: 'Regular field title',
                value: 'Some value here',
            },

            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },

            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
       
        ],
        
        image: { url: 'https://i.imgur.com/wSTFkRM.png' },

        timestamp: new Date(),
        
        footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/wSTFkRM.png',
        }
    }

}