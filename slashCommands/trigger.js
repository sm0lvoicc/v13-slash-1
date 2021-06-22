const canvacord = require('canvacord');
const { MessageEmbed, MessageAttachment } = require('discord.js');
module.exports = {
    name: "trigger",
    description: "trigger a person, stff man, idk",
    data: {
        name: "trigger",
        description: "do the trigger dank member thingy",//yes descriptions can be changed
        options:[
            {
                name: "person",
                description: "the person you want to trigger",//you can add UNICODE emojis here, ofc the ones which are registered in discord
                type:'USER',
                required: false
            }
        ]
    },
    guild: false,
    global: true,
    dev: false,
    usage: '/trigger `someone or no on, yourself`',
    run: async(bot, ctx)=>{
        ctx.defer();
        const user = ctx.options.get("person")? ctx.options.get("person").user : ctx.user;
        const pfp = user.displayAvatarURL({ size: 512, format: 'png', dynamic: false});
        const img = await canvacord.Canvas.trigger(pfp);
        const attach = new MessageAttachment(img, 'trigger.gif');
        const embed = new MessageEmbed()
        .setAuthor(bot.user.username, bot.user.displayAvatarURL())
        .setImage('attachment://trigger.gif')
        .attachFiles(attach)
        .setColor("RANDOM")
        .setFooter(ctx.user.username, ctx.user.displayAvatarURL())
        ctx.editReply({ emebds: [embed]});
    }
}
