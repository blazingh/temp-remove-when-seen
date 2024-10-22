"use client";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { SheetCloseTrigger } from "../ui/sheet";
import { Separator } from "../ui/separator";
import { QandAanswer, QandAmessage } from "../q_and_a";
import { useSession } from "next-auth/react";

export default function MyQuestionsInfoSheetContent({ items }: { items: any }) {
  const [question, setQuestion] = useState<any>();

  const session = useSession();
  const id = session.data?.user.id;
  const token = session.data?.user.tokens.accessToken;

  const getQuestionsData = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL +
          "/api-patients/questions/content/" +
          items.id,
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

      return data[0];
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getQuestionsData();
      setQuestion(response);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full block overflow-hidden px-2 mt-2">
      <div className="block">
        <div className="mt-4">
          <QandAmessage
            key={items.id + items.day}
            message={question?.question}
            owner={
              "" + session.data?.user.name + " " + session.data?.user.last_name
            }
            date={new Date(question?.ask_date).toLocaleDateString()}
          />
        </div>

        <div className="mt-4">
          {question?.answer != null && (
            <QandAanswer
              key={items.id}
              message={question?.answer}
              owner={items.degree["tr"] + items.name + " " + items.last_name}
              date={new Date(question.answer_date).toLocaleDateString()}
            />
          )}
        </div>
        <Separator className="mt-4" />
        <div className="flex justify-center gap-2 mt-4">
          <SheetCloseTrigger className="w-full">
            <Button className="w-full">İptal</Button>
          </SheetCloseTrigger>
        </div>
      </div>
    </div>
  );
}
