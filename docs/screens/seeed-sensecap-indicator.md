---
title: Seeed SenseCAP Indicator
description:
  Espcontrol on the Seeed SenseCAP Indicator — a 4-inch 480x480 square touchscreen with 9 buttons, powered by ESP32-S3.
---

# Seeed SenseCAP Indicator

The **Seeed SenseCAP Indicator** is a premium 4-inch square touchscreen powered by an **ESP32-S3** processor. It features a high-quality 480×480 display and room for **9 buttons** on the home screen.

## Specifications

| | |
|---|---|
| **Screen size** | 4 inches |
| **Resolution** | 480 × 480 |
| **Orientation** | Square |
| **Display interface** | RGB (ST7701S) |
| **Processor** | ESP32-S3 |
| **WiFi** | Built-in (2.4 GHz) |
| **PSRAM** | Octal, 80 MHz |
| **Touch** | FT5X06 capacitive |
| **Power** | USB-C |

## Button Grid

The home screen uses a **3-row × 3-column** grid, giving you **9 button slots**. Any button can be turned into a [subpage](/features/subpages) folder containing up to 8 more buttons.

Double-height buttons are supported — any button can span two rows for easier tapping.

## Install

Connect the display to your computer with a USB-C data cable, then click the button below.

<EspInstallButton slug="seeed-sensecap-indicator" />

For a full walkthrough including WiFi setup and Home Assistant pairing, see the [Install guide](/getting-started/install).

## ESPHome Manual Setup

If you use ESPHome and prefer to compile firmware yourself:

```yaml
substitutions:
  name: "sensecap-screen"
  friendly_name: "SenseCAP Screen"

wifi:
  ssid: !secret wifi_ssid
  password: !secret wifi_password

packages:
  setup:
    url: https://github.com/jtenniswood/espcontrol/
    file: devices/seeed-sensecap-indicator/packages.yaml
    refresh: 1sec
```

## Where to Buy

- **Seeed Studio:** [SenseCAP Indicator](https://www.seeedstudio.com/SenseCAP-Indicator-D1-p-5643.html)
