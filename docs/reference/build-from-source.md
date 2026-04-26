---
title: Build from Source
description:
  How to compile the Espcontrol factory firmware from source using Docker, ESPHome, and Python scripts.
---

# Build from Source

Build the Espcontrol factory firmware yourself using Docker and ESPHome. This is useful if you want to customize the firmware, contribute to development, or create releases.

## Prerequisites

- **Docker** — to run ESPHome compiler
- **Python 3** — for build scripts
- **Node.js 24+** — to generate the web UI
- **Git** — to clone the repository

## Clone the Repository

```bash
git clone https://github.com/eman/espcontrol.git
cd espcontrol
```

## Prepare Build Artifacts

Before compiling, generate the icon data and web UI:

```bash
npm ci                      # Install Node dependencies
python3 scripts/build.py    # Generate icons & www.js
```

These steps create:
- `common/assets/icon_glyphs.yaml` — LVGL font glyphs
- `components/espcontrol/icons.h` — C++ icon definitions
- `docs/public/webserver/*/www.js` — Per-device web UI (minified)

### Web UI Build Process

The web UI is built per-device into `docs/public/webserver/{device}/www.js` each time you run `python3 scripts/build.py`. Each file combines:

1. **Type handlers** — UI components from `src/webserver/types/*.js`:
   - Button types: `switch.js`, `sensor.js`, `slider.js`, `cover.js`, `garage.js`
   - Other types: `calendar.js`, `weather.js`, `internal.js`, `push.js`, `subpage.js`, `number.js`

2. **Device-specific configuration** — Per-device settings from `src/webserver/devices.json`:
   - Grid layout (rows, cols, spacing)
   - Screen sizing and aspect ratio
   - Component styling (button size, font sizes, etc.)

3. **Main UI template** — Base interface logic from `src/webserver/www.js`

The build script minifies the result using esbuild for optimal size. The www.js files are committed to source control so that:
- **Factory firmware** can embed them at compile time via `js_include`
- **OTA firmware** can fetch them at runtime from the main branch via `js_url`

CI automatically regenerates www.js files whenever source code changes and commits them back to the repository.

**When to rebuild locally:**
- After modifying any file in `src/webserver/` (template, types, devices config)
- After adding a new button type handler
- Before compiling firmware for factory builds

To manually rebuild:
```bash
python3 scripts/build.py
```

## Build Factory Firmware

The **factory firmware** includes the web UI bundled inline, so the web interface works on first boot before WiFi is configured.

### Build a Single Device

Replace `guition-esp32-p4-jc1060p470` with your device slug:

```bash
docker run --rm -v "${PWD}:/config" \
  ghcr.io/esphome/esphome:2026.4.0 \
  compile /config/builds/guition-esp32-p4-jc1060p470.factory.yaml
```

### Supported Device Slugs

| Device | Slug |
| --- | --- |
| 10.1-inch JC8012P4A1 (ESP32-P4) | `guition-esp32-p4-jc8012p4a1` |
| 7-inch JC1060P470 (ESP32-P4) | `guition-esp32-p4-jc1060p470` |
| 4.3-inch JC4880P443 (ESP32-P4) | `guition-esp32-p4-jc4880p443` |
| 4-inch 4848S040 (ESP32-S3) | `guition-esp32-s3-4848s040` |
| 4-inch SenseCAP Indicator | `seeed-sensecap-indicator` |

### Build with Version

To set the firmware version (useful for releases):

```bash
docker run --rm -v "${PWD}:/config" \
  ghcr.io/esphome/esphome:2026.4.0 \
  -s firmware_version "v1.0.0" \
  compile /config/builds/guition-esp32-p4-jc1060p470.factory.yaml
```

## Output Files

After compilation, find the firmware binaries here:

```
builds/.esphome/build/<device-slug>/
├── firmware.factory.bin    # Initial flash image (includes web UI)
└── firmware.bin            # OTA update image
```

- **firmware.factory.bin** — Flash to a blank device with ESPHome Web Tools or ESPHome's USB installation
- **firmware.bin** — Use for OTA updates on an already-running device

## Build All Devices

To compile firmware for all supported devices:

```bash
for slug in guition-esp32-p4-jc8012p4a1 guition-esp32-p4-jc1060p470 \
            guition-esp32-p4-jc4880p443 guition-esp32-s3-4848s040; do
  docker run --rm -v "${PWD}:/config" \
    ghcr.io/esphome/esphome:2026.4.0 \
    compile /config/builds/${slug}.factory.yaml
done
```

## Development Build Without Docker

