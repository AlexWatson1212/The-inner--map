import Image from "next/image";

type LogoProps = {
  inverse?: boolean;
  compact?: boolean;
};

export function Logo({ inverse = false, compact = false }: LogoProps) {
  const source = inverse
    ? "/brand/logo-mark-light.svg"
    : "/brand/logo-mark.svg";

  return (
    <span className={`brand ${compact ? "brand--compact" : ""}`}>
      <Image className="brand__mark" src={source} alt="" width={42} height={42} priority />
      {!compact && (
        <span className="brand__name">
          The Inner <span>Map</span>
        </span>
      )}
    </span>
  );
}
