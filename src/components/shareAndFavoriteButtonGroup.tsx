"use client";
import { Button } from "@/components/ui/button";
import { APIROUTE } from "@/constants/api_routes";
import IconHeart from "@/icons/heart";
import IconHeartFilled from "@/icons/heartFilled";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ShareButton from "./ui/shareButton";
import { useRouter } from "@/navigation";
import { Locale } from "@/i18n";
import { useTranslations } from "next-intl";
import IconCall from "@/icons/call";
import SITEROUTES from "@/constants/site_routes";

export default function ShareAndFavoriteButtonGroup({
  subjectId,
  lang,
  subjectType,
}: {
  subjectId: number;
  lang: Locale;
  subjectType: string;
}) {
  const session = useSession();
  const path = typeof window !== "undefined" ? window.location.href : "";

  const [isFavorite, setIsFavorite] = useState(false);

  const token = session.data?.user.tokens.accessToken;

  const router = useRouter();
  const t = useTranslations("layout.clinicPage") as any;

  const favoriteFind = async () => {
    if (session.status !== "authenticated") return;

    const data = {
      subject_id: subjectId,
      subject_type: subjectType,
    };

    try {
      const response = await fetch(APIROUTE("findIsFavorite"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return {
          message:
            (await response.json()).error?.message ||
            "Hata oluştu, En kısa zamanda çözülecek ",
          success: false,
        };
      }
      const dataFavorite = await response.json();

      if (dataFavorite.length != 0) {
        setIsFavorite(true);
      }
      return dataFavorite;
    } catch (error) {
      return { message: "Bir sorun oluştu", success: false };
    }
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const data = await favoriteFind();
    }
    fetchMyAPI();
  }, [session.status]);

  const changeFavorite = () => {
    if (session.status !== "authenticated") router.push(SITEROUTES.login);
    if (!isFavorite) {
      addFavorites();
    } else {
      removeFavorites();
    }
  };

  const addFavorites = async () => {
    const data = {
      subject_type: subjectType,
      subject_id: subjectId,
    };
    try {
      const response = await fetch(APIROUTE("addUserFavorite"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return {
          message:
            (await response.json()).error?.message ||
            "Hata oluştu, En kısa zamanda çözülecek ",
          success: false,
        };
      }
      setIsFavorite(true);
      return response;
    } catch (error) {
      return { message: "Bir sorun oluştu", success: false };
    }
  };
  const removeFavorites = async () => {
    const data = {
      subject_type: subjectType,
      subject_id: subjectId,
    };
    try {
      const response = await fetch(APIROUTE("removeUserFavorite"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        return {
          message:
            (await response.json()).error?.message ||
            "Hata oluştu, En kısa zamanda çözülecek ",
          success: false,
        };
      }
      setIsFavorite(false);
      return response;
    } catch (error) {
      return { message: "Bir sorun oluştu", success: false };
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-4">
      <Button
        onClick={changeFavorite}
        variant={"outlineThin"}
        className="w-full text-sm font-semibold"
      >
        {isFavorite ? (
          <IconHeartFilled className="text-primary mr-2" />
        ) : (
          <IconHeart className="mr-2" />
        )}
        {t("add_favorite")}
      </Button>

      <a className="w-full flex" href="tel:02167062122">
        <Button
          variant={"outlineThin"}
          className="text-sm font-semibold w-full"
        >
          <IconCall className="mr-2" />{" "}
          {lang === "tr" ? "Kliniği Ara" : "Call Clinic"}
        </Button>
      </a>

      {/* <ShareButton lang={lang} title={'Paylaş'} text={'Sende diş randevunu online al: '} url={path}/> */}
    </div>
  );
}
