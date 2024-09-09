import React, { FC } from 'react';
import {Box, Typography} from "@mui/material";
import SearchInput from "@/common/components/UI/searchInput/SearchInput";

const HeaderSearch: FC<{
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  list: any;
}> = ({  label, onChange, list }) => {
  return (
      <Box
          display="flex"
          justifyContent={'space-between'}
          alignItems={'center'}
          mb="40px"
      >
        <Box
            display="flex"
            width={'80%'}
            gap={'20px'}
            alignItems={'center'}
        >
          <SearchInput
              sx={{maxWidth: '268px'}}
              label={`Buscar ${label}`}
              onChange={onChange}
          />
        </Box>
        {list.isSuccess? (
            <Box
                display="flex"
                width={'20%'}
                justifyContent={'flex-end'}
            >
              <Typography fontWeight={600}>
                {list.data.rows.length} {label}
                {list.data.rows.length > 1 ? '' : 's'}
              </Typography>
            </Box>
        ):null}

      </Box>
  );
};

export default HeaderSearch;
