import React, { FC, ReactNode } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Colors } from '@/common/constants/general';

type TabType = {
  label: string;
  id: string;
  component: ReactNode | React.JSX.Element | string;
};

type ProjectTabProps = {
  tabArray: TabType[];
  currentTabValue: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
};

const ProjectTab: FC<ProjectTabProps> = ({
  tabArray,
  currentTabValue,
  handleChange,
}) => {
  const a11yProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  return (
    <Tabs
      sx={{ padding: '0 40px' }}
      value={currentTabValue}
      onChange={handleChange}
      aria-label="basic tabs example"
    >
      {tabArray.map((tab, index) => (
        <Tab
          sx={{
            color: '#505050',
            padding: '12px 32px',
            fontSize: '14px',
            fontWeight: 400,
            borderRadius:
              index === 0
                ? '8px 0px 0px 0px'
                : index === tabArray.length - 1
                ? '0px 8px 0px 0px'
                : '0',
            borderTop: `1px solid ${Colors.secondary}`,
            borderRight:
              index === 0
                ? `0.5px solid ${Colors.secondary}`
                : `1px solid ${Colors.secondary}`,
            borderLeft:
              index === 0
                ? `1px solid ${Colors.secondary}`
                : `0.5px solid ${Colors.secondary}`,
            '&:hover': {
              backgroundColor: Colors.primary,
            },
            '&.Mui-selected': {
              fontWeight: 600,
              backgroundColor: Colors.primary,
            },
          }}
          key={tab.id}
          label={tab.label}
          {...a11yProps(index)}
        />
      ))}
    </Tabs>
  );
};

export default ProjectTab;
