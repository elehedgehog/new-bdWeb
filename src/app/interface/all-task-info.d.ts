interface AllInfo {
  labels: AllInfo_label[] | string[]
  servers: AllInfo_Server[]
  drivers: AllInfo_Driver[]
  tasks: AllInfo__Task[]
}

interface AllInfo_Server {
  csid: number
  ip: string
  port: number
  isSelected: boolean
  description: string
  cas: any[]
  cts: any[]
}

interface AllInfo_label {
  name: string
  isSelected: boolean;
}

interface AllInfo__Task extends SubAllCollectingTask {
  isSelected: boolean
  labels: string
  statusText?: string
  ctid: string
}

interface AllInfo_Driver {
  caid: number
  isSelected: boolean
  egName: string
  chName: string
  description: string
  csid: number
  cts: any[]
}