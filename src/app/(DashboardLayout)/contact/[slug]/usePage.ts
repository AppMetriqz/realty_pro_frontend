import { useState } from 'react';

export type UseContactProfilePageProps = {
  currentTabValue: number;
  handleChangeTab: (_: React.SyntheticEvent, newValue: number) => void;
};

const useContactProfilePage = (): UseContactProfilePageProps => {
  const [currentTabValue, setCurrentTabValue] = useState(0);

  const handleChangeTab = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTabValue(newValue);
  };

  return { currentTabValue, handleChangeTab };
};

export default useContactProfilePage;
