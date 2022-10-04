import Button from '@mui/material/Button';
import {RequestStatusType} from "../../../app/app-reducer";

type AddNewPackButtonPropsType = {
    status: RequestStatusType
    name: string
    openModal: () => void
}

export const AddNewPackButton = (props: AddNewPackButtonPropsType) => {

    return (
        <Button
            variant="contained"
            color='primary'
            sx={{margin: 3}}
            disabled={props.status === 'loading'}
            onClick={props.openModal}>
            {props.name}
        </Button>
    )
}