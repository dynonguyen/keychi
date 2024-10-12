import { getImgUrl } from '@shared/utils/get-asset';
import usePageTitle from '../../hooks/usePageTitle';

export type ErrorPageLayoutProps = {
  title: string;
  imgSrc: string;
  detail: React.ReactNode;
};

const ErrorDisplay: React.FC<{ title: string; detail: React.ReactNode }> = ({ title, detail: description }) => (
  <div className="flex flex-col text-center max-w-screen-sm lg:max-w-screen-md px-4">
    <h1 className="py-6 text-2xl md:text-6xl font-medium">{title}</h1>
    <p className="text-sm md:text-lg">{description}</p>
  </div>
);

export const ErrorPageLayout: React.FC<ErrorPageLayoutProps> = ({ title, imgSrc, detail }) => {
  usePageTitle(title);
  return (
    <div className="grid place-content-center space-y-6 h-[80vh] md:h-screen">
      <div className="flex justify-center">
        <img src={getImgUrl(imgSrc)} className="max-w-xs md:max-w-md" alt={`Error: ${title}`} />
      </div>
      <ErrorDisplay title={title} detail={detail} />
    </div>
  );
};

export default ErrorPageLayout;
