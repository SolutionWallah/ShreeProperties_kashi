# Festive Design Module

This folder is an optional, removable festive-design module. The existing
website does not import it, so the current design remains unchanged.

## Diwali activation

In an explicit integration point, import the module and its stylesheet:

```tsx
import { DiwaliLayer, diwaliTheme } from "../Festive-Design";
import "../Festive-Design/styles/diwali.css";

<DiwaliLayer theme={diwaliTheme}>{children}</DiwaliLayer>;
```

Keep the layer disabled by passing `festiveConfig` while its `enabled` value is
`false`, or omit the layer entirely. New festivals can add a theme file and
scoped stylesheet without changing the existing website.
