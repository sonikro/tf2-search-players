import { LogService } from "../core/providers/LogService";
import pino from "pino";

export class PinoLogger implements LogService {
    private _pino: pino.Logger;

    constructor() {
        this._pino = pino();
    }

    warn(message: string, object?: any) {
        this._pino.warn(object, message)
    }

}