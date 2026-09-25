import Image from "next/image";

interface FooterProps {
  footerInDetail?: boolean;
}

const icons = [
  {
    src: "/images/github.jpg",
    alt: "GitHub",
  },
  {
    src: "/images/gmail.jpg",
    alt: "Gmail",
  },
  {
    src: "/images/linkdin.jpg",
    alt: "LinkedIn",
  },
  {
    src: "/images/twitter.jpg",
    alt: "Twitter",
  },
];

export default function Footer({ footerInDetail = false }: FooterProps) {
  return (
    <>
      {/* Social Icons Divider */}
      <div className="flex w-full items-center gap-3 border-x border-light-border">
        {/* Left Line */}
        <div className="h-px flex-1 bg-light-border" />

        {/* Social Icons */}
        <div className="flex items-center gap-2">
          {icons.map((icon) => (
            <div
              key={icon.src}
              className="cursor-pointer rounded-md border border-light-border p-1.5"
            >
              <Image
                src={icon.src}
                width={16}
                height={16}
                alt={icon.alt}
                className="block object-contain transition-transform duration-200 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Right Line */}
        <div className="h-px flex-1 bg-light-border" />
      </div>

      {/* Footer */}
      <section
        className={`relative overflow-hidden border-light-border px-5 py-4 sm:px-8 md:py-20 lg:px-16 lg:pt-22 ${
          footerInDetail ? "" : "border-x"
        }`}
      >
        {/* Top Message */}
        <div className="mb-14 flex w-full items-center justify-center gap-5">
          <span className="hidden font-satoshi tracking-wide text-light-theme-text md:inline">
            Thank you, for visiting here
          </span>

          <Image
            src="/images/stamp.png"
            width={110}
            height={110}
            alt="Decorative stamp"
            className="hidden object-contain md:inline"
          />

          <span className="hidden font-satoshi tracking-wide text-light-theme-text md:inline">
            Let's create something beautiful
          </span>
        </div>

        {/* Signature */}
        <div className="flex flex-col items-center justify-center gap-5">
          <Image
            src="/images/sign.png"
            width={147}
            height={70}
            alt="Signature"
            className="object-contain"
          />

          <span className="font-satoshi text-xs text-light-theme-text/70">
            @apexita 2026
          </span>
        </div>
      </section>
    </>
  );
}
