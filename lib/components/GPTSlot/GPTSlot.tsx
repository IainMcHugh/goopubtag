import type { GPTSlotProps } from './GPTSlot.type';
import { useGPTContext } from '../GPTProvider/GPTProvider';
import { useGPTSlotInternal } from './useGPTSlotInternal';

/**
 * Provider for MDX context
 *
 * @param {GPTSlotProps} props
 * @returns {JSX.Element}
 */
const GPTSlot = (props: GPTSlotProps) => {
  const { slotId } = props;
  const { isLoaded } = useGPTContext();
  const { style } = useGPTSlotInternal({ ...props, isLoaded });
  return <div id={slotId} style={style}></div>;
};

export { GPTSlot };
