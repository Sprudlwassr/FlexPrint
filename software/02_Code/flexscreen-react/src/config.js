export const MOONRAKER_CONFIG = {
  IP:   '10.133.92.110', // ← Pi-IP-Adresse hier eintragen
  PORT: 7125,
  get WS_URL()   { return `ws://${this.IP}:${this.PORT}/websocket`; },
  get HTTP_URL() { return `http://${this.IP}:${this.PORT}`; },
};
