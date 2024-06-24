import type { PublicationMetadataMainFocusType } from '@good/lens';
import type { NextPage } from 'next';

import WhoToFollow from '@components/Home/Sidebar/WhoToFollow';
import FeedFocusType from '@components/Shared/FeedFocusType';
import Footer from '@components/Shared/Footer';
import { PAGEVIEW } from '@good/data/tracking';
import { GridItemEight, GridItemFour, GridLayout } from '@good/ui';
import cn from '@good/ui/cn';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { Leafwatch } from '@helpers/leafwatch';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useProfileStore } from 'src/store/persisted/useProfileStore';

import DonationsFeed from './DonationsFeed';

const Donations: NextPage = () => {
  const router = useRouter();
  const { currentProfile } = useProfileStore();
  const [focus, setFocus] = useState<PublicationMetadataMainFocusType>();

  useEffect(() => {
    Leafwatch.track(PAGEVIEW, { page: 'donations' });
  }, []);

  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <TabGroup
          defaultIndex={Number(router.query.tab)}
          onChange={(index) => {
            router.replace(
              { query: { ...router.query, tab: index } },
              undefined,
              { shallow: true }
            );
          }}
        >
          <TabList className="divider space-x-8">
            <Tab
              className={({ selected }) =>
                cn(
                  { 'border-b-2 border-black dark:border-white': selected },
                  'px-4 pb-2 text-xs font-medium outline-none sm:text-sm'
                )
              }
              defaultChecked
              key="donations"
              onClick={() => {
                Leafwatch.track(PAGEVIEW, {
                  page: 'donations'
                });
              }}
            >
              Donations
            </Tab>
          </TabList>
          <FeedFocusType focus={focus} setFocus={setFocus} />
          <TabPanels>
            <TabPanel key="donations">
              <DonationsFeed focus={focus} />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </GridItemEight>
      <GridItemFour>
        {currentProfile ? <WhoToFollow /> : null}
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};

export default Donations;
