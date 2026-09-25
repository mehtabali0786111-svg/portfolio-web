"use client";

/**
 * WorkDetail.tsx
 *
 * A pixel-close recreation of the "Building a Perfect Design System
 * from Zero" case-study layout, built with Next.js + TypeScript + Tailwind CSS.
 *
 * Dependencies:
 *   npm install lucide-react
 *
 * Usage (e.g. in app/page.tsx):
 *   import WorkDetail from "@/components/WorkDetail";
 *   export default function Page() {
 *     return <WorkDetail />;
 *   }
 *
 * All screenshots/mockups (hero laptop, before/after comparisons, the
 * shipped dashboard) are built entirely out of styled <div>/<svg>
 * elements (no external image files), so the component renders correctly
 * with zero network requests.
 */

import type { ReactNode } from "react";
import Image from "next/image";
import { Fredoka, Inter } from "next/font/google";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  CircleUserRound,
  CalendarDays,
  Wrench,
  Pencil,
  LayoutDashboard,
  BarChart3,
  FolderKanban,
  Users,
  ShoppingCart,
  FileText,
  Settings,
  Bell,
  Search,
  MousePointerClick,
  Percent,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import WorkCard from "@/features/LandingPageUI/FeaturedWorks/components/WorkCard";
import { featuredWorks } from "@/features/LandingPageUI/FeaturedWorks/featuredWorks.data";
import { TiTick } from "react-icons/ti";
import { MdOutlineCheck } from "react-icons/md";
import Footer from "@/features/LandingPageUI/Footer.tsx/Footer";
const [leadWork, ...supportingWorks] = featuredWorks;

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export default function WorkDetail() {
  return (
    <>
      <div
        className="
    pointer-events-none
    fixed inset-x-0 top-0 z-50
    h-20
    backdrop-blur-[1px]
    [mask-image:linear-gradient(to_top,transparent_0%,#3d4448_50%,black_100%)]
    [-webkit-mask-image:linear-gradient(to_top,transparent_0%,#3d4448_50%,black_100%]
  "
      />

      {/* Bottom blur */}
      <div
        className="
    pointer-events-none
    fixed inset-x-0 bottom-0 z-50
    h-20
    backdrop-blur-[1px]
    [mask-image:linear-gradient(to_bottom,transparent_0%,#6b767c_50%,#3d4448_100%]
    [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,#6b767c_50%,#3d4448_100%]
  "
      />

      {/* `relative` scopes the absolutely-positioned dot-grid background to
          this element instead of the nearest positioned ancestor. */}
      <main className="relative ">
        {/* dot-grid background */}
        <div
          className="pointer-events-none absolute inset-0 [background-size:22px_22px] opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-dot) 0.75px, transparent 0.75px)",
          }}
          aria-hidden="true"
        />

        {/* FIX: border-x now lives on this single outer wrapper only —
            previously it was declared separately on the inner content div
            AND on the "Other works" section below, which is fragile.
            `flow-root` establishes a new block-formatting context so child
            margins (e.g. the last Section's `mb-6`) are contained INSIDE
            this box instead of collapsing out through it. That collapse
            was silently pushing the next sibling down past where the
            border visually ended, which is what read as the border being
            "cut off" with a gap. */}
        <div className="relative mx-auto max-w-[960px] border-x border-light-border flow-root">
          <div className="px-8">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-light-theme-text transition-colors hover:text-neutral-600 mt-20 "
            >
              <div className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-light-box ">
                <ArrowLeft className="h-3.5 w-3.5 " />
              </div>

              <span>Back to home</span>
            </Link>

            {/* headline */}
            <h1 className="mx-auto mt-6 max-w-3xl text-center font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.15] text-neutral-900 sm:text-[42px]">
              Building a Perfect Design System from Zero
            </h1>

            {/* hero card */}
            <div className="mt-10 overflow-hidden rounded-[28px] border border-light-border bg-light shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
              <Image
                src="/images/lumio.jpg"
                width={872}
                height={588}
                alt="image"
                className="aspect-auto object-cover"
              />
            </div>

            {/* meta grid */}
            <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-7 max-w-[600px] mx-auto sm:grid-cols-2">
              <MetaItem
                icon={<Layers className="h-[28px] w-[28px]" />}
                label="Organization"
                value="Lumio"
              />
              <MetaItem
                icon={<CircleUserRound className="h-[28px] w-[28px]" />}
                label="Role"
                value="Designer"
              />
              <MetaItem
                icon={<CalendarDays className="h-[28px] w-[28px]" />}
                label="Duration"
                value="6 Months"
              />
              <MetaItem
                icon={<Wrench className="h-[28px] w-[28px]" />}
                label="Tools & Technologies"
                value={
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {["Figma", "Sketch", "Illustrator"].map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-light-box px-2.5 py-1 text-xs font-normal text-secondary"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                }
              />
            </div>

            {/* Problem */}
            <Section title="Problem" className="mt-14 max-w-[600px] mx-auto">
              <p className="font-satoshi text-light-theme-text">
                Joined the team when every screen was built in isolation — no
                tokens, no components, no shared language between design and
                engineering. Four teams shipping UI that looked like four
                different products.
              </p>
            </Section>

            {/* before comparison screenshots */}
            <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Image
                src="/images/workflow1.jpg"
                width={880}
                height={700}
                alt="image"
              />
              <Image
                src="/images/workflow2.jpg"
                width={880}
                height={700}
                alt="image"
              />
            </div>
            {/* My role */}
            <Section title="My role" className="mt-16 max-w-[600px] mx-auto">
              <p className="text-light-theme-text font-satoshi">
                I owned the entire design-to-code pipeline. Audited every
                existing screen, defined the token system, built the component
                library in Figma and React, and got all four teams using it
                within a month.
              </p>
            </Section>
            {/* Outcome */}
            <Section title="Outcome" className="mt-16 max-w-[600px] mx-auto">
              <div className="flex items-center gap-3 rounded-2xl border border-light-border bg-light-box px-5 py-4">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500">
                  <MdOutlineCheck color="white" size={12} />
                </span>
                <p className="text-light-theme-text font-satoshi">
                  Design system adopted by 4 product teams within 30 days of
                  launch
                </p>
              </div>
            </Section>
            {/* How I solved it */}
            <Section
              title="How I solved it"
              className="mt-16 max-w-[600px] mx-auto"
            >
              <p className="text-light-theme-text font-satoshi">
                The first thing I did was{" "}
                <strong className="text-neutral-800">nothing</strong>.
              </p>
              <p className="text-light-theme-text font-satoshi">
                No Figma, no components — just two weeks of pure audit. I went
                through every screen in the product and catalogued every button,
                every spacing decision, every color hardcoded differently by a
                different engineer on a different day.
              </p>
              <Callout>
                By the end I had a spreadsheet with 340 inconsistencies across
                23 screens. That document became the brief.
              </Callout>
              <p className="text-light-theme-text font-satoshi">
                Then I built the{" "}
                <strong className="text-neutral-800">token system</strong>{" "}
                before touching a single component. Every color, spacing value,
                border radius, and typography decision was defined as a{" "}
                <strong className="text-neutral-800">Figma variable</strong> and
                mirrored as a{" "}
                <strong className="text-neutral-800">
                  CSS custom property
                </strong>{" "}
                in the codebase. The rule was simple —
              </p>
              <Callout>
                If it isn&apos;t a token, it doesn&apos;t exist.
              </Callout>
              <p className="text-light-theme-text font-satoshi">
                That single constraint eliminated an entire category of future
                inconsistency. Components came next. Each one was built{" "}
                <strong className="text-neutral-800">
                  simultaneously in Figma and React
                </strong>{" "}
                — so there was never a moment where the design file and the
                codebase diverged. Every component shipped with default, hover,
                focused, and disabled states. Every decision had a written
                reason in Notion.
              </p>
              <p className="text-light-theme-text font-satoshi">
                The goal wasn&apos;t just to build a system —{" "}
                <strong className="text-neutral-800">
                  it was to build one the team could maintain without me.
                </strong>
              </p>
            </Section>

            <Image
              src="/images/dashboard.jpg"
              width={880}
              height={700}
              alt="image"
            />

            {/* What shipped */}
            <Section
              title="What shipped"
              className="mt-10 max-w-[600px] mx-auto"
            >
              <p className="text-light-theme-text font-satoshi">
                <strong className="text-neutral-800">
                  60+ components across 8 categories
                </strong>{" "}
                — forms, navigation, data display, feedback, overlays, layout,
                typography and actions.
              </p>
              <p className="text-light-theme-text font-satoshi">
                Every component was documented in{" "}
                <strong className="text-neutral-800">Storybook</strong> with
                live examples, prop tables, and usage guidelines written for
                engineers — not designers.
              </p>
              <Callout>
                The thing that made adoption fast wasn&apos;t the quality of the
                components — it was the documentation.
              </Callout>
              <p className="text-light-theme-text font-satoshi">
                Engineers didn&apos;t have to ask questions because the answers
                were already there. The system went live to the first team in{" "}
                <strong className="text-neutral-800">week 5</strong>. By{" "}
                <strong className="text-neutral-800">week 16</strong> all four
                product teams had migrated their entire surface onto the new
                components.
              </p>
            </Section>

            {/* What worked */}
            <Section
              title="What worked"
              className="mt-16 max-w-[600px] mx-auto"
            >
              <p className="text-light-theme-text font-satoshi">
                Auditing before designing saved weeks of rework. Building tokens
                first made everything downstream faster. Writing documentation
                as I built — not after — meant the team could adopt it
                immediately.
              </p>
            </Section>

            {/* What I'd Do Differently */}
            <Section
              title="What I'd Do Differently"
              italicTitle
              className="mt-16 max-w-[600px] mx-auto"
            >
              <p className="text-light-theme-text font-satoshi">
                Involve engineers earlier in token naming — had to rename
                variables later. Ship a smaller v1 faster instead of covering
                every edge case before launch.
              </p>
            </Section>
          </div>

          {/* next project — border-x removed here; the outer wrapper's
              border-x already runs continuously behind this section, so
              only the border-t divider line is needed. */}
          <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32 border-t border-light-border">
            <h4 className="mb-1 font-satoshi  text-[18px] italic text-primary sm:text-[22px]">
              {"// Other works"}
            </h4>
            <h3 className="mb-8 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
              Have a look at my other work
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {supportingWorks.slice(0, 2).map((work) => (
                  <Link key={work.id} href="/workdetail">
                    <WorkCard work={work} />
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <Footer footerInDetail={true} />
        </div>
      </main>
    </>
  );
}

/* ---------------------------------- */
/* Helper components                  */
/* ---------------------------------- */

function MetaItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-light-box text-orange-500">
        {icon}
      </span>
      <div>
        <p className="text-xs text-secondary">{label}</p>
        <div className="mt-0.5 font-medium text-light-theme-text">{value}</div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  className = "",
  italicTitle = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  italicTitle?: boolean;
}) {
  return (
    <section className={className}>
      <h3
        className={`font-satoshi text-[20px] font-semibold text-primary italic ${
          italicTitle ? "italic" : ""
        }`}
      >
        {title}
      </h3>
      <div className="mt-2.5 space-y-4 text-[16px] leading-relaxed text-light-theme-text mb-6">
        {children}
      </div>
    </section>
  );
}

/** Highlighted pull-quote used inside the long-form narrative sections */
function Callout({ children }: { children: ReactNode }) {
  return (
    <blockquote className="rounded-r-lg border-l-4 border-orange-500 bg-light-box px-5 py-4 font-satoshi text-[15px] italic leading-relaxed text-light-theme-text">
      {children}
    </blockquote>
  );
}

/** "Before" screenshot — muted, inconsistent form UI */
function MockScreenMuted() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-[#EEF0F3] p-3.5 text-[9px] leading-none">
      <div className="flex items-center gap-1.5">
        <span className="rounded-full border border-orange-200 bg-white px-2.5 py-1 font-medium text-neutral-500">
          Cancel
        </span>
        <span className="rounded-full bg-red-500 px-2.5 py-1 font-medium text-white">
          Submit
        </span>
      </div>

      <div className="mt-3 flex gap-4 text-orange-400">
        <span>Edit info</span>
        <span>View history</span>
      </div>

      <div className="mt-3 flex gap-3">
        <div className="flex-1 space-y-2.5">
          <div>
            <p className="mb-1 text-neutral-400">Full name</p>
            <div className="rounded border border-neutral-200 bg-white px-2 py-1.5" />
          </div>
          <div>
            <p className="mb-1 text-neutral-400">Email</p>
            <div className="flex items-center justify-between rounded border border-orange-300 bg-white px-2 py-1.5">
              <span className="h-1 w-1/2 rounded-full bg-neutral-100" />
              <Pencil className="h-2.5 w-2.5 text-orange-400" />
            </div>
          </div>
          <div>
            <p className="mb-1 text-neutral-400">Notes</p>
            <div className="h-9 rounded border border-neutral-200 bg-white px-2 py-1.5" />
          </div>
          <div>
            <p className="mb-1 text-neutral-400">Role</p>
            <div className="flex items-center justify-between rounded border border-neutral-200 bg-white px-2 py-1.5">
              <span className="text-neutral-300">Select role</span>
              <span className="text-neutral-300">▾</span>
            </div>
          </div>
        </div>

        <div className="hidden w-20 shrink-0 rounded-lg bg-amber-100 p-2 text-amber-700 shadow-sm sm:block">
          <p className="font-medium">Heads up</p>
          <p className="mt-0.5 text-amber-600">
            Fields don&apos;t match other teams&apos; forms
          </p>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="font-medium text-neutral-500">Tags</p>
        <div className="grid grid-cols-4 gap-1.5">
          {["Priority", "Owner", "Status", "Notify"].map((label, i) => (
            <div
              key={label}
              className="space-y-1 rounded-lg bg-white p-1.5 shadow-sm"
            >
              <p className="font-medium text-neutral-600">{label}</p>
              <p className="text-neutral-300">Custom field</p>
              <span
                className={`inline-block h-1 w-4 rounded-full ${
                  [
                    "bg-orange-300",
                    "bg-neutral-300",
                    "bg-blue-300",
                    "bg-green-300",
                  ][i]
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-3 text-pink-500">No one owns this pattern library yet</p>
    </div>
  );
}

/** Small reusable area-chart path used for the mini sparklines and the
 *  bigger "Users over time" chart. */
function AreaChart({ id, className = "" }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f97316" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,72 C20,64 35,42 55,48 C75,54 85,78 105,72 C125,66 140,32 160,26 C180,20 195,56 215,50 C235,44 250,18 270,14 L300,8 L300,100 L0,100 Z"
        fill={`url(#${id})`}
      />
      <path
        d="M0,72 C20,64 35,42 55,48 C75,54 85,78 105,72 C125,66 140,32 160,26 C180,20 195,56 215,50 C235,44 250,18 270,14 L300,8"
        fill="none"
        stroke="#f97316"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
