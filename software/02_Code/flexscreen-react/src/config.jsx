export const MOONRAKER_CONFIG = {
    HOSTNAME: "flexprint.local", // Dein Pi-Name
    PORT: "7125",
    get WS_URL() {
        return `ws://${this.HOSTNAME}:${this.PORT}/websocket`;
    },
    get HTTP_URL() {
        return `http://${this.HOSTNAME}:${this.PORT}`;
    }
};