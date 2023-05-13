"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// as a default import, can rename it as i like
const user_1 = __importDefault(require("../routes/user"));
class Server {
    constructor() {
        this.api_paths = {
            users: '/api/users',
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        // initial methods
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Body parse - to be able to use JSON
        this.app.use(express_1.default.json());
        // Public folder
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.api_paths.users, user_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map