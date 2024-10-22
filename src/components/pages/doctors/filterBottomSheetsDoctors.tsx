import { Button } from "@/components/ui/button";
import IconStarFilled from "@/icons/starFilled";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
export default function FilterBottomSheets() {
  let user
  user = {
    name: 'John Doe',
  }
  const buttonArr = [
    {
      id: 1,
      name: 'Genel Diş Hekimliği'
    },
    {
      id: 2,
      name: 'Ortodonti'
    },
    {
      id: 3,
      name: 'Restorotif'
    },
    {
      id: 4,
      name: 'Pedodonti'
    },
    {
      id: 5,
      name: 'Cerrahi'
    },
    {
      id: 6,
      name: 'Peridontoloji'
    },
    {
      id: 7,
      name: 'Protez'
    },
    {
      id: 5,
      name: 'Cerrahi'
    },
    {
      id: 6,
      name: 'Peridontoloji'
    },
    {
      id: 7,
      name: 'Protez'
    },
    {
      id: 8,
      name: 'Entodonti'
    },
  ]
  return (
    <div className="w-full h-full block">
      <div className="flex pl-8 pr-1 py-4 w-full justify-between mt-1">
        <div>
          <p className="text-foreground text-2xl">
            Filtrele
          </p>
        </div>
        <div>
          <p className="text-foreground text-red-500 text-md items-center mt-1">
            Temizle
          </p>
        </div>
      </div>
      <Separator/>
      <div className="mt-2">
        <div>
          <span className="text-lg font-bold">Hekim Branşı</span>
        </div>
        <div>
          {
            buttonArr.map((items: any) => (
              <Toggle variant="outline" className="px-5 mt-2 py-1 data-[state=on]:bg-white  data-[state=on]:text-dark  bg-white mr-2 text-dark border border-black hover:border-primary focus:border-primary text-sm h-10" key={items.id}>{items.name}</Toggle>
            ))
          }
        </div>
      </div>
      <div>
        <div className="my-3">
          <span className="text-lg font-bold">Konuşulan Diller</span>
        </div>
        <div>
          <Toggle variant="outline" className="px-5 mt-2 py-1 data-[state=on]:bg-white  data-[state=on]:text-dark  bg-white mr-2 text-dark border border-black hover:border-primary focus:border-primary text-sm h-10" >English</Toggle>

          <Toggle variant="outline" className="px-5 mt-2 py-1 data-[state=on]:bg-white  data-[state=on]:text-dark  bg-white mr-2 text-dark border border-black hover:border-primary focus:border-primary text-sm h-10" >Deutsch</Toggle>

          <Toggle variant="outline" className="px-5 mt-2 py-1 data-[state=on]:bg-white  data-[state=on]:text-dark  bg-white mr-2 text-dark border border-black hover:border-primary focus:border-primary text-sm h-10" >Arabic</Toggle>

        </div>
      </div>
      <div className="mb-4">
        <div className="my-3">
          <span className="text-lg font-bold">Değerlendirmeler</span>
        </div>
        <div>
          <Button className=" h-10 px-5 py-1 mr-2 mt-2 text-dark border border-black text-sm hover:border-primary focus:border-primary"
          variant="outline" // veya "outlineThin" gibi bir başka uygun variant
          >
            <IconStarFilled width={'20px'} height={'20px'} />
            <span className="ml-2 text-sm">2 +</span>
          </Button>          
          <Button className=" h-10 px-5 py-1 mr-2 mt-2 text-dark border border-black text-sm hover:border-primary focus:border-primary" variant="outline"><IconStarFilled width={'20px'} height={'20px'} /><span className="ml-2 text-sm">3 +</span></Button>
          <Button className="h-10 px-5 py-1 mr-2 mt-2 text-dark border border-black text-sm hover:border-primary focus:border-primary" variant="outline"><IconStarFilled width={'20px'} height={'20px'} /> <span className="ml-2 text-sm">4 +</span></Button>
        </div>
      </div>
      <Separator/>

      <div className="col-span-1 pt-4">
							<Button
								type="submit"
								className="col-span-1 p-4 w-full font-medium"
							>
								<span>Sonuçları Gör (24)</span>
							</Button>
					</div>

    </div >
  )
}
