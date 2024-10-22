"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locale } from "@/i18n";
import { getUserFavorites } from "./actions";
import DoctorCard from "@/components/cards/doctor/doctorCard";
import { ROUTES } from "@/constants/routes";
import TreatmentCard from "@/components/cards/treatment/treatmentCard";
import ClinicCard from "@/components/cards/clinic/clinicCard";
import { redirect } from "@/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import SITEROUTES from "@/constants/site_routes";

interface Clinic {
  name: string;
  id: number;
  url: string;
  spoken_languages: string[];
  type_id: number;
  cover_images: any;
  districts_name: string;
  cities_name: string;
  clinic_type: any;
  treatment_price: any;
}

interface Dentist {
  id: number;
  clinic_id: number;
  email: string;
  name: string;
  last_name: string;
  phone: string;
  identity_no: any;
  spoken_languages: string[];
  keywords: any[];
  seo_settings: any;
  degree_id: number;
  branch_id: number;
  url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  review_count: number;
  review_rating: string;
  description: any;
  dtsanalpos_id: any;
  clinics: Clinic[];
  clinic_type: any;
  dentist_branches: any;
  treatment_price: any;
  cover_image: string | null;
}

export default function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = useSession();

  const token = session.data?.user.tokens.accessToken;

  const [favoritesType, setFavoritesType] = useState("clinic");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<any[]>([]);

  const getFavorites = async () => {
    if (!token) return;
    const response = await getUserFavorites(favoritesType, String(page), token);
    const favoritesArr = await response.json();

    if (page != 1) {
      setFavorites((favorites) => [...favorites, ...favoritesArr]);
    } else {
      setFavorites(favoritesArr);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  useEffect(() => {
    getFavorites();
  }, [favoritesType]);

  const setList = async (param: string) => {
    setFavorites([]);
    setPage(1);
    setFavoritesType(param);
  };

  if (!token) {
    redirect(SITEROUTES.login);
    return null;
  }

  return (
    <Tabs defaultValue="clinic" className="w-full">
      <TabsList className="w-full p-0 bg-background  gap-6 rounded-none flex pb-2 border-b relative">
        <TabsTrigger
          onClick={() => {
            setList("clinic");
          }}
          value="clinic"
          className="group h-full bg-background shadow-none rounded-none p-0 w-full flex justify-start"
        >
          <span className="font-semibold text-sm b-4">
            Kliniklerim
            <div className="w-[calc(100%+10px)] h-[4px] bg-background rounded-t group-aria-selected:bg-primary mt-2 -mb-2" />
          </span>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setList("dentist");
          }}
          value="dentist"
          className="group h-full bg-background shadow-none rounded-none p-0 w-full"
        >
          <span className="font-semibold text-sm flect flex-col items-center">
            Hekimlerim
            <div className="w-full h-[4px] bg-background rounded-t group-aria-selected:bg-primary mt-2 -mb-2" />
          </span>
        </TabsTrigger>
        <TabsTrigger
          onClick={() => {
            setList("treatment");
          }}
          value="treatment"
          className="group h-full bg-background shadow-none rounded-none p-0 w-full"
        >
          <span className="font-semibold text-sm flex flex-col items-end">
            Tedavilerim
            <div className="w-[calc(100%+10px)] h-[4px] bg-background rounded-t group-aria-selected:bg-primary mt-2 -mb-2" />
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="clinic">
        <div className="flex flex-col gap-4 mt-5">
          {/*  */}
          <InfiniteScroll
            dataLength={favorites.length} //This is important field to render the next data
            next={getFavorites}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {favoritesType === "clinic" &&
              favorites.map((items, index) => (
                <div key={index} className="mb-4">
                  <ClinicCard
                    href={{
                      pathname: SITEROUTES.clinicPage,
                      params: { options: items.url.split("/") },
                    }}
                    items={items}
                  />{" "}
                </div>
              ))}
          </InfiniteScroll>
        </div>
      </TabsContent>

      <TabsContent value="dentist">
        <div className="flex flex-col gap-4 mt-5">
          <InfiniteScroll
            dataLength={favorites.length} //This is important field to render the next data
            next={getFavorites}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {favoritesType === "dentist" &&
              favorites.map((items, index) => (
                <div key={index} className="mb-4">
                  <DoctorCard
                    href={{
                      pathname: SITEROUTES.dentistPage,
                      params: { options: items.url.split("/") },
                    }}
                    item={items}
                  />
                </div>
              ))}
          </InfiniteScroll>
        </div>
      </TabsContent>

      <TabsContent value="treatment">
        <div className="flex flex-col gap-4 mt-5">
          <InfiniteScroll
            dataLength={favorites.length} //This is important field to render the next data
            next={getFavorites}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {favoritesType === "treatment" &&
              favorites.map((items, index) => (
                <div key={index} className="mb-4">
                  <TreatmentCard
                    href={{
                      pathname: SITEROUTES.treatmentPage,
                      params: { options: items.domain.tr.split("/") },
                    }}
                    items={items}
                  />
                </div>
              ))}
          </InfiniteScroll>
        </div>
      </TabsContent>
    </Tabs>
  );
}
