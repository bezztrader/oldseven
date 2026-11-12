import Image from "next/image";
import { FloatingWhatsApp, InstagramButton, WhatsAppCTA } from "@/components/cta";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { FlashDivider, FlashOrnament } from "@/components/flash";
import { HeroPhoto } from "@/components/hero-photo";
import { StyleMarquee } from "@/components/marquee";
import { MaskHeading, MotionAnchor, Reveal, WordsTitle } from "@/components/motion";
import { Steps } from "@/components/steps";
import { WorkGallery } from "@/components/work-gallery";
import {
  ADDRESS,
  HOURS,
  INSTAGRAM_URL,
  MAPS_EMBED_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
  WHATSAPP_URL,
} from "@/lib/site";
import { WORKS } from "@/lib/work";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Old Seven Tattoo",
  url: SITE_URL,
  image: `${SITE_URL}/og.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
  telephone: PHONE_TEL,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${ADDRESS.street}, ${ADDRESS.place}`,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.postalCode,
    addressCountry: "BR",
  },
  areaServed: "Jacarepaguá, Rio de Janeiro",
  hasMap: MAPS_URL,
  sameAs: [INSTAGRAM_URL],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "10:00", closes: "18:00" },
  ],
};

const STYLES = [
  {
    name: "Old School",
    text: "Traço grosso, cor chapada, rosa, âncora, andorinha. O clássico que não sai de moda.",
  },
  {
    name: "Preto e Cinza",
    text: "Retrato, cinema, anime. Sombra construída camada por camada, do claro ao preto chapado.",
  },
  {
    name: "Pontilhismo",
    text: "Sombra feita ponto a ponto. Textura que só aparece de perto.",
  },
  {
    name: "Fine Line",
    text: "Agulha fina, traço delicado e preciso. Pouco volume, muito detalhe.",
  },
  {
    name: "Black Work",
    text: "Preto sólido, contraste máximo. Geometria, ornamento e peça que se vê de longe.",
  },
];

const STEPS = [
  {
    title: "Manda a ideia no WhatsApp",
    text: "Referência, tamanho e lugar do corpo. Se for cobertura, manda foto da tatuagem antiga.",
  },
  {
    title: "Marca o horário",
    text: "A gente fecha o desenho, o orçamento e a data com você.",
  },
  {
    title: "Vem tatuar",
    text: "Chega descansado e alimentado. O resto é com a gente.",
  },
];

