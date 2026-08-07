import type { IconType } from "react-icons";

interface BgIcon {
  icon: IconType;
  size: number;
  /** Full static position + color utility classes (e.g. "-top-8 -right-6 text-amber-500/10 rotate-12"). */
  className: string;
}

interface BijmrBackgroundIconsProps {
  icons: BgIcon[];
}

function BijmrBackgroundIcons({ icons }: BijmrBackgroundIconsProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {icons.map(({ icon: Icon, size, className }, index) => (
        <Icon key={index} size={size} strokeWidth={1} className={`absolute ${className}`} />
      ))}
    </div>
  );
}

export default BijmrBackgroundIcons;
