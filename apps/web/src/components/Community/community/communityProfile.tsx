import Feed from '../Feed';

const CommunityProfile = ({ id }: any) => {
  const community = {
    category: 'FOOD',
    id: 1,
    image: 'https://via.placeholder.com/60',
    members: 23,
    name: 'Everything Baking',
    posts: [
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
        comments: 4,
        description: 'Post description2',
        id: 1,
        image: 'https://via.placeholder.com/600x400',
        likes: 21,
        time: '4 min ago',
        user: {
          avatar: 'https://via.placeholder.com/40',
          category: 'Gardening2',
          name: 'Helena2'
        }
      }
    ]
  };
  return (
    <div className="mx-auto my-8 max-w-4xl">
      <div className="relative">
        <img
          alt="Cover"
          className="h-64 w-full rounded-lg object-cover"
          src={community.coverImage}
        />
        <div className="absolute left-4 top-20 flex items-center">
          <img
            alt={community.name}
            className="h-24 w-24 rounded-full border-4 border-white"
            src={community.profileImage}
          />
          <div className="ml-4">
            <h1 className="text-2xl font-bold">{community.name}</h1>
            <p className="text-gray-500">{community.handle}</p>
            <p className="text-gray-700">{community.members} Members</p>
          </div>
        </div>
        <div className="absolute right-4 top-20 flex space-x-2">
          <button className="rounded-full bg-indigo-500 px-4 py-2 text-white">
            Join
          </button>
          <button className="rounded-full bg-gray-300 px-4 py-2 text-gray-700">
            Edit Profile
          </button>
        </div>
      </div>
      <p className="mt-8 text-gray-700">{community.description}</p>
      <div className="mt-8 space-y-6">
        <Feed posts={community.posts} />
      </div>
    </div>
  );
};

export default CommunityProfile;
