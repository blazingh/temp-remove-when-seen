
function ListWithNumber(
    {
        data,
        title,
        lang
    }: {
        data: any,
        title: string,
        lang: string
    }
) {
    return (
        <section className="flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-bold">
                {lang === "tr"
                    ? "6 Adımda Özgürce Gülümse"
                    : "Smile Freely in 6 Steps"}{" "}
            </h2>

            <div key="{index}" className="flex gap-3 items-center">
                <div className="flex w-[28px] h-[28px] rounded-full bg-primary items-center justify-center">
                    <span className="text-white text-lg">1</span>
                </div>
                <p className="text-base text-text-dark">
                    {lang === "tr" ? "Şehrini ve İhtiyacını Seç" : "Choose Your City"}
                </p>
            </div>

            <div key="{index}" className="flex gap-3 items-center">
                <div className="flex w-[28px] h-[28px] rounded-full bg-primary items-center justify-center">
                    <span className="text-white text-lg">2</span>
                </div>
                <p className="text-base text-text-dark">
                    {lang === "tr" ? " Klinikleri incele" : "Check out clinics"}
                </p>
            </div>
            <div key="{index}" className="flex gap-3 items-center">
                <div className="flex w-[28px] h-[28px] rounded-full bg-primary items-center justify-center">
                    <span className="text-white text-lg">3</span>
                </div>
                <p className="text-base text-text-dark">
                    {lang === "tr" ? " Randevunu Al" : "Make Your Appointment"}
                </p>
            </div>
            <div key="{index}" className="flex gap-3 items-center">
                <div className="flex w-[28px] h-[28px] rounded-full bg-primary items-center justify-center">
                    <span className="text-white text-lg">4</span>
                </div>
                <p className="text-base text-text-dark">
                    {lang === "tr" ? "Ücretsiz Görüş" : "Free Opinion"}
                </p>
            </div>
            <div key="{index}" className="flex gap-3 items-center">
                <div className="flex w-[28px] h-[28px] rounded-full bg-primary items-center justify-center">
                    <span className="text-white text-lg">5</span>
                </div>
                <p className="text-base text-text-dark">
                    {lang === "tr" ? "Tedavine Başla" : "Start Your Treatment"}
                </p>
            </div>
            <div key="{index}" className="flex gap-3 items-center">
                <div className="flex w-[28px] h-[28px] rounded-full bg-primary items-center justify-center">
                    <span className="text-white text-lg">6</span>
                </div>
                <p className="text-base text-text-dark">
                    {lang === "tr"
                        ? "12 Aya Kadar Taksitlendir"
                        : "Pay in Installments for Up to 12 Months"}
                </p>
            </div>
        </section>

    );
}

export default ListWithNumber;