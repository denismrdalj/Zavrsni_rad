import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "./firebase";
import { AddAuctionType, AddUserType } from "../types/CarType";

export const firestore = getFirestore(app)

export const carsCollection = collection(firestore, 'cars')
export const usersCollection = collection(firestore, 'users')

export const addAuction = async(auctionData: AddAuctionType) => {
    const newAuction = await addDoc(carsCollection, {...auctionData})
}

export const addUser = async(userData: AddUserType) => {
    const newUser = await addDoc(usersCollection, {...userData})
}
