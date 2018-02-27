interface ServerData {
  csid: string
  ip: string
  roleData?: any[]
  port: number
  active?: boolean
  haveThisServerRole?: boolean
  haveChangeServerRole?: boolean
  cas: any[]
  cts: {
    cs: {
      csid: string
      ip: string
      porint: number 
    }
  }[]
}
