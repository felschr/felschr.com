import * as React from "react"
import { ReactNode } from "react"
import { Box, useTheme } from "@mui/material"

export type FooterProps = {
  children: ReactNode
}

export const Footer = ({ children }: FooterProps) => {
  const theme = useTheme()

  return (
    <Box
      position="fixed"
      display="flex"
      bottom={0}
      padding={2}
      width="100%"
      gap={2}
      sx={{ backgroundColor: theme.vars.palette.background.default, boxShadow: 2 }}
    >
      {children}
    </Box>
  )
}
