import { AppBar, Box, Button, Container, createTheme, CssBaseline, Link, ThemeProvider, Toolbar, Typography, useMediaQuery, useTheme } from "@mui/material"
import CodeIcon from "@mui/icons-material/Code"
import { ReactNode, useMemo } from "react"
import { Link as GatsbyLink } from "gatsby"
import { Footer } from "../atoms/Footer"

const pages = [
  { title: "Home", href: "/" },
  { title: "Blog", href: "/blog" },
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
      <title>{pageTitle}</title>

      <AppBar position="fixed">
        <Toolbar>
          <CodeIcon sx={{ display: "flex", mr: 1 }} />{" "}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
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
            {pages.map(({ title, href }) => (
              <Button
                key={href}
                color="inherit"
                sx={{ my: 2, color: "white", display: "block" }}
                {...{ href }}
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

const AppLayout = (props: LayoutProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        typography: {
          h1: { fontSize: 48, paddingBottom: 20 },
        }
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout {...props} />
    </ThemeProvider>
  )
}

export default AppLayout
