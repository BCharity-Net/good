'use client';
import Footer from '@components/Shared/Footer';
import { GridItemEight, GridItemFour, GridLayout } from '@good/ui';
import { useState } from 'react';

import Explore from './explore';
import MyCommunities from './myCommunities';

const Community = () => {
  const [selectedTab, setTab] = useState('explore');

  const posts = [
    {
      comments: 4,
      description: 'Post description',
      id: 1,
      image: 'https://via.placeholder.com/600x400',
      likes: 21,
      time: '3 min ago',
      user: {
        avatar: 'https://via.placeholder.com/40',
        category: 'Gardening',
        name: 'Helena'
      }
    },
    {
      comments: 18,
      description:
        'Body text for a post. Since it’s a social app, sometimes it’s a hot take, and sometimes it’s a question.',
      id: 2,
      likes: 6,
      time: '2 hrs ago',
      user: {
        avatar: 'https://via.placeholder.com/40',
        category: 'Everything Baking',
        name: 'Charles'
      }
    }
  ];
  return (
    <GridLayout>
      <GridItemEight className="space-y-4">
        <div className="flex gap-4 text-white">
          <div className="rounded-full bg-gray-400 px-2 py-1">search</div>
          <button
            className={
              selectedTab == 'explore'
                ? 'rounded-full bg-pink-400 px-2 py-1'
                : 'rounded-full bg-purple-400 px-2 py-1'
            }
            onClick={() => setTab('explore')}
          >
            Explore
          </button>
          <button
            className={
              selectedTab == 'my-communities'
                ? 'rounded-full bg-pink-400 px-2 py-1'
                : 'rounded-full bg-purple-400 px-2 py-1'
            }
            onClick={() => setTab('my-communities')}
          >
            My Communities
          </button>
          <button
            className={
              selectedTab == 'create-community'
                ? 'rounded-full bg-pink-400 px-2 py-1'
                : 'rounded-full bg-purple-400 px-2 py-1'
            }
            onClick={() => setTab('create-community')}
          >
            Create Community
          </button>
        </div>

        {selectedTab == 'explore' && <Explore posts={posts} />}
        {selectedTab == 'my-communities' && <MyCommunities />}
        {/* {selectedTab == 'create-community' && <Explore />} */}

        {/* <button className="text-cente w-full rounded-full bg-purple-400 px-2 py-1 text-white">
          Create Community
        </button> */}

        {/* <div className="">
          <div> New communities</div>
          <div className="flex items-center justify-between gap-1">
            <button className="h-6 w-6 rounded-full bg-gray-300">{'<'}</button>
            <div className="grid h-96 w-full grid-cols-1 gap-2 p-2">
              <div className="flex">
                <div className="h-24 w-24 bg-purple-200">img1</div>
                <div className="grid grid-cols-1 items-center text-justify">
                  <p className="text-end">DOG</p>
                  <p className="text-start">DOG</p>
                </div>
              </div>
              <div className="flex">
                <div className="h-24 w-24 bg-purple-200">img2</div>
              </div>
              <div className="flex">
                <div className="h-24 w-24 bg-purple-200">img3</div>
              </div>
            </div>
            <button className="h-6 w-6 rounded-full bg-gray-300">{'>'}</button>
          </div>
        </div> */}
      </GridItemEight>

      <GridItemFour>
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};

export default Community;
