import Button from '@mui/material/Button';

type AddNewPackButtonPropsType = {
    name: string
    addNewPack: (name: string, isPrivate: boolean) => void
}

export const AddNewPackButton = (props: AddNewPackButtonPropsType) => {

    const addNewPack = () => props.addNewPack('created pack', false)

    return (
        <Button
            variant="contained"
            color='primary'
            sx={{margin: 3}}
            onClick={addNewPack}>
            {props.name}
        </Button>
    )
}