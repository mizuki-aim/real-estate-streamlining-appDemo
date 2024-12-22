const properties = [
  { id: 1, name: "サンシャインマンション", address: "東京都新宿区西新宿2-8-1", units: 50, occupancyRate: 92 },
  { id: 2, name: "グリーンヒルズ", address: "東京都港区六本木6-10-1", units: 30, occupancyRate: 87 },
  { id: 3, name: "ブルーオーシャンタワー", address: "東京都中央区晴海2-5-24", units: 100, occupancyRate: 95 },
]

const reports = [
  { id: 1, propertyId: 1, type: "退去立会", date: "2023-06-15", inspector: "山田太郎" },
  { id: 2, propertyId: 2, type: "定期点検", date: "2023-06-10", inspector: "佐藤花子" },
]

const bids = [
  { id: 1, propertyId: 1, contractor: "株式会社A建設", amount: 1500000, duration: 30, status: "審査中" },
  { id: 2, propertyId: 1, contractor: "B工務店", amount: 1650000, duration: 25, status: "審査中" },
]

// Mock API functions
export const apiMock = {
  login: async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate network delay
    if (email === "admin@example.com" && password === "password") {
      return { success: true, token: "mock_token_12345" }
    }
    throw new Error("Invalid credentials")
  },

  getProperties: async () => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return properties
  },

  getProperty: async (id: number) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const property = properties.find(p => p.id === id)
    if (!property) throw new Error("Property not found")
    return property
  },

  getReports: async (propertyId?: number) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    if (propertyId) {
      return reports.filter(r => r.propertyId === propertyId)
    }
    return reports
  },

  getBids: async (propertyId?: number) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    if (propertyId) {
      return bids.filter(b => b.propertyId === propertyId)
    }
    return bids
  },

  sendLink: async (email: string, type: 'moveOut' | 'restoration', propertyId: number, unitNumber: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return { success: true, message: `Link sent to ${email} for ${type} inspection of property ${propertyId}, unit ${unitNumber}` }
  },

  uploadPhotos: async (propertyId: number, unitNumber: string, photos: File[], comment: string) => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return { success: true, message: `${photos.length} photos uploaded for property ${propertyId}, unit ${unitNumber}` }
  },

  updateBidStatus: async (bidId: number, status: 'approved' | 'rejected') => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const bid = bids.find(b => b.id === bidId)
    if (!bid) throw new Error("Bid not found")
    bid.status = status === 'approved' ? '承認済み' : '却下'
    return { success: true, message: `Bid ${bidId} ${status}` }
  },
}

