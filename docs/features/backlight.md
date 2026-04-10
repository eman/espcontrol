---
title: Backlight
description:
  How the Espcontrol panel automatically adjusts screen brightness during the day and night based on sunrise and sunset.
---

# Backlight

Your panel can automatically adjust its screen brightness based on the time of day — brighter during daylight hours and dimmer at night. This is especially useful for panels in bedrooms or hallways where a bright screen at night would be distracting.

## How it works

The panel calculates sunrise and sunset times on-device using your selected timezone. It uses the timezone to look up approximate coordinates for your region, then runs a NOAA solar algorithm to determine when the sun rises and sets each day. During daylight hours (between sunrise and sunset), it uses your **daytime brightness** setting. At night, it switches to your **nighttime brightness** setting.

The transition is checked every 60 seconds and happens automatically. At midnight, sunrise and sunset are recalculated for the new day. No internet connection or Home Assistant is needed for the brightness schedule to work — it runs entirely on the device.

## Settings

These are configured from the **Settings** tab in the [Setup](/features/setup), under the **Brightness** section.

- **Timezone** — select your timezone so the panel can calculate sunrise and sunset for your location. This is the only setting you need to configure for the brightness schedule to work.
- **Daytime brightness** — how bright the screen should be during the day. Range: 10%–100%, default: 100%.
- **Nighttime brightness** — how bright the screen should be at night. Range: 10%–100%, default: 75%.
- **Sunrise / Sunset** — these are shown for reference so you can see when the brightness will change. They update automatically each day based on your timezone.

## Screensaver and brightness

When the screensaver is active, the backlight turns off regardless of the brightness schedule. When the panel wakes up (by touch or presence sensor), it returns to the correct brightness for the current time of day.

## If sunrise and sunset aren't available

If the panel hasn't synced its clock yet (for example, during initial setup before connecting to Home Assistant), it defaults to using the **daytime brightness** setting at all times. Once the time syncs, sunrise and sunset are calculated immediately.