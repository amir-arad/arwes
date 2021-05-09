import {
  CSSProperties,
  MutableRefObject,
  createElement,
  useRef,
  useEffect,
  useMemo,
  ReactElement
} from 'react';
import PropTypes from 'prop-types';
import anime from 'animejs';
import { ENTERING, EXITING, useAnimator } from '@arwes/animator';

import { NoInfer } from '../utils/types';

interface AnimatedSettingsTransitionFunctionParams {
  targets: anime.AnimeAnimParams['targets']
  duration: number
  delay?: number
}

type AnimatedSettingsTransitionFunction = (params: AnimatedSettingsTransitionFunctionParams) => void;

// TODO: Use a stronger typing for anime parameters instead of "anime.AnimeParams".
type AnimatedSettingsTransitionTypes = AnimatedSettingsTransitionFunction | anime.AnimeParams;

type AnimatedSettingsTransition = AnimatedSettingsTransitionTypes | AnimatedSettingsTransitionTypes[];

interface AnimatedSettings {
  initialAttributes?: { [name: string]: any }
  initialStyles?: CSSProperties
  entering?: AnimatedSettingsTransition
  exiting?: AnimatedSettingsTransition
}

interface AnimatedProps <E> {
  as?: keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
  animated?: AnimatedSettings
  className?: string
  style?: CSSProperties
  rootRef?: MutableRefObject<E | null> | ((node: E) => void)
}

const Animated = <E, T> (props: AnimatedProps<E> & NoInfer<T>): ReactElement => {
  const {
    as: asProvided,
    animated,
    className,
    style,
    rootRef: externalRef, // TODO: Use external ref.
    ...otherProps
  } = props;

  const as = useMemo(() => asProvided || 'div', []);

  // TODO: Add external root ref.
  const rootRef = useRef<HTMLElement>(null);

  const animator = useAnimator();

  if (process.env.NODE_ENV !== 'production' && !animator) {
    throw new Error('Animated component can only be used inside an Animator.');
  }

  const { animate } = animator || {};
  const dynamicStyles = animate ? animated?.initialStyles : null;
  const initialAttributes = animate ? animated?.initialAttributes : null;

  useEffect(() => {
    return () => {
      anime.remove(rootRef.current as HTMLElement);
    };
  }, []);

  useEffect(() => {
    if (!animator || !animator.animate || !animated) {
      return;
    }

    switch (animator.flow.value) {
      case ENTERING: {
        if (animated.entering) {
          const animationParams = {
            targets: rootRef.current,
            duration: animator.duration.enter
          };

          const animations: AnimatedSettingsTransitionTypes[] =
            Array.isArray(animated.entering)
              ? animated.entering
              : [animated.entering];

          animations.forEach(animation => {
            if (typeof animation === 'function') {
              animation(animationParams);
            }
            else {
              anime({
                easing: 'easeOutSine',
                ...animation,
                targets: rootRef.current,
                duration: animator.duration.enter
              });
            }
          });
        }
        break;
      }

      case EXITING: {
        if (animated.exiting) {
          const animationParams = {
            targets: rootRef.current,
            duration: animator.duration.exit
          };

          const animations: AnimatedSettingsTransitionTypes[] =
            Array.isArray(animated.exiting)
              ? animated.exiting
              : [animated.exiting];

          animations.forEach(animation => {
            if (typeof animation === 'function') {
              animation(animationParams);
            }
            else {
              anime({
                easing: 'easeOutSine',
                ...animation,
                targets: rootRef.current,
                duration: animator.duration.exit
              });
            }
          });
        }
        break;
      }
    }
  }, [animator?.flow]);

  return createElement(as, {
    ...otherProps,
    ...initialAttributes,
    className,
    style: {
      ...style,
      ...dynamicStyles
    },
    ref: rootRef
  });
};

Animated.propTypes = {
  as: PropTypes.string.isRequired,
  animated: PropTypes.shape({
    initialAttributes: PropTypes.object,
    initialStyles: PropTypes.object,
    entering: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.object
        ])
      )
    ]),
    exiting: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.object,
      PropTypes.arrayOf(
        PropTypes.oneOfType([
          PropTypes.func,
          PropTypes.object
        ])
      )
    ])
  })
};

Animated.defaultProps = {
  as: 'div'
};

export {
  AnimatedSettingsTransitionFunctionParams,
  AnimatedSettingsTransitionFunction,
  AnimatedSettingsTransition,
  AnimatedSettings,
  AnimatedProps,
  Animated
};
