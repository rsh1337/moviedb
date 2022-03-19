import { ViewIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../utils/api';

export default function WatchlistButton() {
  const { id } = useRouter().query;
  const { data, mutate } = useSWR(`/api/watchlist/${id}`);

  return (
    <Tooltip label={data?.found ? 'Remove from watchlist' : 'Add to watchlist'}>
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? 'green' : 'gray'}
        size="sm"
        onClick={() => {
          mutate(() =>
            fetcher(`/api/watchlist/${id}`, {
              method: data.found ? 'DELETE' : 'PUT',
            })
          );
        }}
      >
        <ViewIcon />
      </IconButton>
    </Tooltip>
  );
}