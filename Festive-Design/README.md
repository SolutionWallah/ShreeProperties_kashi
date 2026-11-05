# Festive Design Module

The festive layer lives in this folder. The root layout applies its wrapper
once, while the site header and property cards render shared seasonal effects
without importing festival settings.

## Add or switch a festival

1. Add or update a festival entry in `config.ts` with its palette and enabled
   effects and banner message.
2. Set `activeFestival` in the same file to that entry's key.
3. Set `festiveConfig.enabled` to `false` to turn the festive layer off.

The shared wrapper, effect components, and stylesheet stay unchanged when
switching between configured festivals. Festival animations are CSS-only and
respect reduced-motion preferences.
