import { tw } from 'twind';
import { Styles, LinkButton } from '@/components';

const ParticipateSection = () => (
  <section className={tw(Styles.BackgroundColor)}>
    <div className={tw(`max-w-7xl mx-auto pt-10`)}>
      <div className={tw(`container mx-auto px-6 flex flex-col items-center`)}>
        <div className={tw(`mb-16 text-center`)}>
          <p className={tw(`mt-2 text-5xl lg:text-7xl font-bold tracking-tight text-gray-900`)}>
            Escolha como participar
          </p>
        </div>
        <div className={tw(`flex flex-wrap my-12`)}>
          <div className={tw(`px-8 py-5`)}>
            <div className={tw(`flex items-center mb-2`)}>
              <div className={tw(`text-xl`)}>Presencial</div>
            </div>
            <p className={tw(`leading-loose`)}>FATEC Ribeirão Preto dia 18/10 as 19:00</p>
            <p className={tw(`leading-loose text-gray-800 mb-2`)}>
              Av. Pio XII, 1255 - Vila Virginia, Ribeirão Preto - SP, 14030-250
            </p>
            <LinkButton linkTo="https://goo.gl/maps/3uoeW3JUWmMoJ5bx8">
              <div className={tw(`flex flex-row items-center`)}>
                <svg
                  className={tw(`mr-2`)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
                Veja a localização
              </div>
            </LinkButton>
          </div>
          <div className={tw(`px-8 py-5`)}>
            <div className={tw(`flex items-center mb-2`)}>
              <div className={tw(`text-xl`)}>Remoto</div>
            </div>
            <p className={tw(`leading-loose mb-2`)}>Live ao vivo pelo youtube</p>
            <LinkButton linkTo="https://www.youtube.com/channel/UCjetmqgjgQ8aHq4ryZzO07w">
              <div className={tw(`flex flex-row items-center`)}>
                <svg
                  className={tw(`mr-2`)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  {/* eslint-disable-next-line max-len */}
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                </svg>
                Confira nosso canal
              </div>
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ParticipateSection;
