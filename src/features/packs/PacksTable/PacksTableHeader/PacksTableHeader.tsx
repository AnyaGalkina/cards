import * as React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Box from "@mui/material/Box";
import {visuallyHidden} from "@mui/utils";
import {Order} from "../PacksTable/PacksTable";
import {setSortPacksByDate, SortPacksType} from "../../packs-reducer";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {PackData} from "../../../../common/utils/createData";


interface HeadCell {
    disablePadding: boolean;
    id: keyof PackData;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: "name",
        numeric: false,
        disablePadding: false,
        label: "Name",
    },
    {
        id: "cardsCount",
        numeric: true,
        disablePadding: false,
        label: "Cards",
    },
    {
        id: "updated",
        numeric: true,
        disablePadding: false,
        label: "Last Updated",
    },
    {
        id: "createdBy",
        numeric: true,
        disablePadding: false,
        label: "Created By",
    },
    {
        id: "actions",
        numeric: true,
        disablePadding: false,
        label: "Actions",
    },
];

interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof PackData) => void;
    order: Order;
    orderBy: string;
    sortPacks: SortPacksType
}

export function PacksTableHeader(props: TableHeaderProps) {
    const dispatch = useAppDispatch();

    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property: keyof PackData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
            if (property === "updated") {
                props.sortPacks === "0updated" && dispatch(setSortPacksByDate({sortPacks: "1updated"}));
                props.sortPacks === "1updated" && dispatch(setSortPacksByDate({sortPacks: "0updated"}));
            }
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={"left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : "asc"}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
