export interface Server {
    ip: string;
    port: number;
}

export interface DetailedServer extends Server {
    mapName: string;
    hostname: string;
}