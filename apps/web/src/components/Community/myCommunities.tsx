const myCommunities = () => {
  const communities = {
    member: [
      {
        category: 'FOOD',
        id: 1,
        image: 'https://via.placeholder.com/60',
        members: 23,
        name: 'Everything Baking'
      },
      {
        category: 'PETS, FUNNY, MEMES',
        id: 2,
        image: 'https://via.placeholder.com/60',
        members: 17,
        name: 'DOGS DOGS DOGS'
      },
      {
        category: 'ART',
        id: 3,
        image: 'https://via.placeholder.com/60',
        members: 8,
        name: 'AESTHETIC PHOTOS'
      }
    ],
    owner: [
      {
        category: 'SPORT, FUNNY',
        id: 4,
        image: 'https://via.placeholder.com/60',
        members: 302,
        name: 'Soccer'
      }
    ]
  };
  return (
    <div>
      <div>
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Owner</h2>
          {communities.owner.length > 0 ? (
            communities.owner.map((community) => (
              <div className="mb-4 flex items-center" key={community.id}>
                <img
                  alt={community.name}
                  className="mr-4 h-14 w-14 rounded-full"
                  src={community.image}
                />
                <div>
                  <div className="text-sm font-semibold">{community.name}</div>
                  <div className="text-xs text-gray-500">
                    {community.members} Members {community.category}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">Create your own community</p>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">
            Member ({communities.member.length})
          </h2>
          {communities.member.map((community) => (
            <div className="mb-4 flex items-center" key={community.id}>
              <img
                alt={community.name}
                className="mr-4 h-14 w-14 rounded-full"
                src={community.image}
              />
              <div>
                <div className="text-sm font-semibold">{community.name}</div>
                <div className="text-xs text-gray-500">
                  {community.members} Members {community.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default myCommunities;
