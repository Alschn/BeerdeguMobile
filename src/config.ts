const [HOST_IP, HOST_PORT] = ["192.168.0.183", "8000"];

const HOST = `${HOST_IP}:${HOST_PORT}`;
const HTTP_SCHEME = "http";
const WS_SCHEME = "ws";

export const BASE_URL = `${HTTP_SCHEME}://${HOST}/api`;

export const WS_BASE_URL = `${WS_SCHEME}://${HOST}/ws`;

// todo - configure production settings
