module.exports = {
    name: "ping",
    code: `
    $addField[Latência do banco de dados:;\`$databasePingms\`;true]
    $addField[Latência do bot:;\`$pingms\`;true]
    $title[🏓 | Pong!]
    $reply
    $onlyIf[$getGlobalUserVar[blacklistingIsBlacklisted;$authorID;blacklisting]!=true;{reply:$messageID:true}{newEmbed:{title:🚫 | Usuário na lista negra}{field:Usuário que foi adicionado\::\`@$username[$authorID]\`:false}{field:Data e hora que foi adicionado\::$discordTimestamp[$getGlobalUserVar[blacklistingTime;$authorID;blacklisting];F]:false}{field:Motivo da adição\::$getGlobalUserVar[blacklistingReason;$authorID;blacklisting]:false}{field:Desenvolvedor que adicionou\::\`@$username[$getGlobalUserVar[blacklistingDeveloper;$authorID;blacklisting]]\`:false}{footer:Caso queira tentar apelar sua adição à lista negra, entre no servidor da Lemonjuice Development abaixo.}{color:D94F4F}} {actionRow:{{button:Apelar adição à lista negra:link:https://discord.gg/U4MXKV762N:false:⚠️}}}] $sendWebhookMessage[${process.env.WEBHOOKID};${process.env.WEBHOOKTOKEN};_ _\n👉 Usuário \`@$username[$authorID]\` executou o comando **$commandName** em $discordTimestamp[$dateStamp;F].\n_ _;false]
    `
}