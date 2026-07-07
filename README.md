# ShiftBridge

**Match the right nurse to the right unit, faster.**

ShiftBridge is a concept prototype for a hospital internal staffing and
competency-matching platform. Hospitals often have enough total staff, but
the wrong staff in the wrong place — one unit is short while another has
redeployable capacity, and nobody has a shared, real-time view of who is
available, qualified, and appropriate to move. ShiftBridge gives staffing
offices, unit managers, and professional practice teams a shared command
center to see staffing gaps, ranked nurse matches, and competency coverage,
while keeping both the sending and receiving unit managers in the approval
loop.

## What this prototype demonstrates

- **Command Center** — a real-time view of open staffing gaps, available
  qualified nurses, and fill-rate performance across units, with an AI
  triage panel that synthesizes the day's biggest risks.
- **Staffing Request detail** — the full lifecycle of a single request
  (created → AI match generated → manager review → transfer approved →
  shift completed → feedback logged), required competencies, and a ranked
  match table with risk flags and approval status.
- **Nurse Match Profile** — why a specific nurse is a strong match, their
  competency readiness by category, redeployment history, and manager
  notes.
- **Skills Repository** — an abstract, bar-based competency map across
  nurses (not an anatomical diagram), a side-by-side comparison table, and
  training recommendations for near-miss matches.
- Lightweight **Messages**, **Training Paths**, and **Reports** screens
  rounding out the workflow.

All data is hardcoded synthetic data in `/data` — there is no backend,
database, authentication, or real EHR/HR system integration. The "log in as"
cards on the landing page simply route to a pre-populated view for that
persona; nothing is authenticated.

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Built with Next.js (App Router) + TypeScript, Tailwind CSS, shadcn/ui,
lucide-react, and recharts.

## Disclaimer

This is a portfolio prototype built to explore a staffing/competency-matching
workflow concept. It is **not** a production system, is not connected to any
real hospital, EHR, or HR system, and makes no regulatory or compliance
claims. All names, units, shifts, and metrics are synthetic and used only to
illustrate the workflow.
