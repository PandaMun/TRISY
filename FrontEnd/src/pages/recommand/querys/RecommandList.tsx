import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
interface Recommand {
  title: string;
  lat: string;
  lng: string;
}

export const useRecommand = () => {
  const client = useQueryClient();
  const recommandList = useQuery<Array<Recommand>>(['recommand'], async () => {
    const res = await axios.get('http://localhost:3003/markers');
    return res.data;
  });

  const { mutate: updateRecommandList } = useMutation(
    async (newRecommandList: Array<Recommand>) => {
      await axios.post('http://localhost:3003/markers', newRecommandList);
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['recommand']), { force: true };
      },
    },
  );

  const handleRecommandListUpdate = async (newRecommandList: Array<Recommand>) => {
    try {
      await updateRecommandList(newRecommandList);
    } catch (error) {
      console.error(error);
    }
  };
  return { recommandList, handleRecommandListUpdate };
};
