import { useRepoStore } from '@/store/repo';
import { Breadcrumb, Flex, Text } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiStar } from 'react-icons/hi';

const Profile = () => {
  const { repoInfo } = useRepoStore();
  const ownerUrl = repoInfo?.url?.split('/').slice(0, 4).join('/');
  const repoUrl = repoInfo?.url;
  const owner = repoInfo?.owner;
  const repo = repoInfo?.name;
  let stars = '0';
  if (repoInfo?.stars) {
    if (repoInfo.stars > 1000) {
      stars = `${(repoInfo.stars / 1000).toFixed(1)} K`;
    } else {
      stars = repoInfo.stars.toString();
    }
  }

  if (!repoInfo?.url) {
    return null;
  }

  return (
    <Flex align="center" mb="4">
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
        <Icon fontSize="md" color="yellow.500">
          <HiStar />
        </Icon>
        <Text textStyle="sm">{stars}</Text>
      </Flex>
    </Flex>
  );
};

export default Profile;
