# SammaPix Email Strategy — Database Schema Reference

**For:** Developer implementing email system
**Last Updated:** 2026-03-19

---

## USER TABLE UPDATES

### Add These Fields to Existing `user` Table

```sql
-- Segmentation & Email Preferences
ALTER TABLE "user" ADD COLUMN segment TEXT DEFAULT 'free_trial';
-- Values: 'free_trial' | 'free_active' | 'free_inactive' | 'pro_active' | 'pro_churned' | 'dormant'

ALTER TABLE "user" ADD COLUMN industry_tag TEXT DEFAULT 'unknown';
-- Values: 'photographer' | 'developer' | 'blogger' | 'content_creator' | 'unknown'

ALTER TABLE "user" ADD COLUMN email_unsubscribed BOOLEAN DEFAULT false;

ALTER TABLE "user" ADD COLUMN email_bounce_count INTEGER DEFAULT 0;

ALTER TABLE "user" ADD COLUMN last_login TIMESTAMP DEFAULT NOW();

ALTER TABLE "user" ADD COLUMN email_segment_updated_at TIMESTAMP DEFAULT NOW();

-- For nurturing sequence tracking
ALTER TABLE "user" ADD COLUMN nurturing_email_index INTEGER DEFAULT 0;
-- Tracks which nurturing email to send next (0-5 for 6-email sequence)

ALTER TABLE "user" ADD COLUMN reengagement_email_index INTEGER DEFAULT 0;
-- Tracks which re-engagement email to send next (0-3 for 4-email sequence)

ALTER TABLE "user" ADD COLUMN reengage_started_at TIMESTAMP;
-- When did user enter re-engagement flow?

-- For milestone tracking
ALTER TABLE "user" ADD COLUMN milestone_100_sent_at TIMESTAMP;
ALTER TABLE "user" ADD COLUMN milestone_1000_sent_at TIMESTAMP;
ALTER TABLE "user" ADD COLUMN milestone_365_days_sent_at TIMESTAMP;
ALTER TABLE "user" ADD COLUMN milestone_first_pro_payment_sent_at TIMESTAMP;
```

### Full Updated User Schema (Prisma Example)

```prisma
model User {
  id                        String   @id @default(cuid())
  email                     String   @unique
  firstName                 String?

  // Authentication
  provider                  String   // "google" | "github"
  providerId                String

  // Subscription
  tier                      String   @default("free")  // "free" | "pro"
  stripeCustomerId          String?  @unique
  stripeSubscriptionId      String?  @unique
  subscriptionStartDate     DateTime?
  subscriptionCancelDate    DateTime?

  // Email & Engagement
  segment                   String   @default("free_trial")
  industry_tag              String   @default("unknown")
  email_unsubscribed        Boolean  @default(false)
  email_bounce_count        Int      @default(0)
  last_login                DateTime @default(now()) @updatedAt
  email_segment_updated_at  DateTime @default(now())

  // Nurturing Sequence Tracking
  nurturing_email_index     Int      @default(0)  // 0-5
  nurturing_started_at      DateTime?

  // Re-engagement Flow Tracking
  reengagement_email_index  Int      @default(0)  // 0-3
  reengage_started_at       DateTime?

  // Milestone Tracking
  milestone_100_sent_at     DateTime?
  milestone_1000_sent_at    DateTime?
  milestone_365_days_sent_at DateTime?
  milestone_first_pro_sent_at DateTime?

  // Profile Setup
  role                      String?  // "photographer" | "developer" | "blogger" | "content_creator" | "other"
  primary_goal              String?  // "compress" | "convert" | "batch" | "automate" | "improve_quality"
  company_name              String?

  // Usage Tracking
  total_images_processed    Int      @default(0)
  tools_used                String[] // ["upscaler", "watermark", "batch_compress", ...]

  createdAt                 DateTime @default(now())
  updatedAt                 DateTime @updatedAt

  // Relations
  images                    Image[]
  emailEvents               EmailEvent[]
}
```

---

## NEW TABLES

### 1. Newsletter Table

```prisma
model Newsletter {
  id                 String   @id @default(cuid())
  week               Int      @unique  // Week number of year (1-52)

  // Content
  subject            String
  quickWinTitle      String
  quickWinContent    String   @db.Text
  featureTitle       String
  featureContent     String   @db.Text
  whatsNewTitle      String
  whatsNewContent    String   @db.Text
  footerNote         String?  @db.Text

  // Status
  status             String   @default("draft")  // "draft" | "scheduled" | "sent"
  scheduledSendAt    DateTime?
  sentAt             DateTime?

  // Metrics
  sentCount          Int      @default(0)
  openCount          Int      @default(0)
  clickCount         Int      @default(0)
  unsubscribeCount   Int      @default(0)

  createdAt          DateTime @default(now())
  updatedAt          DateTime @updatedAt

  // Relations
  emailEvents        EmailEvent[]
}
```

