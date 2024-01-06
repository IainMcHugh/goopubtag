import type { GPTSlotProps } from './GPTSlot.type';
import { useGPTContext } from '../GPTProvider/GPTProvider';
import { useGPTSlot } from './useGPTSlot';
import { Attributes, UnitTargeting } from '../../types';

/**
 * This is the Ad unit Element to be set in the DOM
 *
 * @param {GPTSlotProps} props
 * @returns {JSX.Element}
 */
const GPTSlot = <A extends UnitTargeting = UnitTargeting>(
  props: GPTSlotProps<A>
): JSX.Element => {
  const { slotId } = props;
  const { isLoaded } = useGPTContext();
  const { style } = useGPTSlot({ ...props, isLoaded });
  return <div id={slotId} style={style}></div>;
};

export { GPTSlot };
