// content.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import Whatsapp from "@/icons/whatsapp";
import ArrowIcon from "@/icons/arrowLeft";
import CallCenter from "@/icons/callcenter";
import QuestionIcon from "@/icons/questionsIcon";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import SITEROUTES from "@/constants/site_routes";

interface ContentProps {
  lang: string;
}

const Content: React.FC<ContentProps> = ({ lang }) => {
  const t = useTranslations("layout.help_page2") as any;

  return (
    <div className="px-2 mt-2 mb-4">
      <div className="mt-4">
        <Link href={SITEROUTES.faq}>
          <Button className="bg-white border hover:bg-background-transparent text-black w-full flex items-center justify-between py-10">
            <div className="flex">
              <div className="items-center min-w-[40px] justify-left flex">
                <QuestionIcon />
              </div>
              <div className="flex flex-col items-start ml-1">
                <div>
                  <span className="ml-0 font-light">{t("faq2")}</span>
                </div>
              </div>
            </div>
            <ArrowIcon className="transform -rotate-180" />
          </Button>
        </Link>
      </div>

      <a href="https://api.whatsapp.com/send?phone=905385921578">
        <div className="mt-4">
          <Button className="bg-white border hover:bg-background-transparent text-black w-full flex items-center justify-between py-10">
            <div className="flex">
              <div className="items-center min-w-[40px] justify-left flex">
                <Whatsapp />
              </div>
              <div className="flex flex-col items-start ml-1">
                <div>
                  <span className="ml-0 font-light">{t("wp_sup")}</span>
                </div>
              </div>
            </div>
            <ArrowIcon className="transform -rotate-180" />
          </Button>
        </div>
      </a>

      <a href="tel:02167062122">
        <div className="mt-4">
          <Button className="bg-white border hover:bg-background-transparent text-black w-full flex items-center justify-between py-10">
            <div className="flex">
              <div className="items-center min-w-[40px] justify-left flex">
                <CallCenter />
              </div>
              <div className="flex flex-col items-start ml-1">
                <div>
                  <span className="ml-0 font-light">{t("call_center")}</span>
                </div>
                <div className="pl-0">
                  <span className="ml-0 pl-0">0216 706 2122</span>
                </div>
              </div>
            </div>
            <ArrowIcon className="transform -rotate-180" />
          </Button>
        </div>
      </a>
    </div>
  );
};

export default Content;