### 2. Email Events Table (For Tracking Opens, Clicks, Bounces)

```prisma
model EmailEvent {
  id              String   @id @default(cuid())

  // Link to user
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Email type
  emailType       String   // "onboarding_day0" | "nurturing_1" | "newsletter" | "feature_announcement" | etc.
  campaignId      String?  // For grouping emails (e.g., newsletter week #)

  // Event type
  event           String   // "sent" | "delivered" | "opened" | "clicked" | "bounced" | "unsubscribed"

  // Metadata
  subject         String
  link            String?  // URL clicked (if event = "clicked")
  resendEventId   String?  // For idempotency with Resend webhooks

  timestamp       DateTime @default(now())

  // Relations
  newsletter      Newsletter? @relation(fields: [campaignId], references: [id])
}

// Index for fast queries
model EmailEvent {
  @@index([userId])
  @@index([emailType])
  @@index([event])
  @@index([timestamp])
}
```

### 3. EmailTemplate Table (Optional: For Managing Multiple Variants)

```prisma
model EmailTemplate {
  id              String   @id @default(cuid())

  // Metadata
  name            String   // "nurturing_1" | "reengagement_3" | "feature_announcement"
  emailType       String

  // A/B Testing
  variant         String   @default("A")  // "A" | "B" | "control"
  subjectLine     String

  // Content
  htmlContent     String?  @db.Text
  textContent     String?  @db.Text

  // Status
  isActive        Boolean  @default(true)

  // Metrics
  totalSent       Int      @default(0)
  totalOpened     Int      @default(0)
  totalClicked    Int      @default(0)

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
```

---

## SEGMENTATION LOGIC (PSEUDOCODE)

### Daily Segment Update Function

```typescript
// lib/cron/updateSegments.ts

export async function updateUserSegments() {
  const users = await db.user.findMany();

  for (const user of users) {
    const now = new Date();
    const daysSinceSignup = Math.floor(
      (now.getTime() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysSinceLastLogin = Math.floor(
      (now.getTime() - user.last_login.getTime()) / (1000 * 60 * 60 * 24)
    );

    let newSegment = "unknown";

    // Decision tree for segmentation
    if (daysSinceSignup < 30) {
      newSegment = "free_trial";
    } else if (user.tier === "pro" && user.subscriptionCancelDate && daysSinceLastLogin < 14) {
      newSegment = "pro_churned";
    } else if (user.tier === "pro" && !user.subscriptionCancelDate && daysSinceLastLogin < 7) {
      newSegment = "pro_active";
    } else if (user.tier === "free" && daysSinceLastLogin < 7) {
      newSegment = "free_active";
    } else if (user.tier === "free" && daysSinceLastLogin < 60 && daysSinceLastLogin >= 7) {
      newSegment = "free_inactive";
    } else if (daysSinceLastLogin >= 60) {
      newSegment = "dormant";
    }

    // Update industry_tag based on tools used
    if (
      user.tools_used.includes("upscaler") ||
      user.tools_used.includes("watermark") ||
      (user.tools_used.filter(t => t.includes("image")).length >= 3)
    ) {
      user.industry_tag = "photographer";
    } else if (
      user.tools_used.includes("batch_compress") ||
      user.tools_used.includes("batch_rename") ||
      user.tools_used.filter(t => t.includes("batch")).length >= 2
    ) {
      user.industry_tag = "developer";
    }

    // Update user if segment changed
    if (user.segment !== newSegment) {
      await db.user.update({
        where: { id: user.id },
        data: {
          segment: newSegment,
          email_segment_updated_at: now,
        },
      });
    }
  }
}
```

---

## TRACKING USER TOOLS & BEHAVIOR

### Update Image Processing Function

Whenever a user processes an image, track which tools they use:

```typescript
// lib/processImage.ts

export async function processImage(
  userId: string,
  toolName: string,
  imageData: ImageProcessingData
) {
  // ... existing processing logic ...

  // Track tool usage
  const user = await db.user.findUnique({ where: { id: userId } });

  if (user && !user.tools_used.includes(toolName)) {
    // Add new tool to list
    await db.user.update({
      where: { id: userId },
      data: {
        tools_used: [...user.tools_used, toolName],
        total_images_processed: { increment: 1 },
      },
    });
  } else {
    // Just increment image count
    await db.user.update({
      where: { id: userId },
      data: {
        total_images_processed: { increment: 1 },
      },
    });
  }

  // Update last_login timestamp
  await db.user.update({
    where: { id: userId },
    data: { last_login: new Date() },
  });

  // Check if user hit milestone
  await checkAndSendMilestoneEmail(userId);
}
```

