import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {CardsData, Order} from "./CardsTableComponent";

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
    }
];

interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof CardsData) => void;
    order: Order;
    orderBy: string;
}

export function TableHeader(props: TableHeaderProps) {
    const {order, orderBy, onRequestSort } = props;
    const createSortHandler =
        (property: keyof CardsData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'right'}
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
