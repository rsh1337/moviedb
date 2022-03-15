import { CalendarIcon } from '@chakra-ui/icons';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { fetcher } from '../utils/api';

export default function HistoryButton() {
  const { id } = useRouter().query;
  const { data, mutate } = useSWR(`/api/history/${id}`);

  return (
    <Tooltip label={data?.found ? 'Remove from history' : 'Add to history'}>
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? 'green' : 'gray'}
        size="sm"
        onClick={() => {
          mutate(() =>
            fetcher(`/api/history/${id}`, {
              // If movie is in history, remove it from history, else, add it to history
              method: data.found ? 'DELETE' : 'PUT',
            })
          );
        }}
      >
        <CalendarIcon />
      </IconButton>
    </Tooltip>
  );
}