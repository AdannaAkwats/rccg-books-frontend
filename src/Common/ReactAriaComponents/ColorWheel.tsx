'use client';
import {
  ColorWheel as AriaColorWheel,
  type ColorWheelProps as AriaColorWheelProps,
  ColorWheelTrack
} from 'react-aria-components';

import {ColorThumb} from './ColorThumb';

import './ColorWheel.css';
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ColorWheelProps
  extends Omit<AriaColorWheelProps, 'outerRadius' | 'innerRadius'> {}

export function ColorWheel(props: ColorWheelProps) {
  return (
    (
      <AriaColorWheel {...props} outerRadius={100} innerRadius={74}>
        <ColorWheelTrack />
        <ColorThumb />
      </AriaColorWheel>
    )
  );
}
