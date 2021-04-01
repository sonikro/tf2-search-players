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
prompt.start();

prompt.get(['nickname',], function (err, result) {
    if (err) { return onErr(err); }

    findServerByPlayerName(dependencies)(result.nickname as string)
        .then(servers => console.log(servers))
        .then(() => process.exit(0))
        .catch(onErr)
});

function onErr(err: Error) {
    console.error(err);
    return 1;
}