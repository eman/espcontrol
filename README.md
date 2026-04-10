![Espcontrol on a 7-inch touchscreen: home screen with temperature, clock, and control tiles](docs/public/images/home_screen_hero.jpg)

# Espcontrol

**Espcontrol** is free, open-source firmware that turns **Guition ESP32** touchscreens into a control panel for [Home Assistant](https://www.home-assistant.io/). Supported panels include the **7-inch JC1060P470** (1024×600, landscape, 20 buttons), the **4.3-inch JC4880P443** (480×800, portrait, 15 buttons), and the **4-inch 4848S040** (480×480, square, 9 buttons). Each panel uses a fixed grid layout sized to its screen, plus a status bar with a clock and temperatures, a screensaver, automatic brightness, and **over-the-air updates**. After the first install, everything is configured through the device's **built-in web page** — no coding or file editing required.

**Documentation and install guide:** [jtenniswood.github.io/espcontrol](https://jtenniswood.github.io/espcontrol/)

## Features

- **Up to 20 buttons** — control lights, switches, fans, locks, covers, media players, and more (9, 15, or 20 depending on screen size)
- **Subpages** — group related buttons into folders so you can have more buttons without cluttering the home screen
- **Double-height buttons** — make any button span two rows so it's easier to see and tap
- **Drag-and-drop ordering** — rearrange buttons from the web page on your phone or computer
- **Automatic icons** — the panel picks an icon based on the device type, or choose from hundreds manually
- **Custom labels** — name each button however you like, or leave it blank to use the name from Home Assistant
- **Colour themes** — set the on and off colours for your buttons
- **Backup and restore** — save your entire setup to a file and load it back on any panel
- **Indoor and outdoor temperature** shown in the top bar from any Home Assistant sensor
- **Live clock** — always visible, synced automatically
- **Screensaver** — dims and sleeps after a set time, or use a motion sensor to wake it when you walk past
- **Day and night brightness** — the screen adjusts automatically based on sunrise and sunset
- **Over-the-air updates** — new versions are installed automatically, or you can check and update manually
- **Easy WiFi setup** — if the panel can't connect, it creates its own hotspot so you can enter your WiFi details
- **On-screen guides** — step-by-step setup for WiFi and initial button configuration right on the display

![Web-based button configuration on the 4-inch 4848S040](docs/public/images/4848s040-buttons.png)

## Supported screens

| 7″ JC1060P470 | 4.3″ JC4880P443 | 4″ 4848S040 |
|:-:|:-:|:-:|
| ![7-inch JC1060P470](docs/public/images/jc1060p470-hero.png) | ![4.3-inch JC4880P443](docs/public/images/jc4880p443-hero.png) | ![4-inch 4848S040](docs/public/images/4848s040-hero.png) |
| 1024×600 landscape · 20 buttons | 480×800 portrait · 15 buttons | 480×480 square · 9 buttons |
| ESP32-P4 | ESP32-P4 | ESP32-S3 |
| [AliExpress ~£40](https://s.click.aliexpress.com/e/_c335W0r5) | [AliExpress ~£24](https://s.click.aliexpress.com/e/_c32jr3eN) | [AliExpress ~£16](https://s.click.aliexpress.com/e/_c3sIhvBv) |

**Desk stand for 7-inch** (3D printable): [MakerWorld](https://makerworld.com/en/models/2387421-guition-esp32p4-jc1060p470-7inch-screen-desk-mount#profileId-2614995)

See the [docs](https://jtenniswood.github.io/espcontrol/) for full specs and install instructions for each screen.

## Getting started

1. **Buy a panel** (see above)
2. **Flash the firmware** from your browser — follow the [install guide](https://jtenniswood.github.io/espcontrol/getting-started/install)
3. **Connect to WiFi** using the on-screen setup
4. **Add to Home Assistant** — it will be discovered automatically
5. **Allow Home Assistant actions** — [enable the device](https://jtenniswood.github.io/espcontrol/getting-started/home-assistant-actions) to control your entities
6. **Configure your buttons** by opening the panel's built-in web page

## Support This Project

If you find this project useful, consider buying me a coffee to support ongoing development!

<a href="https://www.buymeacoffee.com/jtenniswood">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50" />
</a>

## Links

- [Documentation](https://jtenniswood.github.io/espcontrol/)
- [Install guide](https://jtenniswood.github.io/espcontrol/getting-started/install)
- [FAQ](https://jtenniswood.github.io/espcontrol/reference/faq)
- [Report a bug or request a feature](https://github.com/jtenniswood/espcontrol/issues)
