export const MOONRAKER_CONFIG = {
  IP:   '127.0.1.1', // ← Pi-IP-Adresse hier eintragen
  PORT: 7125,
  get WS_URL()   { return `ws://${this.IP}:${this.PORT}/websocket`; },
  get HTTP_URL() { return `http://${this.IP}:${this.PORT}`; },
};
