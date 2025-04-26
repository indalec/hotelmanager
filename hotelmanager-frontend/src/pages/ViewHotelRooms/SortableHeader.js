import { Box, TableCell } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortableTableHeader = ({ column, onSort, sortConfig }) => {
    const isSorted = sortConfig.field === column.id;
    
    return (
        <TableCell
            key={column.id}
            align="left"
            style={{ 
                minWidth: column.minWidth, 
                cursor: column.sortable ? 'pointer' : 'default'
            }}
            onClick={() => column.sortable && onSort(column.id)}
        >
            <Box display="flex" alignItems="center">
                {column.label}
                {column.sortable && (
                    <Box ml={1} display="flex" flexDirection="column">
                        <ArrowUpwardIcon
                            fontSize="small"
                            sx={{
                                opacity: isSorted && sortConfig.direction === 'asc' ? 1 : 0.5,
                                mb: -0.5
                            }}
                        />
                        <ArrowDownwardIcon
                            fontSize="small"
                            sx={{
                                opacity: isSorted && sortConfig.direction === 'desc' ? 1 : 0.5,
                                mt: -0.5
                            }}
                        />
                    </Box>
                )}
            </Box>
        </TableCell>
    );
};

export default SortableTableHeader;