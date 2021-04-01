import { Server } from "../core/domain/Server";
import { ServerRepository } from "../core/providers/ServerRepository";
import servers from "../../servers.json";

interface ServerEntry {
    [ip: string]: {
        from: number;
        to: number;
    }
}
/**
 * This repository will read from the servers.json file in the root of the project
 */
export class JSONServerRepository implements ServerRepository {
    async getServers(): Promise<Server[]> {
        const serverData = servers as ServerEntry
        const ips = Object.keys(servers);
        const generatedServers: Server[] = []

        for (const ip of ips) {
            const portRange = serverData[ip];
            for (let port = portRange.from; port <= portRange.to; port++) {
                generatedServers.push({
                    ip,
                    port
                })
            }
        }
        return generatedServers;
    }
}