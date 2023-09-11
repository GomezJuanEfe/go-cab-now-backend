import { hashPasswordSync } from "../../auth/utils/bcrypt"
import { User as UserModel } from "./user.types"

type User = Omit<UserModel, 'id' | 'avatar' | 'created_at' | 'updated_at'>

const usersInfo = [
  {
    id: "cllzw3v570002uli6xix62s0i",
    email: "Kayley_Quigley33@gmail.com",
    first_name: "Kayley",
    last_name: "Quigley",
    role: "DRIVER",
    address: "5176 Reynolds Haven",
    phone: "074-572-16-57",
    is_active: true
  },
  {
    id: "cllzw3v580004uli66m7fsq8a",
    email: "Kaden_Fay38@gmail.com",
    first_name: "Kaden",
    last_name: "Fay",
    role: "DRIVER",
    address: "150 Hayes Stream",
    phone: "172-731-55-47",
    is_active: true
  },
  {
    id: "cllzw3v580005uli6yr87gl8g",
    email: "Maiya_Nitzsche45@hotmail.com",
    first_name: "Maiya",
    last_name: "Nitzsche",
    role: "DRIVER",
    address: "136 Dillon Plains",
    phone: "996-614-69-70",
    is_active: true
  },
  {
    id: "cllzw3v580009uli62i5um5o2",
    email: "America6@hotmail.com",
    first_name: "America",
    last_name: "McLaughlin",
    role: "DRIVER",
    address: "47288 Zoila Field",
    phone: "552-306-73-76",
    is_active: true
  },
  {
    id: "cllzw3v58000auli6da0ozzoj",
    email: "Evan45@yahoo.com",
    first_name: "Evan",
    last_name: "Waters",
    role: "DRIVER",
    address: "5427 Hilpert Estate",
    phone: "806-375-80-08",
    is_active: true
  },
  {
    id: "cllzw3v58000duli6izqk40ue",
    email: "Libbie30@yahoo.com",
    first_name: "Libbie",
    last_name: "Konopelski",
    role: "DRIVER",
    address: "77942 Bernhard Gardens",
    phone: "796-550-25-26",
    is_active: true
  },
  {
    id: "cllzw3v580015uli6p6lgq9m0",
    email: "Karley_Cartwright46@yahoo.com",
    first_name: "Karley",
    last_name: "Cartwright",
    role: "DRIVER",
    address: "981 Maynard Fall",
    phone: "658-273-39-66",
    is_active: true
  },
  {
    id: "cllzw3v58000vuli6k3dcr3lj",
    email: "Katharina63@yahoo.com",
    first_name: "Katharina",
    last_name: "Kshlerin",
    role: "DRIVER",
    address: "453 Dixie Lake",
    phone: "496-996-38-61",
    is_active: true
  },
  {
    id: "cllzw3v58000zuli6ed3ogd3n",
    email: "Lester21@hotmail.com",
    first_name: "Lester",
    last_name: "Armstrong",
    role: "DRIVER",
    address: "3911 Lela Row",
    phone: "927-316-49-72",
    is_active: true
  },
  {
    id: "cllzw3v580012uli64qij3ava",
    email: "Lloyd_Haag@gmail.com",
    first_name: "Lloyd",
    last_name: "Haag",
    role: "DRIVER",
    address: "73782 Miller Viaduct",
    phone: "113-348-37-43",
    is_active: true
  },
  {
    id: "cllzw3v580014uli6bh73yfty",
    email: "Rachael_Pfeffer@yahoo.com",
    first_name: "Rachael",
    last_name: "Pfeffer",
    role: "DRIVER",
    address: "4336 Kuhlman Lodge",
    phone: "042-865-08-45",
    is_active: true
  },
  {
    id: "cllzw3v58000buli6ub4k75ir",
    email: "jg@test.com",
    first_name: "Juan",
    last_name: "Gomez",
    role: "ADMIN",
    address: "38367 Considine Meadows",
    phone: "220-220-73-76",
    is_active: true
  },
  {
    id: "cllzw3v58000culi6pl2xc59a",
    email: "dh@test.com",
    first_name: "Daniel",
    last_name: "Hincapie",
    role: "ADMIN",
    address: "47255 Effertz Mountains",
    phone: "186-011-32-26",
    is_active: true
  },
  {
    id: "clm0x0zex0000ulvhv6meuam9",
    email: "av@test.com",
    first_name: "Andrea",
    last_name: "Vargas",
    role: "ADMIN",
    address: "5923 Yazmin Shore",
    phone: "296-079-97-85",
    is_active: true
  },
  {
    id: "cllzw3v58000euli6r78fm6xl",
    email: "Orlando_Schmidt57@yahoo.com",
    first_name: "Orlando",
    last_name: "Schmidt",
    role: "USER",
    address: "7001 Hettinger Avenue",
    phone: "551-762-18-73",
    is_active: true
  },
  {
    id: "cllzw3v58000fuli6mepi4r21",
    email: "Francis_Pfannerstill@yahoo.com",
    first_name: "Francis",
    last_name: "Pfannerstill",
    role: "USER",
    address: "966 Jayme Wells",
    phone: "495-727-41-09",
    is_active: true
  },
  {
    id: "cllzw3v58000guli6bddzowd5",
    email: "Nelson87@gmail.com",
    first_name: "Nelson",
    last_name: "Sanford",
    role: "USER",
    address: "881 Boehm Parkway",
    phone: "763-319-20-82",
    is_active: true
  },
  {
    id: "cllzw3v58000huli6rw840z32",
    email: "Joaquin.Dare@hotmail.com",
    first_name: "Joaquin",
    last_name: "Dare",
    role: "USER",
    address: "52157 Wilhelm Valleys",
    phone: "336-348-45-57",
    is_active: true
  },
]

export const userSeeder: User[] = Array.from({ length: usersInfo.length}).map((e, i) => {
  return ({
    id: usersInfo[i].id,
    email: usersInfo[i].email,
    first_name: usersInfo[i].first_name,
    last_name: usersInfo[i].last_name,
    password: hashPasswordSync('1234'),
    role: usersInfo[i].role as any,
    address: usersInfo[i].address,
    phone: usersInfo[i].phone,
    is_active: usersInfo[i].is_active,
    reset_token: null,
    token_exp: null,
  })
})
