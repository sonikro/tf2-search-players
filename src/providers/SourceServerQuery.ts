import { Player } from "../core/domain/Player";
import { ServerQueryService } from "../core/providers/ServerQueryService";
import query from "source-server-query";
import { DetailedServer } from "../core/domain/Server";

export class SourceServerQuery implements ServerQueryService {
    constructor(private readonly timeout: number) { }
    async getServerDetail(server_ip: string, server_port: number): Promise<DetailedServer> {
        const data = await (query as any).info(server_ip, server_port, this.timeout)
        return {
            ip: server_ip,
            port: server_port,
            hostname: data.name,
            mapName: data.map
        }
    }
    async getConnectedPlayers(server_ip: string, server_port: number): Promise<Player[]> {
        // The library types are wrong...
        const players = await (query as any).players(server_ip, server_port, this.timeout)
        return players.map((player: any) => ({ score: player.score, name: player.name, duration: player.duration } as Player))
    }

}