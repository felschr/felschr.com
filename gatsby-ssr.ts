import React from "react"
import { GatsbySSR } from "gatsby"
import { getInitColorSchemeScript } from "@mui/material"

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setPreBodyComponents }) => {
  setPreBodyComponents([getInitColorSchemeScript()])
}
