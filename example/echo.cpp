void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
}
void loop() {
  // put your main code here, to run repeatedly:
  while (Serial.available() > 0) {
    // get incoming byte:
    Serial.write(Serial.read());
  }
}
