import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {CardsData, Order} from "./CardsTableComponent";
import {setSortCards, SortCardsType} from "./cards-reducer";
import {useAppDispatch} from "../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../common/hooks/useAppSelector";

interface HeadCell {
    disablePadding: boolean;
    id: keyof CardsData;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'question',
        numeric: false,
        disablePadding: true,
        label: 'Question',
    },
    {
        id: 'answer',
        numeric: true,
        disablePadding: false,
        label: 'Answer',
    },
    {
        id: 'updated',
        numeric: true,
        disablePadding: false,
        label: 'Last Updated',
    },
    {
        id: 'grade',
        numeric: true,
        disablePadding: false,
        label: 'Grade',
    }
    // {
    //     id: 'actions',
    //     numeric: true,
    //     disablePadding: false,
    //     label: '',
    // },
];

interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CardsData) => void;
    order: Order;
    orderBy: string;
}

export function TableHeader(props: TableHeaderProps) {
    const {order, orderBy, onRequestSort} = props;
    const sortCards = useAppSelector(state => state.cards.params.sortCards);
    const dispatch = useAppDispatch();

    const createSortHandler =
        (property: keyof CardsData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
            if(property === "grade") {
                sortCards === "0grade"
                    ? dispatch(setSortCards({sortCards: "1grade"}))
                    : dispatch(setSortCards({sortCards: "0grade"}))
            }
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
