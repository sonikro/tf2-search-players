# TF2-Player-Search

This is a CLI that allows you to find where a specific player is playing on TF2. It uses Steam's A2S protocol (https://developer.valvesoftware.com/wiki/Server_queries) to fetch data from Steam servers.

Since we can only fetch the nickname of players that are connected to a server we do not own, we can't make this search by SteamID. We have to search by name.

## Running

All you have to do, is inform the nickname of the player, and this application will try to find in which Casual server the player is currently connected to
```bash
yarn
yarn start
```

## Testing

```bash
yarn
yarn test
```

## Known Issues
- Convert the Entrypoint to a CLI
- Improve the Server Repository implementation (Right how, this application is only scanning matchmaking servers from Brazil)
## Contributing

Feel free to open a PR and contribute to this project.