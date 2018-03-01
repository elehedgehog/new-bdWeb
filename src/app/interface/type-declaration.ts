interface visit {
  key: string
  text: string
  left: string
}
interface quantity {
  key: string
  text: string
  left: string
}
interface site {   //
  key: string
  text: string
}
interface notice {   //
  key: string
  text: string
  date: string
  state: string
}
interface statusPercent {
	statusName: string,
	percent: number,
	time: number | null
}
interface clientError {
  csid?: string
  ctid?: string
  time?: number | string
  status?: string
  dataResultNum?: number
  dataResultSize?: number
  dataSourceSize?: number
  dataSourceNum?: number
  errors: { fileName: string, message: string }[]
  delay: string
  retry: string
  ct: {
    csid: string
    ctid: string
    pid?: string
    name?: string
    label?: string
    cs: {
      csid: string
      ip: string
      port: string
      description: string
    }
    ca: {
      egName: string
      version: string
      chName: string
      description: string
      author: string
      minVersion: string
    }

  }
}

interface historyContinue {
  starttime: number
  endtime: number
  chs: chs[]
}
interface chs {
  time: number
  dataResultNum: number
  dataResultSize: number
}
interface taskSchedule {
  ctid: string
  name: string
  status: string
  start: number
  end: number
  nodeResults: { 'ok':number[], 'source missing': number[], 'deadline exceeded': number[], 'outcome missing': number[] }
  csid: string
}
interface ntasksHistory {
  dataResultNum: number
  dataResultSize: number
  ctid: string
  csid: string
  ct: {
    'name': string,
    'ca': { 'egName': string },
    'cs':{'ip': string },
  }
}
interface dataContent {      //
  title: string
  dataContent: number
  dataNum: number
  dataSize: number
  dataTime: number
  increseContent: number
}
interface allUser {
  isPass: number
  password: string
  phone: string
  time: number
  uid: number
  username: string
}
interface storageInfo {
  typeInfos: {
    id: string
    name: string
    type: string
    collectionSize: string
    datacount: string
    percentcount: string
    percentsize: string
  }[]
  collectInfos:  {
    id: string
    name: string
    type: string
    collectionSize: string
    datacount: string
    percentcount: string
    percentsize: string
  }[]
}
interface storageSpace {
  id: string
  datacount: number
  dbspace: number
  freespace: number
  otherspace: number
  percentdbspace: number
  percentfreespace: number
  percentotherspace: number
  totalspace: number
}
interface storageField {
  name: string
  id: string
  collectname: string
  collectsize: string
  datacount: string
  datasize: string
  indexsize: string
  storagesize: string
  avgobjsize: string
  datatime: number
  expectday: string
  expectgrowth: string
  percentcount: string
  percentsize: string

}
interface storageDetail {
  id: string
  collectname: string
  type: string
  field: string
  fieldtype:  number
  elements: string
  values: string
  count: string
  percent: string
  fields: string
  time: string
  indexDetailInfos:[{
    id: string
    collectname: string
    field: string
    elements: string[]
    values: string[]
    fieldtype:  number
    count: string
    percent: string
    fields: string[]
    time: string

  }]
}
interface storageIndexDetail {
  currentPage: number
  pageCount: number
  totalCount: number
  perPageCount: number
  obj: [{
    elements: string[]
    values: string[]
  }]
}
interface serverInfos {
  ip: string
  description: string
  port:number
  csid: string
}
interface applicationInfos {
  egName: string
  chName: string
  description: string
  cts: string[]
  version: string
  author: string
  minVersion: string
}
