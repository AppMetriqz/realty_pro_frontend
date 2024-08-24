import { apiContacts } from '@/api';
import { GetContactDto } from '@/common/dto';
import { UseQueryResult } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export type UseContactProfilePageProps = {
  currentTabValue: number;
  handleChangeTab: (_: React.SyntheticEvent, newValue: number) => void;
  findContact: UseQueryResult<GetContactDto, Error>;
};

const useContactProfilePage = (): UseContactProfilePageProps => {
  const { slug } = useParams();
  console.log({ slug });
  const [currentTabValue, setCurrentTabValue] = useState(0);

  const findContact = apiContacts.useFindOne(slug);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTabValue(newValue);
  };

  return { currentTabValue, handleChangeTab, findContact };
};

export default useContactProfilePage;
