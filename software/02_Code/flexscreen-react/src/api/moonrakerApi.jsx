import { MOONRAKER_CONFIG } from '../config';

const BASE_URL = MOONRAKER_CONFIG.HTTP_URL;

/**
 * Hilfsfunktion für POST-Requests
 */
const postRequest = async (endpoint, params = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return await response.json();
  } catch (error) {
    console.error(`Fehler bei API-Aufruf ${endpoint}:`, error);
  }
};

/**
 * Not-Aus (Emergency Stop)
 */
export const emergencyStop = () => postRequest('/printer/emergency_stop');

/**
 * Drucker neu starten (Firmware Restart)
 */
export const restartFirmware = () => postRequest('/printer/firmware_restart');

/**
 * G-Code Befehl senden (z.B. "G28" für Homing)
 */
export const sendGcode = (script) => 
  postRequest('/printer/gcode/script', { script });

/**
 * Temperaturen setzen
 * @param {string} heater - "extruder" oder "heater_bed"
 * @param {number} temp - Zieltemperatur
 */
export const setTemperature = (heater, temp) => 
  postRequest('/printer/gcode/script', { 
    script: `SET_HEATER_TEMPERATURE HEATER=${heater} TARGET=${temp}` 
  });

/**
 * Druckauftrag steuern (pause, resume, cancel)
 */
export const controlPrint = (action) => postRequest(`/printer/print/${action}`);