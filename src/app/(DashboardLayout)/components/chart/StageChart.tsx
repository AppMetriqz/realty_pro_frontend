import React from 'react';
import {Box, Typography, Avatar} from "@mui/material";
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";


interface FiltersProps {
    usePageProps: UsePageProps
}

const size = 35
const sizeIncrease = 5

export const StageChart = ({usePageProps}: FiltersProps) => {

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography fontSize={'18px'} mb={'40px'}>
                Etapas
            </Typography>
            {usePageProps.stageOptions.map((item, index) => (
                <Box
                    key={index}
                    sx={{display: 'flex', alignItems: 'center'}}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap:'5px'
                        }}
                    >
                        <Box  sx={{display: 'flex', alignItems: 'center', flexDirection:'row', position:'relative', width:'100%'}}>
                            <Box
                                sx={{
                                    borderRadius: '100%',
                                    bgcolor: item.color,
                                    width: size + (sizeIncrease * index + 1),
                                    height: size + (sizeIncrease * index + 1)
                                }}
                            />
                            <Box sx={{display: 'flex', alignItems: 'center', flexDirection:'row', position:'absolute', width:250, left:size + (sizeIncrease * 6)}}>
                                <Typography fontSize={'16px'}>
                                    <strong>{item.value}</strong> {item.name}
                                </Typography>
                            </Box>

                        </Box>
                        {index < usePageProps.stageOptions.length - 1 && (
                            <Box
                                sx={{
                                    borderLeft: '2px solid #505050',
                                    height: 15,
                                    mb: '5px'
                                }}
                            />
                        )}
                    </Box>

                </Box>
            ))}
        </Box>
    );
};
