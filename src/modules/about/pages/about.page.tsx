import { ContentSection } from '@/common/components/content-section';
import { About } from '../components/about';
import { LogoDropzone } from '../components/logo-dropzone';
import { Socials } from '../components/socials';
import { WorkingHours } from '../components/working-hours';
import { useRestaurant } from '@/modules/restaurant/hooks/use-restaurant';

export default function AboutPage() {
  const { data } = useRestaurant({ filter: 'socials,workingHours,translations' });
  return (
    <>
      <ContentSection title='اطلاعات مجموعه'>
        <LogoDropzone />
        <About initialValues={data?.translations} />
      </ContentSection>
      <ContentSection title='شبکه‌های اجتماعی'>
        {data && <Socials initialValues={data.socials} />}
      </ContentSection>
      {/* <ContentSection title='ساعات کاری'>
        <WorkingHours initialValues={data?.workingHours} />
      </ContentSection> */}
    </>
  );
}
