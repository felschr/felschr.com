import * as React from "react"
import { ReactNode } from "react"
import { Box, useTheme } from "@mui/material"
import styled from "@emotion/styled"

export type FooterProps = {
  className?: string
  children: ReactNode
}

export const Footer = styled(({ className, children }: FooterProps) => {
  const theme = useTheme()

  return (
    <Box
      {...{ className }}
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
})`
  > a {
    display: flex;
    align-items: center;
  }
`
