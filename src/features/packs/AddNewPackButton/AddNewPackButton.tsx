import Button from '@mui/material/Button';
import {RequestStatusType} from "../../../app/app-reducer";

type AddNewPackButtonPropsType = {
    status: RequestStatusType
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
            disabled={props.status === 'loading'}
            onClick={addNewPack}>
            {props.name}
        </Button>
    )
}