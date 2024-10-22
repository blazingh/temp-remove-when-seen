import { RWebShare } from "react-web-share";
import { Button } from "./button";
import IconShare from '@/icons/share'
import { useTranslations } from "next-intl";

const ShareButton = ({ title, text, url, lang }: { title: any, text: any, url: any, lang: any }) => {
  const t = useTranslations('layout.clinicPage') as any
  return (
    <RWebShare
      data={{
        text: text,
        title: title,
        url: url,
      }}
      closeText={'Kapat'}
    >
      <Button variant={'outlineThin'} className='w-full  text-sm font-semibold border-[#7626FF] border-[2px]' onClick={() => {
      }}>
        <IconShare className='w-[24px] h-[24px] mr-2 text-[#7626FF]' />
        <span className="text-[#7626FF]">{lang === 'en' ? 'Share' : 'Paylaş'}</span>
      </Button>
    </RWebShare>
  );
};
export default ShareButton;

