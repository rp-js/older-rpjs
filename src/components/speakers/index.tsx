import { tw } from 'twind';
import { Speaker } from './speaker.model';

interface SpeakersConfig {
  speakers: Speaker[];
  style?: string;
}

const SpeakerComponent = ({ speakers, style }: SpeakersConfig) => {
  // eslint-disable-next-line no-unneeded-ternary
  const styles = style ? style : `w-full flex flex-wrap justify-around items-center`;

  return (
    <div className={tw(`${styles}`)}>
      {speakers?.map((speaker) => (
        <div
          key={speaker.name}
          className={tw(
            `xl:w-1/3 sm:w-5/12 sm:max-w-xs relative mb-32 lg:mb-20
                xl:max-w-sm lg:w-1/2 w-11/12 mx-auto sm:mx-0 cursor-pointer hover:scale-105`,
          )}
        >
          <div className={tw(`h-64 z-20`)}>
            <img
              src={speaker.image}
              alt={speaker.name}
              className={tw(`h-full w-full object-cover overflow-hidden rounded`)}
              width={400}
              height={300}
            />
          </div>
          <div className={tw(`p-4 shadow-lg w-full mx-auto -mt-8 bg-white rounded-b z-30 relative`)}>
            <p className={tw(`uppercase text-md text-black-700 text-center pb-3`)}>{speaker.name}</p>
            <p className={tw(`uppercase text-sm text-black-700 text-center pb-3`)}>{speaker.role}</p>
            <p className={tw(`uppercase text-sm text-gray-300 text-center pb-1`)}>---------------</p>
            <p className={tw(`uppercase text-md text-gray-700 text-center pb-1`)}>{speaker.lecture}</p>
            <p className={tw(`text-gray-700 text-center pb-1 text-sm`)}>{speaker.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SpeakerComponent;
