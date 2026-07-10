# ZOKUZOKU Website

Official website for ZOKUZOKU projects.

- Home: https://zokuzoku.github.io/
- Cat Gatekeeper: https://zokuzoku.github.io/cat-gatekeeper/

Visual assets are all rights reserved. See [ASSETS_LICENSE.md](ASSETS_LICENSE.md).

## Design Editing Rules

- Before adding a new section, first check existing shared section styles and reuse them.
- Do not create one-off heading sizes, section gaps, colors, or layout rules unless the shared styles truly cannot handle the design.
- When a new section should match existing sections, add its selector to the existing shared selector group instead of making separate CSS.
- Section heading spacing must use the shared `--section-heading-gap`; do not tune kicker/body spacing per section.
- Keep alternating section backgrounds consistent from top to bottom after inserting a new section.
- Only add section-specific CSS for the minimum unique element, such as a new CTA button or media treatment.
