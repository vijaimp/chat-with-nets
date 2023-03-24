const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

describe("chat server send/receive message", () => {
  let io, serverSocket, clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      io.on("connection", (socket) => {
        serverSocket = socket;
      });
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  const loginMessage = {
    userName: "test",
    location: {
      latitude: "123",
      longitude: "456",
    },
  };

  test("should work with login", (done) => {
    clientSocket.on("login", (arg) => {
      expect(arg.userName).toBe("test");
      expect(arg.location.latitude).toBe("123");
      expect(arg.location.longitude).toBe("456");
      done();
    });
    serverSocket.emit("login", {
      userName: "test",
      location: {
        latitude: "123",
        longitude: "456",
      },
    });
  });
});