---

## NURTURING SEQUENCE STATE MANAGEMENT

### Track Which Email in Sequence User Should Get

```typescript
// lib/email/nurturingSequence.ts

export const NURTURING_SEQUENCE = [
  {
    index: 0,
    daysAfterSignup: 35,
    emailType: "nurturing_feature_spotlight",
  },
  {
    index: 1,
    daysAfterSignup: 49,
    emailType: "nurturing_case_study",
  },
  {
    index: 2,
    daysAfterSignup: 63,
    emailType: "nurturing_advanced_workflow",
  },
  {
    index: 3,
    daysAfterSignup: 77,
    emailType: "nurturing_industry_trend",
  },
  {
    index: 4,
    daysAfterSignup: 91,
    emailType: "nurturing_pain_point",
  },
  {
    index: 5,
    daysAfterSignup: 105,
    emailType: "nurturing_testimonial",
  },
];

export async function checkAndSendNurturingEmails() {
  const users = await db.user.findMany({
    where: {
      segment: "free_active",
      email_unsubscribed: false,
      nurturing_email_index: { lt: NURTURING_SEQUENCE.length },
    },
  });

  for (const user of users) {
    const nextEmail = NURTURING_SEQUENCE[user.nurturing_email_index];
    const daysSinceSignup = Math.floor(
      (Date.now() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysSinceSignup >= nextEmail.daysAfterSignup) {
      // Send email
      await sendNurturingEmail(user, nextEmail.emailType);

      // Increment index
      await db.user.update({
        where: { id: user.id },
        data: { nurturing_email_index: user.nurturing_email_index + 1 },
      });
    }
  }
}
```

---

## RE-ENGAGEMENT SEQUENCE STATE MANAGEMENT

### Track Which Email in Re-engagement Sequence

```typescript
// lib/email/reengagementSequence.ts

export const REENGAGEMENT_SEQUENCE = [
  {
    index: 0,
    daysInactive: 30,
    emailType: "reengagement_1_we_miss_you",
  },
  {
    index: 1,
    daysInactive: 37,
    emailType: "reengagement_2_new_tools",
  },
  {
    index: 2,
    daysInactive: 44,
    emailType: "reengagement_3_free_pro",
  },
  {
    index: 3,
    daysInactive: 58,
    emailType: "reengagement_4_account_cleanup",
  },
];

export async function checkAndSendReengagementEmails() {
  const users = await db.user.findMany({
    where: {
      email_unsubscribed: false,
      // Users who haven't logged in recently
      last_login: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    },
  });

  for (const user of users) {
    // If user just entered re-engagement, initialize
    if (!user.reengage_started_at) {
      await db.user.update({
        where: { id: user.id },
        data: {
          reengage_started_at: new Date(),
          reengagement_email_index: 0,
        },
      });
    }

    const nextEmail = REENGAGEMENT_SEQUENCE[user.reengagement_email_index];
    const daysInReengagement = Math.floor(
      (Date.now() - user.reengage_started_at!.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysInReengagement >= nextEmail.daysInactive && user.reengagement_email_index < REENGAGEMENT_SEQUENCE.length) {
      // Send email
      await sendReengagementEmail(user, nextEmail.emailType);

      // Increment index
      await db.user.update({
        where: { id: user.id },
        data: { reengagement_email_index: user.reengagement_email_index + 1 },
      });
    }

    // Exit re-engagement if user logs in
    if (daysSinceLastLogin < 2) {
      await db.user.update({
        where: { id: user.id },
        data: {
          reengage_started_at: null,
          reengagement_email_index: 0,
        },
      });
    }
  }
}
```

---

## MILESTONE TRACKING

### Check & Send Milestone Emails

```typescript
// lib/email/milestones.ts

export async function checkAndSendMilestoneEmails(userId: string) {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const now = new Date();

  // 100 images milestone
  if (
    user.total_images_processed >= 100 &&
    !user.milestone_100_sent_at &&
    user.email_unsubscribed === false
  ) {
    await sendMilestoneEmail(user, "100_images");
    await db.user.update({
      where: { id: userId },
      data: { milestone_100_sent_at: now },
    });
  }

  // 1,000 images milestone
  if (
    user.total_images_processed >= 1000 &&
    !user.milestone_1000_sent_at &&
    user.email_unsubscribed === false
  ) {
    await sendMilestoneEmail(user, "1000_images");
    await db.user.update({
      where: { id: userId },
      data: { milestone_1000_sent_at: now },
    });
  }

  // 365 days active
  const daysSinceSignup = Math.floor(
    (now.getTime() - user.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (
    daysSinceSignup >= 365 &&
    !user.milestone_365_days_sent_at &&
    user.email_unsubscribed === false
  ) {
    await sendMilestoneEmail(user, "365_days");
    await db.user.update({
      where: { id: userId },
      data: { milestone_365_days_sent_at: now },
    });
  }

  // First Pro payment
  if (
    user.tier === "pro" &&
    !user.milestone_first_pro_sent_at &&
    user.email_unsubscribed === false
  ) {
    await sendMilestoneEmail(user, "first_pro_payment");
    await db.user.update({
      where: { id: userId },
      data: { milestone_first_pro_sent_at: now },
    });
  }
}
```

