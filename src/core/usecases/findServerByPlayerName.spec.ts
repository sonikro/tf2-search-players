import { Player } from "../domain/Player"
import { Server } from "../domain/Server"
import { LogService } from "../providers/LogService"
import { ServerQueryService } from "../providers/ServerQueryService"
import { ServerRepository } from "../providers/ServerRepository"
import { findServerByPlayerName } from "./findServerByPlayerName"

describe("findServerByPlayerName", () => {
    const makeSut = () => {

        const mockedValues = {
            servers: [
                { ip: "127.0.0.1", port: 27015 } as Server
            ],
            detailedServer: {
                ip: "127.0.0.1", port: 27015, mapName: "pl_badwater"
            },
            connectedPlayers: [
                { duration: 1, name: "sonikro", score: 10 } as Player
            ]
        }
        const serverRepository: ServerRepository = {
            getServers: jest.fn().mockReturnValue(mockedValues.servers)
        }

        const serverQueryService: ServerQueryService = {
            getConnectedPlayers: jest.fn().mockReturnValue(mockedValues.connectedPlayers),
            getServerDetail: jest.fn().mockReturnValue(mockedValues.detailedServer)
        }
        const logService: LogService = {
            warn: jest.fn().mockImplementation((...args) => console.warn(args))
        }
        const deps = {
            serverRepository,
            serverQueryService,
            logService
        }

        const sut = findServerByPlayerName;

        return { sut, deps, mockedValues }
    }

    it("finds servers that players with a specific name are playing", async () => {
        const { deps, mockedValues, sut } = makeSut();

        const servers = await sut(deps)("sonikro");

        expect(servers).toHaveLength(1);
        expect(servers[0]).toEqual(mockedValues.detailedServer)
    })

    it("returns empty array if no player was found", async () => {
        const { deps, sut } = makeSut();

        const servers = await sut(deps)("a");

        expect(servers).toHaveLength(0);
    })

    it("logs warn message if server query throws error", async () => {
        const { deps, sut } = makeSut();

        deps.serverQueryService.getConnectedPlayers = jest.fn().mockImplementation(() => { throw new Error(`Error querying server`) })
        const servers = await sut(deps)("a");

        expect(servers).toHaveLength(0);

        expect(deps.logService.warn).toHaveBeenCalledWith("Error while fetching connected players from", { "error": new Error(`Error querying server`), "message": "Error querying server", "server": { "ip": "127.0.0.1", "port": 27015 } });
    })
})