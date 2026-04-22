---
title: Timezone
description:
  How to use timezone cards on your Espcontrol panel to show the local time in another location.
---

# Timezone

A timezone card shows the current local time for a selected location, such as **London**, **New York**, or **Tokyo**.

The card uses the same timezone list as the main Clock settings. The large value is the local time in that timezone, and the label is the location name.

## Setting Up a Timezone Card

1. Select a card and change its type to **Timezone**.
2. Choose a **Location** from the dropdown.
3. Apply the configuration so the panel restarts with the new card.

## How It Works on the Panel

- The card updates once per minute from the panel's Home Assistant time sync.
- The card follows your selected **12-hour** or **24-hour** clock format.
- It does not need a Home Assistant entity of its own.
- If the panel has not synced time yet, the card shows `--:--`.

Timezone cards use the **tertiary** colour from [Appearance](/features/appearance), like sensor, date, and weather cards.
