import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';

type PropsType = {
    onNextClickHandler: (grade: number) => void
}

export const Grade:React.FC<PropsType> = ({onNextClickHandler}) => {

    const grades = [{grade: '1', label: "Did not know"},
        {grade: '2', label: "Forgot"},
        {grade: '3', label: "A lot of thought"},
        {grade: '4', label: "Confused"},
        {grade: '5', label: "Knew it"}];

    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose grade');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setHelperText('Click NEXT to submit grade');
        setError(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (value) {
            setHelperText(' ');
            setError(false);
        } else {
            setHelperText('Please select an option.');
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl sx={{ m: 3, display: 'flex'}} error={error} variant="standard">
                <FormLabel>Rate yourself:</FormLabel>
                <RadioGroup
                    value={value}
                    onChange={handleRadioChange}
                >
                    {grades.map((g) => (
                        <FormControlLabel key={g.grade} value={g.grade} control={<Radio />} label={g.label} />
                    ))}
                </RadioGroup>
                <FormHelperText>{helperText}</FormHelperText>
                <Button onClick={()=> onNextClickHandler(+value)}  sx={{ mt: 1, mr: 1 }} variant={"outlined"} color={"primary"} type="submit">
                    Next
                </Button>
            </FormControl>
        </form>
    );
}