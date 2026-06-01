# design-system.md — Meta-Xi Dashboard

> Extracted strictly from Dashboard__1_.png. No invented values.

---

## 1. Color System

### Semantic Tokens

| Token | Hex | Usage |
|---|---|---|
| `bg-page` | `#F0F0F0` | Page background (light gray) |
| `bg-sidebar` | `#FFFFFF` | Sidebar background |
| `surface-card` | `#FFFFFF` | All dashboard cards |
| `surface-insight` | `#EDE9F8` | Weekly Insight banner inset (soft lavender) |
| `text-primary` | `#1A1A1A` | Headings, bold labels, nav items |
| `text-secondary` | `#6B6B6B` | Subtitles, timestamps, message previews |
| `text-muted` | `#9CA3AF` | Placeholder, disabled, empty states |
| `text-on-dark` | `#FFFFFF` | Text on active nav pill |
| `accent-main` | `#00C9B1` | Grounding CTA button (teal, start of gradient) |
| `accent-gradient-end` | `#7EDCCC` | Grounding CTA button (cyan, end of gradient) |
| `accent-link` | `#5B8DEF` | "View All" links, "+ Add New Action Item" |
| `nav-active-bg` | `#1A1A1A` | Active sidebar nav pill background |
| `chart-area` | `#F5C6D8` | Pink area fill, mental stability chart (series 1) |
| `chart-line` | `#8B9CF4` | Blue/indigo line + dots, mental stability chart (series 2) |
| `badge-unread` | `#EF4444` | Unread count badge on notification bell and chat items |
| `checkbox-done` | `#00C9B1` | Filled checkbox circle for completed action items |
| `timeline-icon-1` | `#F472B6` | Pink (Mental stability improved) |
| `timeline-icon-2` | `#34D399` | Green (AI companion chat) |
| `timeline-icon-3` | `#60A5FA` | Blue (Journal entry) |
| `timeline-icon-4` | `#F472B6` | Pink (Mental breakdown) |
| `timeline-icon-5` | `#FBBF24` | Yellow (Mental stability improved, bottom) |
| `border-default` | `#E5E7EB` | Card borders (very subtle, may be shadow only) |
| `insight-icon-bg` | `#C4B5FD` | Purple circle behind sparkle icon in insight banner |

---

## 2. Typography

> Font family: appears to be a clean geometric sans-serif (likely Inter or similar system font at render). Weight-forward hierarchy.

### Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `text-page-title` | 28–32px | 700 | "Welcome back!" top heading |
| `text-page-subtitle` | 14px | 400 | "Here's how you have been doing." |
| `text-card-title` | 20–22px | 700 | "Mental Stability", "Action Items", "Recent Timeline", "Recent Chats" |
| `text-card-subtitle` | 13px | 400 | Card subtitles below title |
| `text-body` | 14px | 400 | Insight text, checklist labels |
| `text-label-bold` | 14px | 600 | "Weekly Insight:" label prefix, nav items |
| `text-nav` | 14px | 500 | Sidebar nav labels |
| `text-caption` | 12px | 400 | Timestamps ("Apr 21, 2026 | 9:41 PM"), message previews |
| `text-chat-name` | 14px | 600 | Chat contact names |
| `text-btn` | 14px | 600 | Button labels ("Start Grounding Exercise") |
| `text-link` | 13–14px | 500 | "View All", "+ Add New Action Item" |

### Strikethrough
- Completed action items: `text-secondary` + `line-through` decoration

---

## 3. Spacing System

> Base unit: 4px

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Tight inline gaps |
| `space-2` | 8px | Icon-to-label gaps, badge padding |
| `space-3` | 12px | Inner card padding (compact) |
| `space-4` | 16px | Standard gap between elements in a card |
| `space-5` | 20px | Card internal padding (top/bottom) |
| `space-6` | 24px | Card internal padding (left/right) |
| `space-8` | 32px | Gap between card rows |
| `space-10` | 40px | Section vertical spacing |

### Layout
- Sidebar width: ~240px (fixed)
- Main content: fluid, left/right padding ~32px
- Card gap (grid): ~24px
- Left column: ~60% width
- Right column: ~38% width
- Bottom row: 2 equal columns at ~50% each

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-card` | 16px | All dashboard cards |
| `radius-btn-pill` | 9999px | "Start Grounding Exercise" CTA, "Weekly" dropdown |
| `radius-checkbox` | 9999px | Checklist circle checkboxes |
| `radius-badge` | 9999px | Unread count badges |
| `radius-avatar` | 9999px | User avatar, chat avatars |
| `radius-nav-pill` | 8px | Active sidebar nav item |
| `radius-insight-banner` | 12px | Weekly Insight inset banner |
| `radius-timeline-icon` | 9999px | Timeline colored dot icons |

---

## 5. Elevation

| Token | Value | Usage |
|---|---|---|
| `shadow-card` | `0 1px 4px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)` | All white surface cards |
| `shadow-sidebar` | `1px 0 0 #E5E7EB` | Right border on sidebar (subtle separator) |
| `shadow-btn` | none visible | CTA button has no shadow, relies on gradient fill |
| `shadow-dropdown` | `0 2px 8px rgba(0,0,0,0.10)` | "Weekly" dropdown pill |

