"use client";
import { useState, useEffect } from "react";
import { getUserInfo, updateProfile } from "./actions";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

function formatDateString(inputDate: string): string {
  const inputDateTime = new Date(inputDate);
  const year = inputDateTime.getFullYear();
  const month = (inputDateTime.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDateTime.getDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [name, setName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [PhoneCountry, setPhoneCountry] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [iden, setIden] = useState<string>("");
  const [passport, setPassport] = useState<string>("");
  const [formatDate, setFormatDate] = useState<string>("");

  const session = useSession();
  const token: string | undefined = session?.data?.user?.tokens?.accessToken;
  useEffect(() => {
    if (token) {
      // Sayfa yüklendiğinde profil verilerini getir
      const getProfileData = async () => {
        try {
          const userProfile = await getUserInfo(token);
          setName(userProfile.name);
          setLastName(userProfile.last_name);
          setEmail(userProfile.email);
          setPhone(userProfile.phone);
          setPhoneCountry(userProfile.phone_country_code);
          setGender(userProfile.gender);
          setIden(userProfile.identity_no);
          setPassport(userProfile.passport_no);
          setFormatDate(formatDateString((userProfile as any).birth_date));
          setIsLoading(false);
        } catch (error) {
          // console.error('Profil verileri getirilemedi:', error);
        }
      };

      getProfileData();
    }
  }, [token]);

  const handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    inputType: string,
  ) => void = (event, inputType) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "last_name":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "birth_date":
        setFormatDate(value);
        break;
      default:
        // bilinmiyor
        break;
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!name || !last_name || !email || !gender) {
        alert("Lütfen tüm alanları doldurun.");
        return;
      }

      const updatedProfile = await updateProfile(token, {
        name,
        last_name,
        email,
        gender,
      });
      //console.log('Profil güncellendi:', updatedProfile);
      alert("Profilin başarıyla güncellendi");
      location.reload();
    } catch (error) {
      // console.log(error);
      // if (error.data === 'Name is required. Please provide a valid name.') {
      //   console.error('Ad alanı boş bırakılamaz. Lütfen geçerli bir ad girin.');
      // } else {
      //   console.error('Profil güncelleme hatası:', error);
      // }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div role="status" className="max-w-full animate-pulse">
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
          <div className="h-[50px] bg-gray-200 rounded-md dark:bg-gray-700 w-full mb-4"></div>
        </div>
      ) : (
        <form>
          <Input
            required
            id="name"
            name="name"
            type="text"
            placeholder={"Ad"}
            className="mb-4"
            value={name}
            onChange={(event) => handleInputChange(event, "name")}
          />

          <Input
            required
            id="last_name"
            name="last_name"
            type="text"
            placeholder={"Soyad"}
            className="mb-4"
            value={last_name}
            onChange={(event) => handleInputChange(event, "last_name")}
          />

          <Input
            required
            id="email"
            name="email"
            type="email"
            placeholder={"E-Posta"}
            className="mb-4"
            value={email}
            onChange={(event) => handleInputChange(event, "email")}
          />

          <Input
            required
            id="phone"
            name="phone"
            type="tel"
            placeholder={"Telefon"}
            className="mb-4"
            disabled={true}
            value={PhoneCountry + phone}
          // onChange={(event) => handleInputChange(event, 'phone')}
          />

          <Input
            required
            id="iden"
            name="iden"
            type="number"
            placeholder={"TC"}
            className="mb-4"
            disabled={true}
            value={iden}
          // onChange={(event) => handleInputChange(event, 'phone')}
          />

          <Input
            required
            id="passport"
            name="passport"
            type="passport"
            placeholder={"Pasaport"}
            className="mb-4"
            disabled={true}
            value={passport}
          // onChange={(event) => handleInputChange(event, 'phone')}
          />
          <div className="peer flex focus:bg-background border border-[#DBD1F8] px-4 flex-col w-full rounded-md bg-background ring-offset-background font-medium h-26 pb-2 pt-2">
            <label className="text-xs text-[#757575]">Doğum Günü</label>
            <input
              className="outline-none bg-transparent"
              type="date"
              value={formatDate}
              disabled={true}
              onChange={(event) => {
                handleInputChange(event, "birth_date");
                setFormatDate(event.target.value);
              }}
            />
          </div>

          {gender && (
            <>
              <hr />
              <div className="pt-3">
                <div className="ml-3 text-sm font-medium text-[#757575]">
                  Cinsiyet
                </div>
                <div className="flex float-left items-center ps-4 border-gray-200 rounded dark:border-gray-700 w-1/3">
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    name="gender"
                    value="male"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    onChange={(event) => handleInputChange(event, "gender")}
                    checked={gender === "male"}
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Erkek
                  </label>
                </div>

                <div className="flex float-left items-center ps-4 border-gray-200 rounded dark:border-gray-700 w-1/3">
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    onChange={(event) => handleInputChange(event, "gender")}
                    checked={gender === "female"}
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Kadın
                  </label>
                </div>

                <div className="flex float-left items-center ps-4 border-gray-200 rounded dark:border-gray-700 w-1/3">
                  <input
                    id="bordered-radio-3"
                    type="radio"
                    name="gender"
                    value="other"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    onChange={(event) => handleInputChange(event, "gender")}
                    checked={gender === "other"}
                  />
                  <label
                    htmlFor="bordered-radio-3"
                    className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Diğer
                  </label>
                </div>
              </div>
            </>
          )}

          <Button
            type="submit"
            onClick={handleUpdateProfile}
            className="w-full mt-3 mb-5"
          >
            Güncelle
          </Button>
        </form>
      )}
    </div>
  );
};

export default Profile;
