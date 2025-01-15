import { Client, Account, ID } from "appwrite";
import conf from "../conf"

export class Services {
    client = new Client()
    account;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAcc({email, password, name}){
        try {
            const createAccount = await this.account.create(ID.unique(), email, password, name)
            if (createAccount) {
                return this.logIn({email, password})
            } else {
                return createAccount
            }
        } catch (error) {
            throw error
        }
    }

    async logIn({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }
    }

    async getCurrent(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error.message
            return false
        }
        return null;
    }

    async logOut(){
        try {
            return this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

}

const services = new Services()

export default services