import Image from "next/image"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

export default function FrequentlyAskedQuestions(
    {

    }: {

        }
) {
    return (
        <div className="w-full mt-10">
            <div className="pb-5">
                <div className="text-2xl font-medium text-[#333]">Sıkça Sorulan Sorular</div>
                <div className="text-sm font-normal text-[#757575]">Diş klinikleri ile ilgili sıkça karşılaştığımız soruları sizin için listeledik</div>
            </div>
            <div className="">
                <Accordion type="single" collapsible className="mb-4">
                    <AccordionItem value="firm-messages">
                        <AccordionTrigger className="flex items-start hover:no-underline w-100 bg-white rounded-lg p-4 h-full">
                            <div className="w-[80%] items-start flex">
                                <span className="font-medium text-md text-[#333] text-left pr-3">
                                    Klinik seçimini neye göre yapmalıyım?
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-4 pt-0">
                                <span>Klinik seçimlerin, uzmanlık alanı, lokasyon, fiyatlandırma ve referanslara bağlı olarak değişebilir.</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="">
                <Accordion type="single" collapsible className="mb-4">
                    <AccordionItem value="firm-messages">
                        <AccordionTrigger className="flex items-start hover:no-underline w-100 bg-white rounded-lg p-4 h-full">
                            <div className="w-[80%] items-start flex">
                                <span className="font-medium text-md text-[#333] text-left pr-3">
                                    Hekim seçimini nasıl yapmalıyım?
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-4 pt-0">
                                <span>Hekimin bağlı olduğu kliniğin uzmanlık alanları listede gözükmektedir. Eğer tedavi hakkında bilgi sahibi değilsen, kliniğe gittikten sonra değişiklik yapabilirsin.</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="">
                <Accordion type="single" collapsible className="mb-4">
                    <AccordionItem value="firm-messages">
                        <AccordionTrigger className="flex items-start hover:no-underline w-100 bg-white rounded-lg p-4 h-full">
                            <div className="w-[80%] items-start flex">
                                <span className="font-medium text-md text-[#333] text-left pr-3">
                                    Diştedavim&apos;de listenen bu diş klinikleri güvenilir mi?
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-4 pt-0">
                                <span>Randevu alacağın tüm klinikler, Diştedavim tarafından onaylanmış kliniklerden oluşmaktadır. Bu nedenle gönül rahatlığıyla randevunu oluşturabilirsin.</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="">
                <Accordion type="single" collapsible className="mb-4">
                    <AccordionItem value="firm-messages">
                        <AccordionTrigger className="flex items-start hover:no-underline w-100 bg-white rounded-lg p-4 h-full">
                            <div className="w-[80%] items-start flex">
                                <span className="font-medium text-md text-[#333] text-left pr-3">
                                    Randevu aldıktan sonra iptal edebilir miyim?
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-4 pt-0">
                                <span>Evet, randevunu dilediğin zaman iptal edebilirsin. Bunun için Profil, Randevularım adımlarını takip edebilirsin.</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className="">
                <Accordion type="single" collapsible className="mb-4">
                    <AccordionItem value="firm-messages">
                        <AccordionTrigger className="flex items-start hover:no-underline w-100 bg-white rounded-lg p-4 h-full">
                            <div className="w-[80%] items-start flex">
                                <span className="font-medium text-md text-[#333] text-left pr-3">
                                    Kliniğin hizmet verdiği diller hakkında bilgi alabilir miyim?
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="p-4 pt-0">
                                <span>Kliniğin profilinde belirtilen hizmet dilleri, bu kliniğin yabancı müşterileri kabul ettiğini gösterir.</span>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

        </div>
    )
}
