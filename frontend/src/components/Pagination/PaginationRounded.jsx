import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './Pagination.css';

export default function PaginationRounded() {
  return (
    <Stack spacing={1}>
      <Pagination count={10} variant="outlined" shape="rounded" />
    </Stack>
  );
}
