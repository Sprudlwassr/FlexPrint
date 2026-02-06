#include <TMCStepper.h>

const int stepPin = 5; 
const int dirPin = 19;  
const int enPin = 12;
#define RXD2 16 
#define TXD2 17 
#define R_SENSE 0.12f

TMC2209Stepper driver(&Serial2, R_SENSE, 0b00);

void setup() {
  delay(20000);

  Serial.begin(115200);
  Serial2.begin(115200, SERIAL_8N1, RXD2, TXD2);
  
  pinMode(stepPin, OUTPUT);
  pinMode(dirPin, OUTPUT);
  pinMode(enPin, OUTPUT);
  digitalWrite(enPin, LOW);

  driver.begin();
  
  // DIAGNOSE: Teste ob die Verbindung steht
  uint32_t v = driver.test_connection();
  if (v != 0) {
    Serial.print("FEHLER: Keine Verbindung zum TMC2209! Fehlercode: ");
    Serial.println(v);
    Serial.println("Prüfe Kabel an Pin 17 (TX2) zu PDN_UART.");
  } else {
    Serial.println("ERFOLG: TMC2209 über UART erkannt!");
  }

  driver.rms_current(600); // Testweise noch niedriger für 9V
  driver.microsteps(8); 
  driver.toff(4);
}

void loop() {
  digitalWrite(dirPin, HIGH);
  // SEHR LANGSAM STARTEN
  for (int x = 0; x < 200; x++) {
    digitalWrite(stepPin, HIGH);
    delayMicroseconds(5000); // Viel langsamer!
    digitalWrite(stepPin, LOW);
    delayMicroseconds(5000);
  }
  delay(1000);
}