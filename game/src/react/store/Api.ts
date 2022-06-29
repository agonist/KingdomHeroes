import axios from "axios";
import {BC, User} from "../model/user";
import {MetadataModel} from "../model/metadata";
import {Dungeon} from "../model/dungeon";

export class Api {

    BASE_RUL?: string = process.env.REACT_APP_API

    async getNonce(address: string): Promise<string | undefined> {
        try {
            const response = await axios.get(this.BASE_RUL + "/auth/" + address + "/nonce")
            return response.data.nonce
        } catch (error) {
            console.log(error)
        }

    }

    async login(address: string, signature: string): Promise<string | undefined> {
        try {
            const response = await axios.post(this.BASE_RUL + "/auth/login", {
                address: address,
                signature: signature
            })
            return response.data.access_token
        } catch (e) {
            console.log(e)
        }
    }

    async getUser(): Promise<User | undefined> {
        try {
            const response = await axios.get<User>(this.BASE_RUL + "/users/profile", {
                headers: {'Authorization': 'Bearer ' + this.getAuthToken()}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getMetadata(ids: number[]): Promise<MetadataModel[] | undefined> {
        try {
            const response = await axios.post<MetadataModel[]>(this.BASE_RUL + "/metadata/ids", {ids: ids})
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getYield(address: string): Promise<string | undefined> {
        try {
            const response = await axios.get(this.BASE_RUL + "/metadata/yield/" + address)
            return response.data.totalYield
        } catch (e) {
            console.log(e)
        }
    }

    async updateTeam(ids: number[]): Promise<User | undefined> {
        try {
            const response = await axios.post<User>(this.BASE_RUL + "/game/update/team", {ids: ids}, {
                headers: {'Authorization': 'Bearer ' + this.getAuthToken()}
            })
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    async getRemainingBc(ids: number[]): Promise<BC[] | undefined> {
        try {
            const response = await axios.post<BC[]>(this.BASE_RUL + "/game/bc", {ids: ids}, {headers: {'Authorization': 'Bearer ' + this.getAuthToken()}})
            return response.data
        } catch (e) {
            console.log(e)
        }
    }

    // DUNGEON

    async newDungeon(): Promise<Dungeon | undefined> {
        try {
            const response = await axios.get<Dungeon>(this.BASE_RUL + "/dungeon/new", {headers: {'Authorization': 'Bearer ' + this.getAuthToken()}})
            return response.data
        } catch (e) {
            console.log(e)
            return undefined
        }
    }

    async currentDungeon(): Promise<Dungeon | undefined> {
        try {
            const response = await axios.get<Dungeon>(this.BASE_RUL + "/dungeon/current", {headers: {'Authorization': 'Bearer ' + this.getAuthToken()}})
            return response.data
        } catch (e) {
            return undefined
        }
    }

    async endtDungeon(): Promise<Dungeon | undefined> {
        try {
            const response = await axios.get<Dungeon>(this.BASE_RUL + "/dungeon/end", {headers: {'Authorization': 'Bearer ' + this.getAuthToken()}})
            return response.data
        } catch (e) {
            return undefined
        }
    }

    getAuthToken(): string {
        let token = localStorage.getItem("auth_token")
        if (token) return token
        else return ""
    }
}
