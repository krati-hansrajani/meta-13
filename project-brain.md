# project-brain.md — Meta-Xi Mental Wellness Dashboard

---

## 1. Product Overview

- **Name:** Meta-Xi
- **Type:** Mental wellness web app
- **Stack:** React, Vite, Tailwind CSS, Vercel
- **Stage:** Design complete. Scaffold done. No UI built.

---

## 2. User Intent

| Need | Feature |
|---|---|
| Track weekly mood | Mental Stability graph |
| Read recent patterns | Weekly Insight banner |
| Anxiety relief | Feeling Anxious CTA |
| Manage wellness tasks | Action Items checklist |
| Review activity | Recent Timeline |
| Check messages | Recent Chats |

---

## 3. Dashboard Structure

- Sidebar
- Top Bar
- Main Dashboard:
  - Mental Stability Graph
  - Weekly Insight Banner
  - Feeling Anxious CTA
  - Action Items
  - Recent Timeline
  - Recent Chats

---

## 4. Component Hierarchy

```
App
  Sidebar
    Logo
    NavItem x5
    Divider
    LogOutButton
  MainContent
    TopBar
      WelcomeText
      NotificationBell
      UserAvatar
    DashboardGrid
      LeftColumn
        MentalStabilityCard
          CardHeader
          WeeklyDropdown
          StabilityChart
          WeeklyInsightBanner
            InsightIcon
            InsightText
            ViewAnalyticsButton
        RecentTimelineCard
          CardHeader
          TimelineItem x5
      RightColumn
        FeelingAnxiousCard
          Emoji
          Heading
          Subtitle
          GroundingCTAButton
        ActionItemsCard
          CardHeader
          ChecklistItem x4
          AddNewItemLink
      BottomRow
        RecentChatsCard
          CardHeader
          ChatItem x5
```

---

## 5. Core Flows

1. **Grounding:** Dashboard -> "Start Grounding Exercise" -> modal/screen -> complete -> Dashboard
2. **Check off task:** Action item checked -> done state persists
3. **Analytics:** "View Analytics" -> Wellness Timeline screen
4. **Chats:** "View All" (chats) -> Messages screen
5. **Timeline:** "View All" (timeline) -> Wellness Timeline screen

---

## 6. Current Build State

| Item | Status |
|---|---|
| React + Vite | Done |
| Tailwind CSS | Verify |
| Routing | Not started |
| Sidebar | Not started |
| TopBar | Not started |
| MentalStabilityCard | Not started |
| WeeklyInsightBanner | Not started |
| FeelingAnxiousCard | Not started |
| ActionItemsCard | Not started |
| RecentTimelineCard | Not started |
| RecentChatsCard | Not started |
| Mock data | Not started |

---

## 7. Action Items

- [ ] Verify Tailwind + PostCSS config
- [ ] Install React Router, add `/dashboard` route
- [ ] Create mock data: 7-day mood scores, 5 timeline events, 4 action items, 5 chats
- [ ] Build `Sidebar` with nav, active state, log out
- [ ] Build `TopBar` with bell badge and avatar
- [ ] Install Recharts
- [ ] Build `MentalStabilityCard`: chart, dropdown, insight banner, analytics button
- [ ] Build `FeelingAnxiousCard`: emoji, copy, CTA button
- [ ] Build `ActionItemsCard`: toggle done state, add item
- [ ] Build `RecentTimelineCard`: icon, label, timestamp, chevron
- [ ] Build `RecentChatsCard`: avatar, name, preview, unread badge
- [ ] Assemble `DashboardGrid`: 2-col + bottom row
- [ ] Responsive: single column mobile, sidebar collapse

---

*Source of truth: Dashboard__1_.png*
