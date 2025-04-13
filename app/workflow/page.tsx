"use client";
import React, { useState, useEffect } from "react";
import {
  Wand,
  Shield,
  Sparkles,
  Eye,
  FileText,
  CheckCircle,
  RefreshCw,
  Search,
} from "lucide-react";
import BgGradient from "@/components/common/bg-gradient";

export default function MaraudersMapWorkflow() {
  const [activeStep, setActiveStep] = useState(0);
  const [revealed, setRevealed] = useState(false);

  // Animation cycle for the workflow
  useEffect(() => {
    // First reveal the map
    const revealTimer = setTimeout(() => {
      setRevealed(true);
    }, 1000);

    // Then start the step cycle
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 6);
    }, 3000);

    return () => {
      clearTimeout(revealTimer);
      clearInterval(interval);
    };
  }, []);

  // Workflow steps with Harry Potter theming
  const steps = [
    {
      id: "upload",
      title: "Document Delivery",
      icon: <FileText size={24} />,
      description: "I solemnly swear that I am uploading documents",
      x: 15,
      y: 20,
      connections: ["ocr"],
      pathStyle: "curved",
    },
    {
      id: "ocr",
      title: "Revelio Charm",
      icon: <Eye size={24} />,
      description: "Extracting secrets from magical parchments",
      x: 35,
      y: 65,
      connections: ["detection"],
      pathStyle: "zigzag",
    },
    {
      id: "detection",
      title: "PII Detection Enchantment",
      icon: <Search size={24} />,
      description: "Locating hidden personal identifiers",
      x: 65,
      y: 25,
      connections: ["validation"],
      pathStyle: "curved",
    },
    {
      id: "validation",
      title: "Pattern Validation Spell",
      icon: <RefreshCw size={24} />,
      description: "Confirming the nature of detected secrets",
      x: 80,
      y: 70,
      connections: ["protection"],
      pathStyle: "zigzag",
    },
    {
      id: "protection",
      title: "Protego Shield",
      icon: <Shield size={24} />,
      description: "Casting protective enchantments on sensitive data",
      x: 50,
      y: 85,
      connections: ["reporting"],
      pathStyle: "curved",
    },
    {
      id: "reporting",
      title: "Pensieve Dashboard",
      icon: <Sparkles size={24} />,
      description: "Reviewing all magical findings",
      x: 20,
      y: 50,
      connections: [],
      pathStyle: "none",
    },
  ];

  // Create a footstep path between points
  const MaraudersPath = ({
    start,
    end,
    active,
    style,
  }: {
    start: { x: number; y: number };
    end: { x: number; y: number };
    active: boolean;
    style: string;
  }) => {
    // Calculate control points for curved paths
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;
    const offsetX = (start.y - end.y) * 0.3;
    const offsetY = (end.x - start.x) * 0.3;

    // Curved path
    let path = "";

    if (style === "curved") {
      path = `M ${start.x} ${start.y} Q ${midX + offsetX} ${midY + offsetY}, ${
        end.x
      } ${end.y}`;
    } else if (style === "zigzag") {
      // Create a zigzag path with multiple points
      const third1X = start.x + (end.x - start.x) / 3;
      const third1Y = start.y + (end.y - start.y) / 3;
      const third2X = start.x + (2 * (end.x - start.x)) / 3;
      const third2Y = start.y + (2 * (end.y - start.y)) / 3;

      path = `M ${start.x} ${start.y} 
              L ${third1X + 10} ${third1Y - 10} 
              L ${midX - 15} ${midY + 15} 
              L ${third2X + 10} ${third2Y - 10} 
              L ${end.x} ${end.y}`;
    } else {
      // Straight path as fallback
      path = `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
    }

    // Create footstep dots
    const createFootsteps = () => {
      const footsteps = [];
      const numSteps = 12;

      for (let i = 0; i < numSteps; i++) {
        const progress = i / (numSteps - 1);
        const opacity = active ? 1 - Math.abs(progress - 0.5) * 1.5 : 0.2;
        const size = active ? 3 : 2;

        // Calculate point along the path (simplified approximation)
        let x, y;

        if (style === "curved") {
          // Quadratic bezier formula
          const t = progress;
          const mt = 1 - t;
          x = mt * mt * start.x + 2 * mt * t * (midX + offsetX) + t * t * end.x;
          y = mt * mt * start.y + 2 * mt * t * (midY + offsetY) + t * t * end.y;
        } else if (style === "zigzag") {
          // Linear interpolation between zigzag points
          const third1X = start.x + (end.x - start.x) / 3;
          const third1Y = start.y + (end.y - start.y) / 3;
          const third2X = start.x + (2 * (end.x - start.x)) / 3;
          const third2Y = start.y + (2 * (end.y - start.y)) / 3;

          if (progress < 0.25) {
            const p = progress * 4;
            x = start.x + p * (third1X + 10 - start.x);
            y = start.y + p * (third1Y - 10 - start.y);
          } else if (progress < 0.5) {
            const p = (progress - 0.25) * 4;
            x = third1X + 10 + p * (midX - 15 - (third1X + 10));
            y = third1Y - 10 + p * (midY + 15 - (third1Y - 10));
          } else if (progress < 0.75) {
            const p = (progress - 0.5) * 4;
            x = midX - 15 + p * (third2X + 10 - (midX - 15));
            y = midY + 15 + p * (third2Y - 10 - (midY + 15));
          } else {
            const p = (progress - 0.75) * 4;
            x = third2X + 10 + p * (end.x - (third2X + 10));
            y = third2Y - 10 + p * (end.y - (third2Y - 10));
          }
        } else {
          x = start.x + (end.x - start.x) * progress;
          y = start.y + (end.y - start.y) * progress;
        }

        footsteps.push(
          <circle
            key={i}
            cx={x}
            cy={y}
            r={size}
            className={`transition-all duration-500 ${
              active ? "fill-amber-700" : "fill-amber-900"
            }`}
            style={{
              opacity: opacity,
              filter: active
                ? "drop-shadow(0 0 2px rgba(255, 215, 0, 0.6))"
                : "none",
            }}
          />
        );
      }

      return footsteps;
    };

    return (
      <g
        className="transition-opacity duration-1000"
        style={{ opacity: revealed ? 1 : 0 }}
      >
        <path
          d={path}
          fill="none"
          stroke={active ? "#92400e" : "#78350f"}
          strokeWidth={active ? 2 : 1}
          strokeDasharray={active ? "none" : "4 4"}
          className="transition-all duration-300"
        />
        {createFootsteps()}
      </g>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto m-20">
      <BgGradient />
      <div
        className="bg-amber-100 p-6 rounded-lg overflow-hidden relative transition-all duration-1000"
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/wp1896051.jpg')",
          backgroundSize: "cover", // makes image cover the whole div
          backgroundPosition: "center", // centers the image
          backgroundRepeat: "no-repeat", // prevents tiling
          border: "8px solid #92400e",
          boxShadow:
            "inset 0 0 50px rgba(120, 53, 15, 0.2), 0 10px 30px rgba(0, 0, 0, 0.3)",
          minHeight: "600px",
          transform: revealed ? "scale(1)" : "scale(0.95)",
          opacity: revealed ? 1 : 0.7,
        }}
      >
        <div className="text-center mb-8 opacity-90">
          <h1
            className="text-3xl bg-amber-200 font-bold text-amber-950 mb-2 font-serif tracking-wide"
            style={{ textShadow: "1px 1px 2px rgba(120, 53, 15, 0.3)" }}
          >
            The Identity Protector's Map
          </h1>
          <h2 className="text-xl bg-amber-100 text-amber-800 italic font-serif">
            Confidential Crusaders Solemnly Swear They Are Up To Data Protection
          </h2>
        </div>

        {/* SVG Map with steps and paths */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full absolute top-0 left-0"
        >
          {/* Draw paths first so they appear under nodes */}
          {steps.map((step, idx) =>
            step.connections.map((targetId) => {
              const targetStep = steps.find((s) => s.id === targetId);
              if (targetStep) {
                const startPoint = { x: step.x, y: step.y };
                const endPoint = { x: targetStep.x, y: targetStep.y };
                const isActive = idx === activeStep;

                return (
                  <MaraudersPath
                    key={`${step.id}-${targetId}`}
                    start={startPoint}
                    end={endPoint}
                    active={isActive}
                    style={step.pathStyle}
                  />
                );
              }
              return null;
            })
          )}
        </svg>

        {/* Step nodes */}
        <div className="relative w-full h-full" style={{ minHeight: "500px" }}>
          {steps.map((step, idx) => {
            const isActive = idx === activeStep;

            return (
              <div
                key={step.id}
                className={`absolute transition-all duration-500 ${
                  revealed ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  left: `${step.x}%`,
                  top: `${step.y}%`,
                  transform: `translate(-50%, -50%) ${
                    isActive ? "scale(1.1)" : "scale(1)"
                  }`,
                  transformOrigin: "center",
                  zIndex: isActive ? 10 : 5,
                }}
              >
                <div
                  className={`p-3 rounded-lg font-serif border-2 transition-all duration-300`}
                  style={{
                    backgroundColor: isActive
                      ? "rgba(255, 237, 213, 0.6)"
                      : "rgba(254, 243, 199, 0.6)", // amber colors with opacity
                    borderColor: isActive ? "#92400e" : "#b45309",
                    boxShadow: isActive
                      ? "0 0 15px rgba(146, 64, 14, 0.5)"
                      : "0 0 5px rgba(146, 64, 14, 0.2)",
                    width: "200px",
                  }}
                >
                  <div className="flex items-center mb-2">
                    <div
                      className={`p-2 rounded-full mr-2 ${
                        isActive ? "bg-amber-700" : "bg-amber-600"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-bold text-black z-20">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-amber-800 text-sm italic">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer with ink splotches */}
        <div className="absolute bottom-4 right-4">
          <div className="inline-flex items-center px-4 py-2 bg-amber-50 border-2 border-amber-900 rounded-sm rotate-3 font-serif text-amber-950">
            <Wand size={16} className="mr-2 text-amber-800" />
            <span className="italic">Mischief Managed</span>
          </div>
        </div>

        {/* Decorative ink splotches */}
        <div className="absolute top-6 left-10 w-20 h-8 bg-amber-900 opacity-5 rounded-full transform rotate-12" />
        <div className="absolute bottom-16 left-20 w-12 h-12 bg-amber-950 opacity-5 rounded-full transform -rotate-12" />
        <div className="absolute top-24 right-12 w-16 h-6 bg-amber-800 opacity-5 rounded-full transform -rotate-6" />
      </div>
    </div>
  );
}
