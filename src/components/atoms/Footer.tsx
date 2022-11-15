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
      borderTop={`1px solid ${theme.palette.grey[200].toString()}`}
      gap={2}
      style={{ backgroundColor: theme.palette.background.default.toString()}}
    >
      {children}
    </Box>
  )
}
