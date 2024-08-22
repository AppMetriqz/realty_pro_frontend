import React from 'react';
import {Box, Chip,} from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {UsePageProps} from "@/app/(DashboardLayout)/finance/usePage";
import {AutoCompleteSharedController} from "@/common/components/textField/AutoCompleteShared";
import CloseIcon from "@/icons/CloseIcon";

interface FiltersProps {
    usePageProps: UsePageProps
}

const keyId = "project_id"
const keyName = "name"

export const Filters = ({usePageProps}: FiltersProps) => {
    return (
        <>
            <Box
                display="flex"
                // flexDirection={'column'}
                width={'80%'}
                gap={'20px'}
                alignItems={'center'}
            >
                <Box
                    display="flex"
                    flexDirection={'column'}
                    // width={240}
                    ml={'40px'}
                    mb={'40px'}
                    gap={'20px'}
                    alignItems={'center'}
                >
                    <Box display="flex" flexDirection={'row'} alignItems={'center'} gap={'50px'}>
                        <AutoCompleteSharedController
                            keyId={keyId}
                            keyName={keyName}
                            placeholder={"Seleccionar Proyectos"}
                            disableClearable={false}
                            isNotValue={true}
                            onInputChange={usePageProps.debouncedProjectText}
                            onSelected={usePageProps.onSetSelectedProjects}
                            options={usePageProps.projects.isSuccess ? usePageProps.projects.data : []}
                            labelStyle={{mb: '15px'}}
                            style={{width: 240}}
                        />

                        <FormControl>
                            <FormLabel>Moneda</FormLabel>
                            <RadioGroup row value={usePageProps.currency} onChange={usePageProps.handleChangeCurrency}>
                                <FormControlLabel value="US" control={<Radio/>} label="US$ Dollar"/>
                                <FormControlLabel value="RD" control={<Radio/>} label="RD$ Peso"/>
                            </RadioGroup>
                        </FormControl>

                    </Box>

                    <Box
                        display="flex"
                        width={'100%'}
                        mt={'40px'}
                        gap={'10px'}
                        alignItems={'center'}
                    >
                        {usePageProps.selectedProjects.map((option) => (
                            <Chip
                                key={option[keyId]}
                                color="secondary"
                                label={option[keyName]}
                                deleteIcon={
                                    <CloseIcon onClick={() => usePageProps.handleRemoveProjects(option)}/>
                                }
                                onDelete={() => usePageProps.handleRemoveProjects(option)}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    );
};
