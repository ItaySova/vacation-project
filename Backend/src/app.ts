import https from "https"
import path from "path"
import fs from "fs"
import express from "express";
import cors from "cors";
import expressRateLimits from "express-rate-limit"
import expressFileUpload from "express-fileupload";
import dataRoutes from "./6-routes/data-routes";
import followerRoutes from "./6-routes/followers-routes";
import usersRoutes from "./6-routes/users-routes"
import authRoute from "./6-routes/auth-routes";
import routeNotFound from "./3-middleware/route-not-found";
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config";
import logRequests from "./3-middleware/log-requests";
import sanitize from "./3-middleware/sanitize";
import helmet from "helmet";
import socketIoLogic from "./4-utils/socketIo";

const server = express();

server.use(cors({ origin: "http://localhost:3000" })); 

// Prevent DoS attack:
server.use(expressRateLimits({
    windowMs: 1000, // Window time to count requests.
    max: 50, // Max requests allowed in that window.
    message: "Too Many Requests" // Optional message
}));

server.use(helmet());
server.use(express.json());
server.use(logRequests)
server.use(expressFileUpload());
server.use(sanitize)
server.use("/api", dataRoutes);
server.use("/api", followerRoutes);
server.use("/api", usersRoutes);
server.use("/api", authRoute);
server.use(routeNotFound);
server.use(catchAll);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname,"..", "certificate", "certificate.key")),
    cert:  fs.readFileSync(path.join(__dirname,"..", "certificate", "certificate.crt"))
}, server);

// sslServer.listen(appConfig.port, () => console.log("Listening on https://localhost:" + appConfig.port));

const httpsServer = sslServer.listen(appConfig.port, () => console.log("Listening on https://localhost:" + appConfig.port));
socketIoLogic(httpsServer);

export default {
    sslServer
};