---

## INDEXES FOR PERFORMANCE

Add these indexes to speed up email queries:

```sql
-- User table indexes
CREATE INDEX idx_user_segment ON "user"(segment);
CREATE INDEX idx_user_last_login ON "user"(last_login);
CREATE INDEX idx_user_created_at ON "user"(created_at);
CREATE INDEX idx_user_email_unsubscribed ON "user"(email_unsubscribed);
CREATE INDEX idx_user_tier ON "user"(tier);
CREATE INDEX idx_user_reengage_started_at ON "user"(reengage_started_at);

-- EmailEvent table indexes (already included in Prisma @@index)
CREATE INDEX idx_email_event_user_id ON "EmailEvent"(user_id);
CREATE INDEX idx_email_event_email_type ON "EmailEvent"(email_type);
CREATE INDEX idx_email_event_event ON "EmailEvent"(event);
CREATE INDEX idx_email_event_timestamp ON "EmailEvent"(timestamp);

-- Newsletter table indexes
CREATE INDEX idx_newsletter_week ON "Newsletter"(week);
CREATE INDEX idx_newsletter_status ON "Newsletter"(status);
CREATE INDEX idx_newsletter_sent_at ON "Newsletter"(sent_at);
```

---

## RESEND CONTACT METADATA

When creating/updating contacts in Resend, include segment info for filtering:

```typescript
// lib/email/resend.ts

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function updateResendContact(user: User) {
  // Sync user data to Resend (for audience list filtering)
  await resend.contacts.create({
    email: user.email,
    firstName: user.firstName,
    unsubscribed: user.email_unsubscribed,
    audienceId: process.env.RESEND_AUDIENCE_ID,
    // Custom metadata for segmentation
    customFields: {
      segment: user.segment,
      tier: user.tier,
      totalImagesProcessed: user.total_images_processed.toString(),
      toolsUsed: user.tools_used.join(","),
    },
  });
}
```

---

## QUERY EXAMPLES FOR SENDING EMAILS

### Get Users for Weekly Newsletter

```typescript
const activeUsers = await db.user.findMany({
  where: {
    email_unsubscribed: false,
    last_login: {
      gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), // Active in last 90 days
    },
  },
  select: { id: true, email: true, firstName: true, segment: true, tools_used: true },
});
```

### Get Users for Nurturing Email #2 (Day 49)

```typescript
const nurturingEmails2Users = await db.user.findMany({
  where: {
    segment: "free_active",
    email_unsubscribed: false,
    nurturing_email_index: 1,
    createdAt: {
      lte: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000), // At least 49 days old
    },
  },
});
```

### Get Users for Re-engagement Email #1 (30 Days Inactive)

```typescript
const reengagementEmail1Users = await db.user.findMany({
  where: {
    email_unsubscribed: false,
    last_login: {
      lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Haven't logged in 30+ days
      gte: new Date(Date.now() - 37 * 24 * 60 * 60 * 1000), // But also not >37 days (to avoid overlap)
    },
    reengage_started_at: null, // Haven't started re-engagement yet
  },
});
```

### Get Users for Milestone (1,000 Images)

```typescript
const milestone1000Users = await db.user.findMany({
  where: {
    total_images_processed: { gte: 1000 },
    milestone_1000_sent_at: null,
    email_unsubscribed: false,
  },
});
```

---

## SUMMARY OF KEY CHANGES

| Field | Type | Purpose |
|-------|------|---------|
| `segment` | Text | Determines which email flows user gets |
| `industry_tag` | Text | Personalizes email content (photographer vs developer) |
| `email_unsubscribed` | Boolean | Don't send any emails if true |
| `last_login` | DateTime | Tracks engagement for re-engagement triggers |
| `nurturing_email_index` | Int | Tracks position in 6-email nurturing sequence |
| `reengagement_email_index` | Int | Tracks position in 4-email re-engagement sequence |
| `milestone_*_sent_at` | DateTime | Prevent duplicate milestone emails |
| `tools_used` | Text[] | For personalization and industry_tag inference |
| `total_images_processed` | Int | For milestone triggers and engagement metric |

---

**Ready for implementation. Share with developer.**
