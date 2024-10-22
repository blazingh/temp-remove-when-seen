import NextAuth from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string
    phone?: string
    country_code?: string
    name?: string
    last_name?: string
    email?: string
    tokens: {
      accessToken: string
      refreshToken: string
      appointment_data: {
        is_booked: string
        reserve_id: string
        slot: {
          id: number
        }
      }
    }
  }
  interface Token {
    user: User
  }
  interface Session {
    user: User
  }
}
