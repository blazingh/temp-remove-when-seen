"use client";
import { Separator } from "../ui/separator";
import { QandAanswer, QandAmessage } from "../q_and_a";
import { useSession } from "next-auth/react";
import LoginSheetTrigger from "./login";
import { useLocale } from "next-intl";
import SheetContentTrigger from "./sheet-content-trigger";
import QuickAppointmentSheetContent from "./AppointmentBooking";
import QandAFormSheetContent from "./QandAForm";
import LoginSheetContent from "./login";

interface Message {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  updated_at: string;
}

export function QandASheetContent({
  questionsArr,
  dentistData,
}: {
  questionsArr: Message[];
  dentistData: any;
}) {
  const lang = useLocale();
  const { data: session } = useSession();
  return (
    <div className="flex flex-col gap-4 mt-4">
      {questionsArr?.map((item: any) => (
        <>
          <QandAmessage
            key={item.id + item.question}
            message={item.question}
            owner={`${item.patient_name} ${item.patient_last_name}`}
            initals={`${item.patient_name?.[0]} ${item.patient_last_name?.[0]}`}
            date={new Date(item.created_at).toLocaleDateString()}
          />
          <QandAanswer
            key={item.id + item.answer}
            message={item.answer}
            owner={`${dentistData.dentist.name} ${dentistData.dentist.last_name}`}
            date={new Date(item.created_at).toLocaleDateString()}
            image={dentistData.dentist.cover_images}
          />
        </>
      ))}
      <Separator />
      <div className="flex gap-4">
        {session?.user ? (
          <SheetContentTrigger
            variant={"default"}
            className="w-full"
            size="sm"
            sheetProps={{
              side: "bottom",
              title: `${lang === "tr" ? "Hekime Sor" : "Ask the Doctor"}`,
              content: (
                <QandAFormSheetContent dentistData={dentistData.dentist} />
              ),
            }}
          >
            {lang === "tr" ? "Bir soru sor" : "Ask a question"}
          </SheetContentTrigger>
        ) : (
          <SheetContentTrigger
            variant={"outline"}
            className="w-full  text-primary border-primary"
            sheetProps={{
              side: "right",
              content: <LoginSheetContent />,
            }}
          >
            {lang === "tr" ? "Bir soru sor" : "Ask a question"}
          </SheetContentTrigger>
        )}
        <SheetContentTrigger
          variant={"default"}
          className="w-full"
          sheetProps={{
            side: "bottom",
            title: `${dentistData.dentist.degree[lang]} ${dentistData.dentist.name} ${dentistData.dentist.last_name}`,
            subtitle: `${lang === "en" ? "Select Appointment" : "Randevu Seç"}`,
            content: (
              <QuickAppointmentSheetContent
                doctor_id={dentistData.dentist.id}
              />
            ),
          }}
        >
          {lang === "tr" ? "Ücretsiz Randevu Al" : "Get a Free Appointment"}
        </SheetContentTrigger>
      </div>
    </div>
  );
}
