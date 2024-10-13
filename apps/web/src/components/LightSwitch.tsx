import { getImgUrl } from '@shared/utils/get-asset';

export const LightSwitch = (props: { lightOn: boolean; switchTheme: React.ChangeEventHandler<HTMLInputElement> }) => {
  const { lightOn, switchTheme } = props;
  return (
    <label className="swap swap-rotate">
      <input type="checkbox" className="theme-controller" checked={lightOn} onChange={switchTheme} />
      {lightOn ? (
        <img className="h-10 w-10 fill-current" src={getImgUrl('sun.svg')} alt="Sun Icon" />
      ) : (
        <img className="h-10 w-10 fill-current" src={getImgUrl('moon.svg')} alt="Moon Icon" />
      )}
    </label>
  );
};

export default LightSwitch;
