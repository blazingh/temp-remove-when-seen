import NavigationBar from "@/components/layout/navigationBar/navigationBar"

export default function RootTemplate(
  {
    children
  }: {
    children: React.ReactNode
  }) {

  return (
    <>
      {children}
      <nav>
        <NavigationBar className='' />
      </nav>
    </>
  )
}
