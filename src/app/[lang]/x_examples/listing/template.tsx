export default function Template(
  {
    children,
    searchParams
  }: {
    children: React.ReactNode
    searchParams: {
      [key: string]: string;
    }
  }) {

  return (
    <>
      {/* 
      add filtering here
      */}

      {children}
    </>
  )
}
