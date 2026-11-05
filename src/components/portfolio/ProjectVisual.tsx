import type { ProjectVisual as Variant } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/** Abstract, diagram-like project visuals drawn from design tokens. Swap for real screenshots later. */
export function ProjectVisual({ variant, className }: { variant: Variant; className?: string }) {
  const diagram = variant === "rag" || variant === "gallery" || variant === "testing";
  return (
    <svg
      viewBox="0 0 400 260"
      className={cn("h-full w-full", className)}
      aria-hidden
      preserveAspectRatio={diagram ? "xMidYMid meet" : "xMidYMid slice"}
    >
      {variant === "rag" && <RagPipeline />}
      {variant === "gallery" && <Gallery />}
      {variant === "testing" && <TestRuns />}
      {variant === "network" && <Network />}
      {variant === "signal" && <Signal />}
      {variant === "layers" && <Layers />}
      {variant === "grid" && <Grid />}
    </svg>
  );
}

function FlowBox({
  x,
  y,
  label,
  strong,
}: {
  x: number;
  y: number;
  label: string;
  strong?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={100}
        height={38}
        rx={2}
        className={strong ? "fill-accent" : "fill-ink"}
        stroke="currentColor"
        strokeOpacity={strong ? 0 : 0.4}
      />
      <text
        x={50}
        y={23}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        className="font-mono"
      >
        {label}
      </text>
    </g>
  );
}

/** Retrieval flow of a RAG system: index documents, then retrieve, generate and cite. */
function RagPipeline() {
  const top = 72;
  const bottom = 162;
  const arrow = "stroke-accent-soft";
  return (
    <g>
      <defs>
        <marker
          id="rag-arrow"
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M0 0 8 4 0 8z" className="fill-accent-soft" />
        </marker>
      </defs>
      <g strokeWidth={1} fill="none" markerEnd="url(#rag-arrow)">
        <line x1={120} y1={top + 19} x2={146} y2={top + 19} className={arrow} />
        <line x1={250} y1={top + 19} x2={276} y2={top + 19} className={arrow} />
        <path d="M330 110V136H70V158" className={arrow} />
        <line x1={120} y1={bottom + 19} x2={146} y2={bottom + 19} className={arrow} />
        <line x1={250} y1={bottom + 19} x2={276} y2={bottom + 19} className={arrow} />
      </g>
      <FlowBox x={20} y={top} label="NHS documents" />
      <FlowBox x={150} y={top} label="Embeddings" />
      <FlowBox x={280} y={top} label="FAISS index" />
      <FlowBox x={20} y={bottom} label="Retrieval" />
      <FlowBox x={150} y={bottom} label="Language model" />
      <FlowBox x={280} y={bottom} label="Cited answer" strong />
    </g>
  );
}

/** Abstract rows of automated checks. Decorative only, so it carries no labels or figures. */
function TestRuns() {
  const rows = [
    [150, 90],
    [210, 40],
    [120, 130],
    [180, 70],
  ];
  return (
    <g transform="translate(46 54)">
      {rows.map(([first, second], i) => (
        <g key={i} transform={`translate(0 ${i * 40})`}>
          <circle cx={11} cy={11} r={11} className="fill-accent-soft" />
          <path
            d="M6 11.5 9.5 15 16 8"
            fill="none"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-accent"
          />
          <rect
            x={36}
            y={7}
            width={first}
            height={8}
            rx={2}
            fill="currentColor"
            fillOpacity={0.75}
          />
          <rect
            x={44 + first!}
            y={7}
            width={second}
            height={8}
            rx={2}
            fill="currentColor"
            fillOpacity={0.3}
          />
        </g>
      ))}
    </g>
  );
}

