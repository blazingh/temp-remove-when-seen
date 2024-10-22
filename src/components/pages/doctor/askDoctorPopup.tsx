"use client";

import React, { useContext, useEffect, useState } from "react";

import Image from "next/image";
import { Textarea } from "@/components/ui/text-area";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";
import { useRouter } from "@/navigation";
import { SheetContext } from "@/contextPorviders/sheetContext";
import imageUrlHelper from "@/lib/image/url-helper";

const formSchema = z.object({
  question: z.string(),
  allowNameVisibility: z.boolean().refine((value) => value === true, {
    message:
      "Zorunlu alan: Sorularımda ad-soyad bilgimin gözükmesine izin veriyorum.",
  }),
});

export default function AskDoctorPopup({ dentistData }: { dentistData: any }) {
  const { data: session } = useSession();
  const router = useRouter();
  const sheet = useContext(SheetContext);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      allowNameVisibility: false,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setRequest({ state: "loading", message: "" });
    const data = {
      dentist_id: dentistData.id,
      question: values.question,
    };
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + "/api-patients/questions/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + session?.user.tokens.accessToken,
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        setRequest({ state: "success", message: "" });
      } else {
        setRequest({ state: "error", message: "" });
      }
      router.refresh();
      sheet?.close();
    } catch (error) {
      console.error("Error submitting question:", error);
      setRequest({
        state: "error",
        message: "Bir hata oluştu. Lütfen tekrar deneyin.",
      });
    }
  }
  const [request, setRequest] = useState({
    state: "idle",
    message: "",
  });

  useEffect(() => {
    if (request.state === "success") {
      const timer = setTimeout(() => {
        setRequest({ state: "idle", message: "" });
        form.reset();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [request.state, setRequest, form]);
  //console.log(dentistData.cover_images);
  return (
    <div className="rounded-md flex flex-col gap-4">
      <div className="flex items-center">
        <div className="relative w-[32px] h-[32px] rounded-full bg-[#757575]">
          <Image
            src={imageUrlHelper(dentistData.cover_images, {
              w: 150 * 2,
              h: 150 * 2,
              q: 75,
              fallBackImage: "/dentist-cover-placeholder.webp",
            })}
            alt={dentistData.name + dentistData.last_name}
            className="object-contain rounded-md"
            fill={true}
          />
          {/* {dentistData.cover_images && (
            <Image
              src={dentistData.cover_images}
              alt={'deneme'}
              fill
              className="object-cover rounded-2xl"
            />
          )} */}
        </div>
        <span className="text-xl font-extrabold font-poppins ml-2">
          {dentistData.degree?.["tr"] +
            " " +
            dentistData.name +
            " " +
            dentistData.last_name}
        </span>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={"space-y-4"}>
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder={"Hekime Sor"}
                    {...field}
                    className="w-full h-[120px] bg-[#F4F4F4]"
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"allowNameVisibility"}
            render={({ field }) => (
              <FormItem className="flex items-center">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <span className="text-sm font-poppins font-normal leading-none ml-2 block">
                  Sorularımda ad-soyad bilgimin gözükmesine izin veriyorum.
                  Aydınlatma Metni’ne ulaşmak için{" "}
                  <span className="underline text-primary">Tıklayın</span>
                </span>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />

          <Button
            type={"submit"}
            disabled={request.state === "loading" || !session?.user}
            className="w-full h-14"
          >
            {request.state === "loading"
              ? "Bekliyor"
              : request.state === "success"
                ? "Başarılı"
                : "Sor"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
