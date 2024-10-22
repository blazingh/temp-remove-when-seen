import IconFlagsTurkey from '@/icons/flags/turkey'
import IconFlagsAzerbaijan from '@/icons/flags/azerbaijan'
import IconFlagsGermany from '@/icons/flags/germany'
import IconFlagsUnitedKingdom from '@/icons/flags/united-kingdom'
import IconFlagsFrance from '@/icons/flags/france'
import IconFlagsUnitedArabEmirates from '@/icons/flags/united-arab-emirates'

type CountryCode = {
  value: string
  label: string
  flag: JSX.Element
  format: string
}

const countryCodes: CountryCode[] = [
  { value: '90', label: '+90', flag: <IconFlagsTurkey />, format: '(___) ___-____' },
  { value: '994', label: '+994', flag: <IconFlagsAzerbaijan />, format: '__ ___ ____' },
  { value: '49', label: '+44', flag: <IconFlagsGermany />, format: '____________' },
  { value: '44', label: '+49', flag: <IconFlagsUnitedKingdom />, format: '____ ______' },
  { value: '33', label: '+33', flag: <IconFlagsFrance />, format: '5 __ __ __ __' },
  { value: '971', label: '+971', flag: <IconFlagsUnitedArabEmirates />, format: '__ _______' },
]

export const otp_availble_codes = ['90']

export default countryCodes
