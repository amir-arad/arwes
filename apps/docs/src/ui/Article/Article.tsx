import { type AnimatedProp, Animated, cx, memo } from '@arwes/react'

import styles from './Article.module.css'

type ArticleProps = {
  className?: string
  animated?: AnimatedProp
  children: React.ReactNode
}

const Article = memo((props: ArticleProps): JSX.Element => {
  const { className, animated, children } = props
  return (
    <Animated as="article" className={cx(styles.root, className)} animated={animated}>
      {children}
    </Animated>
  )
})

export { Article }
