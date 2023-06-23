import { GPT_SCRIPT_SRC } from '../constants';

const getSrc = (limitedAds: boolean) => {
  if (limitedAds) return GPT_SCRIPT_SRC.LIMITED_ADS;
  else return GPT_SCRIPT_SRC.STANDARD;
};

type GetScriptProps = {
  limitedAds: boolean;
};

const getGPTScript = (props: GetScriptProps): HTMLScriptElement => {
  const { limitedAds } = props;
  const gptScript = document.createElement('script');
  gptScript.src = getSrc(limitedAds);
  gptScript.async = true;
  gptScript.type = 'text/javascript';
  return gptScript;
};

export { getGPTScript };
