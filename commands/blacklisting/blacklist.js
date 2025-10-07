module.exports = {
    name: "blacklist",
    code: `
    ✅ **|** O usuário \`@$username[$message[1]] ($message[1])\` foi adicionado a lista negra com sucesso pelo motivo **$replaceText[$message;$message[1];;1]**.
    $reply
    $setGlobalUserVar[blacklistingIsBlacklisted;true;$message[1];blacklisting]
    $setGlobalUserVar[blacklistingReason;$replaceText[$message;$message[1];;1];$message[1];blacklisting]
    $setGlobalUserVar[blacklistingDeveloper;$authorID;$message[1];blacklisting]
    $setGlobalUserVar[blacklistingTime;$dateStamp;$message[1];blacklisting]
    $setGlobalUserVar[blacklistingUserID;$message[1];$message[1];blacklisting]
    $onlyIf[$getGlobalUserVar[blacklistingIsBlacklisted;$message[1];blacklisting]!=true;{reply:$messageID:true}❌ **|** O usuário já está na lista negra! Confira abaixo: {newEmbed:{title:🚫 | Usuário na lista negra}{field:Usuário que foi adicionado\::\`@$username[$message[1]]\`:false}{field:Data e hora que foi adicionado\::$discordTimestamp[$getGlobalUserVar[blacklistingTime;$message[1];blacklisting];F]:false}{field:Motivo da adição\::$getGlobalUserVar[blacklistingReason;$message[1];blacklisting]:false}{field:Desenvolvedor que adicionou\::\`@$username[$getGlobalUserVar[blacklistingDeveloper;$message[1];blacklisting]]\`:false}{color:D94F4F}}]
    $onlyIf[$checkCondition[$message[1]==1310445513119764581||$message[1]==1139187216732672001||$message[1]==927620222649786400]==false;{reply:$messageID:true}❌ **|** Você não pode adicionar um desenvolvedor a lista negra!]
    $onlyIf[$userExists[$message[1]]==true;{reply:$messageID:true}❌ **|** Forneça o ID de um usuário válido e um motivo para colocá-lo na lista negra do Clockwine.]
    $argsCheck[>=2;{reply:$messageID:true}❌ **|** Forneça o ID de um usuário válido e um motivo para colocá-lo na lista negra do Clockwine.]
    $onlyForIDs[1310445513119764581;1139187216732672001;927620222649786400;{reply:$messageID:true}❌ **|** Você precisa ser um dos desenvolvedores do Clockwine para usar este módulo!]
    $onlyIf[$getGlobalUserVar[blacklistingIsBlacklisted;$authorID;blacklisting]!=true;{reply:$messageID:true}{newEmbed:{title:🚫 | Usuário na lista negra}{field:Usuário que foi adicionado\::\`@$username[$authorID]\`:false}{field:Data e hora que foi adicionado\::$discordTimestamp[$getGlobalUserVar[blacklistingTime;$authorID;blacklisting];F]:false}{field:Motivo da adição\::$getGlobalUserVar[blacklistingReason;$authorID;blacklisting]:false}{field:Desenvolvedor que adicionou\::\`@$username[$getGlobalUserVar[blacklistingDeveloper;$authorID;blacklisting]]\`:false}{footer:Caso queira tentar apelar sua adição à lista negra, entre no servidor da Lemonjuice Development abaixo.}{color:D94F4F}} {actionRow:{{button:Apelar adição à lista negra:link:https://discord.gg/U4MXKV762N:false:⚠️}}}] $sendWebhookMessage[${process.env.WEBHOOKID};${process.env.WEBHOOKTOKEN};_ _\n👉 Usuário \`@$username[$authorID]\` executou o comando **$commandName** em $discordTimestamp[$dateStamp;F].\n_ _;false]
    `
}