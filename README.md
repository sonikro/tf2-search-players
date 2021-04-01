# TF2-Player-Search

This is a CLI that allows you to find where a specific player is playing on TF2. It uses Steam's A2S protocol (https://developer.valvesoftware.com/wiki/Server_queries) to fetch data from Steam servers.

Since we can only fetch the nickname of players that are connected to a server we do not own, we can't make this search by SteamID. We have to search by name.

## Testing

```bash
yarn
yarn test
```

## Contributing

Feel free to open a PR and contribute to this project.