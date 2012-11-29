# Dummy Named-Entity Recognition server
This server can help you test tools that depend on external named-entity recognition services.

# Usage

    $ ./server.js 4500 &
    $ curl -X POST --data "Dummy entity extraction is cool." localhost:4500
      # ["extraction","entity","Dummy"]
