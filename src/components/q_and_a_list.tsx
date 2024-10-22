import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

export default function QandAList(
  {
    title,
    description,
    list,
  }: {
    title: string,
    description: string,
    list: {
      question: string,
      answer: string
    }[]
  }) {
  return (
    <div className="flex flex-col gap-4">

      <div className="flex flex-col gap-2">
        <div className="text-sm font-normal text-[#757575]">
          {description}
        </div>
      </div>

      <Accordion type="single" collapsible className="flex flex-col gap-4">
        {list.map((item, index) => (
          <AccordionItem value={item.question} key={index}>
            <AccordionTrigger className="flex items-start hover:no-underline w-100 text-left bg-white rounded-lg h-full">
              <span className="font-medium text-base text-left">{item.question}</span>
            </AccordionTrigger>
            <AccordionContent>
              <span className="text-sm text-left pb-2">{item.answer}</span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

    </div>
  )
}
