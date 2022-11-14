export const problemTypeData = {
  "1": 'Replace',
  "2": 'Repair',
  "3": "Network Problem",
  "4": "Printer Problem",
  "5": "Leave Management Software",
  "6": "Zoom Meeting",
  "7": "New Internet Connection",
  "8": "Fortrack & Anti-virus",
  "9": "Install Windows",
  "10": "WireLess Connection",
  "11": 'Font Problem',
}

export const roomInfoType = {
  "1": 'SB Main Building',
  "2": 'Rason Store Building',
  "3": "CTSB",
  "4": "School of Intelligence"
}

export const sectionName = {
  "1": 'Admin',
  "2": 'ICT, Research & Wing',
  "3": "Cyber Intelligence",
  // "4": "Printer Problem",
  // "5": "Leave Management Software",
  // "6": "Zoom Meeting",
  // "7": "New Internet Connection",
  // "8": "Fortrack & Anti-virus",
  // "9": "Install Windows",
  // "10":"WireLess Connection",
  // "11": 'Font Problem',
}
export const RankData = {
  "1": 'Constable',
  "2": "ASI",
  "3": 'Sub-Inspector',
  "4": "Inspector",
  "5": "ASP",
  "6": "Ad SP",
  "7": "SP",
  "8": "SSP",
  "9": "Ad-DIG",

  // "9": "Install Windows",
  // "10":"WireLess Connection",
  // "11": 'Font Problem',
}
export const DeviceNameData = {
  "1": 'Desktop Computer',
  "2": "Laptop Computer",
  "3": 'Server',
  "4": "Switch",
  "5": "Router",
  "6": "KeyBoard",
  "7": "Mouse",
  "8": "Monitor"
}
//['','','KeyBoard','Mouce']
// export const IssueName=['Printer','Font Problem','Network Problem']

export const deviceItemsInfo = [
  // this is the parent or 'item'
  {
    name: 'Brand',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Dell',
        id: 1,
      },
      {
        name: 'Hp',
        id: 2,
      },
      {
        name: 'Lenovo',
        id: 3,
      },
      {
        name: 'MacBook',
        id: 4,
      },
      {
        name: 'AllInOne',
        id: 5,
      },

    ],
  },
  {
    name: 'Genaration',
    id: 2,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Pentium',
        id: 50,
      },
      {
        name: 'Core i 3',
        id: 51,
      },
      {
        name: 'Core i 5',
        id: 52,
      },
      {
        name: 'Core i 7',
        id: 53,
      },
      {
        name: 'Core i 9',
        id: 54,
      },
      {
        name: 'Core i 10',
        id: 55,
      },
      {
        name: 'Core i 11',
        id: 56,
      },
    ],
  },
  {
    name: 'Others',
    id: 3,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Ram 2GB',
        id: 150,
      },
      {
        name: 'Ram 4GB',
        id: 151,
      },
      {
        name: 'Ram 8GB',
        id: 152,
      },
      {
        name: 'Ram 16GB',
        id: 153,
      },
      {
        name: 'Ram 32GB',
        id: 154,
      },
      {
        name: 'HDD 128GB',
        id: 155,
      },
      {
        name: 'HDD 256GB',
        id: 156,
      },
      {
        name: 'HDD 512GB',
        id: 157,
      },
      {
        name: 'HDD 1TB',
        id: 158,
      },
    ],
  },
  {
    name: 'KeyBoard',
    id: 3,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Logitech',
        id: 250,
      },
      {
        name: 'Gigabyte',
        id: 251,
      },
      {
        name: 'A4Tech',
        id: 251,
      }]
  },
  {
    name: 'KeyBoard & Mouse',
    id: 3,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Logitech',
        id: 250,
      },
      {
        name: 'Gigabyte',
        id: 251,
      },
      {
        name: 'A4Tech',
        id: 252,
      },
      {
        name: 'Razer ',
        id: 253,
      },
      {
        name: 'Apple',
        id: 251,
      },
    ]
  }
]

