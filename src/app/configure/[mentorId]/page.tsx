import { getMentorProfileAction } from '@/app/actions';
import { deslugify } from '@/lib/utils';
import ConfigureClient from './configure-client';
import { notFound } from 'next/navigation';

type ConfigurePageProps = {
  params: {
    mentorId: string;
  };
};

export default async function ConfigurePage({ params }: ConfigurePageProps) {
  const mentorName = deslugify(params.mentorId);
  const mentorProfile = await getMentorProfileAction(mentorName);

  if (!mentorProfile || mentorProfile.bio.startsWith('Could not generate')) {
     // Or render an error component
     console.error("Mentor profile not found or could not be generated for:", mentorName);
     // For now, let's redirect to a not-found page, though a custom error would be better.
     notFound();
  }

  return <ConfigureClient mentorProfile={mentorProfile} />;
}
