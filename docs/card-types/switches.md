---
title: Switch
description:
  How to use switch cards on your Espcontrol panel to control Home Assistant entities.
---

# Switch

A Switch card is the default on/off card. It controls one Home Assistant entity from the touchscreen and shows whether that entity is currently active.

Use Switch cards for common Home Assistant entities such as lights, switches, fans, locks, media players, covers, and button entities. The entity needs to support a Home Assistant toggle or button press action to respond when tapped.

![Switch card showing a Heater icon](/images/card-toggle.png)

## Setting Up a Switch Card

1. Select a card and change its type to **Switch**. New cards use **Switch** by default.
2. Enter an **Entity ID** - the Home Assistant entity you want to control, for example `light.kitchen` or `switch.garden_lights`.
3. Set a **Label** if you want custom text on the card. If left blank, the friendly name from Home Assistant is used.
4. Choose an **Icon**, or leave it as **Auto** so the panel picks an icon from the entity type.
5. Optionally turn on **When Entity On** to change what the card shows while the entity is active.

## How It Works on the Panel

- Tapping most Switch cards sends a Home Assistant toggle action for the entity.
- If the entity starts with `button.`, tapping the card sends a button press instead.
- The card lights up when Home Assistant reports an active state such as `on`, `open`, `opening`, `closing`, `playing`, `home`, or `unlocked`.
- If the entity is changed somewhere else, such as in Home Assistant or by an automation, the card updates to match.

## When Entity On

Switch cards have an optional **When Entity On** section:

- **Replace Icon** - show a different icon while the entity is active.
- **Sensor Data** - show a live sensor value instead of the icon while the entity is active. You can set the sensor entity, unit, and decimal precision.

When the entity is not active, the card goes back to its normal icon.

::: info Requires Home Assistant actions
Switch cards send Home Assistant actions from the panel. If tapping a card does nothing, check [Home Assistant Actions](/getting-started/home-assistant-actions).
:::
