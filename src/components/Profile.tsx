import { useRepoStore } from '@/store/repo';
import { Breadcrumb, Flex } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiStar } from 'react-icons/hi';

const Profile = () => {
  const { repoInfo, currentRepoUrl } = useRepoStore();
  const ownerUrl = repoInfo?.url?.split('/').slice(0, 4).join('/');
  const repoUrl = repoInfo?.url;
  const owner = repoInfo?.owner;
  const repo = repoInfo?.name;
  const stars =
    repoInfo?.stars ?
      repoInfo.stars > 1000 ?
        `${(repoInfo.stars / 1000).toFixed(1)} K`
      : repoInfo.stars.toString()
    : '0';

  if (!currentRepoUrl) {
    return null;
  }

  return (
    <Flex align="center" p={4} gap={4}>
      <Breadcrumb.Root>
        <Breadcrumb.List>
          <Breadcrumb.Item>
            <Breadcrumb.Link href={ownerUrl} target="_blank">
              {owner}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
          <Breadcrumb.Item>
            <Breadcrumb.Link href={repoUrl} target="_blank">
              {repo}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator />
        </Breadcrumb.List>
      </Breadcrumb.Root>
      <Flex align="center" gap={2}>
        <Icon fontSize="2xl" color="yellow.500">
          <HiStar />
        </Icon>
        {stars}
      </Flex>
    </Flex>
  );
};

export default Profile;