> Cards sit at one elevation level only. No layered card-within-card shadows except the insight banner (flat, no shadow, uses bg color to separate).

---

## 6. Component Specs

### Sidebar
- Width: 240px, fixed, full height
- Logo: top, ~48px height, centered or left-aligned with 24px padding
- Nav items: icon (18px) + label, 14px, 500 weight, 12px vertical padding, 16px horizontal
- Active state: `nav-active-bg` pill, full width minus 16px margin, `radius-nav-pill`
- Divider: 1px `border-default`, full width, 16px vertical margin
- Log Out: same style as nav items, bottom of sidebar

### Cards
- Background: `surface-card`
- Border radius: `radius-card`
- Shadow: `shadow-card`
- Padding: 24px
- Title: `text-card-title` + subtitle on next line in `text-card-subtitle`
- "View All" link: `accent-link`, `text-link`, top-right aligned to card header

### Buttons

**Grounding CTA**
- Width: 100% of card
- Height: ~48px
- Background: linear-gradient(to right, `accent-main`, `accent-gradient-end`)
- Label: `text-btn`, `text-on-dark` (dark text, not white, based on teal lightness)
- Radius: `radius-btn-pill`
- No border, no shadow

**Weekly Dropdown**
- Outlined pill: 1px border `border-default`, `surface-card` bg
- Label: "Weekly" + chevron icon, `text-label-bold`
- Radius: `radius-btn-pill`
- Shadow: `shadow-dropdown`

**View Analytics Button**
- Width: 100% of insight banner
- Height: ~44px
- Background: `surface-card`
- Border: 1px `border-default`
- Label: "View Analytics →", `text-body`, `text-primary`, centered
- Radius: `radius-card` (inherits banner radius)

### Action Items (Checklist)

| State | Spec |
|---|---|
| Unchecked | Empty circle, 20px, 2px border `border-default` |
| Checked | Filled circle `checkbox-done`, white checkmark icon inside |
| Label (unchecked) | `text-body`, `text-primary` |
| Label (checked) | `text-body`, `text-secondary`, `line-through` |
| Add link | `accent-link`, `text-link`, "+ " prefix, left-aligned, 16px top margin |

Row height: ~44px. 16px gap between items.

### Graph Container (Mental Stability Card)

- Full card width minus 48px (24px padding each side)
- Height: ~240px visible chart area
- Y-axis: left-aligned, number label (100, 50, 0) + text label (Stable, Moderate, Struggling) stacked
- X-axis: day labels (Mon–Sun), centered under each data point
- Series 1: filled area, `chart-area`, soft/translucent
- Series 2: line, `chart-line`, 2px stroke, circular dot markers (~8px diameter, filled, white center)
- Grid lines: horizontal only, 1px `border-default`, dashed or very faint

### Timeline Items

- Row height: ~56px
- Left: colored circle icon, 32px diameter, `radius-timeline-icon`
- Vertical connector: dashed line, 1px, `border-default`, between icons
- Label: `text-body`, `text-primary`, 600 weight
- Timestamp: `text-caption`, `text-secondary`, below label, with "|" separator
- Right: chevron icon, `text-muted`

### Chat Items

- Row height: ~56px
- Avatar: 40px circle, `radius-avatar`
- Name: `text-chat-name`, `text-primary`
- Preview: `text-caption`, `text-secondary`, single line, truncated with ellipsis
- Unread badge: `badge-unread`, white number, 18px min-width, `radius-badge`, top-right of row

---

## 7. State System

> Only states inferable from the visible UI. No invented states.

| Component | State | Spec |
|---|---|---|
| Nav item | Default | `text-primary`, no background |
| Nav item | Active | `nav-active-bg` pill, `text-on-dark` |
| Nav item | Hover | Infer: light gray bg (not shown, implement as `bg-page`) |
| Checkbox | Unchecked | Empty circle, `border-default` |
| Checkbox | Checked | `checkbox-done` fill, white check icon |
| CTA button | Default | Gradient fill, full opacity |
| CTA button | Hover | Infer: slight brightness increase (not shown) |
| Chat item | Unread | `badge-unread` badge visible |
| Chat item | Read | No badge |
| Timeline item | Default | Colored icon, label, timestamp |
| Notification bell | Has notifications | `badge-unread` badge with count (2) |
| Action item label | Done | `text-secondary` + `line-through` |
| Action item label | Pending | `text-primary`, no decoration |
| Dropdown | Default | Outlined pill, "Weekly" label |
| Empty states | Not shown | Define separately when building |
| Loading states | Not shown | Define separately when building |
| Disabled states | Not shown | Define separately when building |

---

*Source of truth: Dashboard__1_.png. All values are extracted or closely inferred from the visible design. Token names are implementation-ready for Tailwind CSS custom config or CSS variables.*
