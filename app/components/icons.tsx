type IconName =
  | "capacity"
  | "start"
  | "sensory"
  | "recovery"
  | "connection"
  | "identity"
  | "notice"
  | "test"
  | "review";

export function LineIcon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  const paths: Record<IconName, React.ReactNode> = {
    capacity: <><path {...common} d="M4 15h4l2-7 4 12 2-5h4" /><path {...common} d="M4 5v14h16" /></>,
    start: <><circle {...common} cx="12" cy="12" r="8" /><path {...common} d="m10 8 5 4-5 4Z" /></>,
    sensory: <><path {...common} d="M5 12c2-5 4-7 7-7s5 2 7 7c-2 5-4 7-7 7s-5-2-7-7Z" /><circle {...common} cx="12" cy="12" r="2.5" /></>,
    recovery: <><path {...common} d="M19 9a8 8 0 1 0 1 6" /><path {...common} d="m19 4 .2 5-5-.2" /></>,
    connection: <><path {...common} d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 2a3 3 0 1 0 0-6" /><path {...common} d="M2 21c.5-5 2.5-7 6-7s5.5 2 6 7m1-6c3 0 4.5 2 5 6" /></>,
    identity: <><path {...common} d="M12 3 4 7v5c0 5 3.3 7.8 8 9 4.7-1.2 8-4 8-9V7l-8-4Z" /><path {...common} d="m8.5 12 2.2 2.2 4.8-5" /></>,
    notice: <><circle {...common} cx="11" cy="11" r="6" /><path {...common} d="m16 16 5 5" /><path {...common} d="M8 11h6m-3-3v6" /></>,
    test: <><path {...common} d="M9 3v5l-5 10a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3L15 8V3" /><path {...common} d="M7 14h10M8 3h8" /></>,
    review: <><path {...common} d="M4 4h16v16H4z" /><path {...common} d="m8 12 2.5 2.5L16 9" /></>,
  };

  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
