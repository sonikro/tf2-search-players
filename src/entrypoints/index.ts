import query from "source-server-query";

query
    .players("155.133.224.162", 27069, 2000)
    .then(console.log)
    .catch(console.log);