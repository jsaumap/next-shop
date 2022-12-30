import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const FullScreenLoading = () => {
  return (
    <Box
    display='flex'
    flexDirection='column'
    justifyContent='center'
    alignItems='center'
    height='calc(100vh - 200px)'
    sx={{flexDirection : {xs: 'column',sm:'row'}}}
    >
      <Typography>Cargando...</Typography>
      <CircularProgress thickness={2}/>
    </Box>
  )
}
