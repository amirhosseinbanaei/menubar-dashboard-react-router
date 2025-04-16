import { ContentSection } from '@/common/components/content-section';
import { About } from '../components/about';
import { LogoDropzone } from '../components/logo-dropzone';
import { Socials } from '../components/socials';
import { WorkingHours } from '../components/working-hours';

export default function AboutPage() {
  return (
    <ContentSection title='اطلاعات مجموعه'>
      <LogoDropzone />
      <About />
      <WorkingHours />
      <Socials />
    </ContentSection>
  );
}
