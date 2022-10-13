import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


type PropsType = {
    format:string
    setFormat: (format: string) => void
}

export const BasicSelect: React.FC<PropsType> = ({format, setFormat}) => {

    const handleChange = (event: SelectChangeEvent) => {
        setFormat(event.target.value as string);
    };

    return (
        <Box sx={{margin: ' 20px', width: 223 }}>
            <FormControl fullWidth>
                <InputLabel id="format">Choose format</InputLabel>
                <Select
                    labelId="format"
                    value={format}
                    onChange={handleChange}
                    label="Choose format"
                >
                    <MenuItem value={'Text'}>Text</MenuItem>
                    <MenuItem value={'Picture'}>Picture</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
