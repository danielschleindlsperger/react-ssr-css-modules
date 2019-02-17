import React from 'react'
import cx from 'classnames'
import styles from './Headline.module.scss'

export const Headline = ({ as: As, size, className, ...props }) => {
  const classes = cx(styles.headline, styles[size], className)
  return <As className={classes} {...props} />
}

Headline.defaultProps = {
  as: 'h1', // any html tag
  size: 'h1', // h1 through h5, determines size only
}
