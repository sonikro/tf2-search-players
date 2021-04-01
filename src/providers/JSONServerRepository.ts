import { Server } from "../core/domain/Server";
import { ServerRepository } from "../core/providers/ServerRepository";
import servers from "../../servers.json";

/**
 * This repository will read from the servers.json file in the root of the project
 */
export class JSONServerRepository implements ServerRepository {
    async getServers(): Promise<Server[]> {
        return servers.map(serverString => {
            const splitted = serverString.split(":");
            return {
                ip: splitted[0],
                port: parseInt(splitted[1], 10)
            } as Server
        })
    }
}