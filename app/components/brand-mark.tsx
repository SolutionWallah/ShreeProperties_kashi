import Image from "next/image";

// Render the supplied company mark consistently wherever the brand appears.
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <Image
      className={`brand-mark ${className}`.trim()}
      src="/images/ganesha-logo.png"
      alt=""
      width={1536}
      height={1024}
    />
  );
}
