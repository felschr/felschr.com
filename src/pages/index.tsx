import styled from "@emotion/styled"
import { Box, Card as Card_, CardContent, Grid, Typography } from "@mui/material"
import {
  AutoMode as AutoModeIcon,
  BugReport as BugReportIcon,
  Cloud as CloudIcon,
  School as SchoolIcon,
  SettingsSuggest as SettingsSuggestIcon,
  SvgIconComponent
} from "@mui/icons-material"
import { Link } from "gatsby"
import Layout from "../components/organisms/Layout"

const Card = styled(Card_)`
  height: 100%;
`

type IconProps = {
  Icon: SvgIconComponent
  title: string
}

const Title = ({ Icon, title }: IconProps) => (
  <Box display="flex" gap={1}>
    <Typography variant="h5" gutterBottom>
      {title}
    </Typography>
    <Icon fontSize="large" />
  </Box>
)

const IndexPage = () => {
  return (
    <Layout pageTitle="Home">
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Title Icon={CloudIcon} title="Cloud" />

              I'm experienced in designing & implementing Cloud-native solutions tailored to highly specialised needs. Containers, microservices, serverless setups — I'm familiar with all the important tools.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Title Icon={BugReportIcon} title="Type safety" />

              I love strong type systems. They avoid runtime exceptions like{" "}
              <Link to="https://en.wikipedia.org/wiki/Null_pointer#History">
                the billion-dollar mistake
              </Link>{" "}
              by checking for errors at compile time. A good type system enforces error handling & allows developers to focus more on actual application logic.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Title Icon={SettingsSuggestIcon} title="Reproducibility" />

              "But it works on my machine" — how many times did you hear this?
              Running into issues building software can be frustrating & time consuming.
              That's where reproducible builds with declarative environments come to the rescue!
              Nix is one such system that allows you to use the same dependencies on all developers' machines & in CI/CD pipelines.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Title Icon={AutoModeIcon} title="DevOps" />

              Plan, Develop, Deliver, Operate — Repeat
              DevOps is about continually providing value to customers.

              Teams who adopt DevOps streamline their processes & automate their systems. This allows rapidly delivering features & maintaining a reliable system.
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Title Icon={SchoolIcon} title="Learning" />

              Software development is such a vast field and I love learning about new technologies.
              You can expect software built on modern state-of-the-art technologies & methodologies from me.
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default IndexPage
