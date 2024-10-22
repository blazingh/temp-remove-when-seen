"use client";

import { useSession } from "next-auth/react";
import { Locale } from "@/i18n";
import InfiniteScroll from "react-infinite-scroll-component";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { APIROUTE } from "@/constants/api_routes";
import MyReviewCard from "@/components/cards/review/myReviewCard";

export default function MyReviews({ lang }: { lang: Locale }) {
  const session = useSession();
  const id = session.data?.user.id;
  const token = session.data?.user.tokens.accessToken;

  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function getUserReviews(page: string, token: string): Promise<any> {
    const limit = "10";

    try {
      const response = await fetch(
        APIROUTE("getUserReviews", { page, limit }),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response.ok) {
        return {
          message:
            (await response.json()).error?.message ||
            "Hata oluştu, En kısa zamanda çözülecek ",
          success: false,
        };
      }
      return await response.json();
    } catch (error) {
      return { message: "Bir sorun oluştu", success: false };
    }
  }

  const getReviews = async () => {
    if (!token) return null;
    const response = await getUserReviews(String(page), token);

    const reviewsArr = response;
    setReviews((reviews) => [...reviews, ...reviewsArr]);
    setPage(page + 1);
    if (reviewsArr.length < 10) setHasMore(false);
  };

  useEffect(() => {
    getReviews();
  }, [token]);

  return (
    <div>
      <InfiniteScroll
        dataLength={reviews.length}
        next={getReviews}
        hasMore={hasMore}
        loader={<h4>Bekleniyor</h4>}
        endMessage={
          <div style={{ textAlign: "center", display: "grid", gap: "20px" }}>
            <div>
              <p>Daha fazla yorum yok</p>
            </div>
            {/* <div>
              <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full">En yukarı çık</Button>
            </div> */}
          </div>
        }
      >
        {reviews.map((items, index) => (
          <div key={index} className="mb-4">
            <MyReviewCard
              key={items.id}
              id={items.id}
              reviewComment={items.body}
              clinicName={items.clinic_name}
              dentistName={items.dentist_name}
              dentistLastName={items.dentist_last_name}
              createdAt={items.created_at}
              reviewScore={Number(items.rate)}
              subjectType={items.subject_type}
            />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

