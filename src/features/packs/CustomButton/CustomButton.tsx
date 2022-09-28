import Button from '@mui/material/Button';

type CustomButtonPropsType = {
    name: string
    onClickHandler: () => void
}

export const CustomButton = (props: CustomButtonPropsType) => {

    return (
        <Button
            variant="contained"
            color='primary'
            sx={{margin: 3}}
            onClick={props.onClickHandler}>
            {props.name}
        </Button>
    )
}