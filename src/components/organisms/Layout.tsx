import * as React from "react"

type LayoutProps = {
  pageTitle: string
  children: React.ReactNode
}

const Layout = ({ pageTitle, children }: LayoutProps) => {
  return (
    <div>
      <h1>{pageTitle}</h1>
      {children}
    </div>
  )
}

export default Layout
