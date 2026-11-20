"use client";

import { useEffect, useRef } from "react";
import rough from "roughjs";
import Link from "next/link";

export default function NotFound() {
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const g = gRef.current;
    if (!svg || !g) return;

    const rc = rough.svg(svg);
    const stroke = "#1e1e1e";
    const chaos = "#ff4444";

    // Request box
    g.appendChild(
      rc.rectangle(50, 40, 160, 60, { roughness: 1.5, stroke, strokeWidth: 2 }),
    );
    // Load Balancer box
    g.appendChild(
      rc.rectangle(300, 40, 180, 60, { roughness: 1.5, stroke, strokeWidth: 2 }),
    );
    // "???" box
    g.appendChild(
      rc.rectangle(570, 40, 160, 60, {
        roughness: 2,
        stroke: chaos,
        strokeWidth: 2.5,
        fill: chaos + "22",
        fillStyle: "cross-hatch",
      }),
    );

    // Arrow: Request -> LB
    g.appendChild(
      rc.line(210, 70, 300, 70, { roughness: 0.8, stroke, strokeWidth: 1.5 }),
    );
    g.appendChild(
      rc.line(300, 70, 290, 63, { roughness: 0.5, stroke, strokeWidth: 1.5 }),
    );
    g.appendChild(
      rc.line(300, 70, 290, 77, { roughness: 0.5, stroke, strokeWidth: 1.5 }),
    );

    // Arrow: LB -> ???
    g.appendChild(
      rc.line(480, 70, 570, 70, {
        roughness: 0.8,
        stroke: chaos,
        strokeWidth: 1.5,
      }),
    );
    g.appendChild(
      rc.line(570, 70, 560, 63, {
        roughness: 0.5,
        stroke: chaos,
        strokeWidth: 1.5,
      }),
    );
    g.appendChild(
      rc.line(570, 70, 560, 77, {
        roughness: 0.5,
        stroke: chaos,
        strokeWidth: 1.5,
      }),
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-6xl font-bold mb-2">404</h1>
      <p className="text-xl mb-8" style={{ color: "var(--fg-muted, #666)" }}>
        Service Not Found
      </p>

      <svg
        ref={svgRef}
        viewBox="0 0 780 140"
        className="w-full max-w-2xl mb-8"
      >
        <g ref={gRef} />

        <text
          x="130"
          y="75"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontFamily: "var(--font-hand)", fontSize: 16, fontWeight: 600 }}
        >
          Request
        </text>
        <text
          x="390"
          y="75"
          textAnchor="middle"
          dominantBaseline="central"
          style={{ fontFamily: "var(--font-hand)", fontSize: 16, fontWeight: 600 }}
        >
          Load Balancer
        </text>
        <text
          x="650"
          y="65"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ff4444"
          style={{ fontFamily: "var(--font-hand)", fontSize: 20, fontWeight: 700 }}
        >
          ???
        </text>
        <text
          x="650"
          y="88"
          textAnchor="middle"
          dominantBaseline="central"
          fill="#ff4444"
          style={{ fontFamily: "var(--font-hand)", fontSize: 11 }}
        >
          (Service not found)
        </text>

        {/* label on arrows */}
        <text
          x="255"
          y="58"
          textAnchor="middle"
          fill="#666"
          style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 10 }}
        >
          GET /???
        </text>
        <text
          x="525"
          y="58"
          textAnchor="middle"
          fill="#ff4444"
          style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 10 }}
        >
          404
        </text>
      </svg>

      <Link
        href="/"
        className="px-6 py-3 rounded-lg text-lg border-2 transition-colors hover:opacity-80"
        style={{
          borderColor: "#1e1e1e44",
          fontFamily: "var(--font-hand)",
        }}
      >
        &larr; Back to Gateway
      </Link>

      <p
        className="mt-6 text-sm"
        style={{
          fontFamily: "var(--font-mono, monospace)",
          color: "#999",
        }}
      >
        Status: Service degraded &middot; The requested route does not exist
      </p>
    </div>
  );
}
