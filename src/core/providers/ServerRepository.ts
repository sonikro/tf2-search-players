import { Server } from "../domain/Server";

export interface ServerRepository {
    getServers: () => Promise<Server[]>
}