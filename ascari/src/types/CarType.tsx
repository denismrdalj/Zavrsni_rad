import { User } from "@firebase/auth"

export interface CarType{
    bid?: number
    bidder?: string
    description?: String
    drive?: String
    engine?: String
    fuel?: String
    id?: String
    location?: String
    make?: String
    mileage?: number
    model?: String
    transmission?: String
    year?: number
    vin?: String
    bodyStyle?: String
    sellerUsername?: string
    sellerEmail?: string
    startDate?: Date
    endDate?: Date,
    timeRemaining?: number
}
export interface AddAuctionType{
    bid: number
    bidder: string
    description: String
    drive: String
    engine: String
    fuel: String
    location: String
    make: String
    mileage: number
    model: String
    transmission: String
    year: number
    vin: String
    bodyStyle: String
    sellerUsername: string
    sellerEmail: string
    startDate: number
    endDate: number,
    timeRemaining: number
}
export interface UserType{
    id?: string
    username?: string
    email?: string
    password?: string
    balance?: number
}
export interface AddUserType{
    id: string
    username: string
    email: string
    password: string
    balance: number
}

