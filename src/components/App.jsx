import React from 'react'
import { Headline } from './Headline'
import { Button } from './Button'

export const App = () => (
  <div>
    <Headline as="h1" size="h2">
      CSS Modules
    </Headline>
    <div style={{ marginTop: 20 }}>
      <Button>Hello CSS Modules!</Button>
    </div>
    <div style={{ marginTop: 20 }}>
      <Button variant="secondary">And a secondary hello to you!</Button>
    </div>
    <div style={{ marginTop: 20 }}>
      <Button size="small">Tiny hello!</Button>
    </div>
    <div style={{ marginTop: 20 }}>
      <Button size="large">Fat hello!</Button>
    </div>
  </div>
)
