import { FiAward, FiBarChart2, FiBookOpen, FiGlobe, FiMessageSquare, FiUsers } from "react-icons/fi";
import type { IconType } from "react-icons";

interface Node {
  id: string;
  icon: IconType;
  size: number;
  top: number;
  left: number;
  bg: string;
}

// Positions/sizes are laid out on a 420x420 canvas; the globe (hub) sits
// centrally with the other fields orbiting and connecting back to it.
const NODES: Node[] = [
  { id: "hub", icon: FiGlobe, size: 96, top: 160, left: 96, bg: "bg-teal-500" },
  { id: "book", icon: FiBookOpen, size: 96, top: 24, left: 8, bg: "bg-primary" },
  { id: "award", icon: FiAward, size: 80, top: 0, left: 316, bg: "bg-amber-500" },
  { id: "message", icon: FiMessageSquare, size: 64, top: 292, left: 0, bg: "bg-rose-500" },
  { id: "users", icon: FiUsers, size: 80, top: 340, left: 300, bg: "bg-violet-500" },
  { id: "chart", icon: FiBarChart2, size: 56, top: 252, left: 364, bg: "bg-orange-500" },
];

const HUB = NODES[0];
const SPOKES = NODES.slice(1);

function center(node: Node) {
  return { x: node.left + node.size / 2, y: node.top + node.size / 2 };
}

function BijmrHeroIllustration() {
  const hubCenter = center(HUB);

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto hidden h-[420px] w-[420px] lg:block"
    >
      <svg
        className="absolute inset-0 h-full w-full text-border"
        viewBox="0 0 420 420"
        fill="none"
      >
        {SPOKES.map((node) => {
          const c = center(node);
          return (
            <line
              key={node.id}
              x1={hubCenter.x}
              y1={hubCenter.y}
              x2={c.x}
              y2={c.y}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {NODES.map((node) => {
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            style={{
              top: node.top,
              left: node.left,
              width: node.size,
              height: node.size,
            }}
            className={`absolute flex items-center justify-center rounded-full text-white shadow-soft-lg ${node.bg}`}
          >
            <Icon size={node.size * 0.36} strokeWidth={1.8} />
          </div>
        );
      })}
    </div>
  );
}

export default BijmrHeroIllustration;
