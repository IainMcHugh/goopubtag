import { useGPTContext } from '../contexts/GPTProvider';
import { useGPTSlotInternal } from '../hooks/useGPTSlotInternal';
import type { GPTSlotProps } from '../types';

const GPTSlot = (props: GPTSlotProps) => {
  const { slotId } = props;
  const { isLoaded } = useGPTContext();
  const { style } = useGPTSlotInternal({ ...props, isLoaded });
  return <div id={slotId} style={style}></div>;
};

export { GPTSlot };
