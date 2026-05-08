import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { MOONRAKER_CONFIG } from '../config';

const MoonrakerContext = createContext(null);

let msgId = 1;

export const MoonrakerProvider = ({ children }) => {
  const ws = useRef(null);
  const reconnectTimer = useRef(null);
  const pendingRequests = useRef({});
  const activePiSensor = useRef(null);

  const [moonrakerConnected, setMoonrakerConnected] = useState(false);
  const [klipperState, setKlipperState] = useState('disconnected');
  const [temps, setTemps] = useState({ extruder: 0, bed: 0, pi: 0 });

  // JSON-RPC request helper
  const send = useCallback((method, params = {}) => {
    return new Promise((resolve, reject) => {
      if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
        reject(new Error('WebSocket nicht verbunden'));
        return;
      }
      const id = msgId++;
      pendingRequests.current[id] = { resolve, reject };
      ws.current.send(JSON.stringify({ jsonrpc: '2.0', method, params, id }));
    });
  }, []);

  const sendGcode = useCallback((script) =>
    send('printer.gcode.script', { script }),
  [send]);

  const connect = useCallback(() => {
    if (ws.current) ws.current.close();

    console.log(`[Moonraker] Verbinde zu ${MOONRAKER_CONFIG.WS_URL}…`);
    const socket = new WebSocket(MOONRAKER_CONFIG.WS_URL);
    ws.current = socket;

    socket.onopen = async () => {
      console.log('[Moonraker] ✅ WebSocket verbunden');
      setMoonrakerConnected(true);
      clearTimeout(reconnectTimer.current);

      // 1. Klipper-Status abfragen
      try {
        const info = await send('printer.info');
        console.log('[Moonraker] Klipper-Status:', info.state, info);
        setKlipperState(info.state ?? 'unknown');
      } catch (e) {
        console.error('[Moonraker] ❌ printer.info fehlgeschlagen:', e);
        setKlipperState('error');
      }

      // 2. Alle verfügbaren Objekte abfragen um Pi-Sensor-Namen zu finden
      let piSensorKey = null;
      try {
        const objectList = await send('printer.objects.list');
        const keys = objectList?.objects ?? [];
        console.log('[Moonraker] Verfügbare Objekte:', keys);
        piSensorKey = keys.find(k => k.startsWith('temperature_sensor')) ?? null;
        console.log('[Moonraker] Pi-Sensor gefunden:', piSensorKey ?? 'keiner');
      } catch (e) {
        console.warn('[Moonraker] objects.list fehlgeschlagen:', e);
      }

      // 3. Live-Updates abonnieren (inkl. Anfangszustand)
      try {
        const subscribeObjects = {
          extruder:   ['temperature', 'target'],
          heater_bed: ['temperature', 'target'],
        };
        if (piSensorKey) subscribeObjects[piSensorKey] = ['temperature'];

        const result = await send('printer.objects.subscribe', { objects: subscribeObjects });
        console.log('[Moonraker] Subscription Anfangswerte:', result?.status);

        const s = result?.status ?? {};
        setTemps({
          extruder: s.extruder?.temperature   ?? 0,
          bed:      s.heater_bed?.temperature ?? 0,
          pi:       piSensorKey ? (s[piSensorKey]?.temperature ?? 0) : 0,
        });

        activePiSensor.current = piSensorKey;
      } catch (e) {
        console.error('[Moonraker] ❌ Subscription fehlgeschlagen:', e);
      }
    };

    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data);

      // Antwort auf eigene Requests
      if (msg.id && pendingRequests.current[msg.id]) {
        const { resolve, reject } = pendingRequests.current[msg.id];
        delete pendingRequests.current[msg.id];
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
        return;
      }

      // Server-seitige Events (notify_*)
      if (msg.method === 'notify_klippy_ready') {
        console.log('[Moonraker] ✅ Klipper bereit');
        setKlipperState('ready');
      }
      if (msg.method === 'notify_klippy_disconnected') {
        console.warn('[Moonraker] ⚠️ Klipper getrennt');
        setKlipperState('disconnected');
      }
      if (msg.method === 'notify_klippy_shutdown') {
        console.warn('[Moonraker] ⚠️ Klipper shutdown');
        setKlipperState('shutdown');
      }

      // Temperatur-Updates
      if (msg.method === 'notify_status_update') {
        const status = msg.params?.[0] ?? {};
        const piKey = activePiSensor.current;
        setTemps(prev => ({
          extruder: status.extruder?.temperature   ?? prev.extruder,
          bed:      status.heater_bed?.temperature ?? prev.bed,
          pi:       piKey ? (status[piKey]?.temperature ?? prev.pi) : prev.pi,
        }));
      }
    };

    socket.onerror = (e) => {
      console.error('[Moonraker] ❌ WebSocket Fehler:', e);
      setMoonrakerConnected(false);
      setKlipperState('disconnected');
    };

    socket.onclose = () => {
      console.warn('[Moonraker] Verbindung getrennt — reconnect in 3s');
      setMoonrakerConnected(false);
      setKlipperState('disconnected');
      reconnectTimer.current = setTimeout(connect, 3000);
    };
  }, [send]);

  useEffect(() => {
    connect();
    return () => {
      clearTimeout(reconnectTimer.current);
      ws.current?.close();
    };
  }, [connect]);

  return (
    <MoonrakerContext.Provider value={{
      moonrakerConnected,
      klipperState,
      klipperReady: klipperState === 'ready',
      temps,
      sendGcode,
    }}>
      {children}
    </MoonrakerContext.Provider>
  );
};

export const useMoonraker = () => useContext(MoonrakerContext);
