---
title: Garage Doors
description:
  How to use garage door cards on your Espcontrol panel to open and close Home Assistant cover entities.
---

# Garage Doors

A garage door card controls a Home Assistant `cover` entity as a simple open/close toggle.

Unlike a **Cover** card, it does not show a slider. It shows the current door state as the label and changes icon based on whether the door is closed or open.

## Setting Up a Garage Door

1. Select a card and change its type to **Garage Door**.
2. Enter an **Entity ID** — the Home Assistant garage door cover entity, for example `cover.garage_door`.
3. Choose the closed and open icons. These default to **Garage** and **Garage Open**.

There is no label setting for this card because the label area always shows the live state from Home Assistant.

## How It Works on the Panel

- Tapping the card sends a toggle action to Home Assistant.
- The card lights up while the door is open, opening, or closing.
- The label shows the Home Assistant state, such as **Open**, **Closed**, **Opening**, or **Closing**.
- The icon uses the closed **Garage** icon when the state is closed or closing, and the open icon when the state is open or opening.
