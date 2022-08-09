import { tw } from 'twind';
import { IOrganizer } from './organizer.model';

const gitHubUrl = `https://github.com/`;
const linkedinUrl = `https://linkedin.com/in/`;
const roles = [`Co-Founder`, `Organizer`, `Coordinator`];
const team: IOrganizer[] = [
  {
    image: `${gitHubUrl}Jbnado.png`,
    name: `João Bernardo`,
    linkedinLink: `${linkedinUrl}jbnado/`,
    role: roles[0],
  },
  {
    image: `${gitHubUrl}zecampos.png`,
    name: `José Guilherme`,
    linkedinLink: `${linkedinUrl}jose-campos-dev/`,
    role: roles[0],
  },
  {
    image: `${gitHubUrl}PedroLuisBrilhadori.png`,
    name: `Pedro Luis`,
    linkedinLink: `${linkedinUrl}pedro-luís-brilhadori-7752a01a0/`,
    role: roles[1],
  },
  {
    image: `${gitHubUrl}alexandre-henrique-rp.png`,
    name: `Alexandre Henrique`,
    linkedinLink: `${linkedinUrl}alexandre-henrique-da-rocha-araujo-b0824849/`,
    role: roles[1],
  },
  {
    image: `${gitHubUrl}ItaloCovas.png`,
    name: `Italo Covas`,
    linkedinLink: `${linkedinUrl}ItaloCovas/`,
    role: roles[2],
  },
  {
    image: `${gitHubUrl}maytuboi.png`,
    name: `Patricia Mayumi`,
    linkedinLink: `${linkedinUrl}mayumituboi/`,
    role: roles[2],
  },
];

const OrganizersSection = () => (
  <section className={tw(`max-w-7xl lg:mx-auto pt-20 lg:pt-40 w-full bg-black`)}>
    <h1 className={tw(`text-white text-4xl lg:text-7xl font-bold text-center`)}>Organizadores</h1>
    <div className={tw(`flex flex-wrap my-10`)}>
      {team.map((organizer: IOrganizer) => (
        <div className={`${tw(`w-full md:w-1/2 lg:w-1/4 p-8`)} developer-card`}>
          <img src={organizer.image} alt={organizer.linkedinLink} />
          <div className="card-informations">
            <div className="developer">
              <div className="developer-name">{organizer.name}</div>
            </div>
            <div className="icon developer-name">{organizer.role}</div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default OrganizersSection;
