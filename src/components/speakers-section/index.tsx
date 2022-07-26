import { useEffect, useState } from 'react';
import { tw } from 'twind';
import { SpeakerComponent } from '@/components';
import { SpeakersConfig } from './speakers-config.model';

const SpeakersSection = ({ options, url }: SpeakersConfig) => {
  if (!options && !url) {
    throw new Error(`Speakers options not found.`);
  }

  const [speakers, setSpeakers] = useState(options);

  const fetchSpeakers = async () => {
    try {
      const response = await fetch(url ?? ``);
      const json = await response.json();
      return { success: true, data: json };
    } catch (error) {
      return { success: false, code: error };
    }
  };

  useEffect(() => {
    (async () => {
      const cards = await fetchSpeakers();
      if (cards.success) {
        setSpeakers(cards.data);
      }
    })();
  }, []);

  return (
    <section id="speakersSection">
      <div className={tw(`max-w-7xl mx-4 lg:mx-auto pt-20 lg:pt-40`)}>
        <h1 className={tw(`text-white text-4xl lg:text-7xl font-bold text-center`)}>Palestrantes</h1>
        <div className={tw(`mx-auto pt-24`)}>
          <SpeakerComponent speakers={speakers ?? []} />
        </div>
      </div>
    </section>
  );
};

export default SpeakersSection;
