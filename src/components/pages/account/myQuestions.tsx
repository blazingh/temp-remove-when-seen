"use client";

import { useSession } from "next-auth/react";
import { Locale } from "@/i18n";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import IconChevron from "@/icons/chevron";
import SheetContentTrigger from "@/components/sheets/sheet-content-trigger";
import MyQuestionsInfoSheetContent from "@/components/sheets/myQuestionsInfo";

export default function MyQuestions({ lang }: { lang: Locale }) {
  const session = useSession();
  const id = session.data?.user.id;
  const token = session.data?.user.tokens.accessToken;

  const [questions, setQuestions] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  async function getMyQuestions(params: string, token: string): Promise<any> {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "/api-patients/questions/list-by-patient?page=" +
          page +
          "&limit=5",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = (await response.json()) as any;
      return data;
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  }

  const getMyQuestionsList = async () => {
    if (!token) return null;
    const response = await getMyQuestions(String(page), token);
    const reviewsArr = response;
    if (page == 1) {
      setQuestions((reviews) => [...reviewsArr]);
    } else {
      setQuestions((reviews) => [...reviews, ...reviewsArr]);
    }

    setPage(page + 1);
    if (reviewsArr.length < 10) setHasMore(false);
  };

  useEffect(() => {
    getMyQuestionsList();
  }, [token]);

  return (
    <div>
      <InfiniteScroll
        dataLength={questions.length}
        next={getMyQuestionsList}
        hasMore={hasMore}
        loader={<h4>Bekleniyor</h4>}
        endMessage={
          <div style={{ textAlign: "center", display: "grid", gap: "20px" }}>
            <div>
              <p>Daha fazla soru yok</p>
            </div>
            {/* <div>
                            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full">En yukarı çık</Button>
                        </div> */}
          </div>
        }
      >
        {questions.map((items, index) => (
          <div key={index} className="mb-4 w-full">
            <SheetContentTrigger
              key={index}
              className="w-full"
              sheetProps={{
                side: "bottom",
                content: <MyQuestionsInfoSheetContent items={items} />,
              }}
            >
              <div className="w-full flex flex-col items-start border p-4 text-left rounded-md relative gap-2 text-[#484848]">
                {/* <span className='font-semibold text-inherit'> */}
                {/* {items.clinic.name} */}
                {/* Yaşarlar diş kliniği */}
                {/* </span> */}
                <span className="font-semibold text-inherit">
                  {items.degree[lang]}
                  {items.name} {items.last_name}
                </span>
                <span className="text-sm font-semibold text-inherit">
                  {new Date(items.created_at).toLocaleDateString()}
                </span>
                {items.is_answered && (
                  <span className="text-base font-semibold text-green-500">
                    CEVAPLANDI
                  </span>
                )}

                <IconChevron
                  className={"absolute right-4 top-1/2 -translate-y-1/2"}
                />
              </div>
            </SheetContentTrigger>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
