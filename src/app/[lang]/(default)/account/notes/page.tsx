import { unstable_setRequestLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { getMyAppointments } from "./actions";
import { authOptions } from "@/lib/auth";
import AppointmentItem from "./AppointmentItem";

export const revalidate = 0;

interface DentistInfo {
  id: number;
  name: string;
  last_name: string;
  url: string;
  degree: any;
  branch: any;
}

interface ClinicInfo {
  id: number;
  url: string;
  name: string;
  type: any;
}

interface AppointmentData {
  appointment_type: string;
  day: string;
  start_min: string;
  end_min: string;
  dentist: DentistInfo;
  clinic: ClinicInfo;
  id: number;
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.tokens?.accessToken) {
    return;
  }

  const id = session.user.id;
  const token = session.user.tokens.accessToken;
  unstable_setRequestLocale(lang);

  const myAppointments = await getMyAppointments(String(id), token);

  return (
    <div>
      <div
        className="p-4 text-xs text-gray-800 rounded tracking-wide bg-gray-50 "
        role="alert"
      >
        Notların randevu bazında listelenmektedir.
      </div>
      <div className="flex flex-col gap-4 mt-5">
        {myAppointments.map((appointment: AppointmentData, index: number) => (
          <AppointmentItem
            key={index}
            appointment={appointment}
            token={token}
          />
        ))}
      </div>
    </div>
  );
}
