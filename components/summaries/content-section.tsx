import { parsePoint } from "./summary-header";

export default function ContentSection({ points }: { points: string[] }) {
  return (
    <div className="space-y-4">
      {points.map((point, index) => {
        const { hasEmoji, emoji, cleanPoint } = parsePoint(point);

        return (
          <div
            key={`point-${index}`}
            className="group relative bg-gradient-to-br from-gray-100/[0.1] to-gray-500/[0.05] 
                  p-3 lg:p-3 rounded-xl border border-gray-400/20 
                  hover:shadow-sm transition-all"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-gray-400/10 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"
            />
            <div className="relative flex items-start gap-3">
              {hasEmoji && <span className="text-md lg:text-lg">{emoji}</span>}
              <p className="text-md text-gray-800 leading-normal">
                {cleanPoint}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
