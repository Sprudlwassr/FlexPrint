import { useState, useEffect, useRef } from 'react';

export const useMoonraker = (url) => {
  const [data, setData] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    // 1. WebSocket-Verbindung initialisieren
    socket.current = new WebSocket(url);

    socket.current.onopen = () => {
      console.log("✅ WebSocket-Verbindung zu Moonraker steht!");
      setIsConnected(true);

      // 2. Abo-Anfrage (Subscription): Sag Moonraker, welche Daten wir live wollen
      const subscribeMessage = {
        jsonrpc: "2.0",
        method: "printer.objects.subscribe",
        params: {
          objects: {
            "extruder": ["temperature", "target"],
            "heater_bed": ["temperature", "target"],
            "toolhead": ["position", "status"],
            "display_status": ["progress", "message"],
            "print_stats": ["state", "filename"]
          }
        },
        id: 1 // Eine beliebige ID, um die Antwort zuzuordnen
      };
      socket.current.send(JSON.stringify(subscribeMessage));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      // 3. Daten verarbeiten
      // Moonraker schickt Updates meistens als "notify_status_update"
      if (message.method === "notify_status_update") {
        const update = message.params[0];
        setData((prevData) => ({
          ...prevData,
          ...update // Wir mischen die neuen Daten in den alten Zustand
        }));
      }
      
      // Falls es die erste Antwort auf unser Abo ist (Resultat der Subscription)
      if (message.result && message.result.status) {
        setData(message.result.status);
      }
    };

    socket.current.onerror = (error) => {
      console.error("❌ WebSocket Fehler:", error);
    };

    socket.current.onclose = () => {
      console.log("ℹ️ Verbindung zu Moonraker geschlossen.");
      setIsConnected(false);
    };

    // 4. Cleanup: Verbindung kappen, wenn die Komponente "stirbt"
    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, [url]);

  return { data, isConnected };
};