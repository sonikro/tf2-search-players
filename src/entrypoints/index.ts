import prompt from 'prompt';
import { findServerByPlayerName } from '../core/usecases/findServerByPlayerName';
import { JSONServerRepository } from '../providers/JSONServerRepository';
import { PinoLogger } from '../providers/PinoLogger';
import { SourceServerQuery } from '../providers/SourceServerQuery';


const dependencies = {
    logService: new PinoLogger(),
    serverRepository: new JSONServerRepository(),
    serverQueryService: new SourceServerQuery(2000)
}

var twirlTimer = function () {
    var P = ["\\", "|", "/", "-"];
    var x = 0;
    return setInterval(function () {
        process.stdout.write("Finding player \r" + P[x++]);
        x &= 3;
    }, 250);
};

prompt.start();

prompt.get(['nickname',], function (err, result) {
    if (err) { return onErr(err); }

    twirlTimer()
    findServerByPlayerName(dependencies)(result.nickname as string)
        .then(servers => console.log(servers))
        .then(() => process.exit(0))
        .catch(onErr)
});

function onErr(err: Error) {
    console.error(err);
    return 1;
}