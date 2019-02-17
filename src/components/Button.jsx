import React from 'react'
import cx from 'classnames'
import styles from './Button.module.scss'

export const Button = ({ variant, size, className, ...props }) => {
  const classes = cx(styles.button, styles[variant], styles[size], className)
  return <button className={classes} {...props} />
}

Button.defaultProps = {
  variant: 'primary', // or 'secondary'
  size: 'normal', // or 'small' or 'large'
}