If you have ESPHome installed locally, compile directly:

```bash
esphome compile builds/guition-esp32-p4-jc1060p470.factory.yaml
```

## Validate Without Building

To check if the YAML configuration is valid without compiling:

```bash
docker run --rm -v "${PWD}:/config" \
  ghcr.io/esphome/esphome:2026.4.0 \
  config /config/builds/guition-esp32-p4-jc1060p470.factory.yaml
```

## Flash with esptool

If you prefer to flash the compiled firmware directly using `esptool`, follow these steps:

### Prerequisites

- `esptool` v5.0+ installed
- USB-C data cable connected to the device

### Identify the Serial Port

Connect the device via USB-C and find its serial port:

**macOS/Linux:**
```bash
ls /dev/tty.* | grep -i usb
# or
ls /dev/ttyUSB*
```

**Windows:**
```bash
mode
```

The serial port typically looks like `/dev/tty.usbserial-xxxxx` (macOS), `/dev/ttyUSB0` (Linux), or `COM3` (Windows).

### Locate the Compiled Firmware

After compiling, find the firmware binary:

```bash
# Find the build directory for your device
BUILD_DIR=$(find builds/.esphome/build -name firmware.factory.bin -print -quit | xargs dirname)
echo $BUILD_DIR
```

This will output something like:
```
builds/.esphome/build/espcontrol-jc1060p470/.pioenvs/espcontrol-jc1060p470
```

### Flash the Firmware

Replace `<serial-port>`, `<chip>`, and `<build-dir>` with your values:

```bash
esptool --chip <chip> --port <serial-port> --baud 460800 \
  --before default_reset --after hard_reset \
  write-flash --flash-mode dio --flash-freq 80m --flash-size keep \
  0x0 <build-dir>/firmware.factory.bin
```

**Replace these values:**
- `<chip>` — Device chip: `esp32p4` (10.1", 7", 4.3" models) or `esp32s3` (4" models)
- `<serial-port>` — Your USB serial port (e.g., `/dev/tty.usbserial-xxxxx`, `COM3`)
- `<build-dir>` — Path to compiled firmware from find command above

### Example Commands

**7-inch JC1060P470 (ESP32-P4) on macOS:**
```bash
esptool --chip esp32p4 --port /dev/tty.usbserial-12345678 --baud 460800 \
  --before default_reset --after hard_reset \
  write-flash --flash-mode dio --flash-freq 80m --flash-size keep \
  0x0 builds/.esphome/build/espcontrol-jc1060p470/.pioenvs/espcontrol-jc1060p470/firmware.factory.bin
```

**4-inch 4848S040 (ESP32-S3) on Linux:**
```bash
esptool --chip esp32s3 --port /dev/ttyUSB0 --baud 460800 \
  --before default_reset --after hard_reset \
  write-flash --flash-mode dio --flash-freq 80m --flash-size keep \
  0x0 builds/.esphome/build/espcontrol-4848s040/.pioenvs/espcontrol-4848s040/firmware.factory.bin
```

**4-inch SenseCAP Indicator (ESP32-S3) on Windows:**
```bash
esptool --chip esp32s3 --port COM3 --baud 460800 ^
  --before default_reset --after hard_reset ^
  write-flash --flash-mode dio --flash-freq 80m --flash-size keep ^
  0x0 builds\.esphome\build\espcontrol-sensecap\.pioenvs\espcontrol-sensecap\firmware.factory.bin
```

### What Happens

1. **Connect** — esptool connects to the device via serial port
2. **Reset & bootloader** — Device enters ROM bootloader mode
3. **Erase & flash** — esptool erases relevant flash regions and writes the firmware
4. **Hard reset** — Device resets automatically after flashing completes
5. **Boot** — Device boots into the new firmware

After flashing, the display will show a loading screen, then the WiFi setup page.

## CI/CD

The repository uses GitHub Actions to:
- Validate generated files and build configuration
- Compile firmware for all devices on every push to `main`
- Create release firmware and manifests on tagged releases

See [`.github/workflows/`](https://github.com/eman/espcontrol/tree/main/.github/workflows) for workflow definitions.

## Troubleshooting

**"esbuild not found"** — Run `npm ci` to install dependencies.

**"esphome not found"** — Ensure Docker is running and the image is available, or install ESPHome locally.

**Compilation fails** — Check that `python3 scripts/build.py` ran successfully. If icon or web UI generation failed, fix those errors first.

**"js_include file not found"** — Ensure you ran `npm ci && python3 scripts/build.py` to generate the web UI files.