/** A wall of framed paintings, for the art marketplace. */
function Gallery() {
  return (
    <g>
      <line x1={20} x2={380} y1={222} y2={222} stroke="currentColor" strokeOpacity={0.25} />
      <g transform="translate(40 58)">
        <rect width={92} height={124} fill="var(--paper)" stroke="currentColor" strokeWidth={3} />
        <rect x={10} y={10} width={72} height={104} className="fill-accent-soft" />
        <circle cx={46} cy={46} r={18} className="fill-accent" />
        <path d="M10 114V84l22-16 20 18 16-12 14 10v30z" fill="currentColor" fillOpacity={0.85} />
      </g>
      <g transform="translate(154 40)">
        <rect width={110} height={160} fill="var(--paper)" stroke="currentColor" strokeWidth={3} />
        <rect x={10} y={10} width={90} height={140} fill="currentColor" fillOpacity={0.9} />
        <path d="M10 104c24-26 46-10 90-40v86H10z" className="fill-accent" />
        <circle cx={72} cy={42} r={11} fill="var(--paper)" />
      </g>
      <g transform="translate(286 76)">
        <rect width={76} height={96} fill="var(--paper)" stroke="currentColor" strokeWidth={3} />
        <rect x={9} y={9} width={58} height={78} fill="var(--secondary)" />
        <rect x={18} y={20} width={18} height={56} className="fill-accent" />
        <rect x={40} y={36} width={18} height={40} fill="currentColor" fillOpacity={0.85} />
      </g>
      <g fontSize={10} fill="currentColor" className="font-mono" textAnchor="middle">
        <text x={86} y={240}>
          Admin
        </text>
        <text x={209} y={240}>
          Artists
        </text>
        <text x={324} y={240}>
          Customers
        </text>
      </g>
    </g>
  );
}

function Network() {
  const nodes: [number, number][] = [
    [60, 70],
    [60, 130],
    [60, 190],
    [160, 50],
    [160, 110],
    [160, 170],
    [160, 220],
    [260, 90],
    [260, 150],
    [260, 200],
    [345, 130],
  ];
  const links: [number, number][] = [];
  [0, 1, 2].forEach((a) => [3, 4, 5, 6].forEach((b) => links.push([a, b])));
  [3, 4, 5, 6].forEach((a) => [7, 8, 9].forEach((b) => links.push([a, b])));
  [7, 8, 9].forEach((a) => links.push([a, 10]));
  return (
    <g>
      {links.map(([a, b], i) => {
        const p = nodes[a]!;
        const q = nodes[b]!;
        return (
          <line
            key={i}
            x1={p[0]}
            y1={p[1]}
            x2={q[0]}
            y2={q[1]}
            stroke="currentColor"
            strokeOpacity={0.18}
            strokeWidth={1}
          />
        );
      })}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 10 ? 9 : 6}
          className={i === 10 || i === 4 ? "fill-accent" : "fill-current"}
          fillOpacity={i === 10 || i === 4 ? 1 : 0.85}
        />
      ))}
    </g>
  );
}

function Signal() {
  const path = Array.from({ length: 41 }, (_, i) => {
    const x = 20 + i * 9;
    const y = 130 + Math.sin(i / 2.4) * 40 * Math.cos(i / 9) + Math.sin(i * 1.7) * 6;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
  return (
    <g>
      {Array.from({ length: 9 }, (_, i) => (
        <line
          key={i}
          x1={20}
          x2={380}
          y1={50 + i * 20}
          y2={50 + i * 20}
          stroke="currentColor"
          strokeOpacity={0.08}
        />
      ))}
      <path d={path} fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth={6} />
      <path d={path} fill="none" className="stroke-accent" strokeWidth={2} />
      <rect x={200} y={40} width={90} height={180} fill="currentColor" fillOpacity={0.05} />
    </g>
  );
}

function Layers() {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${90 + i * 10} ${50 + i * 42})`}>
          <rect
            width={220}
            height={34}
            rx={3}
            fill="currentColor"
            fillOpacity={i === 1 ? 0 : 0.08}
            className={i === 1 ? "fill-accent" : ""}
            stroke="currentColor"
            strokeOpacity={0.25}
          />
          <rect
            x={12}
            y={13}
            width={60 + i * 20}
            height={8}
            rx={2}
            fill="currentColor"
            fillOpacity={i === 1 ? 0.9 : 0.3}
            className={i === 1 ? "fill-accent-foreground" : ""}
          />
        </g>
      ))}
      <line
        x1={70}
        y1={60}
        x2={70}
        y2={210}
        stroke="currentColor"
        strokeOpacity={0.3}
        strokeDasharray="3 4"
      />
    </g>
  );
}

function Grid() {
  const cells = [];
  for (let r = 0; r < 7; r++) {
    for (let c = 0; c < 12; c++) {
      const v = (Math.sin(r * 1.3 + c * 0.7) + Math.cos(c * 0.4 - r)) / 2;
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={30 + c * 29}
          y={28 + r * 29}
          width={24}
          height={24}
          rx={2}
          className={v > 0.6 ? "fill-accent" : "fill-current"}
          fillOpacity={v > 0.6 ? 1 : Math.max(0.05, (v + 1) / 4)}
        />,
      );
    }
  }
  return <g>{cells}</g>;
}
