import { Player } from "../domain/Player";
import { DetailedServer } from "../domain/Server";

export interface ServerQueryService {
    getConnectedPlayers: (server_ip: string, server_port: number) => Promise<Player[]>
    getServerDetail: (server_ip: string, server_port: number) => Promise<DetailedServer>;
}