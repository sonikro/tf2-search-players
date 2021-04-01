import { DetailedServer, Server } from "../domain/Server";
import { LogService } from "../providers/LogService";
import { ServerQueryService } from "../providers/ServerQueryService"
import { ServerRepository } from "../providers/ServerRepository"

export const findServerByPlayerName = (deps: {
    serverRepository: ServerRepository,
    serverQueryService: ServerQueryService,
    logService: LogService
}) => async (playerName: string) => {
    const { serverQueryService, serverRepository, logService } = deps;
    const servers = await serverRepository.getServers();
    const foundServers: DetailedServer[] = []
    for (const server of servers) {
        try {
            const connectedPlayers = await serverQueryService.getConnectedPlayers(server.ip, server.port);
            const targetPlayer = connectedPlayers.find(player => player.name.includes(playerName))
            if (targetPlayer) {
                const detailedServer = await serverQueryService.getServerDetail(server.ip, server.port)
                foundServers.push(detailedServer)
            }
        } catch (error) {
            logService.warn(`Error while fetching connected players from`, { server, error, message: error.message })
        }
    }
    return foundServers;
}