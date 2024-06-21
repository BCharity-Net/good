import CommunityProfile from '@components/Community/community/communityProfile';
import { useRouter } from 'next/router';

const Community = () => {
  const {
    query: { id }
  } = useRouter();
  console.log(id + 'params');
  return <CommunityProfile id={id} />;
};

export default Community;
