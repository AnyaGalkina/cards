import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {Order} from "../CardsTable";
import {CardsData} from "../../../../common/utils/createData";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {setSortCards} from "../../cards-reducer";

interface HeadCell {
    id: keyof CardsData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'question',
        label: 'Question'
    },
    {
        id: 'answer',
        label: 'Answer'
    },
    {
        id: 'updated',
        label: 'Last Updated'
    },
    {
        id: 'grade',
        label: 'Grade'
    },
    {
        id: 'actions',
        label: ''
    },
];

interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CardsData) => void;
    order: Order;
    orderBy: string;
}

export function TableHeader(props: TableHeaderProps) {
    const {order, orderBy, onRequestSort } = props;
    const sortCards = useAppSelector(state => state.cards.params.sortCards);
    const appStatus = useAppSelector(state => state.app.status);

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
                    headCell.id === 'actions' ?
                        (
                            <TableCell
                                key={headCell.id}
                                align={'left'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    disabled={appStatus === "loading"}
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
                        )
                        : <TableCell
                                key={headCell.id}
                                align={'left'}
                            >
                                {headCell.label}
                            </TableCell>           // условие для actions, так как не нужна сортировка

                ))}
            </TableRow>
        </TableHead>
    );
}
