module.exports = {
    name: "unblacklist",
    code: `
    ✅ **|** O usuário \`@$username[$message[1]] ($message[1])\` foi removido da lista negra com sucesso.
    $reply
    $setGlobalUserVar[blacklistingIsBlacklisted;false;$message[1];blacklisting]
    $onlyIf[$getGlobalUserVar[blacklistingIsBlacklisted;$message[1];blacklisting]!=false;{reply:$messageID:true}❌ **|** O usuário não está na lista negra!]
    $onlyIf[$userExists[$message[1]]==true;{reply:$messageID:true}❌ **|** Forneça apenas o ID de um usuário na lista negra para removê-lo da lista negra do Clockwine.]
    $argsCheck[1;{reply:$messageID:true}❌ **|** Forneça apenas o ID de um usuário na lista negra para removê-lo da lista negra do Clockwine.]
    $onlyForIDs[1310445513119764581;1139187216732672001;927620222649786400;{reply:$messageID:true}❌ **|** Você precisa ser um dos desenvolvedores do Clockwine para usar este módulo!]
    $onlyIf[$getGlobalUserVar[blacklistingIsBlacklisted;$authorID;blacklisting]!=true;{reply:$messageID:true}{newEmbed:{title:🚫 | Usuário na lista negra}{field:Usuário que foi adicionado\::\`@$username[$authorID]\`:false}{field:Data e hora que foi adicionado\::$discordTimestamp[$getGlobalUserVar[blacklistingTime;$authorID;blacklisting];F]:false}{field:Motivo da adição\::$getGlobalUserVar[blacklistingReason;$authorID;blacklisting]:false}{field:Desenvolvedor que adicionou\::\`@$username[$getGlobalUserVar[blacklistingDeveloper;$authorID;blacklisting]]\`:false}{footer:Caso queira tentar apelar sua adição à lista negra, entre no servidor da Lemonjuice Development abaixo.}{color:D94F4F}} {actionRow:{{button:Apelar adição à lista negra:link:https://discord.gg/U4MXKV762N:false:⚠️}}}] $sendWebhookMessage[${process.env.WEBHOOKID};${process.env.WEBHOOKTOKEN};_ _\n👉 Usuário \`@$username[$authorID]\` executou o comando **$commandName** em $discordTimestamp[$dateStamp;F].\n_ _;false]
    `
}