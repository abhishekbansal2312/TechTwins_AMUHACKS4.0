export default function BgGradient({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-30"
      >
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)" /* Star/magic shape */,
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-emerald-600 via-green-700 to-teal-200 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
        />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-30"
      >
        <div
          style={{
            clipPath:
              "polygon(48% 0%, 0% 100%, 100% 100%)" /* Lightning bolt shape */,
          }}
          className="relative left-[calc(50%+11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[210deg] bg-gradient-to-tr from-amber-400 via-yellow-500 to-amber-300 opacity-10 sm:left-[calc(50%+15rem)] sm:w-[72rem]"
        />
      </div>
      {children}
    </div>
  );
}