function SectionHeading({
  children,
  id,
  ornament,
}: {
  children: React.ReactNode;
  id: string;
  ornament: "swallow" | "rose" | "dagger";
}) {
  return (
    <div className="flex items-start gap-3 sm:gap-5">
      <FlashOrnament
        kind={ornament}
        delay={0.3}
        className={`mt-1 shrink-0 text-red ${ornament === "dagger" ? "h-7 w-24 sm:h-10 sm:w-36" : "size-12 sm:size-20"}`}
      />
      <MaskHeading id={id}>{children}</MaskHeading>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <a
        href="#conteudo"
        className="placard sr-only z-[60] px-4 py-3 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>

      <header className="absolute inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-4 py-3 sm:px-8">
          <a href="#topo" aria-label="Old Seven Tattoo, início" className="block">
            <Image
              src="/images/logo.png"
              alt=""
              width={394}
              height={249}
              sizes="120px"
              className="h-auto w-[96px] drop-shadow-none sm:w-[120px]"
              preload
            />
          </a>
          <nav aria-label="Seções" className="hidden lg:block">
            <ul className="flex gap-2 text-sm font-semibold tracking-wider uppercase [text-shadow:0_1px_10px_rgb(0_0_0/0.9)]">
              <li><a className="inline-flex min-h-12 items-center px-3 hover:text-bone-dim" href="#portfolio">Portfólio</a></li>
              <li><a className="inline-flex min-h-12 items-center px-3 hover:text-bone-dim" href="#estilos">Estilos</a></li>
              <li><a className="inline-flex min-h-12 items-center px-3 hover:text-bone-dim" href="#agendar">Como agendar</a></li>
              <li><a className="inline-flex min-h-12 items-center px-3 hover:text-bone-dim" href="#local">Onde fica</a></li>
            </ul>
          </nav>
          <InstagramButton compact />
        </div>
      </header>

      <main id="conteudo">
        {/* Hero */}
        <section id="topo" aria-labelledby="hero-title" className="relative overflow-hidden">
          <div className="relative mx-auto grid max-w-[90rem] lg:min-h-svh lg:grid-cols-12">
            <HeroPhoto />
            <div className="relative z-10 -mt-20 px-4 pb-14 sm:px-8 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-0 lg:flex lg:flex-col lg:justify-end lg:pt-32 lg:pb-20">
              <h1 id="hero-title" className="lettering text-[clamp(4.25rem,20vw,9.5rem)] text-bone lg:-mr-40">
                <WordsTitle words={["Old", "Seven"]} />
                <span className="sr-only"> Tattoo</span>
              </h1>
              <p className="mt-5 text-xs font-bold tracking-[0.24em] text-bone-dim uppercase sm:text-sm">
                Tattoo Studio · Freguesia, RJ
              </p>
              <p className="mt-4 max-w-[30ch] text-xl leading-snug font-semibold [font-stretch:90%] sm:text-3xl">
                Pele não é rascunho. Realismo em preto e cinza e cobertura que resolve.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <WhatsAppCTA />
                <a href="#portfolio" className="link-underline inline-flex min-h-12 items-center text-base font-semibold">
                  Ver o trabalho
                </a>
              </div>
            </div>
          </div>
        </section>

        <StyleMarquee items={STYLES.map((s) => s.name)} />

        {/* Sobre */}
        <section aria-labelledby="sobre-title" className="border-t border-[var(--rule)]">
          <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionHeading id="sobre-title" ornament="rose">Old school na alma. Realismo na mão.</SectionHeading>
            </div>
            <Reveal delay={0.08} className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-bone/90 lg:col-span-5 lg:col-start-8 lg:self-end">
              <p>
                A Old Seven fica no Quality Shopping, na Freguesia. Aqui a tatuagem começa no papel: a
                gente desenha a sua peça, mostra, ajusta até ficar certo e só então liga a máquina.
              </p>
              <p>
                Peça grande, cobertura difícil, ideia que ainda não tem forma. Traz que a gente encara.
              </p>
              <p className="text-base">
                <span className="placeholder-slot">[preencher: ano de abertura e artistas residentes]</span>
              </p>
            </Reveal>
          </div>
        </section>

        <FlashDivider kind="dagger" />

        {/* Portfólio */}
        <section id="portfolio" aria-labelledby="portfolio-title" className="bg-wall-2">
          <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 sm:py-28">
            <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading id="portfolio-title" ornament="swallow">O trabalho fala.</SectionHeading>
              <Reveal delay={0.08} className="flex flex-col items-start gap-4 sm:items-end">
                <p className="text-base text-bone-dim">Toque numa peça para ver em vídeo. Tem mais no Instagram.</p>
                <InstagramButton />
              </Reveal>
            </div>
            <WorkGallery works={WORKS} />
          </div>
        </section>

        {/* Estilos */}
        <section id="estilos" aria-labelledby="estilos-title">
          <div className="mx-auto grid max-w-[90rem] gap-12 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading id="estilos-title" ornament="dagger">O que sai daqui.</SectionHeading>
            </div>
            <ul className="divide-y divide-[var(--rule)] border-y border-[var(--rule)] lg:col-span-7 lg:col-start-6">
              {STYLES.map((style, i) => (
                <Reveal as="li" delay={i * 0.05} key={`${style.name}-${i}`} className="grid gap-2 py-7 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] sm:gap-8">
                  <h3 className={`lettering-quiet text-3xl sm:text-4xl text-bone`}>
                    {style.name}
                  </h3>
                  <p className={`text-base leading-relaxed sm:pt-1 text-bone/85`}>
                    {style.text}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <FlashDivider kind="rose" />

        {/* Como agendar */}
        <section id="agendar" aria-labelledby="agendar-title" className="border-t border-[var(--rule)] bg-wall-2">
          <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-8 sm:py-28">
            <div className="max-w-3xl">
              <SectionHeading id="agendar-title" ornament="swallow">Três passos até a cadeira.</SectionHeading>
            </div>
            <Steps steps={STEPS} />
            <Reveal className="mt-14">
              <WhatsAppCTA label="Mandar minha ideia" />
            </Reveal>
          </div>
        </section>

        <FlashDivider kind="swallow" />

        {/* Localização */}
        <section id="local" aria-labelledby="local-title">
          <div className="mx-auto grid max-w-[90rem] gap-10 px-4 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-6">
              <SectionHeading id="local-title" ornament="rose">Freguesia, Jacarepaguá.</SectionHeading>
              <address className="mt-8 text-lg leading-relaxed not-italic">
                <strong className="font-bold">{ADDRESS.place}</strong>
                <br />
                {ADDRESS.street}
                <br />
                {ADDRESS.district} · {ADDRESS.city} - {ADDRESS.region}
                <br />
                CEP {ADDRESS.postalCode}
              </address>
              <div className="mt-4 text-base text-bone-dim">
                <ul className="space-y-1">
                  {HOURS.map((h) => (
                    <li key={h.label}>
                      <span className="font-semibold text-bone">{h.label}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </div>
              <MotionAnchor
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-placard mt-8 inline-flex min-h-13 items-center gap-3 px-6 text-base font-bold tracking-wide uppercase"
              >
                Como chegar
                <ArrowIcon className="size-5" />
                <span className="sr-only">(abre o Google Maps em nova aba)</span>
              </MotionAnchor>
            </Reveal>
            <Reveal delay={0.08} className="lg:col-span-6">
              <div className="map-frame aspect-[4/5] sm:aspect-[16/11]">
                <iframe
                  title="Mapa: Old Seven Tattoo no Quality Shopping Freguesia"
                  src={MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--rule)] pb-28">
        <div className="mx-auto grid max-w-[90rem] gap-10 px-4 pt-16 sm:px-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <Image
              src="/images/logo.png"
              alt="Old Seven Tattoo Studio"
              width={394}
              height={249}
              sizes="200px"
              className="h-auto w-[200px]"
            />
          </div>
          <dl className="grid gap-8 text-base sm:grid-cols-2 md:col-span-9 lg:grid-cols-4">
            <div>
              <dt className="text-sm font-bold tracking-wider text-bone-dim uppercase">Instagram</dt>
              <dd className="mt-3">
                <InstagramButton />
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold tracking-wider text-bone-dim uppercase">Telefone e WhatsApp</dt>
              <dd className="mt-1 flex flex-col">
                <a href={`tel:${PHONE_TEL}`} className="link-underline inline-flex min-h-12 items-center gap-2 font-semibold">
                  <PhoneIcon className="size-5" />
                  {PHONE_DISPLAY}
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex min-h-12 items-center gap-2 font-semibold">
                  <WhatsAppIcon className="size-5" />
                  Chamar no WhatsApp
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold tracking-wider text-bone-dim uppercase">Endereço</dt>
              <dd className="mt-2 leading-relaxed">
                {ADDRESS.place}, {ADDRESS.street}, {ADDRESS.district}, {ADDRESS.city} - {ADDRESS.region}, {ADDRESS.postalCode}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-bold tracking-wider text-bone-dim uppercase">Horário</dt>
              <dd className="mt-2">
                <ul className="space-y-1">
                  {HOURS.map((h) => (
                    <li key={h.label}>
                      <span className="font-semibold text-bone">{h.label}:</span> {h.time}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
        <p className="mx-auto mt-14 max-w-[90rem] px-4 text-sm text-bone-dim sm:px-8">
          © 2026 Old Seven Tattoo. Todos os direitos reservados.
        </p>
      </footer>

      <FloatingWhatsApp />
    </>
  );
}
