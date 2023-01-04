import * as React from "react"
import { ReactNode, useMemo } from "react"
import { AppBar, Box, Button, Container, experimental_extendTheme as extendTheme, CssBaseline, Link, Toolbar, Typography, useTheme, Experimental_CssVarsProvider as CssVarsProvider, getInitColorSchemeScript } from "@mui/material"
import CodeIcon from "@mui/icons-material/Code"
import { Link as GatsbyLink } from "gatsby"
import { Footer } from "../atoms/Footer"

const pages = [
  { title: "Home", to: "/" },
  { title: "Blog", to: "/blog" },
]

type LayoutProps = {
  pageTitle: string
  preTitle?: ReactNode
  children: ReactNode
}

const Layout = ({ pageTitle, preTitle, children }: LayoutProps) => {
  const theme = useTheme()

  return (
    <main style={{ border: 0 }}>
      <title>{pageTitle} — felschr's blog</title>

      <AppBar position="fixed">
        <Toolbar>
          <CodeIcon sx={{ display: "flex", mr: 1 }} />{" "}
          <Typography
            variant="h6"
            noWrap
            component={GatsbyLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Felix Schröter
          </Typography>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end" }}>
            {pages.map(({ title, to }) => (
              <Button
                LinkComponent={GatsbyLink}
                key={to}
                color="inherit"
                sx={{ my: 2, color: "white", display: "block" }}
                {...{ to }}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: 68.5, marginBottom: 80, minHeight: "100%" }}>
        {preTitle}
        <Typography variant="h1">{pageTitle}</Typography>
        {children}
      </Container>

      <Footer>
        <Link rel="me" href="https://todon.eu/@felschr">Mastodon</Link>
        <GatsbyLink to="/terms-of-service">Terms of Service</GatsbyLink>
      </Footer>
    </main>
  )
}

const theme = extendTheme({
  colorSchemes: {
    light: {},
    dark: {},
  },
  typography: {
    h1: { fontSize: 48, paddingBottom: 20 },
  }
})

const AppLayout = (props: LayoutProps) => {
  return (
    <CssVarsProvider theme={theme} defaultMode="system">
      {getInitColorSchemeScript({ defaultMode: "system" })}
      <CssBaseline enableColorScheme />
      <Layout {...props} />
    </CssVarsProvider>
  )
}

export default AppLayout
