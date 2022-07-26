import { tw } from 'twind';
import { NextSeo } from 'next-seo';
import { HeroSection, Page, SpeakersSection, OrganizersSection, ParticipateSection, Footer } from '@/components';

export default function Home() {
  return (
    <Page>
      <NextSeo
        title="RP.js - Comunidade JavaScript"
        description="The landing page of RP.js the JavaScript Community of Ribeirão Preto!"
      />
      <HeroSection />

      <main className={tw(`w-full bg-black relative`)}>
        <SpeakersSection url="/speakers.json" />
        <ParticipateSection />
        <OrganizersSection />
      </main>
      <Footer />
    </Page>
  );
}
