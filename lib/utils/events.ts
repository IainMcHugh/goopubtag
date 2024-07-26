import type {
	SlotLoadEvent,
	SlotRenderEndedEvent,
	SlotRequestEvent,
	SlotViewableEvent,
} from "../types";

const GPT_EVENT = {
	SLOT_LOAD: "slot_load",
	SLOT_REQUESTED: "slot_requested",
	IMPRESSION_VIEWABLE: "impression_viewable",
	SLOT_RENDER_ENDED: "slot_render_ended",
} as const;

type GPTEventName = (typeof GPT_EVENT)[keyof typeof GPT_EVENT];

type GPTEvent<T extends GPTEventName> = T extends typeof GPT_EVENT.SLOT_LOAD
	? SlotLoadEvent
	: T extends typeof GPT_EVENT.SLOT_REQUESTED
		? SlotRequestEvent
		: T extends typeof GPT_EVENT.SLOT_RENDER_ENDED
			? SlotRenderEndedEvent
			: T extends typeof GPT_EVENT.IMPRESSION_VIEWABLE
				? SlotViewableEvent
				: never;

const dispatchEvent = <T>(name: GPTEventName, detail: T) => {
	const event = new CustomEvent(name, {
		bubbles: true,
		detail,
	});
	document.dispatchEvent(event);
};

const subscribe = <T extends GPTEventName>(
	name: T,
	callback: (event: CustomEvent<GPTEvent<T>>["detail"]) => void,
) => {
	document.addEventListener(name, ((event: CustomEvent<GPTEvent<T>>) => {
		callback(event.detail);
	}) as EventListener);
};

const unsubscribe = <T extends GPTEventName>(
	name: T,
	callback: (event: CustomEvent<GPTEvent<T>>["detail"]) => void,
) => {
	document.removeEventListener(name, ((event: CustomEvent<GPTEvent<T>>) => {
		callback(event.detail);
	}) as EventListener);
};

export { dispatchEvent, subscribe, unsubscribe };
