const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "ping",
    description: "get the ping of the bot",
    usage: "/ping",
    data: {
        name: "ping",
        description: "🏓 | ping of the bot"
    },
    dev: false,
    global: true,
    guild: false,
    run: async (bot, ctx) => {
        await ctx.reply('pinging...');
        const msg = await ctx.fetchReply();
        await ctx.editReply({
            embeds: [
                new MessageEmbed()
                    .setAuthor(ctx.client.user.username, ctx.client.user.displayAvatarURL())
                    .addField('1 round of discord gateway:', `> ${msg.createdAt - ctx.createdAt}ms`, true)
                    .addField('Heartbeat:', `> ${ctx.client.ws.ping}ms`, true)
                    .setTimestamp()
                    .setColor("RANDOM")
            ],
            content: null,
        });
    }
}